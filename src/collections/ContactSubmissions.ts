import { CollectionConfig } from 'payload/types'

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'studyType', 'createdAt'],
    description: 'Contact form submissions from the website.',
    group: 'Forms',
  },
  access: {
    // Only authenticated admins can read/update/delete
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    // Allow public (unauthenticated) POST so the frontend form can submit
    create: () => true,
  },
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'studyType',
      label: 'How They Want to Study',
      type: 'select',
      options: [
        { label: '1:1 Coaching', value: 'First' },
        { label: 'Video Courses', value: 'Second' },
        { label: 'Live Workshops', value: 'Third' },
        { label: 'General Inquiry', value: 'Fourth' },
      ],
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
    },
    {
      name: 'agreedToUpdates',
      label: 'Agreed to Receive Updates',
      type: 'checkbox',
      defaultValue: false,
    },
    // Read-only metadata
    {
      name: 'submittedAt',
      label: 'Submitted At',
      type: 'date',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'ipAddress',
      label: 'IP Address',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Captured server-side from the request headers.',
      },
    },
  ],
  // Automatically stamp submittedAt and capture IP before every create
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create') {
          // Timestamp
          data.submittedAt = new Date().toISOString()

          // IP — works behind common proxies / Vercel / Render
          const forwarded = req.headers['x-forwarded-for']
          data.ipAddress = Array.isArray(forwarded)
            ? forwarded[0]
            : typeof forwarded === 'string'
              ? forwarded.split(',')[0].trim()
              : (req.socket?.remoteAddress ?? 'unknown')
        }
        return data
      },
    ],
  },
  timestamps: true, // adds createdAt / updatedAt automatically
}

export default ContactSubmissions
