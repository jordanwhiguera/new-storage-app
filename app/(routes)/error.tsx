"use client";
import React from "react";
import react from "react";
import EmptyState from "../components/EmptyState";

interface NewErrorStateProps {
  error: Error;
}

const NewErrorState: React.FC<NewErrorStateProps> = ({ error }) => {
  React.useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <EmptyState
      title="Oops, something went wrong."
      subtitle="Please try again later."
    />
  );
};
export default NewErrorState;
