"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface PropertyGalleryProps {
  gallery: string[];
}

const FALLBACK_IMAGE = "/images/plot2.webp";

function GallerySlideImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 68vw, 42vw"
      className="object-cover rounded-media"
      priority={priority}
      onError={() => {
        if (current !== FALLBACK_IMAGE) setCurrent(FALLBACK_IMAGE);
      }}
    />
  );
}

/**
 * Swiper's native `loop` clones DOM nodes — Next/Image slides become blank.
 * Triple the slides in React and silently recenter onto the middle copy instead.
 */
function triple(images: string[]): string[] {
  return [...images, ...images, ...images];
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ gallery }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperReady, setSwiperReady] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const images = (gallery ?? []).filter(Boolean);
  const canSlide = images.length > 1;
  const n = images.length;
  const slides = canSlide ? triple(images) : images;
  const middleStart = n; // first slide of the middle copy

  const normalizeIndex = (index: number) => {
    if (n <= 1) return 0;
    return ((index % n) + n) % n;
  };

  const recenterIfNeeded = (swiper: SwiperType) => {
    if (!canSlide) return;
    const i = swiper.activeIndex;
    if (i < n) {
      swiper.slideTo(i + n, 0, false);
    } else if (i >= n * 2) {
      swiper.slideTo(i - n, 0, false);
    }
  };

  useEffect(() => {
    if (reducedMotion || !canSlide || !swiperReady) return;
    const root = rootRef.current;
    const swiper = swiperRef.current;
    if (!root || !swiper?.autoplay) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          swiper.update();
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(root);
    return () => io.disconnect();
  }, [reducedMotion, canSlide, swiperReady]);

  if (images.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className="relative w-full rounded-media overflow-hidden md:overflow-visible py-2 md:py-4"
    >
      <Swiper
        modules={[Keyboard, Autoplay]}
        keyboard={{ enabled: true, onlyInViewport: true }}
        slidesPerView="auto"
        spaceBetween={12}
        breakpoints={{
          640: { spaceBetween: 20 },
          1024: { spaceBetween: 28 },
        }}
        centeredSlides
        initialSlide={canSlide ? middleStart : 0}
        loop={false}
        observer
        observeParents
        watchSlidesProgress
        autoplay={
          reducedMotion || !canSlide
            ? false
            : {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }
        }
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setSwiperReady((v) => v + 1);
          requestAnimationFrame(() => {
            swiper.update();
            if (canSlide) swiper.slideTo(middleStart, 0, false);
            if (!reducedMotion && canSlide) swiper.autoplay?.start();
          });
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(normalizeIndex(swiper.activeIndex));
        }}
        onSlideChangeTransitionEnd={recenterIfNeeded}
        className="w-full"
      >
        {slides.map((img, index) => (
          <SwiperSlide
            key={`${img}-${index}`}
            className="!w-[88%] sm:!w-[68%] lg:!w-[42%]"
          >
            {({ isActive }) => (
              <div
                className={`relative w-full aspect-[4/3] md:aspect-[16/10] transition-all duration-500 motion-reduce:transition-none ${
                  isActive
                    ? "scale-100 opacity-100 z-10"
                    : "scale-95 opacity-70 motion-reduce:scale-100"
                }`}
              >
                <GallerySlideImage
                  src={img}
                  alt={`Property image ${normalizeIndex(index) + 1}`}
                  priority={index >= middleStart && index < middleStart + 2}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center gap-1 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to gallery image ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() =>
              swiperRef.current?.slideTo(middleStart + index, undefined)
            }
            className="min-w-11 min-h-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg rounded-full"
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

      {canSlide && (
        <>
          <button
            type="button"
            aria-label="Previous gallery image"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute top-1/2 left-1 sm:left-2 z-50 -translate-y-1/2 min-w-11 min-h-11 flex items-center justify-center rounded-full border border-header-stroke text-body bg-2nd-bg/80 transition hover:bg-main-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
          >
            <ChevronLeft size={24} aria-hidden />
          </button>

          <button
            type="button"
            aria-label="Next gallery image"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute top-1/2 right-1 sm:right-2 z-50 -translate-y-1/2 min-w-11 min-h-11 flex items-center justify-center rounded-full border border-header-stroke text-body bg-2nd-bg/80 transition hover:bg-main-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
          >
            <ChevronRight size={24} aria-hidden />
          </button>
        </>
      )}
    </div>
  );
};

export default PropertyGallery;
