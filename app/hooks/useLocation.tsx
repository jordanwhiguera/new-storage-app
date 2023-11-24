// useLocation.tsx
import React, { useState, useEffect } from "react";
import { ActionMeta, SingleValue } from "react-select";

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

  useEffect(() => {
    setSelectedLocation(initialValue);
  }, [initialValue]);

  const handleChange = (
    newValue: SingleValue<LocationValue>,
    actionMeta: ActionMeta<LocationValue>
  ) => {
    if (actionMeta.action === "select-option" && newValue) {
      setSelectedLocation(newValue);
      onChange(newValue);
    }
  };

  return { selectedLocation, handleChange };
};

export default useLocation;
