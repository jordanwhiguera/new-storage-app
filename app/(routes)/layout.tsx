import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import Navbar from "../components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import RentModal from "../components/modals/RentModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";

interface NewLayoutProps {
  children: React.ReactNode;
}
const NewLayout = async ({ children }: NewLayoutProps) => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <Toaster />
      <RentModal />
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={currentUser} />
      <div className="-mt-12"> {children}</div>
    </div>
  );
};

export default NewLayout;
