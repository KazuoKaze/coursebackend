import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',

  admin: {
    useAsTitle: 'razorpayOrderId',
  },

  access: {
    read: ({ req }) => {
      if (!req.user) return false

      // Admin can see everything
      if (req.user.collection === 'users') {
        return true
      }

      // Users see only their orders
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
      name: 'course',
      type: 'relationship',
      relationTo: 'course-service-page-component',
      required: true,
    },

    {
      name: 'amount',
      type: 'number',
      required: true,
    },

    {
      name: 'status',
      type: 'select',

      options: [
        {
          label: 'Pending',
          value: 'pending',
        },

        {
          label: 'Paid',
          value: 'paid',
        },

        {
          label: 'Failed',
          value: 'failed',
        },
      ],

      defaultValue: 'pending',
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
