import React from "react";
import Container from "../Container";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed shadow w-full z-10 bg-white">
      <div>
        <Container>
          <div className="flex justify-between items-center">
            <div>stowbase</div>
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
