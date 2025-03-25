import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { messageId } = req.body;

    if (!messageId) {
      return res.status(400).json({ error: "Message ID is required" });
    }

    try {
      await prisma.message.delete({
        where: { id: messageId },
      });

      res.status(200).json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Failed to delete message" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}