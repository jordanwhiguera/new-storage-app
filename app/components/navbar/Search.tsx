"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LocationSelect from "../inputs/LocationSelect";
import { FieldValues, useForm } from "react-hook-form";
import qs from "query-string";

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      locationValue: null,
      locationLat: null,
      locationLong: null,
    },
  });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const locationValue = watch("locationValue");

  const handleLocationChange = (newValue: any) => {
    if (newValue) {
      setCustomValue("locationValue", newValue.label);
      setCustomValue("locationLat", newValue.latitude);
      setCustomValue("locationLong", newValue.longitude);
    }
  };

  const onSubmit = (data: any) => {
    // Ensure latitude and longitude are numbers
    const latitude = parseFloat(data.locationLat);
    const longitude = parseFloat(data.locationLong);

    // Only add latitude and longitude to the query if they are valid numbers
    const query = {
      ...data,
      locationLat: isNaN(latitude) ? undefined : latitude,
      locationLong: isNaN(longitude) ? undefined : longitude,
    };

    const queryString = qs.stringify(query, {
      skipNull: true,
      skipEmptyString: true,
    });
    router.push(`/search?${queryString}`);
  };
  return (
    <form
      className={`flex ${className || ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-1 z-10 border border-r-0 border-white w-full rounded-tl-md bg-slate-600 rounded-bl-md placeholder-slate-300 text-slate-300">
        <LocationSelect
          value={locationValue}
          onChange={handleLocationChange}
          style
        />
      </div>

      <button
        type="submit"
        className=" flex items-center justify-center border w-16 border-l-0 rounded-tr-md rounded-br-md p-2 bg-white "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          className="w-6 h-6 "
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default Search;
