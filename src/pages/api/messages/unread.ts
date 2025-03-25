import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const unreadCount = await prisma.announcement.count({
        where: {
          isRead: false, // Assuming you have an `isRead` field in your `Announcement` model
        },
      });

      res.status(200).json({ unreadCount });
    } catch (error) {
      console.error("Error fetching unread announcements count:", error);
      res.status(500).json({ error: "Failed to fetch unread announcements count" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}