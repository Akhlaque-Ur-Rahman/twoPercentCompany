"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ListingCard, { ListingCardItem } from "@/components/listing/ListingCard";

export type ListingGridProps = {
  items: ListingCardItem[];
  /** Base path without trailing slash, e.g. `/properties` → `/properties/{slug}` */
  hrefBase: string;
  ctaLabel?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  showAddress?: boolean;
};

const ListingGrid: React.FC<ListingGridProps> = ({
  items,
  hrefBase,
  ctaLabel,
  viewAllHref,
  viewAllLabel = "View All",
  showAddress = false,
}) => {
  const hrefFor = (item: ListingCardItem) => `${hrefBase}/${item.slug}`;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const row1 = items.slice(0, 3);
  const row2 = items.slice(3, 5);

  return (
    <div className="relative">
      <div className="block lg:hidden">
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
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <ListingCard
                property={item}
                href={hrefFor(item)}
                ctaLabel={ctaLabel}
                showAddress={showAddress}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
          className={`absolute left-2 top-1/2 -translate-y-1/2 border-2 border-header-stroke text-body p-2 rounded-full z-50 transition-all min-w-11 min-h-11 flex items-center justify-center bg-2nd-bg/80 ${
            isBeginning ? "opacity-40 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronLeft size={28} />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 border-2 border-header-stroke text-body p-2 rounded-full z-50 transition-all min-w-11 min-h-11 flex items-center justify-center bg-2nd-bg/80 ${
            isEnd ? "opacity-40 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronRight size={28} />
        </button>

        <div className="flex justify-center mt-4 gap-1">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
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

        {viewAllHref && (
          <div className="rounded-control h-fit mt-6 bg-2nd-bg border-2 border-header-stroke justify-center items-center flex lg:hidden">
            <Link href={viewAllHref} className="px-4 py-4 type-body font-medium text-primary">
              {viewAllLabel}
            </Link>
          </div>
        )}
      </div>

      <div className="hidden lg:block space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {row1.map((item) => (
            <ListingCard
              key={item.id}
              property={item}
              href={hrefFor(item)}
              ctaLabel={ctaLabel}
              showAddress={showAddress}
            />
          ))}
        </div>

        {row2.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {row2.map((item) => (
              <ListingCard
                key={item.id}
                property={item}
                href={hrefFor(item)}
                ctaLabel={ctaLabel}
                showAddress={showAddress}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingGrid;
