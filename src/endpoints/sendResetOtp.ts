import type { Endpoint } from 'payload'
import { Resend } from 'resend'

import { passwordResetStore } from '../lib/passwordResetStore'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendResetOtp: Endpoint = {
  path: '/send-reset-otp',

  method: 'post',

  handler: async (req) => {
    try {
      const body = await req.json()

      const { email } = body

      if (!email) {
        return Response.json(
          {
            success: false,
            message: 'Email required',
          },
          { status: 400 },
        )
      }

      const users = await req.payload.find({
        collection: 'users',

        where: {
          email: {
            equals: email,
          },
        },
      })

      if (!users.docs.length) {
        return Response.json(
          {
            success: false,
            message: 'User not found',
          },
          { status: 404 },
        )
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString()

      passwordResetStore.set(email, {
        otp,
        expiresAt: Date.now() + 1000 * 60 * 5,
      })

      await resend.emails.send({
        from: 'HD Clarity Speech <hello@mail.hdclarityspeech.com>',

        to: email,

        subject: 'Password Reset Code',

        html: `
          <h1>Password Reset</h1>

          <p>Your code is:</p>

          <h2>${otp}</h2>

          <p>
            This code expires in 5 minutes.
          </p>
        `,
      })

      return Response.json({
        success: true,
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,
        },
        { status: 500 },
      )
    }
  },
}
