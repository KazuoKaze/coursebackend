// import type { Endpoint } from 'payload'

// export const calendlyWebhook: Endpoint = {
//   path: '/calendly-webhook',

//   method: 'post',

//   handler: async (req) => {
//     try {
//       const body = await req.json()

//       console.log('Calendly Webhook:', JSON.stringify(body, null, 2))

//       // Event type
//       const eventType = body.event

//       // Only handle booking creation
//       if (eventType !== 'invitee.created') {
//         return Response.json({
//           success: true,
//         })
//       }

//       const payload = body.payload

//       // Extract data
//       const invitee = payload

//       const event = payload.scheduled_event

//       const inviteeEmail = invitee.email

//       // Find booking
//       const bookings = await req.payload.find({
//         collection: 'session-bookings',

//         where: {
//           inviteeEmail: {
//             equals: inviteeEmail,
//           },

//           calendlyEventId: {
//             equals: event.uri,
//           },
//         },
//       })

//       const booking = bookings.docs[0]

//       if (!booking) {
//         console.log('Booking not found')

//         return Response.json({
//           success: true,
//         })
//       }

//       // Update booking with REAL data
//       await req.payload.update({
//         collection: 'session-bookings',

//         id: booking.id,

//         data: {
//           eventName: event.name,

//           startTime: event.start_time,

//           endTime: event.end_time,

//           meetingLink: event.location?.join_url || '',
//         },
//       })

//       return Response.json({
//         success: true,
//       })
//     } catch (error) {
//       console.error(error)

//       return Response.json(
//         {
//           success: false,
//         },
//         { status: 500 },
//       )
//     }
//   },
// }

import type { Endpoint } from 'payload'

export const calendlyWebhook: Endpoint = {
  path: '/calendly-webhook',

  method: 'post',

  handler: async (req) => {
    try {
      const body = await req.json().catch(() => null)

      if (!body) {
        return Response.json({
          success: true,
        })
      }

      console.log('Calendly Webhook:', JSON.stringify(body, null, 2))

      const eventType = body.event

      // BOOK CREATED
      if (eventType === 'invitee.created') {
        const payload = body.payload

        const invitee = payload

        const event = payload.scheduled_event

        const inviteeEmail = invitee.email

        const bookings = await req.payload.find({
          collection: 'session-bookings',

          where: {
            inviteeEmail: {
              equals: inviteeEmail,
            },

            calendlyEventId: {
              equals: event.uri,
            },
          },
        })

        const booking = bookings.docs[0]

        if (!booking) {
          console.log('Booking not found')

          return Response.json({
            success: true,
          })
        }

        await req.payload.update({
          collection: 'session-bookings',

          id: booking.id,

          data: {
            eventName: event.name,

            startTime: event.start_time,

            endTime: event.end_time,

            meetingLink: event.location?.join_url || '',
          },
        })
      }

      // BOOK CANCELLED
      if (eventType === 'invitee.canceled') {
        console.log('BOOKING CANCELLED')

        // later:
        // restore subscription
        // mark cancelled
        // email admin/user
      }

      return Response.json({
        success: true,
      })
    } catch (error) {
      console.error(error)

      return Response.json(
        {
          success: false,
        },
        { status: 500 },
      )
    }
  },
}