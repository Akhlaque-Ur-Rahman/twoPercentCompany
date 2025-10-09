"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TestimonialData } from "@/data/TestimonialData";

const TestimonialSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative px-6 sm:px-6 lg:px-[40px] py-6 lg:py-[16px] space-y-[24px] rounded-[16px] border-b-2 border-header-stroke mb-6">
      {/* Top Icon */}
      <div>
        <Image
          src="/svg/Stars.svg"
          height={0}
          width={0}
          alt="Stars"
          className="size-[40px] sm:size-[48px] lg:size-[56px]"
        />
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-[20px] sm:text-[22px] lg:text-[40px] font-semibold text-primary">
          What Our Clients Say
        </h2>
        <p className="text-secondary-text text-[14px] sm:text-[15px] lg:text-[16px] mt-2">
          Hear from our happy clients who found their dream homes and
          investments with Estatein.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        <Swiper
        
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 1.2 },
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
          <SwiperSlide key={testimonial.id}>
            <div className="card  flex flex-col justify-between gap-4 lg:gap-[32px] rounded-[24px] border-2 border-header-stroke p-6 lg:p-[32px]  h-full lg:h-[366px] ">
              {/* Stars */}
              <div className="flex gap-2 lg:gap-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <div
                    key={i}
                    className="p-3 border-2 border-header-stroke rounded-full"
                  >
                    <Star
                      className="text-[#FFB54F] fill-[#FFB54F]"
                      size={16}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {/* Title */}
                <h4 className="text-[18px] lg:text-[24px]  font-semibold text-primary">
                  {testimonial.title}
                </h4>

                {/* Feedback */}
                <p className="text-secondary-text text-[14px] lg:text-[16] leading-relaxed">
                  {testimonial.feedback}
                </p>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 py-[16px]">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover size-12 lg:size-14"
                />
                <div>
                  <h3 className="font-semibold lg:text-[24px] text-[18px] text-primary">{testimonial.name}</h3>
                  <p className="lg:text-[16px] text-[14px] lg text-secondary-text">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
      
          </SwiperSlide>
        ))}
      </Swiper>
    {/* Navigation for mobile (side arrows, middle of card) */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isBeginning}
        className={`absolute top-1/2 -left-5 z-50 -translate-y-1/2 p-2 rounded-full border-2 border-header-stroke text-white transition lg:hidden ${
          isBeginning ? "opacity-40 cursor-not-allowed" : "hover:bg-white/30"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
        className={`absolute top-1/2 -right-5 z-50 -translate-y-1/2 p-2 rounded-full border-2 border-header-stroke text-white transition lg:hidden ${
          isEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-white/30"
        }`}
      >
        <ChevronRight size={20} />
      </button>
      {/* Pagination Dots (mobile only) */}
        <div className="flex justify-center gap-2 mt-4 lg:hidden">
          {TestimonialData.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperRef.current?.slideTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-primary scale-110"
                  : "border border-header-stroke bg-2nd-bg"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation for desktop (bottom center) */}
      <div className="hidden lg:flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          className={`p-2 rounded-full bg-white/20 text-white transition ${
            isBeginning ? "opacity-40 cursor-not-allowed" : "hover:bg-white/30"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          className={`p-2 rounded-full bg-white/20 text-white transition ${
            isEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-white/30"
          }`}
        >
          <ChevronRight size={20} />
        </button>

        
      </div>

      
    </div>
  );
};

export default TestimonialSection;