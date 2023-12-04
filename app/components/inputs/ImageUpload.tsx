"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[]) => void; // Updated to accept an array of strings
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  // Specify the type of the state as string[]
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);

  const handleUpload = React.useCallback(
    (result: any) => {
      const newImageURL = result.info.secure_url;
      const updatedImages = [...uploadedImages, newImageURL];
      setUploadedImages(updatedImages);
      onChange(updatedImages); // Pass the array of images back to the parent
    },
    [uploadedImages, onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="iv4ggsvt"
      options={{
        maxFiles: 2,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neautral-300 flex flex-col justify-center items-center gap-4 text-neautral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semi-bold text-lg">Upload a photo</div>

            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
