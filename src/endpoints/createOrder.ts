import type { Endpoint } from 'payload'

import { razorpay } from '../lib/razorpay'

export const createOrder: Endpoint = {
  path: '/create-order',
  method: 'post',

  handler: async (req) => {
    try {
      // User must be logged in
      if (!req.user) {
        return Response.json(
          {
            success: false,
            message: 'Unauthorized',
          },
          { status: 401 },
        )
      }

      const body = await req.json()

      const { courseId } = body

      if (!courseId) {
        return Response.json(
          {
            success: false,
            message: 'Course ID required',
          },
          { status: 400 },
        )
      }

      // Find course
      const course = await req.payload.findByID({
        collection: 'course-service-page-component',

        id: courseId,
      })

      if (!course) {
        return Response.json(
          {
            success: false,
            message: 'Course not found',
          },
          { status: 404 },
        )
      }

      // Prevent duplicate purchase
      const user = await req.payload.findByID({
        collection: 'users',
        id: req.user.id,
        depth: 1,
      })

      const alreadyPurchased = user.purchasedCourses?.some(
        (purchasedCourse: any) => purchasedCourse.id === courseId,
      )

      if (alreadyPurchased) {
        return Response.json(
          {
            success: false,
            message: 'Course already purchased',
          },
          { status: 400 },
        )
      }

      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: Number(course.price || 0) * 100,

        currency: 'INR',

        receipt: `receipt_${Date.now()}`,
      })

      // Create pending order in DB
      const order = await req.payload.create({
        collection: 'orders',

        data: {
          user: req.user.id,
          course: courseId,

          amount: Number(course.price || 0),

          status: 'pending',

          razorpayOrderId: razorpayOrder.id,
        },
      })

      return Response.json({
        success: true,

        order,

        razorpayOrder,
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,
          message: 'Failed to create order',
        },
        { status: 500 },
      )
    }
  },
}
