"use client";
import Container from "../Container";
import React from "react";
import { PiGarageBold } from "react-icons/pi";
import { FaCarSide } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa6";
import { PiPackageBold } from "react-icons/pi";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Self storage",
    icon: PiGarageBold,
    description: "Storage for your stuff",
  },
  {
    label: "Vehicle storage",
    icon: FaCarSide,
    description: "Storage for Vehicles",
  },
  {
    label: "Airport parking",
    icon: FaPlaneDeparture,
    description: "Parking for cars near airports",
  },
];

const Categories = () => {
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
          {categories.map((item) => (
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

export default Categories;
