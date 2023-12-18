import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";
import { PrismaClient } from "@prisma/client";

if (
  !process.env.PUSHER_APP_ID ||
  !process.env.NEXT_PUBLIC_PUSHER_APP_KEY ||
  !process.env.PUSHER_SECRET ||
  !process.env.PUSHER_CLUSTER
) {
  throw new Error("Missing Pusher environment variables");
}

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { senderId, recipientId, content } = req.body;

    try {
      // Find or create a chat session
      let chatSession = await prisma.chatSession.findFirst({
        where: {
          members: {
            hasEvery: [senderId, recipientId],
          },
        },
      });

      if (!chatSession) {
        chatSession = await prisma.chatSession.create({
          data: {
            members: [senderId, recipientId],
          },
        });
      }

      // Save the message with the chatSessionId
      const message = await prisma.message.create({
        data: {
          content,
          senderId,
          chatSessionId: chatSession.id,
        },
      });

      // Trigger a new message event on Pusher
      await pusher.trigger("chat-channel", "new-message", {
        message,
      });

      res
        .status(200)
        .json({ message: "Message sent successfully", data: message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending message" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
