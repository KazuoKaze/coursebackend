import type { CollectionConfig } from 'payload'

export const SessionPlans: CollectionConfig = {
  slug: 'session-plans',

  admin: {
    useAsTitle: 'title',
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'description',
      type: 'textarea',
    },

    {
      name: 'image',
      type: 'upload',

      relationTo: 'media',
    },

    {
      name: 'price',
      type: 'number',
      required: true,
    },

    {
      name: 'sessionsPerMonth',
      type: 'number',
      required: true,
    },

    {
      name: 'durationDays',
      type: 'number',

      defaultValue: 30,
    },

    {
      name: 'isPopular',
      type: 'checkbox',

      defaultValue: false,
    },

    {
      name: 'isActive',
      type: 'checkbox',

      defaultValue: true,
    },
  ],
}
