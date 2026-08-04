"use client";

import React from "react";
import Image from "next/image";
import { HeroSectionSlide, HeroStats } from "@/data/HeroSectionData";
import HeroPropertySearch from "@/components/layout/HeroPropertySearch";

const HeroSection = () => {
  const slide = HeroSectionSlide;

  return (
    <section className="relative w-full overflow-x-clip -mt-16 lg:-mt-[4.5rem] border-b border-header-stroke">
      <div className="relative min-h-[100svh] lg:min-h-[680px] w-full max-w-[100vw]">
        <div className="absolute inset-0 z-0">
          <Image
            src={slide.imageMain}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] sm:object-center"
          />
        </div>

        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/70 to-black/35"
          aria-hidden
        />

        {/*
          Mobile spacing rules:
          - Top spacer keeps image breathing room
          - Fixed gap between headline and search (not flex-grow — that was pushing search under sticky bar)
          - Large bottom pad clears Call/WhatsApp sticky bar so Search CTA stays fully visible
        */}
        <div className="relative z-10 flex min-h-[100svh] w-full flex-col page-px pt-20 pb-[calc(6.75rem+env(safe-area-inset-bottom))] sm:pt-28 sm:pb-12 lg:justify-center lg:pb-14 lg:pt-28">
          <div className="flex-1 min-h-[12vh] sm:min-h-0 lg:hidden" aria-hidden />

          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <p className="type-label inline-block text-primary font-semibold tracking-[0.14em] sm:tracking-[0.12em] bg-black/55 sm:bg-primary/15 border border-primary/60 sm:border-primary/35 rounded-control px-3.5 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              {slide.eyebrow}
            </p>
            <h1 className="type-display text-white leading-[1.08] mt-3 sm:mt-3 max-w-[14ch] sm:max-w-2xl text-balance">
              {slide.heading}
            </h1>
            <p className="hidden sm:block text-white/80 type-body mt-3 max-w-xl text-balance">
              {slide.description}
            </p>
          </div>

          <div className="mx-auto mt-6 sm:mt-7 w-full max-w-5xl shrink-0">
            <HeroPropertySearch trustSignals={slide.trustSignals} />
          </div>

          <div className="mx-auto mt-6 hidden sm:block w-full max-w-3xl">
            <div className="grid grid-cols-3 gap-0 divide-x divide-white/10">
              {HeroStats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col items-center text-center px-3 sm:px-5"
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
