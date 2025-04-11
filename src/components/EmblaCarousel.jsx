"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import emblaImages from "../../public/images/index";
import Image from "next/image";

export const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const images = Object.values(emblaImages);

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex">
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full shrink-0 grow-0 basis-full relative h-64 sm:h-72 md:h-80 lg:h-96 mx-auto"
          >
            <Image
              src={img}
              alt={`Slide ${index}`}
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
