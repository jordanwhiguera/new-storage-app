"use client";
import React from "react";

interface MenuProps {
  onClick: () => void;
  label: string;
}
const Menu: React.FC<MenuProps> = ({ onClick, label }) => {
  return (
    <div onClick={onClick} className="px-4 py-2 bg-white  hover:bg-slate-300">
      {label}
    </div>
  );
};

export default Menu;
