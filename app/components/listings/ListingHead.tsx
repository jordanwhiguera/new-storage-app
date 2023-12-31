"use client";
import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import useImageNavigate from "@/app/hooks/useImageNavigate";

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
  const { currentImageIndex, showNextImage, showPrevImage } = useImageNavigate({
    totalImages: imageSrc.length,
  });
  // Extract the city name from the location
  const cityName = React.useMemo(() => {
    const parts = locationValue.split(",");
    // Assuming the city name is always the second element
    return parts[1]?.trim() || ""; // Use trim to remove any leading/trailing spaces
  }, [locationValue]);
  return (
    <div className="-mt-20">
      <Heading title={title} subtitle={cityName} />
      <div className=" mt-8 w-full h-[80vh] custom-image overflow-hidden rounded-md relative">
        <Image
          alt="Listing Image"
          src={imageSrc[currentImageIndex]}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
        {imageSrc.length > 1 && (
          <>
            <div
              className="absolute right-5 top-1/2 hover:opacity-80 transition cursor-pointer z-10"
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
          </>
        )}
      </div>
    </div>
  );
};

export default ListingHead;
