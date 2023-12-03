"use client";
import React from "react";
import Container from "../Container";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import Categories from "./Categories";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
  searchHidden?: boolean;
  showName?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  searchHidden,
  showName,
}) => {
  const router = useRouter();
  return (
    console.log(currentUser),
    (
      <div className=" bg-black   ">
        <Container>
          {/* Iwant padding horizontal in div below */}
          <div className="flex justify-between  items-center h-20 ">
            <div
              onClick={() => router.push("/")}
              className={`text-2xl text-white font-bold 
                            hover:text-slate-300 cursor-pointer  py-2 
                            ${showName ? "" : "hidden sm:block"}`}
            >
              stowbase
            </div>

            {searchHidden ? null : (
              <div className="flex-grow flex justify-center sm:ml-10 sm:mr-8">
                <Search className="md:w-96 w-full" />
              </div>
            )}
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>

        <Categories />
      </div>
    )
  );
};

export default Navbar;
