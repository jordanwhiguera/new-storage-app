"use client";
import React from "react";

interface MenuProps {
  onClick: () => void;
  label: string;
}
const Menu: React.FC<MenuProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="w-44 flex justify-start p-2 bg-white  hover:bg-slate-300 font-bold"
    >
      {label}
    </div>
  );
};

export default Menu;
