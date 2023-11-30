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
      <div className=" shadow w-full z-10 ">
        <Container>
          <div className="flex justify-between items-center">
            <div
              onClick={() => router.push("/")}
              className="text-2xl font-bold hidden sm:block hover:shadow cursor-pointer rounded-lg py-2 md:mr-16"
            >
              stowbase
            </div>
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>

        <Categories />
      </div>
    )
  );
};

export default Navbar;
