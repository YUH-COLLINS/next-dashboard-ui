"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";

let socket: any;

type Message = {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
};

const MessagesPage = ({ currentUserId }: { currentUserId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    // Connect to the WebSocket server
    socket = io();

    // Listen for incoming messages
    socket.on("receiveMessage", (message: Message) => {
      if (message.receiverId === currentUserId || message.senderId === currentUserId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserId]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?userId=${currentUserId}`);
      const data: Message[] = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = () => {
    if (!receiverId) {
      toast.error("Please enter a receiver ID.");
      return;
    }

    const message: Message = {
      id: Date.now(),
      senderId: currentUserId,
      receiverId,
      content,
      createdAt: new Date().toISOString(),
    };

    // Emit the message to the WebSocket server
    socket.emit("sendMessage", message);

    // Update the local state
    setMessages((prevMessages) => [...prevMessages, message]);
    setContent("");
    toast("Message sent!");
  };

  useEffect(() => {
    fetchMessages(); // Fetch past messages when the component mounts
  }, [currentUserId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Messages</h1>
      <div className="mb-4">
        {/* Input for Receiver ID */}
        <input
          type="text"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="border p-2 rounded-md w-full mb-2"
        />

        {/* Textarea for the message content */}
        <textarea
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
        >
          Send
        </button>
      </div>

      {/* Conversation Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Conversation</h2>
        <div className="border p-4 rounded-md">
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              <strong>
                {message.senderId === currentUserId ? "You" : `From: ${message.senderId}`}
              </strong>
              : {message.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;