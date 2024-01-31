"use client";
import { SafeUser } from "@/app/types";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Map from "../Map";
import Button from "../Button";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
  locationValue,
}) => {
  // Extract the first name from the user's name
  const firstName = React.useMemo(() => {
    if (user && user.name) {
      return user.name.split(" ")[0];
    }
    return ""; // Return an empty string if user or user.name is null
  }, [user]);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2 mb-2">
          <div>Hosted by {firstName}</div>
          <Avatar src={user?.image} />
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neautral-500">{description}</div>
      <hr />
      <Map />
    </div>
  );
};

export default ListingInfo;
