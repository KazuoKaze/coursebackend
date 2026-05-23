import crypto from 'crypto'

import type { Endpoint } from 'payload'

export const verifyPayment: Endpoint = {
  path: '/verify-payment',
  method: 'post',

  handler: async (req) => {
    try {
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

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

      // Generate signature
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex')

      // Invalid payment
      if (generatedSignature !== razorpay_signature) {
        return Response.json(
          {
            success: false,
            message: 'Payment verification failed',
          },
          { status: 400 },
        )
      }

      // Find order
      const orders = await req.payload.find({
        collection: 'orders',

        where: {
          razorpayOrderId: {
            equals: razorpay_order_id,
          },
        },
      })

      const order = orders.docs[0]

      if (!order) {
        return Response.json(
          {
            success: false,
            message: 'Order not found',
          },
          { status: 404 },
        )
      }

      // Update order
      await req.payload.update({
        collection: 'orders',
        id: order.id,

        data: {
          status: 'paid',

          razorpayPaymentId: razorpay_payment_id,

          razorpaySignature: razorpay_signature,
        },
      })

      // Get user
      const user = await req.payload.findByID({
        collection: 'users',
        id: req.user.id,
        depth: 0,
      })

        //   const purchasedCourses = [...(user.purchasedCourses || []), order.course]
        
        const existingCourses = (user.purchasedCourses || []).map((course: any) =>
          typeof course === 'object' ? course.id : course,
        )

        const purchasedCourses = [
          ...existingCourses,

          typeof order.course === 'object' ? order.course.id : order.course,
        ]

      // Grant access
      await req.payload.update({
        collection: 'users',
        id: req.user.id,

        data: {
          purchasedCourses,
        },
      })

      return Response.json({
        success: true,
        message: 'Payment verified successfully',
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,
          message: 'Payment verification failed',
        },
        { status: 500 },
      )
    }
  },
}
