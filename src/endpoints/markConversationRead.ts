import type { Endpoint } from 'payload'

export const markConversationRead: Endpoint = {
  path: '/mark-conversation-read',

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

      const { conversationId } = body

      const conversation = await req.payload.update({
        collection: 'support-conversations',

        id: conversationId,

        data: {
          unreadByAdmin: false,

          unreadByUser: false,
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
        },

        { status: 500 },
      )
    }
  },
}
