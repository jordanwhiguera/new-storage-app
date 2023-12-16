"use client";
import Container from "./Container";
import React from "react";
import { CgClose } from "react-icons/cg";
import { FaCarSide } from "react-icons/fa";
import { PiCarProfileFill } from "react-icons/pi";
import { FaTruck } from "react-icons/fa";
import { FaTruckPickup } from "react-icons/fa6";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const cars = [
  {
    label: "No delivery / pickup",
    icon: CgClose,
  },
  {
    label: "Courier",
    icon: FaCarSide,
  },
  {
    label: "Courier+",
    icon: PiCarProfileFill,
  },
  {
    label: "Pickup truck",
    icon: FaTruckPickup,
  },

  {
    label: "Box truck",
    icon: FaTruck,
  },
];

const Car = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/search";
  if (!isMainPage) {
    return null;
  }
  return (
    <div className="bg-black">
      <Container>
        <div className="py-2 flex flex-row items-center flex-nowrap overflow-x-auto">
          {cars.map((item) => (
            <div key={item.label} className="flex-shrink-0 mr-2">
              <CategoryBox
                label={item.label}
                selected={category === item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Car;
