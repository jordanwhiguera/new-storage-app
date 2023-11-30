"use client";
import React from "react";
import { IconType } from "react-icons";
interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  smallWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  smallWidth,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative 
  disabled:opacity-50
  disabled:cursor-not-allowed
  rounded-lg
  hover:opacity-80
  transition

  border-black
  text-md
  border-2

  ${outline ? "bg-white" : "bg-black"}

  ${outline ? "text-black" : "text-white"}
  ${small ? "py-1" : "py-3"}
  ${smallWidth ? "w-40" : "w-full"}


  `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
