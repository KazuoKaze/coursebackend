import type { Endpoint } from 'payload'

export const consumeSubscriptionSession: Endpoint = {
  path: '/consume-subscription-session',

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

      const subscriptions = await req.payload.find({
        collection: 'user-subscriptions',

        where: {
          and: [
            {
              user: {
                equals: req.user.id,
              },
            },

            {
              status: {
                equals: 'active',
              },
            },

            {
              paymentStatus: {
                equals: 'paid',
              },
            },
          ],
        },
      })

      const subscription = subscriptions.docs[0]

      if (!subscription) {
        return Response.json(
          {
            success: false,

            message: 'No active subscription',
          },

          { status: 404 },
        )
      }

      if (subscription.remainingSessions <= 0) {
        return Response.json(
          {
            success: false,

            message: 'No sessions remaining',
          },

          { status: 400 },
        )
      }

      await req.payload.update({
        collection: 'user-subscriptions',

        id: subscription.id,

        data: {
          remainingSessions: subscription.remainingSessions - 1,
        },
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
