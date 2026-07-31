"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TestimonialData } from "@/data/TestimonialData";
import SectionHeader from "@/components/ui/SectionHeader";

const arrowBtn =
  "min-w-11 min-h-11 flex items-center justify-center rounded-full border-2 border-header-stroke text-body bg-2nd-bg/80 transition disabled:opacity-40 disabled:pointer-events-none hover:bg-main-bg";

const TestimonialSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative page-px section-y-sm space-y-6 rounded-media border-b-2 border-header-stroke mb-6">
      <SectionHeader
        title="What Our Clients Say"
        description="Hear from our happy clients who found their dream homes and investments with 2% Company."
      />

      <div className="relative px-0 sm:px-2">
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {TestimonialData.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="h-auto">
              <div className="card flex flex-col justify-between gap-4 lg:gap-8 rounded-card border-2 border-header-stroke p-6 lg:p-8 h-full min-h-[280px] lg:min-h-[320px]">
                <div className="flex gap-2 lg:gap-3 flex-wrap">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <div
                      key={i}
                      className="p-2 border-2 border-header-stroke rounded-full"
                    >
                      <Star className="text-star fill-star" size={16} />
                    </div>
                  ))}
                </div>

                <div className="space-y-4 flex-1">
                  <h4 className="type-card-title text-primary">{testimonial.title}</h4>
                  <p className="text-secondary-text type-body leading-relaxed">
                    {testimonial.feedback}
                  </p>
                </div>

                <div className="flex items-center gap-4 py-2">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    sizes="56px"
                    className="rounded-full object-cover size-12 lg:size-14"
                  />
                  <div>
                    <h3 className="font-semibold type-card-title text-primary">
                      {testimonial.name}
                    </h3>
                    <p className="type-caption text-secondary-text">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          className={`absolute top-1/2 left-2 z-50 -translate-y-1/2 lg:hidden ${arrowBtn}`}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          className={`absolute top-1/2 right-2 z-50 -translate-y-1/2 lg:hidden ${arrowBtn}`}
        >
          <ChevronRight size={20} />
        </button>

        <div className="flex justify-center gap-1 mt-4 lg:hidden">
          {TestimonialData.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => swiperRef.current?.slideTo(index)}
              className="min-w-11 min-h-11 flex items-center justify-center"
            >
              <span
                className={`block w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-primary scale-110"
                    : "border border-header-stroke bg-2nd-bg"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          className={arrowBtn}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          className={arrowBtn}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSection;
