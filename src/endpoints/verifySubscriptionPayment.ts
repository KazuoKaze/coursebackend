import crypto from 'crypto'

import type { Endpoint } from 'payload'

export const verifySubscriptionPayment: Endpoint = {
  path: '/verify-subscription-payment',

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

      const {
        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,
      } = body

      // Verify signature
      const generatedSignature = crypto
        .createHmac(
          'sha256',

          process.env.RAZORPAY_KEY_SECRET!,
        )

        .update(`${razorpay_order_id}|${razorpay_payment_id}`)

        .digest('hex')

      if (generatedSignature !== razorpay_signature) {
        return Response.json(
          {
            success: false,

            message: 'Payment verification failed',
          },

          { status: 400 },
        )
      }

      // Find subscription
      const subscriptions = await req.payload.find({
        collection: 'user-subscriptions',

        where: {
          razorpayOrderId: {
            equals: razorpay_order_id,
          },
        },
      })

      const subscription = subscriptions.docs[0]

      if (!subscription) {
        return Response.json(
          {
            success: false,

            message: 'Subscription not found',
          },

          { status: 404 },
        )
      }

      // Mark paid
      await req.payload.update({
        collection: 'user-subscriptions',

        id: subscription.id,

        data: {
          paymentStatus: 'paid',

          razorpayPaymentId: razorpay_payment_id,

          razorpaySignature: razorpay_signature,
        },
      })

      return Response.json({
        success: true,

        message: 'Subscription activated successfully',
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,

          message: 'Subscription verification failed',
        },

        { status: 500 },
      )
    }
  },
}
