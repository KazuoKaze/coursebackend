import type { CollectionConfig } from 'payload'

export const SupportMessages: CollectionConfig = {
  slug: 'support-messages',

  admin: {
    useAsTitle: 'id',

    defaultColumns: ['conversation', 'senderType', 'createdAt'],
  },

  access: {
    create: ({ req }) => Boolean(req.user),

    read: ({ req }) => {
      if (!req.user) return false

      // Admin sees all
      if (req.user.role === 'admin') {
        return true
      }

      return {
        user: {
          equals: req.user.id,
        },
      }
    },
  },

  fields: [
    {
      name: 'conversation',

      type: 'relationship',

      relationTo: 'support-conversations',

      required: true,
    },

    {
      name: 'user',

      type: 'relationship',

      relationTo: 'users',

      required: true,
    },

    {
      name: 'senderType',

      type: 'select',

      required: true,

      options: [
        {
          label: 'User',

          value: 'user',
        },

        {
          label: 'Admin',

          value: 'admin',
        },
      ],
    },

    {
      name: 'message',

      type: 'textarea',

      required: true,
    },
  ],

  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await req.payload.update({
          collection: 'support-conversations',

          id: typeof doc.conversation === 'object' ? doc.conversation.id : doc.conversation,

          data: {
            lastMessage: doc.message,

            lastMessageAt: new Date().toISOString(),

            unreadByAdmin: doc.senderType === 'user',

            unreadByUser: doc.senderType === 'admin',
          },
        })
      },
    ],
  },

  timestamps: true,
}
