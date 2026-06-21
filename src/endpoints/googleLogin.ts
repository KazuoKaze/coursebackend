import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import type { Endpoint } from 'payload'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const googleLogin: Endpoint = {
  path: '/google-login',

  method: 'post',

  handler: async (req) => {
    try {
      const body = await req.json()

      const { credential } = body

      if (!credential) {
        return Response.json(
          {
            success: false,
            message: 'Credential missing',
          },
          { status: 400 },
        )
      }

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()

      if (!payload?.email) {
        return Response.json(
          {
            success: false,
            message: 'Invalid Google account',
          },
          { status: 400 },
        )
      }

      const email = payload.email
      const name = payload.name || ''
      const googleId = payload.sub

      const existingUsers = await req.payload.find({
        collection: 'users',

        where: {
          email: {
            equals: email,
          },
        },

        limit: 1,
      })

      let user = existingUsers.docs[0]

      if (!user) {
        user = await req.payload.create({
          collection: 'users',

          data: {
            name,
            email,
            googleId,

            password: crypto.randomUUID(),

            role: 'student',

            isVerified: true,
          },
        })
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.PAYLOAD_SECRET!,
        {
          expiresIn: '30d',
        },
      )

      return Response.json({
        success: true,
        token,
        user,
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,
          message: 'Google login failed',
        },
        { status: 500 },
      )
    }
  },
}
