import type { Endpoint } from 'payload'

import { otpStore } from '../lib/otpStore'

export const verifyOtp: Endpoint = {
  path: '/verify-otp',
  method: 'post',

  handler: async (req) => {
    try {
      const body = await req.json()

      const { email, otp } = body

      if (!email || !otp) {
        return Response.json(
          {
            success: false,
            message: 'Email and OTP required',
          },
          { status: 400 },
        )
      }

      const storedData = otpStore.get(email)

      if (!storedData) {
        return Response.json(
          {
            success: false,
            message: 'OTP not found',
          },
          { status: 400 },
        )
      }

      // Check expiry
      if (Date.now() > storedData.expiresAt) {
        otpStore.delete(email)

        return Response.json(
          {
            success: false,
            message: 'OTP expired',
          },
          { status: 400 },
        )
      }

      // Check OTP
      if (storedData.otp !== otp) {
        return Response.json(
          {
            success: false,
            message: 'Invalid OTP',
          },
          { status: 400 },
        )
      }

      // Create user
      const user = await req.payload.create({
        collection: 'users',

        data: {
          name: storedData.name,
          email,
          password: storedData.password,
          isVerified: true,
        },
      })

      // Remove OTP after success
      otpStore.delete(email)

      return Response.json({
        success: true,
        message: 'User verified successfully',
        user,
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
