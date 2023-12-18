// import type { NextApiRequest, NextApiResponse } from "next";
// import Pusher from "pusher";
// import { PrismaClient } from "@prisma/client";

// // Initialize Pusher with your credentials
// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   useTLS: true,
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     // Extract message data from the request body
//     const { senderId, recipientId, content } = req.body;

//     try {
//       // Save message to MongoDB using Prisma
//       const message = await prisma.message.create({
//         data: {
//           content,
//           senderId,
//           recipientId,
//           // Add other required fields
//         },
//       });

//       // Trigger a new message event on Pusher
//       await pusher.trigger("chat-channel", "new-message", {
//         message,
//       });

//       res
//         .status(200)
//         .json({ message: "Message sent successfully", data: message });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error sending message" });
//     }
//   } else {
//     // Handle any other HTTP methods
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// Import necessary types from 'next'
