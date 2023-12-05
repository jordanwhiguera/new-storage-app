"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import useImageNavigate from "@/app/hooks/useImageNavigate";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[]) => void; // Accept an array of strings
  value: string[]; // Updated to be an array
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [uploadedImages, setUploadedImages] = React.useState<string[]>(
    value || []
  );

  const { currentImageIndex, showNextImage, showPrevImage } = useImageNavigate({
    totalImages: uploadedImages.length,
  });

  const handleUpload = React.useCallback(
    (result: any) => {
      const newImageURL = result.info.secure_url;
      const updatedImages = [...uploadedImages, newImageURL];
      setUploadedImages(updatedImages);
      onChange(updatedImages);
    },
    [uploadedImages, onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="iv4ggsvt"
      options={{ maxFiles: 2 }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neautral-300 flex flex-col justify-center items-center gap-4 text-neautral-600"
        >
          <TbPhotoPlus size={50} />
          <div className="font-semi-bold text-lg">Upload a photo</div>

          {uploadedImages.length > 0 && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                alt={`Uploaded image ${currentImageIndex}`}
                fill
                style={{ objectFit: "cover" }}
                src={uploadedImages[currentImageIndex]}
              />
            </div>
          )}

          {uploadedImages.length > 1 && (
            <>
              <div
                className="absolute right-5 top-1/2 hover:opacity-80 transition cursor-pointer z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
              >
                <FaChevronCircleRight size={28} />
              </div>
              <div
                className="absolute left-5 top-1/2 hover:opacity-80 transition cursor-pointer z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevImage();
                }}
              >
                <FaChevronCircleLeft size={28} />
              </div>
            </>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
