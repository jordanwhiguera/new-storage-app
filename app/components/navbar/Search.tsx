"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  const router = useRouter();

  return (
    <div className={`flex ${className || ""}`}>
      <input
        type="text"
        placeholder="Enter location"
        className="form-input px-4 py-2 border border-r-0 border-white w-full rounded-tl-md bg-slate-600 rounded-bl-md placeholder-slate-300 text-slate-300"
      />

      <button
        onClick={() => router.push("/search")}
        className="border border-l-0 rounded-tr-md rounded-br-md p-2 bg-white hover:shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          className="w-12 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Search;
