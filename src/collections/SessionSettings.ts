import type { CollectionConfig } from 'payload'

export const SessionSettings: CollectionConfig = {
  slug: 'session-settings',

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

      defaultValue: 'Live Session Settings',
    },

    {
      name: 'sessionPrice',
      type: 'number',

      required: true,

      defaultValue: 4999,
    },

    {
      name: 'currency',
      type: 'text',

      defaultValue: 'INR',
    },

    {
      name: 'sessionDuration',
      type: 'number',

      defaultValue: 60,
    },
  ],
}
