"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

const Navbar = () => {
  const { user } = useUser(); // Use Clerk's useUser hook for Client Components
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadAnnouncements, setUnreadAnnouncements] = useState(0);

  useEffect(() => {
    // Fetch initial counts for unread messages and announcements
    const fetchCounts = async () => {
      try {
        const [messagesRes, announcementsRes] = await Promise.all([
          fetch(`/api/messages/unread?userId=${user?.id}`),
          fetch(`/api/announcements/unread`),
        ]);

        const messagesData = await messagesRes.json();
        const announcementsData = await announcementsRes.json();

        setUnreadMessages(messagesData.unreadCount || 0);
        setUnreadAnnouncements(announcementsData.unreadCount || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    if (user?.id) {
      fetchCounts();

      // Connect to WebSocket server
      socket = io();

      // Listen for new messages
      socket.on("newMessage", (message: { receiverId: string }) => {
        if (message.receiverId === user.id) {
          setUnreadMessages((prev) => prev + 1);
        }
      });

      // Listen for new announcements
      socket.on("newAnnouncement", () => {
        setUnreadAnnouncements((prev) => prev + 1);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user?.id]);

  const handleMessagesClick = () => {
    setUnreadMessages(0); // Clear the unread messages count when the user views messages
  };

  const handleAnnouncementsClick = () => {
    setUnreadAnnouncements(0); // Clear the unread announcements count when the user views announcements
  };

  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* Message Icon with Notification */}
        <div
          className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative"
          onClick={handleMessagesClick}
        >
          <Image src="/message.png" alt="" width={20} height={20} />
          {unreadMessages > 0 && (
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
              {unreadMessages}
            </div>
          )}
        </div>

        {/* Announcement Icon with Notification */}
        <div
          className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative"
          onClick={handleAnnouncementsClick}
        >
          <Image src="/announcement.png" alt="" width={20} height={20} />
          {unreadAnnouncements > 0 && (
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
              {unreadAnnouncements}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="text-[10px] text-gray-500 text-right">
            {user?.publicMetadata?.role as string}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
