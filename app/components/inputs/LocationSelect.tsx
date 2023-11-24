"use client";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import useLocation from "@/app/hooks/useLocation"; // Adjust the path as needed
import { LocationValue } from "@/app/hooks/useLocation"; // Adjust the path as needed

interface LocationSelectProps {
  value?: LocationValue;
  onChange: (value: LocationValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
  const { selectedLocation, handleChange } = useLocation(onChange, value);

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_API_KEY}
        selectProps={{
          value: selectedLocation,
          onChange: handleChange,
        }}
      />
    </div>
  );
};

export default LocationSelect;
