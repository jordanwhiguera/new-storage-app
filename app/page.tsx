import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { IListingsParams } from "./actions/getListings";
import Hero from "./components/Hero";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import { Toaster } from "react-hot-toast";
interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <div>
      <Toaster />
      <Navbar showName currentUser={currentUser} searchHidden />
      <RentModal />
      <LoginModal />
      <RegisterModal />
      <Hero
        title="Make storing your stuff easy"
        subtitle="  Request a pickup, and have your things stored for you."
        image="/images/lady-phone.jpg
   "
        blackBackground
        textWhite
        search
        padRight
      />
      <Hero
        title="Have people in your community move your stuff"
        subtitle="  Request a pickup, and have your things stored for you. When you need
    them back, request to have some or all of your items back."
        image="/images/man-truck.jpeg"
        reverse
        reOrder
        button
      />
      <Hero
        title="Flexible storage solutions"
        subtitle=" Store your stuff in other people's garages and basements at an
    affordable and transparent price. You can rent a space for as little
    as a day or as long as you need."
        image="/images/man-garage.jpeg"
        button
        padRight
      />
      <Hero
        title=" Find affordable airport parking near you"
        subtitle="   Parking at the airport can be expensive. Instead, park your car at a
    local's house for a fraction of the price.
  "
        image="/images/car-airport.jpeg"
        reverse
        reOrder
        button
      />
      <Hero
        title="Storage for cars, boats, and RV's"
        subtitle="    Store your vehicle in someone's driveway or backyard for as long or
    as little as you need."
        image="/images/rv.jpeg"
        button
        padRight
      />
    </div>
  );
};
export default Home;
