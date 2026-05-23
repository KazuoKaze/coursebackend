import type { CollectionConfig } from 'payload'

export const SupportConversations: CollectionConfig = {
  slug: 'support-conversations',

  admin: {
    useAsTitle: 'subject',

    defaultColumns: ['subject', 'user', 'status', 'lastMessageAt'],
  },

  access: {
    create: ({ req }) => Boolean(req.user),

    read: ({ req }) => {
      if (!req.user) return false

      // Admin sees all
      if (req.user.role === 'admin') {
        return true
      }

      // Users only theirs
      return {
        user: {
          equals: req.user.id,
        },
      }
    },

    update: ({ req }) => Boolean(req.user),

    delete: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    {
      name: 'user',

      type: 'relationship',

      relationTo: 'users',

      required: true,
      },
    
      {
        name: 'userName',
      
        type: 'text',
      },

      {
        name: 'userEmail',
      
        type: 'email',
      },

    {
      name: 'subject',

      type: 'text',

      required: true,
    },

    {
      name: 'status',

      type: 'select',

      defaultValue: 'open',

      options: [
        {
          label: 'Open',

          value: 'open',
        },

        {
          label: 'Closed',

          value: 'closed',
        },
      ],
    },

    {
      name: 'lastMessage',

      type: 'textarea',

      admin: {
        readOnly: true,
      },
    },

    {
      name: 'lastMessageAt',

      type: 'date',

      admin: {
        readOnly: true,
      },
    },

    {
      name: 'unreadByAdmin',

      type: 'checkbox',

      defaultValue: false,
    },

    {
      name: 'unreadByUser',

      type: 'checkbox',

      defaultValue: false,
    },
  ],

  timestamps: true,
}
