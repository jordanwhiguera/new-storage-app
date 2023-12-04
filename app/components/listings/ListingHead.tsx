"use client";
import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";

interface ListingHeadProps {
  title: string;
  imageSrc: string[];
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  // Assuming 'imageSrc' is now an array of image URLs
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSrc.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === 0) return imageSrc.length - 1;
      return prevIndex - 1;
    });
  };

  return (
    <div className="-mt-20">
      <Heading title={title} subtitle={locationValue} />
      <div className="w-full h-[80vh] overflow-hidden rounded-md relative">
        <Image
          alt="Listing Image"
          src={imageSrc[currentImageIndex]}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
        <div
          className="absolute right-5 top-1/2 hover:opacity-80 transition cursor-pointer"
          onClick={showNextImage}
        >
          <FaChevronCircleRight size={28} />
        </div>
        <div
          className="absolute left-5 top-1/2 hover:opacity-80 transition cursor-pointer"
          onClick={showPrevImage}
        >
          <FaChevronCircleLeft size={28} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
