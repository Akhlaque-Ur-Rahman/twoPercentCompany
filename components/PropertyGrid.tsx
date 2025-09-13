"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { PropertyData } from "@/data/PropertyData";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PropertyGrid = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className=" relative">
      {/* ✅ Mobile Swiper */}
      <div className="block lg:hidden ">
        <Swiper
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
          spaceBetween={16}
          className="property-land-swiper"
        >
          {PropertyData.map((property) => (
            <SwiperSlide key={property.id}>
              <div className="card p-[24px] gap-[16px] flex flex-col justify-between rounded-[24px] border-2 border-header-stroke ">
                {/* Image */}
                <div className="w-full flex justify-center items-center bg-cover">
                  <Image
                    src={property.image}
                    height={178}
                    width={294}
                    alt={property.title}
                    className="rounded-[16px] w-full"
                  />
                </div>

                {/* Title + Desc */}
                <div className="w-full">
                  <h2 className="font-semibold text-[clamp(18px,2vw,24px)]">
                    {property.title}
                  </h2>
                  <p className="text-secondary-text text-[clamp(14px,1.6vw,16px)] mt-1">
                    {property.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="card-category-tags w-full flex flex-wrap items-center gap-[16px]">
                  {property.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="px-[8px] py-[4px] rounded-full bg-2nd-bg flex items-center gap-[4px]"
                    >
                      <tag.icon width={24} height={24} />
                      <p className="font-semibold text-[clamp(14px,1.5vw,16px)]">
                        {tag.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price + Button */}
                <div className="price-btn-container py-[8px] flex flex-row items-center justify-between gap-3">
                  <div className="price-box flex items-center justify-between flex-col gap-[6px]">
                    <p className="text-secondary-text text-[14px]">
                      Price
                    </p>
                    <p className="font-semibold text-[18px]">
                      ₹{property.price}
                    </p>
                  </div>
                  <button className="p-4 rounded-[16px] bg-primary font-semibold text-[14px]">
                    View Property Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ Custom arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`absolute -left-5 top-2/5 -translate-y-1/2 border-2 border-header-stroke text-white p-2 rounded-full flex justify-center items-center z-50 transition-all ${
            isBeginning ? "opacity-40 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className={`absolute -right-5 top-2/5 -translate-y-1/2 border-2 border-header-stroke text-white p-2 rounded-full flex justify-center items-center z-50 transition-all ${
            isEnd ? "opacity-40 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronRight size={32} />
        </button>

        {/* ✅ Custom Pagination Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {PropertyData.map((_, index) => (
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
        <div className="view-all-btn rounded-[12px] h-fit mt-6 bg-2nd-bg border-2 border-header-stroke  justify-center items-center flex lg:hidden">
      <Link href='/properties' className=" px-4 py-4 text-[14px] font-medium">
        View All Properties
      </Link>
    </div>
      </div>

      {/* ✅ Desktop Grid (unchanged) */}
      <div className="hidden lg:block space-y-4">
        {/* Row 1 - 3 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {PropertyData.slice(0, 3).map((property) => (
            <div
              key={property.id}
              className="card lg:p-[24px] p-4 gap-[16px] flex flex-col justify-between rounded-[24px] border-2 border-header-stroke"
            >
              {/* Image */}
              <div className="w-full flex justify-center bg-cover">
                <Image
                  src={property.image}
                  height={240}
                  width={394}
                  alt={property.title}
                  className="rounded-[16px] w-full object-cover"
                />
              </div>

              {/* Title + Desc */}
              <div className="w-full">
                <h2 className="font-semibold text-[clamp(18px,2vw,24px)]">
                  {property.title}
                </h2>
                <p className="text-secondary-text text-[clamp(14px,1.6vw,16px)] mt-1">
                  {property.description}
                </p>
              </div>

              {/* Tags */}
              <div className="card-category-tags w-full flex flex-wrap items-center gap-[12px]">
                {property.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-[8px] py-[4px] rounded-full bg-2nd-bg flex items-center gap-[4px]"
                  >
                    <tag.icon width={20} height={20} />
                    <p className="font-semibold text-[clamp(13px,1.5vw,16px)]">
                      {tag.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price + Button */}
              <div className="price-btn-container py-[8px] flex sm:flex-row sm:items-center justify-between gap-3">
                <div className="price-box flex items-center sm:items-start flex-col gap-[6px]">
                  <p className="text-secondary-text text-[clamp(13px,1.5vw,15px)]">
                    Price
                  </p>
                  <p className="font-semibold text-[clamp(18px,2vw,24px)]">
                    ₹{property.price}
                  </p>
                </div>
                <button className="px-[clamp(16px,2vw,32px)] py-[clamp(16px,1.5vw,16px)] rounded-[16px] bg-primary font-semibold text-[clamp(14px,1.6vw,16px)]">
                  View Property Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - 2 Columns */}
        <div className="lg:grid grid-cols-1 sm:grid-cols-2 gap-[16px] hidden">
          {PropertyData.slice(3, 5).map((property) => (
            <div
              key={property.id}
              className="card lg:p-[24px] p-4 gap-[16px] flex flex-col rounded-[24px] border-2 border-header-stroke"
            >
              {/* Image */}
              <div className="w-full flex justify-center bg-cover">
                <Image
                  src={property.image}
                  height={240}
                  width={394}
                  alt={property.title}
                  className="rounded-[16px] w-full object-cover"
                />
              </div>

              {/* Title + Desc */}
              <div className="w-full">
                <h2 className="font-semibold text-[clamp(18px,2vw,24px)]">
                  {property.title}
                </h2>
                <p className="text-secondary-text text-[clamp(14px,1.6vw,16px)] mt-1">
                  {property.description}
                </p>
              </div>

              {/* Tags */}
              <div className="card-category-tags w-full flex flex-wrap items-center gap-[12px]">
                {property.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-[8px] py-[4px] rounded-full bg-2nd-bg flex items-center gap-[4px]"
                  >
                    <tag.icon width={20} height={20} />
                    <p className="font-semibold text-[clamp(13px,1.5vw,16px)]">
                      {tag.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price + Button */}
              <div className="price-btn-container py-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="price-box flex items-center sm:items-start flex-col gap-[6px]">
                  <p className="text-secondary-text text-[clamp(13px,1.5vw,15px)]">
                    Price
                  </p>
                  <p className="font-semibold text-[clamp(18px,2vw,24px)]">
                    ₹{property.price}
                  </p>
                </div>
                <button className="w-full sm:w-auto px-[clamp(16px,2vw,32px)] py-[clamp(10px,1.5vw,16px)] rounded-[16px] bg-primary font-semibold text-[clamp(14px,1.6vw,16px)]">
                  View Property Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
