"use client";

import { useState } from "react";
import MessagesPage from "../app/(dashboard)/list/messages/page";

const MessageModal = ({ currentUserId }: { currentUserId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Open Messages
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-[90%] md:w-[70%] lg:w-[50%] relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              X
            </button>

            {/* Messages Component */}
            <MessagesPage currentUserId={currentUserId} />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageModal;