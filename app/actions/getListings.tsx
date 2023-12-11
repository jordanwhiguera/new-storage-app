import React from "react";
import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  locationValue?: string;
  locationLat?: string;
  locationLong?: string;
  category?: string; // Add this line to include category in the interface
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, locationValue, category, locationLat, locationLong } =
      params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (locationLat && locationLong) {
      const lat = parseFloat(locationLat);
      const long = parseFloat(locationLong);

      // Create a range for latitude and longitude
      const latMin = lat - 0.15;
      const latMax = lat + 0.15;
      const longMin = long - 0.15;
      const longMax = long + 0.15;

      // Use the Prisma range filter
      query.locationLat = {
        gte: latMin,
        lte: latMax,
      };
      query.locationLong = {
        gte: longMin,
        lte: longMax,
      };
    }
    // if (locationValue) {
    //   // Assuming locationValue is the exact address stored in the listing
    //   query.locationValue = locationValue;
    // }
    if (category) {
      query.category = category;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
