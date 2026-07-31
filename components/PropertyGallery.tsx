"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  gallery: string[];
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ gallery }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="relative w-full rounded-media overflow-hidden md:overflow-visible py-4 md:py-8">
      <Swiper
        modules={[Keyboard, Autoplay]}
        keyboard={{ enabled: true, onlyInViewport: true }}
        loop={gallery.length > 1}
        centeredSlides
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onRealIndexChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        slidesPerView={1}
        spaceBetween={12}
        breakpoints={{
          640: {
            slidesPerView: 1.4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2.2,
            spaceBetween: 28,
          },
        }}
        className="w-full"
      >
        {gallery.map((img, index) => (
          <SwiperSlide key={`${img}-${index}`}>
            {({ isActive }) => (
              <div
                className={`relative w-full aspect-[4/3] md:aspect-[16/10] transition-all duration-500 ${
                  isActive ? "scale-100 opacity-100 z-10" : "scale-95 opacity-70"
                }`}
              >
                <Image
                  src={img}
                  alt={`Property image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 45vw"
                  className="object-cover rounded-media"
                  priority={index === 0}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center gap-1 mt-4">
        {gallery.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to gallery image ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className="min-w-11 min-h-11 flex items-center justify-center"
          >
            <span
              className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-primary scale-110"
                  : "border border-header-stroke bg-2nd-bg"
              }`}
            />
          </button>
        ))}
      </div>

      {gallery.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous gallery image"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute top-1/2 left-2 z-50 -translate-y-1/2 min-w-11 min-h-11 flex items-center justify-center rounded-full border border-header-stroke text-body bg-2nd-bg/80 transition hover:bg-main-bg"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            aria-label="Next gallery image"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute top-1/2 right-2 z-50 -translate-y-1/2 min-w-11 min-h-11 flex items-center justify-center rounded-full border border-header-stroke text-body bg-2nd-bg/80 transition hover:bg-main-bg"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default PropertyGallery;
