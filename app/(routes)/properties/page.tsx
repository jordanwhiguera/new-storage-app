import EmptyState from "../../components/EmptyState";
import getCurrentUser from "../../actions/getCurrentUser";
import getReservations from "../../actions/getReservations";
import getListings from "../../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="You must be signed in to view this page"
      />
    );
  }
  const listings = await getListings({ userId: currentUser.id });
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties"
        subtitle="You haven't listed any properties yet"
      />
    );
  }
  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};
export default PropertiesPage;
