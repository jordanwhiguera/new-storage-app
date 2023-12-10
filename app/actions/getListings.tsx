import React from "react";
import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  locationValue?: string;
  locationLat?: number;
  locationLong?: number;
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
    if (locationValue) {
      // Assuming locationValue is the exact address stored in the listing
      query.locationValue = locationValue;
    }
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
