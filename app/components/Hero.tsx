"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Search from "./navbar/Search";

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
  padRight?: boolean;
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
  padRight,
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
        } lg:flex-row `}
      >
        {/* Conditionally render image first if reOrder is true */}
        {reOrder && image && (
          <div className="flex-1 py-10  flex items-center">
            <div className=" w-full">
              <img
                src={image}
                alt="Hero Image"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className="flex-1 py-12   flex flex-col justify-center">
          <div className={`${padRight ? "lg:pr-24" : "lg:pl-24"}`}>
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
              <Button
                smallWidth
                label="Find storage"
                onClick={() => router.push("/")}
              />
            )}

            {/* ...other contents like search input, if necessary... */}

            {/* SearchButton */}
            {search && <Search />}
          </div>
        </div>

        {/* Conditionally render image second if reOrder is false or not provided */}

        {!reOrder && image && (
          <div className="flex-1 py-10 flex items-center">
            <div className=" w-full">
              <img
                src={image}
                alt="Hero Image"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
