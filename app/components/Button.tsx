"use client";
import React from "react";
interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
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
  w-full

  ${outline ? "bg-white" : "bg-gray-700"}
  ${outline ? "border-black" : "border-red-500"}
  ${outline ? "text-black" : "text-white"}
  ${small ? "py-1" : "py-3"}
  ${small ? "text-sm" : "text-md"}
  ${small ? "font-light" : "text-md"}
  ${small ? "border-[1px]" : "border-2"}
  `}
    >
      {label}
    </button>
  );
};

export default Button;
