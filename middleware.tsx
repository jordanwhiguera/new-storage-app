export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/booked", "/reservations", "/properties", "/favorites"],
};
