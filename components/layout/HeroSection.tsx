"use client";

import React from "react";
import Image from "next/image";
import { HeroSectionSlide, HeroStats } from "@/data/HeroSectionData";
import HeroPropertySearch from "@/components/layout/HeroPropertySearch";

const HeroSection = () => {
  const slide = HeroSectionSlide;

  return (
    <section className="relative w-full overflow-x-clip -mt-16 lg:-mt-[4.5rem] border-b border-header-stroke">
      <div className="relative h-[100svh] min-h-[680px] w-full max-w-[100vw]">
        {/* Full-bleed luxury house */}
        <div className="absolute inset-0 z-0">
          <Image
            src={slide.imageMain}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/55 to-black/30"
          aria-hidden
        />

        <div className="relative z-10 flex h-full w-full flex-col justify-end lg:justify-center page-px pb-10 pt-28 lg:pb-14">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <p className="type-label inline-block text-primary tracking-[0.14em] bg-primary/15 border border-primary/30 rounded-control px-3.5 py-1.5">
              {slide.eyebrow}
            </p>
            <h1 className="type-display text-white leading-[1.12] mt-2 max-w-2xl">
              {slide.heading}
            </h1>
            <p className="text-white/80 type-body mt-3 max-w-xl">
              {slide.description}
            </p>
          </div>

          <div className="mx-auto mt-7 w-full max-w-5xl">
            <HeroPropertySearch trustSignals={slide.trustSignals} />
          </div>

          {/* Stats — quieter secondary signal under search */}
          <div className="mx-auto mt-6 w-full max-w-3xl">
            <div className="grid grid-cols-3 gap-2 sm:gap-0 sm:divide-x sm:divide-white/10">
              {HeroStats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col items-center text-center px-2 sm:px-5"
                >
                  <p className="text-lg sm:text-xl font-semibold text-white/90 leading-none tracking-tight">
                    {stat.value}
                  </p>
                  <p className="type-caption text-white/50 mt-1.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
