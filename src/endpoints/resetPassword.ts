import type { Endpoint } from 'payload'

import { resetTokenStore } from '../lib/resetTokenStore'

export const resetPassword: Endpoint = {
  path: '/reset-password',

  method: 'post',

  handler: async (req) => {
    try {
      const body = await req.json()

      const { resetToken, newPassword } = body

      const tokenData = resetTokenStore.get(resetToken)

      if (!tokenData) {
        return Response.json(
          {
            success: false,
            message: 'Invalid token',
          },
          { status: 400 },
        )
      }

      if (Date.now() > tokenData.expiresAt) {
        resetTokenStore.delete(resetToken)

        return Response.json(
          {
            success: false,
            message: 'Token expired',
          },
          { status: 400 },
        )
      }

      const users = await req.payload.find({
        collection: 'users',

        where: {
          email: {
            equals: tokenData.email,
          },
        },
      })

      const user = users.docs[0]

      if (!user) {
        return Response.json(
          {
            success: false,
          },
          { status: 404 },
        )
      }

      await req.payload.update({
        collection: 'users',

        id: user.id,

        data: {
          password: newPassword,
        },
      })

      resetTokenStore.delete(resetToken)

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
