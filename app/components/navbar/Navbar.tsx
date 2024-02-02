"use client";
import React from "react";
import Container from "../Container";
import Search from "./Search";
import UserMenu from "./UserMenu";
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
          <div className="flex justify-between  items-center h-20 ">
            <div
              onClick={() => router.push("/")}
              // Stowbase is only shown on larger screens
              className={`text-2xl text-white font-bold 
                            hover:text-slate-300 cursor-pointer  py-2 
                            
                            ${showName ? "" : "hidden sm:block"}`}
            >
              stowbase
            </div>
            {/* Search Bar is hidden from navbar in landing page */}
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
