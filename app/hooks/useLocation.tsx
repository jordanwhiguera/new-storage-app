//NOT USED need to make a hook for this
import React, { useState, useEffect } from "react";
import { ActionMeta, SingleValue } from "react-select";
import { geocodeByPlaceId } from "react-google-places-autocomplete";

export interface LocationValue {
  label: string;
  value: any; // Adjust based on actual data structure
}

const useLocation = (
  onChange: (value: LocationValue) => void,
  initialValue?: LocationValue
) => {
  const [selectedLocation, setSelectedLocation] = useState<
    LocationValue | undefined
  >(initialValue);
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  useEffect(() => {
    setSelectedLocation(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (selectedLocation?.value.place_id) {
      geocodeByPlaceId(selectedLocation.value.place_id)
        .then((results) => {
          const { lat, lng } = results[0].geometry.location;
          setCoordinates({ lat: lat(), lng: lng() });
        })
        .catch((error) => console.error("Error fetching coordinates:", error));
    }
  }, [selectedLocation]); // Removed coordinates from dependency array

  const handleChange = (
    newValue: SingleValue<LocationValue>,
    actionMeta: ActionMeta<LocationValue>
  ) => {
    if (actionMeta.action === "select-option" && newValue) {
      setSelectedLocation(newValue);
      onChange(newValue);
    }
  };

  return { selectedLocation, handleChange, coordinates };
};
export default useLocation;
