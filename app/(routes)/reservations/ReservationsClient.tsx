"use client";
import React from "react";
import toast, { Toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../../types";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import ListingCard from "../../components/listings/ListingCard";

interface BookedClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}
const ReservationsClient: React.FC<BookedClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState("");

  const onCancel = React.useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error("something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your listings" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
