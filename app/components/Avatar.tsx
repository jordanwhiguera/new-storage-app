"use client";

import Image from "next/image";

import { BsFillPersonFill } from "react-icons/bs";
interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        className="rounded-md"
        height="30"
        width="30"
        alt="Avatar"
        src={src}
      />
    );
  } else {
    return (
      <div className="bg-white rounded-md w-8 h-8 hover:bg-slate-300 ">
        <BsFillPersonFill className="text-4xl pr-1 " />
      </div>
    );
  }
};

export default Avatar;
