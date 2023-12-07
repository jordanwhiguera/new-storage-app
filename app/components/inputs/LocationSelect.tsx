"use client";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import useLocation from "@/app/hooks/useLocation";
import { LocationValue } from "@/app/hooks/useLocation";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { useState, useEffect } from "react";
import { components as reactSelectComponents } from "react-select";

// Adjust the path as needed
interface LocationSelectProps {
  value?: any; // Replace 'any' with a more specific type as needed
  onChange: (newValue: any) => void; // Replace 'any' with the correct type
  onLatitudeChange?: (lat: number | null) => void;
  onLongitudeChange?: (lng: number | null) => void;
  style?: boolean;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  value,
  onChange,
  onLatitudeChange,
  onLongitudeChange,
  style,
}) => {
  const [selectedLocation, setSelectedLocation] = useState(value);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    if (selectedLocation?.value?.place_id) {
      geocodeByPlaceId(selectedLocation.value.place_id)
        .then((results) => {
          const { lat, lng } = results[0].geometry.location;
          const newLat = lat();
          const newLng = lng();
          if (newLat !== latitude || newLng !== longitude) {
            setLatitude(newLat);
            setLongitude(newLng);
            onLatitudeChange?.(newLat);
            onLongitudeChange?.(newLng);
          }
        })
        .catch((error) => console.error("Error fetching coordinates:", error));
    }
  }, [
    selectedLocation,
    onLatitudeChange,
    onLongitudeChange,
    latitude,
    longitude,
  ]);

  const handleChange = (newValue: any) => {
    setSelectedLocation(newValue);
    onChange(newValue);
  };

  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_API_KEY}
      selectProps={{
        value: selectedLocation,
        onChange: handleChange,
        isClearable: true,
        placeholder: "Search location",

        components: {
          DropdownIndicator: null, // This removes the dropdown indicator
          ClearIndicator: (props) => (
            <reactSelectComponents.ClearIndicator {...props}>
              <span
                style={{
                  color: style ? "#cbd5e1" : "black", // Slate 300 when 'style' is true, otherwise black
                  fontSize: "larger", // Makes the "X" bigger
                  cursor: "pointer", // Changes the cursor to a pointer on hover
                }}
              >
                ×
              </span>
            </reactSelectComponents.ClearIndicator>
          ),
        },
        styles: style
          ? {
              control: (base) => ({
                ...base,
                border: "none", // This removes the border
                boxShadow: "none", // This removes the border shadow
                backgroundColor: "transparent", // This removes the grey background
              }),
              input: (base) => ({
                ...base,
                color: "white", // Set the input text color to white
              }),
              placeholder: (defaultStyles) => ({
                ...defaultStyles,
                color: "#cbd5e1", // Slate 300 color for the placeholder
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "white", // Set the selected text color to white
              }),
              option: (styles, { isFocused }) => ({
                ...styles,
                backgroundColor: isFocused ? "#cbd5e1" : styles.backgroundColor,
                color: "black", // Set the dropdown item text color to black
                cursor: "pointer",
              }),
            }
          : {},
      }}
    />
  );
};

export default LocationSelect;
