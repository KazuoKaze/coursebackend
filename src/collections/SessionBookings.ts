import type { CollectionConfig } from 'payload'

export const SessionBookings: CollectionConfig = {
  slug: 'session-bookings',

  admin: {
    useAsTitle: 'inviteeEmail',
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
    },

    {
      name: 'inviteeName',
      type: 'text',
      required: true,
    },

    {
      name: 'inviteeEmail',
      type: 'email',
      required: true,
    },

    {
      name: 'eventName',
      type: 'text',
    },

    {
      name: 'startTime',
      type: 'date',
      required: false,
    },

    {
      name: 'endTime',
      type: 'date',
      required: false,
    },

    {
      name: 'meetingLink',
      type: 'text',
    },

    {
      name: 'calendlyEventId',
      type: 'text',
    },

    {
      name: 'cancelUrl',

      type: 'text',
    },

    {
      name: 'rescheduleUrl',

      type: 'text',
    },

    {
      name: 'isRescheduled',

      type: 'checkbox',

      defaultValue: false,
    },

    {
      name: 'rescheduledTo',

      type: 'text',
    },

    {
      name: 'status',

      type: 'select',

      defaultValue: 'booked',

      options: [
        {
          label: 'Booked',
          value: 'booked',
        },

        {
          label: 'Cancelled',
          value: 'cancelled',
        },

        {
          label: 'Completed',
          value: 'completed',
        },
      ],
    },

    {
      name: 'bookingDate',
      type: 'date',

      admin: {
        description: 'Date when booking was created',
      },
    },

    {
      name: 'sessionNotes',
      type: 'textarea',
    },

    {
      name: 'bookingSource',

      type: 'select',

      defaultValue: 'single',

      options: [
        {
          label: 'Single Session',
          value: 'single',
        },

        {
          label: 'Subscription',
          value: 'subscription',
        },
      ],
    },

    {
      name: 'subscription',

      type: 'relationship',

      relationTo: 'user-subscriptions',
    },

    {
      name: 'paymentStatus',
      type: 'select',

      defaultValue: 'pending',

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
