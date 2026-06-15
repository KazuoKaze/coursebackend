import type { Endpoint } from 'payload'

import crypto from 'crypto'

import { passwordResetStore } from '../lib/passwordResetStore'
import { resetTokenStore } from '../lib/resetTokenStore'

export const verifyResetOtp: Endpoint = {
  path: '/verify-reset-otp',

  method: 'post',

  handler: async (req) => {
    try {
      const body = await req.json()

      const { email, otp } = body

      const stored = passwordResetStore.get(email)

      if (!stored) {
        return Response.json(
          {
            success: false,
            message: 'OTP not found',
          },
          { status: 400 },
        )
      }

      if (Date.now() > stored.expiresAt) {
        passwordResetStore.delete(email)

        return Response.json(
          {
            success: false,
            message: 'OTP expired',
          },
          { status: 400 },
        )
      }

      if (stored.otp !== otp) {
        return Response.json(
          {
            success: false,
            message: 'Invalid OTP',
          },
          { status: 400 },
        )
      }

      const resetToken = crypto.randomUUID()

      resetTokenStore.set(resetToken, {
        email,
        expiresAt: Date.now() + 1000 * 60 * 10,
      })

      passwordResetStore.delete(email)

      return Response.json({
        success: true,

        resetToken,
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
