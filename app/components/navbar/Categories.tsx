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
    label: "Delivery",
    icon: PiPackageBold,
    description: "have host delivery package",
  },
  {
    label: "self storage",
    icon: PiGarageBold,
    description: "storage for your stuff",
  },
  {
    label: "veichle-storage",
    icon: FaCarSide,
    description: "storage for cars",
  },
  {
    label: "airport parking",
    icon: FaPlaneDeparture,
    description: "parking for cars near airports",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
