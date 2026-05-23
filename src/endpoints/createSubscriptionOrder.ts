import type { Endpoint } from 'payload'

import { razorpay } from '../lib/razorpay'

export const createSubscriptionOrder: Endpoint = {
  path: '/create-subscription-order',

  method: 'post',

  handler: async (req) => {
    try {
      // Must login
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

      const { planId } = body

      if (!planId) {
        return Response.json(
          {
            success: false,

            message: 'Plan ID required',
          },

          { status: 400 },
        )
      }

      // Find plan
      const plan = await req.payload.findByID({
        collection: 'session-plans',

        id: planId,
      })

      if (!plan) {
        return Response.json(
          {
            success: false,

            message: 'Plan not found',
          },

          { status: 404 },
        )
      }

      // Check if same plan already active
      const existingSubscription = await req.payload.find({
        collection: 'user-subscriptions',

        where: {
          and: [
            {
              user: {
                equals: req.user.id,
              },
            },

            {
              plan: {
                equals: plan.id,
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

      if (existingSubscription.docs.length > 0) {
        return Response.json(
          {
            success: false,

            message: 'You already have this subscription active',
          },

          { status: 400 },
        )
      }

      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: Number(plan.price) * 100,

        currency: 'INR',

        receipt: `subscription_${Date.now()}`,
      })

      // Expire old active subscriptions
      const oldSubscriptions = await req.payload.find({
        collection: 'user-subscriptions',

        where: {
          user: {
            equals: req.user.id,
          },

          status: {
            equals: 'active',
          },
        },
      })

      for (const sub of oldSubscriptions.docs) {
        await req.payload.update({
          collection: 'user-subscriptions',

          id: sub.id,

          data: {
            status: 'expired',
          },
        })
      }

      // Create pending subscription
      const subscription = await req.payload.create({
        collection: 'user-subscriptions',

        data: {
          user: req.user.id,

          plan: plan.id,

          status: 'active',

          startDate: new Date().toISOString(),

          endDate: new Date(Date.now() + plan.durationDays * 24 * 60 * 60 * 1000).toISOString(),

          totalSessions: plan.sessionsPerMonth,

          remainingSessions: plan.sessionsPerMonth,

          paymentStatus: 'pending',

          amount: plan.price,

          razorpayOrderId: razorpayOrder.id,
        },
      })

      return Response.json({
        success: true,

        plan,

        subscription,

        razorpayOrder,
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,

          message: 'Failed to create subscription order',
        },

        { status: 500 },
      )
    }
  },
}
