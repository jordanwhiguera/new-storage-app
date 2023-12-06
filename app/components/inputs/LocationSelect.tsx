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

// "use client";
// import React, { useEffect, useState } from "react";
// import GooglePlacesAutocomplete, {
//   geocodeByPlaceId,
// } from "react-google-places-autocomplete";
// import useLocation from "@/app/hooks/useLocation"; // Adjust the path as needed
// import { LocationValue } from "@/app/hooks/useLocation"; // Adjust the path as needed

// interface LocationSelectProps {
//   value?: LocationValue;
//   onChange: (value: LocationValue) => void;
// }

// const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
//   const { selectedLocation, handleChange } = useLocation(onChange, value);
//   const [coordinates, setCoordinates] = useState<{
//     lat: number | null;
//     lng: number | null;
//   }>({ lat: null, lng: null });

//   useEffect(() => {
//     if (selectedLocation?.value.place_id) {
//       geocodeByPlaceId(selectedLocation.value.place_id)
//         .then((results) => {
//           const { lat, lng } = results[0].geometry.location;
//           setCoordinates({ lat: lat(), lng: lng() });
//         })
//         .catch((error) => console.error("Error", error));
//     }
//   }, [selectedLocation]);

//   useEffect(() => {
//     console.log(coordinates); // Log the latitude and longitude
//   }, [coordinates]);

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

// "use client";
// import React from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import useLocation from "@/app/hooks/useLocation";
// import { LocationValue } from "@/app/hooks/useLocation";
// import { geocodeByPlaceId } from "react-google-places-autocomplete";
// import { useState, useEffect } from "react";

// // Adjust the path as needed
// interface LocationSelectProps {
//   value?: any; // Replace 'any' with a more specific type as needed
//   onChange: (newValue: any) => void; // Replace 'any' with the correct type
//   onLatitudeChange?: (lat: number | null) => void;
//   onLongitudeChange?: (lng: number | null) => void;
// }
// const LocationSelect: React.FC<LocationSelectProps> = ({
//   value,
//   onChange,
//   onLatitudeChange,
//   onLongitudeChange,
// }) => {
//   const [selectedLocation, setSelectedLocation] = useState(value);

//   useEffect(() => {
//     if (selectedLocation?.value?.place_id) {
//       geocodeByPlaceId(selectedLocation.value.place_id)
//         .then((results) => {
//           const { lat, lng } = results[0].geometry.location;
//           onLatitudeChange?.(lat());
//           onLongitudeChange?.(lng());
//         })
//         .catch((error) => console.error("Error fetching coordinates:", error));
//     }
//   }, [selectedLocation, onLatitudeChange, onLongitudeChange]);

//   const handleChange = (newValue: any) => {
//     setSelectedLocation(newValue);
//     onChange(newValue);
//   };

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
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import useLocation from "@/app/hooks/useLocation";
import { LocationValue } from "@/app/hooks/useLocation";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { useState, useEffect } from "react";

// Adjust the path as needed
interface LocationSelectProps {
  value?: any; // Replace 'any' with a more specific type as needed
  onChange: (newValue: any) => void; // Replace 'any' with the correct type
  onLatitudeChange?: (lat: number | null) => void;
  onLongitudeChange?: (lng: number | null) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  value,
  onChange,
  onLatitudeChange,
  onLongitudeChange,
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
