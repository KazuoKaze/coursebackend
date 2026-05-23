import type { Endpoint } from 'payload'

import { Resend } from 'resend'
import { otpStore } from '../lib/otpStore'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendOtp: Endpoint = {
  path: '/send-otp',
  method: 'post',

  handler: async (req) => {
    try {
      const body = await req.json()

      const { name, email, password } = body

      if (!name || !email || !password) {
        return Response.json(
          {
            success: false,
            message: 'All fields are required',
          },
          { status: 400 },
        )
      }

      // Check if user already exists
      const existingUser = await req.payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (existingUser.docs.length > 0) {
        return Response.json(
          {
            success: false,
            message: 'User already exists',
          },
          { status: 400 },
        )
      }

      // Generate 6 digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString()

      // Store OTP temporarily
      otpStore.set(email, {
        otp,
        name,
        password,
        expiresAt: Date.now() + 1000 * 60 * 5,
      })

      // Send email
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your Verification Code',
        html: `
          <h1>Your OTP Code</h1>
          <p>${otp}</p>
          <p>This code expires in 5 minutes.</p>
        `,
      })

      return Response.json({
        success: true,
        message: 'OTP sent successfully',
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,
          message: 'Something went wrong',
        },
        { status: 500 },
      )
    }
  },
}
