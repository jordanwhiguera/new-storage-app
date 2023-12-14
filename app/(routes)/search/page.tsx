import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "@/app/components/listings/ListingCard";
import { IListingsParams } from "@/app/actions/getListings";
interface HomeProps {
  searchParams: IListingsParams;
}

const HomeV = async ({ searchParams }: HomeProps) => {
  let listings: any;
  if (searchParams && searchParams.userId) {
    listings = await getListings(searchParams);
  } else {
    listings = []; // or some default value
  }

  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className=" pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};
export default HomeV;
