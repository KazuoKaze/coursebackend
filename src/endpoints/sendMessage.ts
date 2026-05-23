import type { Endpoint } from 'payload'

export const sendMessage: Endpoint = {
  path: '/send-message',

  method: 'post',

  handler: async (req) => {
    try {
      if (!req.user) {
        return Response.json(
          {
            success: false,
          },

          { status: 401 },
        )
      }

      const body = await req.json()

      const { conversationId, message } = body

      if (!conversationId || !message) {
        return Response.json(
          {
            success: false,

            message: 'Missing fields',
          },

          { status: 400 },
        )
      }

      // Find conversation
      const conversation = await req.payload.findByID({
        collection: 'support-conversations',

        id: conversationId,
      })

      if (!conversation) {
        return Response.json(
          {
            success: false,

            message: 'Conversation not found',
          },

          { status: 404 },
        )
      }

      // Security check
      if (
        req.user.role !== 'admin' &&
        typeof conversation.user === 'object' &&
        conversation.user.id !== req.user.id
      ) {
        return Response.json(
          {
            success: false,
          },

          { status: 403 },
        )
      }

      // Create message
      const newMessage = await req.payload.create({
        collection: 'support-messages',

        data: {
          conversation: conversationId,

          user: typeof conversation.user === 'object' ? conversation.user.id : conversation.user,

          senderType: req.user.role === 'admin' ? 'admin' : 'user',

          message,
        },
      })

      return Response.json({
        success: true,

        message: newMessage,
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
