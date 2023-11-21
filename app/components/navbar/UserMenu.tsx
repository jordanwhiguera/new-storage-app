"use client";
import React from "react";
import Avatar from "../Avatar";
import Menu from "./Menu";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const onRent = React.useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
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
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="rounded-lg shadow absolute right-0 top-14 overflow-hidden">
          <div className="flex flex-col  cursor-pointer">
            {currentUser ? (
              <div>
                <Menu onClick={() => {}} label="my trips" />
                <Menu onClick={() => {}} label="my favorites" />
                <Menu onClick={() => {}} label="my reservations" />
                <Menu onClick={() => {}} label="my properties" />
                <Menu onClick={rentModal.onOpen} label="beccome a host" />
                <hr />
                <Menu onClick={() => signOut()} label="logout" />
              </div>
            ) : (
              <div>
                <Menu onClick={loginModal.onOpen} label="Log in" />
                <Menu onClick={registerModal.onOpen} label="Sign Up" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
