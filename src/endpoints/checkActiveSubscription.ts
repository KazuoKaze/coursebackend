import type { Endpoint } from 'payload'

export const checkActiveSubscription: Endpoint = {
  path: '/check-active-subscription',

  method: 'get',

  handler: async (req) => {
    try {
      if (!req.user) {
        return Response.json(
          {
            success: false,

            hasSubscription: false,
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

        depth: 1,
      })

      const subscription = subscriptions.docs[0]

      if (!subscription) {
        return Response.json({
          success: true,

          hasSubscription: false,
        })
      }

      // Expired?
      const expired = new Date(subscription.endDate) < new Date()

      if (expired) {
        await req.payload.update({
          collection: 'user-subscriptions',

          id: subscription.id,

          data: {
            status: 'expired',
          },
        })

        return Response.json({
          success: true,

          hasSubscription: false,
        })
      }

      // No sessions left
      if (subscription.remainingSessions <= 0) {
        return Response.json({
          success: true,

          hasSubscription: false,
        })
      }

      return Response.json({
        success: true,

        hasSubscription: true,

        subscription,
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
