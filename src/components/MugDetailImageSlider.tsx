"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronIcon, VideoIcon } from "./Icons";


const isVideo = (url: string) => {
  const videoExtensions = [".mp4", ".avi", ".mov", ".wmv", ".webm"];
  return videoExtensions.some(ext => url.endsWith(ext));
};

export const MugDetailImageSlider = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const mainSliderRef = useRef<Slider>(null);

  const mainSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const reorderedImages = [
    ...images.filter(isVideo),  // Primeiro os vídeos
    ...images.filter(image => !isVideo(image)),  // Depois as imagens
  ];

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main slider */}
      <div className="overflow-hidden">
        <Slider ref={mainSliderRef} {...mainSliderSettings}>
          {reorderedImages.slice(0, 4).map((image, index) =>
            isVideo(image) ? (
              <div key={image} className="w-full h-[350px] lg:h-[500px]">
                <video
                  key={image}
                  src={`${image}`}
                  controls={false}
                  className="object-cover w-full h-full"
                  muted
                  autoPlay
                  loop={true}
                />
              </div>
            ) : (
              <div key={image} className="w-full h-[350px] lg:h-[500px]">
                <Image
                  key={image}
                  src={`${image}`}
                  alt={`Imagem Caneca ${index}`}
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full"
                />
              </div>
            ),
          )}
        </Slider>
      </div>

      <p className="absolute w-full text-center text-gray-500 text-sm pt-0 sm:pt-4 top-0">Imagens Ilustrativas</p>
      {/* Thumbnails */}
      <div className="flex justify-center mt-4 gap-2 overflow-x-auto p-2">
        {reorderedImages.slice(0, 4).map((image, index) => (
          <div
            key={image}
            onClick={() => handleThumbnailClick(index)}
            className={`w-[60px] h-[60px] cursor-pointer p-1 border-2 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-110 
              ${index === currentImage ? "border-blue-500" : "border-gray-300"}`
            }
          >
            {isVideo(image) ? (
              <div className="relative w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <VideoIcon w="20" h="20" />
              </div>
            ) : (
              <Image
                src={`${image}`}
                alt={`Imagem Caneca ${index}`}
                width={1000}
                height={800}
                className="object-cover w-full h-full rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom arrow components for slider navigation
const CustomNextArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 z-10"
    >
      <div className="rotate-90">
        <ChevronIcon w="20" h="20" />
      </div>
    </button>
  );
};

const CustomPrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 z-10"
    >
      <div className="-rotate-90">
        <ChevronIcon w="20" h="20" />
      </div>
    </button>
  );
};