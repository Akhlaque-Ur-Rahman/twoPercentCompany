"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { HeroSectionSlides } from "@/data/HeroSectionData";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HeroSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (reduceMotion) swiper.autoplay.stop();
    else swiper.autoplay.start();
  }, [reduceMotion]);

  return (
    <div className="relative bg-main-bg w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        slidesPerView={1}
        loop
        autoplay={
          reduceMotion
            ? false
            : {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        className="w-full"
      >
        {HeroSectionSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 lg:pl-10 lg:pr-0 lg:pt-0 lg:pb-0 relative gap-8 lg:gap-4 flex flex-col lg:flex-row w-full">
              <div className="hero-right-box relative w-full lg:w-1/2 order-1 lg:order-2 aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
                <Image
                  src={slide.imageOverlay}
                  fill
                  alt=""
                  aria-hidden
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="absolute top-0 left-0 h-full w-full object-cover"
                />
                <Image
                  src={slide.imageMain}
                  fill
                  alt={slide.heading}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  className="h-full w-full object-cover relative z-10"
                />
                <div className="absolute bottom-0 left-0 lg:top-[20%] lg:left-0 lg:-translate-x-1/2 w-[72px] h-[72px] lg:w-[88px] lg:h-[88px]">
                  <Image
                    src="/images/Sub.png"
                    alt=""
                    aria-hidden
                    fill
                    sizes="72px, (min-width: 1024px) 88px"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="hero-left-box xl:pt-20 xl:pb-40 flex flex-col justify-center items-start w-full lg:w-1/2 order-2 lg:order-1">
                <div>
                  <h2 className="text-primary type-display leading-tight">
                    {slide.heading}
                  </h2>
                  <p className="text-secondary-text type-body mt-2">
                    {slide.description}
                  </p>
                </div>

                <div className="w-full xl:py-10 gap-4 flex flex-col lg:flex-row mt-6">
                  {slide.buttons.map((btn) => (
                    <Link
                      key={btn.id}
                      href={btn.link}
                      className={`block rounded-control text-center ${
                        btn.type === "primary"
                          ? "bg-primary text-on-primary font-semibold hover:brightness-110 lg:px-6 lg:py-5 py-4 px-0"
                          : "border border-header-stroke text-primary hover:bg-main-bg lg:px-12 lg:py-5 py-4 px-0"
                      }`}
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                  {slide.cards.map((card, idx) => (
                    <div
                      key={card.id}
                      className={`lg:p-4 py-6 space-y-2 rounded-control bg-2nd-bg text-center lg:text-left ${
                        idx === slide.cards.length - 1 &&
                        slide.cards.length % 2 !== 0
                          ? "col-span-2 sm:col-span-1"
                          : ""
                      }`}
                    >
                      <h2 className="type-subhead text-primary">{card.value}</h2>
                      <p className="type-body text-secondary-text">{card.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center gap-1 my-6" role="tablist" aria-label="Hero slides">
        {HeroSectionSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === activeIndex}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className="min-w-11 min-h-11 flex items-center justify-center"
          >
            <span
              className={`block w-3 h-3 rounded-full transform transition-all duration-500 ${
                index === activeIndex
                  ? "bg-primary scale-125"
                  : "bg-2nd-bg border border-header-stroke scale-100"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
