import crypto from 'crypto'

import type { Endpoint } from 'payload'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const verifySessionPayment: Endpoint = {
  path: '/verify-session-payment',

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

      // Verify signature
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
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

      // Find booking
      const bookings = await req.payload.find({
        collection: 'session-bookings',

        where: {
          razorpayOrderId: {
            equals: razorpay_order_id,
          },
        },
      })

      const booking = bookings.docs[0]

      if (!booking) {
        return Response.json(
          {
            success: false,
            message: 'Booking not found',
          },
          { status: 404 },
        )
      }

      // Mark as paid
      await req.payload.update({
        collection: 'session-bookings',

        id: booking.id,

        data: {
          paymentStatus: 'paid',

          razorpayPaymentId: razorpay_payment_id,

          razorpaySignature: razorpay_signature,
          },
        
        
      })
        
      await resend.emails.send({
        from: 'onboarding@resend.dev',

        to: 'tonystark11sv@gmail.com',

        subject: 'New Session Booking',

        html: `
          <h1>New Session Booked</h1>
      
          <p>
            ${booking.inviteeName}
            booked a session.
          </p>
      
          <p>
            Email:
            ${booking.inviteeEmail}
          </p>
      
          <p>
            Amount:
            ₹${booking.amount}
          </p>
      
          <p>
            Calendly Event:
            ${booking.calendlyEventId}
          </p>
        `,
      })

      return Response.json({
        success: true,
        message: 'Session payment successful',
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,
          message: 'Session payment verification failed',
        },
        { status: 500 },
      )
    }
  },
}
