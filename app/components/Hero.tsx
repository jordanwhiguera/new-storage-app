"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  search?: boolean;
  reverse?: boolean;
  blackBackground?: boolean;
  textWhite?: boolean;
  reOrder?: boolean;
  button?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  image,
  search,
  reverse,
  blackBackground,
  textWhite,
  reOrder,
  button,
}) => {
  const router = useRouter();
  return (
    <div
      className={`mx-auto xl:px-20 md:px-10 sm:px-2 px-4 ${
        blackBackground ? "bg-black" : "bg-white"
      } `}
    >
      <div
        className={`flex ${
          reverse ? "flex-col-reverse" : "flex-col"
        } lg:flex-row min-h-screen`}
      >
        {/* Conditionally render image first if reOrder is true */}
        {reOrder && image && (
          <div className="flex-1 py-10">
            <img
              src={image}
              alt="Hero Image"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <h1
            className={`text-5xl font-bold mb-6 ${
              textWhite ? "text-white" : "text-black"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-lg mb-8 ${
              textWhite ? "text-white" : "text-black"
            }`}
          >
            {subtitle}
          </p>

          {/* Button */}
          {button && (
            <Button label="Find storage" onClick={() => router.push("/")} />
          )}

          {/* ...other contents like search input, if necessary... */}

          {/* SearchButton */}
          {search && (
            <div className="flex ">
              <input
                type="text"
                placeholder="Enter location"
                className="form-input px-4 py-2 border border-r-0 border-white w-full rounded-tl-md bg-slate-600 rounded-bl-md placeholder-slate-300 text-slate-300"
              />

              <button className="border border-l-0 rounded-tr-md rounded-br-md p-2 bg-white hover:shadow">
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
          )}
        </div>

        {/* Conditionally render image second if reOrder is false or not provided */}

        {!reOrder && image && (
          <div className="flex-1 py-10">
            <img
              src={image}
              alt="Hero Image"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
