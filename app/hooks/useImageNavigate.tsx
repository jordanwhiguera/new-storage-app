import React from "react";

interface UseImageNavigateProps {
  totalImages: number; // The total number of images to navigate through
}

const useImageNavigate = ({ totalImages }: UseImageNavigateProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const showNextImage = React.useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  }, [totalImages]);

  const showPrevImage = React.useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  }, [totalImages]);

  return {
    currentImageIndex,
    showNextImage,
    showPrevImage,
  };
};

export default useImageNavigate;
