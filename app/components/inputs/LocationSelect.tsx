// "use client";
// import React from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import useLocation from "@/app/hooks/useLocation"; // Adjust the path as needed
// import { LocationValue } from "@/app/hooks/useLocation"; // Adjust the path as needed

// interface LocationSelectProps {
//   value?: LocationValue;
//   onChange: (value: LocationValue) => void;
// }

// const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
//   const { selectedLocation, handleChange } = useLocation(onChange, value);
//   console.log(selectedLocation);
//   console.log(selectedLocation?.value.terms[2].value);
//   console.log(selectedLocation?.value.terms[3].value);

//   return (
//     <div>
//       <GooglePlacesAutocomplete
//         apiKey={process.env.NEXT_PUBLIC_API_KEY}
//         selectProps={{
//           value: selectedLocation,
//           onChange: handleChange,
//         }}
//       />
//     </div>
//   );
// };

// export default LocationSelect;

"use client";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import useLocation from "@/app/hooks/useLocation"; // Adjust the path as needed
import { LocationValue } from "@/app/hooks/useLocation"; // Adjust the path as needed

interface LocationSelectProps {
  value?: LocationValue;
  onChange: (value: LocationValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
  const { selectedLocation, handleChange } = useLocation(onChange, value);
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  useEffect(() => {
    if (selectedLocation?.value.place_id) {
      geocodeByPlaceId(selectedLocation.value.place_id)
        .then((results) => {
          const { lat, lng } = results[0].geometry.location;
          setCoordinates({ lat: lat(), lng: lng() });
        })
        .catch((error) => console.error("Error", error));
    }
  }, [selectedLocation]);

  useEffect(() => {
    console.log(coordinates); // Log the latitude and longitude
  }, [coordinates]);

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
