import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";

import { Toaster } from "react-hot-toast";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import Hero from "./components/Hero";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "storage",
  description: "affordable storage for everyone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Hero
          title="Make storing your stuff easy"
          subtitle="  Request a pickup, and have your things stored for you."
          image="/images/lady-phone.jpg
         "
          blackBackground
          textWhite
          search
        />
        <Hero
          title="Have people in your community move your stuff"
          subtitle="  Request a pickup, and have your things stored for you. When you need
          them back, request to have some or all of your items back."
          image="/images/man-truck.jpeg"
          reverse
          reOrder
          button
        />
        <Hero
          title="Flexible storage solutions"
          subtitle=" Store your stuff in other people's garages and basements at an
          affordable and transparent price. You can rent a space for as little
          as a day or as long as you need."
          image="/images/man-garage.jpeg"
          button
        />
        <Hero
          title=" Find affordable airport parking near you"
          subtitle="   Parking at the airport can be expensive. Instead, park your car at a
          local's house for a fraction of the price.
        "
          image="/images/car-airport.jpeg"
          reverse
          reOrder
          button
        />
        <Hero
          title="Storage for cars, boats, and RV's"
          subtitle="    Store your vehicle in someone's driveway or backyard for as long or
          as little as you need."
          image="/images/rv.jpeg"
          button
        />

        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
