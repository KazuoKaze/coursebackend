import type { Endpoint } from 'payload'

export const startConversation: Endpoint = {
  path: '/start-conversation',

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

      const { subject, message } = body

      if (!message) {
        return Response.json(
          {
            success: false,

            message: 'Message required',
          },

          { status: 400 },
        )
      }

      // Create conversation
      const conversation = await req.payload.create({
        collection: 'support-conversations',

        data: {
          user: req.user.id,

          userName: req.user.name,

          userEmail: req.user.email,

          subject: subject || 'Support Chat',

          status: 'open',

          unreadByAdmin: true,

          unreadByUser: false,
        },
      })

      // Create first message
      await req.payload.create({
        collection: 'support-messages',

        data: {
          conversation: conversation.id,

          user: req.user.id,

          senderType: 'user',

          message,
        },
      })

      return Response.json({
        success: true,

        conversation,
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,

          message: 'Failed to start conversation',
        },

        { status: 500 },
      )
    }
  },
}
