"use client";
import React from "react";
import Avatar from "../Avatar";
import Menu from "./Menu";

const UserMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div onClick={toggle} className=" relative md:ml-16">
      <div className="">
        <div
          onClick={() => {}}
          className=" rounded-lg hover:shadow py-2 flex items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>

          <div className="">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="rounded-lg shadow absolute right-0 top-14 overflow-hidden">
          <div className="flex flex-col  cursor-pointer">
            <Menu onClick={() => {}} label="Log in" />
            <Menu onClick={() => {}} label="Profile" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
