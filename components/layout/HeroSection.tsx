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
    <section className="relative w-full -mt-16 lg:-mt-[4.5rem] border-b border-header-stroke">
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
                pauseOnMouseEnter: false,
              }
        }
        className="w-full overflow-hidden"
      >
        {HeroSectionSlides.map((slide, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <div className="relative h-[100svh] max-h-[820px] min-h-[560px] w-full">
              {/* Hero image — full height, right side, bleeds under transparent nav */}
              <div className="absolute inset-x-0 top-0 h-[42%] sm:h-[46%] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[56%]">
                <Image
                  src={slide.imageOverlay}
                  fill
                  alt=""
                  aria-hidden
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover opacity-40"
                />
                <Image
                  src={slide.imageMain}
                  fill
                  alt={slide.heading}
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  priority={index === 0}
                  className="object-cover object-center z-[1]"
                />
                <div
                  className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-main-bg to-transparent z-[2] hidden lg:block"
                  aria-hidden
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-main-bg to-transparent z-[2] lg:hidden"
                  aria-hidden
                />
              </div>

              {/* Dense copy column */}
              <div className="relative z-10 flex h-full flex-col justify-end lg:justify-center page-px pb-16 pt-[46%] sm:pt-[50%] lg:pt-28 lg:pb-12 lg:w-[48%]">
                <p className="type-label text-primary tracking-wide">
                  2% Company
                </p>
                <h1 className="type-display text-body leading-[1.15] mt-1.5 max-w-lg">
                  {slide.heading}
                </h1>
                <p className="text-secondary-text type-body mt-2 max-w-md">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
                  {slide.buttons.map((btn) => (
                    <Link
                      key={btn.id}
                      href={btn.link}
                      className={`inline-flex justify-center items-center rounded-control text-center type-body font-semibold min-h-11 px-5 py-2.5 ${
                        btn.type === "primary"
                          ? "bg-primary text-on-primary hover:brightness-110"
                          : "border border-header-stroke text-body hover:border-primary/40 hover:bg-2nd-bg"
                      }`}
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>

                {slide.cards.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-header-stroke flex flex-wrap gap-x-6 gap-y-3">
                    {slide.cards.map((card) => (
                      <div key={card.id} className="min-w-[5.5rem]">
                        <p className="type-card-title text-body leading-none">
                          {card.value}
                        </p>
                        <p className="type-caption text-secondary-text mt-1">
                          {card.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1"
        role="tablist"
        aria-label="Hero slides"
      >
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
              className={`block w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "bg-primary scale-125"
                  : "bg-2nd-bg/80 border border-header-stroke"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
