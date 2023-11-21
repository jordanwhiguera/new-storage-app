"use client";
import React from "react";
import Container from "../Container";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    console.log(currentUser),
    (
      <div className="fixed shadow w-full z-10 bg-white">
        <div>
          <Container>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold hidden sm:block hover:shadow cursor-pointer rounded-lg py-2 md:mr-16">
                stowbase
              </div>
              <Search />
              <UserMenu currentUser={currentUser} />
            </div>
          </Container>
        </div>
      </div>
    )
  );
};

export default Navbar;
