import type { CollectionConfig } from 'payload'

export const UserSubscriptions: CollectionConfig = {
  slug: 'user-subscriptions',

  admin: {
    useAsTitle: 'id',
  },

  access: {
    read: ({ req }) => {
      if (!req.user) return false

      // Admin sees all
      if (req.user.role === 'admin') {
        return true
      }

      // Users see only theirs
      return {
        user: {
          equals: req.user.id,
        },
      }
    },
  },

  fields: [
    {
      name: 'user',
      type: 'relationship',

      relationTo: 'users',

      required: true,
    },

    {
      name: 'plan',
      type: 'relationship',

      relationTo: 'session-plans',

      required: true,
    },

    {
      name: 'status',
      type: 'select',

      defaultValue: 'active',

      options: [
        {
          label: 'Active',
          value: 'active',
        },

        {
          label: 'Expired',
          value: 'expired',
        },

        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
    },

    {
      name: 'startDate',
      type: 'date',

      required: true,
    },

    {
      name: 'endDate',
      type: 'date',

      required: true,
    },

    {
      name: 'totalSessions',
      type: 'number',

      required: true,
    },

    {
      name: 'remainingSessions',
      type: 'number',

      required: true,
    },

    {
      name: 'paymentStatus',
      type: 'select',

      defaultValue: 'paid',

      options: [
        {
          label: 'Paid',
          value: 'paid',
        },

        {
          label: 'Pending',
          value: 'pending',
        },

        {
          label: 'Failed',
          value: 'failed',
        },
      ],
    },

    {
      name: 'amount',
      type: 'number',
    },

    {
      name: 'razorpayOrderId',
      type: 'text',
    },

    {
      name: 'razorpayPaymentId',
      type: 'text',
    },

    {
      name: 'razorpaySignature',
      type: 'text',
    },
  ],
}
