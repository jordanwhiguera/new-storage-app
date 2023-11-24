"use client";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import { ActionMeta, SingleValue } from "react-select";

// Assuming OptionType is the type of the option provided by GooglePlacesAutocomplete
// You may need to adjust this based on the actual types exported by the library
interface OptionType {
  label: string;
  value: any; // Adjust this type based on the actual data structure
}

// Define the structure of the location value
interface LocationValue {
  label: string;
  value: any;
}

// Define the interface for component props
interface LocationSelectProps {
  value?: LocationValue;
  onChange: (value: LocationValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
  const [selectedLocation, setSelectedLocation] = useState<
    LocationValue | undefined
  >(value);

  // Effect to update state when value prop changes
  useEffect(() => {
    setSelectedLocation(value);
  }, [value]);

  // Updated handleChange with types
  const handleChange = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (actionMeta.action === "select-option" && newValue) {
      const locationValue: LocationValue = {
        label: newValue.label,
        value: newValue.value,
      };
      setSelectedLocation(locationValue);
      onChange(locationValue);
    }
  };

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
