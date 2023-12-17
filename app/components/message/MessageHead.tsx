import React from "react";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";

interface MessageHeadProps {
  //   user: SafeUser;
}
const MessageHead: React.FC<MessageHeadProps> = ({}) => {
  return (
    <div className="flex items-center bg-black text-white p-8 rounded-lg">
      {/* Back Arrow and User Info */}
      <div className="flex items-center flex-grow">
        <button className="text-white mr-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {/* <Avatar src={user?.image} /> */}
        <div>
          <div className="ml-2 font-semibold">Molly</div>
        </div>
      </div>
    </div>
  );
};

export default MessageHead;
