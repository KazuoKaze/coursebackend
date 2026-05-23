// async function getOrg() {
//     console.log(process.env.CALENDLY_TOKEN)
//   const res = await fetch('https://api.calendly.com/hridey-hdclarityspeech/me', {
//     headers: {
//       Authorization: `Bearer ${process.env.NEW_CALENDLY_TOKEN}`,
//     },
//   })

//   const data = await res.json()

//   console.log(data)
// }

// getOrg()

async function getOrg() {
  const token =
    'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzc5NTY2MTAwLCJqdGkiOiI4YjNhZTVmZi0wMGNhLTRkMTItYjdjMy0wYjEyZTY5YTc2MDYiLCJ1c2VyX3V1aWQiOiJiMzZjZDQ0NC01ZGI0LTQ5MGMtOWRiMy1kNGNhNWZlYTk3ZDUiLCJzY29wZSI6ImF2YWlsYWJpbGl0eTpyZWFkIGF2YWlsYWJpbGl0eTp3cml0ZSBldmVudF90eXBlczpyZWFkIGV2ZW50X3R5cGVzOndyaXRlIGxvY2F0aW9uczpyZWFkIHJvdXRpbmdfZm9ybXM6cmVhZCBzaGFyZXM6d3JpdGUgc2NoZWR1bGVkX2V2ZW50czpyZWFkIHNjaGVkdWxlZF9ldmVudHM6d3JpdGUgc2NoZWR1bGluZ19saW5rczp3cml0ZSBncm91cHM6cmVhZCBvcmdhbml6YXRpb25zOnJlYWQgb3JnYW5pemF0aW9uczp3cml0ZSB1c2VyczpyZWFkIGFjdGl2aXR5X2xvZzpyZWFkIGRhdGFfY29tcGxpYW5jZTp3cml0ZSBvdXRnb2luZ19jb21tdW5pY2F0aW9uczpyZWFkIHdlYmhvb2tzOnJlYWQgd2ViaG9va3M6d3JpdGUifQ.xCwntzn_SyFXot5_FiltpcjiMlPPjo-lb0LYuJwo8H5oBK47jPCoZIEVOHQ6w9w_JVkywPNM39Yk370chCKWLw'

  const res = await fetch('https://api.calendly.com/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()

  console.log(data)
}

getOrg()