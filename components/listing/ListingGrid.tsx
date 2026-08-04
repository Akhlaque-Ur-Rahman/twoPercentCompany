"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ListingCard, {
  ListingCardItem,
  ListingBadge,
} from "@/components/listing/ListingCard";

export type ListingGridProps = {
  items: ListingCardItem[];
  hrefBase: string;
  ctaLabel?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  showAddress?: boolean;
  layout?: "row" | "spotlight";
  secondaryBadge?: ListingBadge;
};

const ListingGrid: React.FC<ListingGridProps> = ({
  items,
  hrefBase,
  ctaLabel,
  viewAllHref,
  viewAllLabel = "View All",
  showAddress = true,
  layout = "spotlight",
  secondaryBadge,
}) => {
  const hrefFor = (item: ListingCardItem) => `${hrefBase}/${item.slug}`;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const featured = items.slice(0, 3);
  const [hero, ...side] = featured;

  const badgeAt = (index: number): ListingBadge | undefined => {
    if (index === 0) return "Featured";
    return secondaryBadge;
  };

  return (
    <div className="relative min-w-0">
      {/* Mobile — peek carousel */}
      <div className="block lg:hidden min-w-0">
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
          spaceBetween={14}
          slidesPerView={1.08}
          className="property-land-swiper !overflow-visible"
          breakpoints={{
            0: { slidesPerView: 1.02, spaceBetween: 12 },
            480: { slidesPerView: 1.08, spaceBetween: 14 },
            640: { slidesPerView: 1.16, spaceBetween: 16 },
          }}
        >
          {featured.map((item, index) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <ListingCard
                property={item}
                href={hrefFor(item)}
                ctaLabel={ctaLabel}
                showAddress={showAddress}
                badge={badgeAt(index)}
                index={index}
                featured={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-4 sm:mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {featured.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => swiperRef.current?.slideTo(index)}
                className="min-w-11 min-h-11 flex items-center justify-center"
              >
                <span
                  className={`block h-0.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-8 bg-primary"
                      : "w-4 bg-header-stroke"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-control border border-header-stroke text-body disabled:opacity-35"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-control border border-header-stroke text-body disabled:opacity-35"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="mt-4 sm:mt-5 flex w-full items-center justify-center border border-header-stroke py-3.5 type-body font-medium text-primary hover:border-primary/40 transition-colors rounded-control"
          >
            {viewAllLabel}
          </Link>
        )}
      </div>

      {/* Desktop spotlight — cinema poster + twin strips */}
      {layout === "spotlight" && hero ? (
        <div className="hidden lg:grid grid-cols-12 gap-3 xl:gap-4 h-[600px]">
          <div className="col-span-7 h-full">
            <ListingCard
              property={hero}
              href={hrefFor(hero)}
              ctaLabel={ctaLabel}
              showAddress={showAddress}
              badge={badgeAt(0)}
              index={0}
              featured
              className="h-full"
            />
          </div>
          <div className="col-span-5 grid grid-rows-2 gap-3 xl:gap-4 h-full">
            {side.map((item, i) => (
              <ListingCard
                key={item.id}
                property={item}
                href={hrefFor(item)}
                ctaLabel={ctaLabel}
                showAddress={showAddress}
                badge={badgeAt(i + 1)}
                index={i + 1}
                compact
                className="h-full"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {featured.map((item, index) => (
            <ListingCard
              key={item.id}
              property={item}
              href={hrefFor(item)}
              ctaLabel={ctaLabel}
              showAddress={showAddress}
              badge={badgeAt(index)}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingGrid;
