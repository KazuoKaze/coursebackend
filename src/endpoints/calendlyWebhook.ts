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
      // if (eventType === 'invitee.created') {
      //   const payload = body.payload

      //   const invitee = payload

      //   const event = payload.scheduled_event

      //   const inviteeEmail = invitee.email

      //   const bookings = await req.payload.find({
      //     collection: 'session-bookings',

      //     where: {
      //       inviteeEmail: {
      //         equals: inviteeEmail,
      //       },

      //       calendlyEventId: {
      //         equals: event.uri,
      //       },
      //     },
      //   })

      //   const booking = bookings.docs[0]

      //   if (!booking) {
      //     console.log('Booking not found')

      //     return Response.json({
      //       success: true,
      //     })
      //   }

      //   await req.payload.update({
      //     collection: 'session-bookings',

      //     id: booking.id,

      //     data: {
      //       eventName: event.name,

      //       startTime: event.start_time,

      //       endTime: event.end_time,

      //       meetingLink: event.location?.join_url || '',
      //     },
      //   })
      // }

      // BOOK CREATED
      if (eventType === 'invitee.created') {
        const payload = body.payload

        const inviteeEmail = payload.email

        // Find latest booking for this user
        const bookings = await req.payload.find({
          collection: 'session-bookings',

          where: {
            inviteeEmail: {
              equals: inviteeEmail,
            },
          },

          sort: '-createdAt',

          limit: 1,
        })

        const booking = bookings.docs[0]

        if (!booking) {
          console.log('Booking not found')

          return Response.json({
            success: true,
          })
        }

        console.log('BOOKING FOUND:', booking.id)

        // Update booking with REAL Calendly data
        await req.payload.update({
          collection: 'session-bookings',

          id: booking.id,

          data: {
            eventName: payload.event_type?.name || '',

            startTime: payload.scheduled_event?.start_time || null,

            endTime: payload.scheduled_event?.end_time || null,

            meetingLink: payload.scheduled_event?.location?.join_url || '',

            calendlyEventId: payload.scheduled_event?.uri || '',
          },
        })

        console.log('BOOKING UPDATED')
      }

      // BOOK CANCELLED
      // if (eventType === 'invitee.canceled') {
      //   const payload = body.payload

      //   const event = payload.scheduled_event

      //   const bookings = await req.payload.find({
      //     collection: 'session-bookings',

      //     where: {
      //       calendlyEventId: {
      //         equals: event.uri,
      //       },
      //     },
      //   })

      //   const booking = bookings.docs[0]

      //   if (!booking) {
      //     return Response.json({
      //       success: true,
      //     })
      //   }

      //   // MARK CANCELLED
      //   await req.payload.update({
      //     collection: 'session-bookings',

      //     id: booking.id,

      //     data: {
      //       status: 'cancelled',
      //     },
      //   })

      //   console.log('BOOKING CANCELLED')

      //   // LATER:
      //   // restore subscription session
      //   // send emails
      // }

      // BOOK CANCELLED
      if (eventType === 'invitee.canceled') {
        const payload = body.payload

        const event = payload.scheduled_event

        const bookings = await req.payload.find({
          collection: 'session-bookings',

          where: {
            calendlyEventId: {
              equals: event.uri,
            },
          },

          limit: 1,
        })

        const booking = bookings.docs[0]

        if (!booking) {
          return Response.json({
            success: true,
          })
        }

        // Detect reschedule
        const isRescheduled = payload.rescheduled === true || !!payload.new_invitee

        // UPDATE BOOKING
        await req.payload.update({
          collection: 'session-bookings',

          id: booking.id,

          data: {
            status: 'cancelled',

            isRescheduled,

            rescheduledTo: payload.new_invitee?.uri || '',
          },
        })

        console.log(isRescheduled ? 'BOOKING RESCHEDULED' : 'BOOKING CANCELLED')

        // ONLY restore session if REAL cancellation
        if (
          !isRescheduled &&
          booking.bookingSource === 'subscription' &&
          booking.subscription &&
          booking.status !== 'cancelled'
        )
          const subscription = await req.payload.findByID({
            collection: 'user-subscriptions',

            id:
              typeof booking.subscription === 'object'
                ? booking.subscription.id
                : booking.subscription,
          })

          await req.payload.update({
            collection: 'user-subscriptions',

            id: subscription.id,

            data: {
              remainingSessions: subscription.remainingSessions + 1,
            },
          })

          console.log('SESSION RESTORED')
        }
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