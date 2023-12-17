"use client";
import React from "react";
import { IoIosSend } from "react-icons/io";

const MessageInput: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-white rounded-md p-2 shadow-md border-2  border-black">
      <input
        type="text"
        placeholder="Type Your Message"
        className="flex-1 border-none focus:ring-0 outline-none placeholder-gray-400 ml-2 mr-2"
      />
      <button
        type="submit"
        className="rounded-full p-2 bg-black text-white mr-2"
      >
        <IoIosSend />
      </button>
    </div>
  );
};

export default MessageInput;
