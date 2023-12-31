"use client";
import { Listing, Reservation } from "@prisma/client";
import React from "react";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { act } from "react-dom/test-utils";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();
  const handleCancel = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );
  const price = React.useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = React.useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);
  // Extract the city name from the location
  const cityName = React.useMemo(() => {
    const parts = data.locationValue.split(",");
    // Assuming the city name is always the second element
    return parts[1]?.trim() || ""; // Use trim to remove any leading/trailing spaces
  }, [data.locationValue]);
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group "
    >
      <div className="flex flex-col gap-2 w-full bg-slate-300 rounded-md ">
        <div className="aspect-square w-full relative overflow-hidden rounded-t-md  ">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc[0]} // Access the first image URL from the array
            className="object-cover h-full w-full group-hover:scale-105 transition"
          />
          {/* Need z lower than user menu to display properly */}
          <div className="absolute top-3 right-3 z-10">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg truncate">{cityName}</div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">day</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
