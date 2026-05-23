import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { sendOtp } from './endpoints/sendOtp'
import { verifyOtp } from './endpoints/verifyOtp'
import { Courses } from './collections/CourseServicePageComponent'
import { CourseChapterPageComponent } from './collections/Chapters'
import { Orders } from './collections/Orders'

import { createOrder } from './endpoints/createOrder'
import { verifyPayment } from './endpoints/verifyPayment'

import { SessionBookings } from './collections/SessionBookings'

import { createSessionOrder } from './endpoints/createSessionOrder'
import { verifySessionPayment } from './endpoints/verifySessionPayment'

import { SessionSettings } from './collections/SessionSettings'

import { calendlyWebhook } from './endpoints/calendlyWebhook'

import { SessionPlans } from './collections/SessionPlans'

import { UserSubscriptions } from './collections/UserSubscriptions'

import { createSubscriptionOrder } from './endpoints/createSubscriptionOrder'

import { verifySubscriptionPayment } from './endpoints/verifySubscriptionPayment'
import { consumeSubscriptionSession } from './endpoints/consumeSubscriptionSession'
import { checkActiveSubscription } from './endpoints/checkActiveSubscription'
import { SupportMessages } from './collections/SupportMessages'
import { SupportConversations } from './collections/SupportConversations'
import { startConversation } from './endpoints/startConversation'
import { sendMessage } from './endpoints/sendMessage'
import { getConversationMessages } from './endpoints/getConversationMessages'
import { markConversationRead } from './endpoints/markConversationRead'





const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        SupportChat: {
          Component: './components/AdminChatView',

          path: '/support-chat',
        },
      },
    },
  },
  collections: [
    Users,
    Media,
    Courses,
    CourseChapterPageComponent,
    Orders,
    SessionBookings,
    SessionSettings,
    SessionPlans,
    UserSubscriptions,

    SupportMessages,
    SupportConversations,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  cors: ['http://localhost:3000', 'http://127.0.0.1:5501', 'https://coursebackend-xi.vercel.app'],
  endpoints: [
    sendOtp,
    verifyOtp,
    createOrder,
    verifyPayment,
    createSessionOrder,
    verifySessionPayment,
    calendlyWebhook,
    createSubscriptionOrder,
    verifySubscriptionPayment,

    checkActiveSubscription,
    consumeSubscriptionSession,

    startConversation,
    sendMessage,
    getConversationMessages,
    markConversationRead,
  ],
  sharp,
  plugins: [],
})
