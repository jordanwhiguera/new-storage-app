import React from "react";
import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, locationValue, startDate, endDate, category } = params;
    let query: any = {};

    if (userId) {
      query.userId = userId;
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
