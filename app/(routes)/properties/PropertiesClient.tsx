"use client";
import React from "react";
import { SafeListing, SafeReservation, SafeUser } from "../../types";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import ListingCard from "../../components/listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState("");
  const onCancel = React.useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("listing delted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      {/* this div seperates navbar from listings */}
      <div className="mt-16"></div>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            currentUser={currentUser}
            actionLabel="delete property listing"
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
