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
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  return (
    console.log(currentUser),
    (
      <div className=" shadow w-full z-10 bg-black   ">
        <Container>
          {/* Iwant padding horizontal in div below */}
          <div className="flex justify-between  items-center h-20 ">
            <div className=" bg-transparent rounded-md hover:bg-slate-600/50 border bprder-white">
              <div
                onClick={() => router.push("/")}
                className="text-2xl text-white font-bold hidden sm:block hover:shadow cursor-pointer rounded-lg py-2"
              >
                stowbase
              </div>
            </div>

            <div className="flex-grow flex justify-center sm:mx-10">
              <Search className="md:w-96 w-full" />
            </div>

            <UserMenu currentUser={currentUser} />
          </div>
        </Container>

        <Categories />
      </div>
    )
  );
};

export default Navbar;
