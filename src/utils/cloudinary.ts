// // // src/utils/cloudinary.ts
// // import { v2 as cloudinary } from 'cloudinary'

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
// //   api_key: process.env.CLOUDINARY_API_KEY!,
// //   api_secret: process.env.CLOUDINARY_API_SECRET!,
// // })

// // export const uploadToCloudinary = async (buffer: Buffer, filename: string): Promise<any> => {
// //   return new Promise((resolve, reject) => {
// //     const publicId = filename.replace(/\.[^/.]+$/, '')

// //     cloudinary.uploader
// //       .upload_stream(
// //         {
// //           folder: 'payload-media',
// //           public_id: publicId,
// //           resource_type: 'auto',
// //           overwrite: true,
// //         },
// //         (error, result) => {
// //           if (error) {
// //             reject(error)
// //           } else {
// //             resolve(result)
// //           }
// //         },
// //       )
// //       .end(buffer)
// //   })
// // }

// // export { cloudinary }




// // src/utils/cloudinary.ts
// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// })

// export const uploadToCloudinary = async (
//   buffer: Buffer, 
//   mimetype: string,
//   filename: string
// ): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     // Create unique public_id using timestamp + random string
//     const timestamp = Date.now()
//     const randomString = Math.random().toString(36).substring(2, 8)
//     const baseFilename = filename.replace(/\.[^/.]+$/, '')
//     const publicId = `${baseFilename}-${timestamp}-${randomString}`

//     cloudinary.uploader
//       .upload_stream(
//         {
//           folder: 'payload-media',
//           public_id: publicId,
//           resource_type: 'auto',
//           overwrite: false, // ← Changed to false
//         },
//         (error, result) => {
//           if (error) {
//             reject(error)
//           } else {
//             resolve(result)
//           }
//         },
//       )
//       .end(buffer)
//   })
// }

// export { cloudinary }




// src/utils/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export const uploadToCloudinary = async (
  buffer: Buffer,
  mimetype: string,
  filename: string
): Promise<any> => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const baseFilename = filename.replace(/\.[^/.]+$/, '')
  const publicId = `${baseFilename}-${timestamp}-${randomString}`

  const isVideo = mimetype.startsWith('video/')

  if (isVideo) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_chunked_stream(
          {
            folder: 'payload-media',
            public_id: publicId,
            resource_type: 'video',
            overwrite: false,
            chunk_size: 6_000_000, // 6MB chunks
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          },
        )
        .end(buffer)
    })
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'payload-media',
          public_id: publicId,
          resource_type: 'auto',
          overwrite: false,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
      .end(buffer)
  })
}

export { cloudinary }