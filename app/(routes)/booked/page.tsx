import EmptyState from "../../components/EmptyState";
import getCurrentUser from "../../actions/getCurrentUser";
import getReservations from "../../actions/getReservations";
import BookedClient from "./BookedClient";

const BookedPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="You must be signed in to view this page"
      />
    );
  }
  const reservations = await getReservations({ userId: currentUser.id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No bookings"
        subtitle="You haven't booked anything yet"
      />
    );
  }
  return <BookedClient reservations={reservations} currentUser={currentUser} />;
};
export default BookedPage;
