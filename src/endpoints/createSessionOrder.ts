import type { Endpoint } from 'payload'

import { razorpay } from '../lib/razorpay'

export const createSessionOrder: Endpoint = {
  path: '/create-session-order',

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

      const { inviteeName, inviteeEmail, calendlyEventId, bookingDate } = body

      // Your fixed session price
      // Fetch session settings
      const settings = await req.payload.find({
        collection: 'session-settings',

        limit: 1,
      })

      const sessionSettings = settings.docs[0]

      if (!sessionSettings) {
        return Response.json(
          {
            success: false,
            message: 'Session settings not found',
          },
          { status: 500 },
        )
      }

      const sessionPrice = sessionSettings.sessionPrice

      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: sessionPrice * 100,

        currency: 'INR',

        receipt: `session_${Date.now()}`,
      })

      // Create temporary booking
      const booking = await req.payload.create({
        collection: 'session-bookings',

        data: {
          user: req.user.id,

          inviteeName,

          inviteeEmail,

          calendlyEventId,

          bookingDate,

          amount: sessionPrice,

          paymentStatus: 'pending',

          razorpayOrderId: razorpayOrder.id,
        },
      })

      return Response.json({
        success: true,

        booking,

        razorpayOrder,
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,
          message: 'Failed to create session order',
        },
        { status: 500 },
      )
    }
  },
}
