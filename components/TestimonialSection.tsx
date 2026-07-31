"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { TestimonialData } from "@/data/TestimonialData";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const navBtn =
  "min-w-11 min-h-11 inline-flex items-center justify-center rounded-control border border-header-stroke text-body transition-colors hover:border-primary/40 hover:bg-2nd-bg";

const TestimonialSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="relative page-px section-y border-b border-header-stroke overflow-x-clip">
      <div className="flex flex-col gap-8 lg:gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <p className="type-label text-primary mb-2">Testimonials</p>
            <h2 className="type-section text-body">
              Trusted by families across Patna
            </h2>
            <p className="text-secondary-text type-body mt-2">
              Real stories from buyers, sellers, and investors who worked with
              2% Company.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => swiperRef.current?.slidePrev()}
              className={navBtn}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => swiperRef.current?.slideNext()}
              className={navBtn}
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        </div>

        <div className="w-full min-w-0 overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={16}
            loop
            watchOverflow
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            autoplay={
              reduceMotion
                ? false
                : {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                  }
            }
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full"
          >
            {TestimonialData.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!h-auto">
                <article className="h-full min-h-[280px] flex flex-col gap-5 rounded-card border border-header-stroke bg-2nd-bg p-6 lg:p-7 transition-colors duration-300 hover:border-primary/40">
                  <div className="flex items-start justify-between gap-3">
                    <Quote
                      className="size-8 text-primary/50 shrink-0"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    <div
                      className="flex gap-0.5"
                      aria-label={`${testimonial.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          aria-hidden
                          className={
                            i < testimonial.rating
                              ? "text-star fill-star"
                              : "text-header-stroke"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <h3 className="type-card-title text-body">
                      {testimonial.title}
                    </h3>
                    <p className="type-body text-secondary-text leading-relaxed">
                      {testimonial.feedback}
                    </p>
                  </div>

                  <footer className="flex items-center gap-3 pt-4 border-t border-header-stroke mt-auto">
                    <Image
                      src={testimonial.image}
                      alt=""
                      width={44}
                      height={44}
                      sizes="44px"
                      className="rounded-full object-cover size-11 shrink-0 border border-header-stroke"
                    />
                    <div className="min-w-0">
                      <p className="type-body font-semibold text-body truncate">
                        {testimonial.name}
                      </p>
                      <p className="type-caption text-secondary-text truncate">
                        {testimonial.location}
                      </p>
                    </div>
                  </footer>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className="flex justify-center gap-1"
          role="tablist"
          aria-label="Testimonials"
        >
          {TestimonialData.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={index === activeIndex}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              className="min-w-11 min-h-11 flex items-center justify-center"
            >
              <span
                className={cx(
                  "block rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "size-2.5 bg-primary"
                    : "size-2 border border-header-stroke bg-transparent"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
