"use client";
import React from "react";
import Avatar from "../Avatar";
import Menu from "./Menu";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { IoMdMenu } from "react-icons/io";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
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
    <div onClick={toggle} className=" relative">
      <div
        onClick={() => {}}
        className=" rounded-lg py-2  flex items-center cursor-pointer "
      >
        <IoMdMenu className="text-white w-8 h-8 ml-2  hover:text-slate-300" />
        <div className="pl-2">
          <Avatar src={currentUser?.image} />
        </div>
      </div>

      {isOpen && (
        <div className="rounded-lg shadow absolute right-0 top-14 overflow-hidden">
          <div className="flex flex-col  cursor-pointer">
            {currentUser ? (
              //Need z to display over listing card
              <div className="z-20">
                <Menu
                  onClick={() => router.push("/booked")}
                  label="my bookings"
                />
                <Menu
                  onClick={() => router.push("/favorites")}
                  label="my favorites"
                />
                <Menu
                  onClick={() => router.push("/reservations")}
                  label="my reservations"
                />
                <Menu
                  onClick={() => router.push("/properties")}
                  label="my properties"
                />
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
