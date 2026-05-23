async function createWebhook() {
  const token =
    'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzc5NTY2MTAwLCJqdGkiOiI4YjNhZTVmZi0wMGNhLTRkMTItYjdjMy0wYjEyZTY5YTc2MDYiLCJ1c2VyX3V1aWQiOiJiMzZjZDQ0NC01ZGI0LTQ5MGMtOWRiMy1kNGNhNWZlYTk3ZDUiLCJzY29wZSI6ImF2YWlsYWJpbGl0eTpyZWFkIGF2YWlsYWJpbGl0eTp3cml0ZSBldmVudF90eXBlczpyZWFkIGV2ZW50X3R5cGVzOndyaXRlIGxvY2F0aW9uczpyZWFkIHJvdXRpbmdfZm9ybXM6cmVhZCBzaGFyZXM6d3JpdGUgc2NoZWR1bGVkX2V2ZW50czpyZWFkIHNjaGVkdWxlZF9ldmVudHM6d3JpdGUgc2NoZWR1bGluZ19saW5rczp3cml0ZSBncm91cHM6cmVhZCBvcmdhbml6YXRpb25zOnJlYWQgb3JnYW5pemF0aW9uczp3cml0ZSB1c2VyczpyZWFkIGFjdGl2aXR5X2xvZzpyZWFkIGRhdGFfY29tcGxpYW5jZTp3cml0ZSBvdXRnb2luZ19jb21tdW5pY2F0aW9uczpyZWFkIHdlYmhvb2tzOnJlYWQgd2ViaG9va3M6d3JpdGUifQ.xCwntzn_SyFXot5_FiltpcjiMlPPjo-lb0LYuJwo8H5oBK47jPCoZIEVOHQ6w9w_JVkywPNM39Yk370chCKWLw'

  const organization = 'https://api.calendly.com/organizations/af0b11d1-2137-49b1-9332-025a5b4990da'

  const res = await fetch('https://api.calendly.com/webhook_subscriptions', {
    method: 'POST',

    headers: {
      Authorization: `Bearer ${token}`,

      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      url: 'https://YOUR_BACKEND_URL/api/calendly-webhook',

      events: ['invitee.created', 'invitee.canceled'],

      organization,

      scope: 'organization',
    }),
  })

  const data = await res.json()

  console.log(data)
}

createWebhook()
