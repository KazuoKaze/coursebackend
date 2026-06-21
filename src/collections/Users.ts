// import type { CollectionConfig } from 'payload'

// export const Users: CollectionConfig = {
//   slug: 'users',
//   admin: {
//     useAsTitle: 'email',
//   },
//   auth: true,
//   fields: [
//     // Email added by default
//     // Add more fields as needed
//   ],
// }

import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',

  admin: {
    useAsTitle: 'email',
  },

  auth: true,

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'role',
      type: 'select',
      defaultValue: 'student',
      options: [
        {
          label: 'Student',
          value: 'student',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },

    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'googleId',
      type: 'text',
    },

    {
      name: 'purchasedCourses',
      type: 'relationship',

      relationTo: 'course-service-page-component',

      hasMany: true,

      admin: {
        description: 'Courses purchased by the user',
      },
    },

    {
      name: 'firstSessionDiscountUsed',

      type: 'checkbox',

      defaultValue: false,
    },
    
  ],
}