"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Keyboard, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  gallery: string[];
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ gallery }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);


  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="relative w-full rounded-[16px] overflow-visible py-8">
      <Swiper
        modules={[Keyboard, Autoplay]}
        keyboard={{ enabled: true, onlyInViewport: false }}
        loop={true}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          
        }}
        onRealIndexChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          
        }}
        slidesPerView={1.5}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 40,
          },
        }}
        className="w-full h-[400px] sm:h-[450px] lg:h-[500px]"
      >
        {gallery.map((img, index) => (
          <SwiperSlide key={index} className="!transition-all !duration-500">
            {({ isActive }) => (
              <div 
                className={`relative w-full h-[400px] sm:h-[450px] lg:h-[500px] transition-all duration-500 ${
                  isActive ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-60'
                }`}
                style={{
                  transform: isActive ? 'scale(1)' : 'scale(0.9)',
                }}
              >
                <Image
                  src={img}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-cover rounded-[16px]"
                  priority={index === 0}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {gallery.map((_, index) => (
          <span
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 transform ${
              index === activeIndex
                ? "bg-primary scale-110"
                : "border border-header-stroke bg-2nd-bg"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`absolute top-1/2 left-0 z-50 -translate-y-1/2 p-3 rounded-full border border-header-stroke text-white transition hover:bg-black/50`}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={`absolute top-1/2 right-0 z-50 -translate-y-1/2 p-3 rounded-full border border-header-stroke text-white transition hover:bg-black/50`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default PropertyGallery;
