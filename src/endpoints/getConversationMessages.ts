import type { Endpoint } from 'payload'

export const getConversationMessages: Endpoint = {
  path: '/get-conversation-messages',

  method: 'get',

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

      const url = new URL(req.url)

      const conversationId = url.searchParams.get('conversationId')

      if (!conversationId) {
        return Response.json(
          {
            success: false,
          },

          { status: 400 },
        )
      }

      const messages = await req.payload.find({
        collection: 'support-messages',

        where: {
          conversation: {
            equals: conversationId,
          },
        },

        sort: 'createdAt',

        limit: 100,
      })

      return Response.json({
        success: true,

        messages: messages.docs,
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
