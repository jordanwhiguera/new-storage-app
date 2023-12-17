"use client";
import React from "react";

interface MessageBubbleProps {
  gray?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ gray }) => {
  if (gray) {
    return (
      <div className="flex  space-x-2 my-2">
        <div className="max-w-xs lg:max-w-md bg-slate-600 text-white rounded-lg rounded-bl-none px-4 py-2">
          <p>Yeah sure I'll be there this weekend with my brother</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end space-x-2 my-2">
        <div className="max-w-xs lg:max-w-md bg-blue-500 text-white rounded-lg rounded-br-none px-4 py-2">
          <p>Yeah sure I'll be there this weekend with my brother</p>
        </div>
      </div>
    );
  }
};

export default MessageBubble;
