"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { HeroSectionSlide, HeroStats } from "@/data/HeroSectionData";
import HeroPropertySearch from "@/components/layout/HeroPropertySearch";

const HeroSection = () => {
  const slide = HeroSectionSlide;

  const rootRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    const statItems = statsRef.current
      ? Array.from(statsRef.current.children)
      : [];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.classList.remove("hero-pending");
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            root.classList.remove("hero-pending");
          },
        });

        // CSS already hides .hero-reveal — only set transform offsets here
        gsap.set(eyebrowRef.current, { y: 28 });
        gsap.set(lines, { y: 52 });
        gsap.set(descriptionRef.current, { y: 22 });
        gsap.set(statItems, { y: 30 });
        gsap.set(searchRef.current, { y: 80 });

        tl.to(
          imageRef.current,
          { scale: 1, opacity: 1, duration: 1.9, ease: "power2.out" },
          0
        )
          .to(overlayRef.current, { opacity: 1, duration: 1.15 }, 0.1)
          .to(
            eyebrowRef.current,
            { y: 0, opacity: 1, duration: 0.72 },
            0.28
          )
          .to(
            lines,
            {
              y: 0,
              opacity: 1,
              duration: 0.92,
              stagger: 0.13,
            },
            0.42
          )
          .to(
            descriptionRef.current,
            { y: 0, opacity: 1, duration: 0.65 },
            0.92
          )
          .to(
            statItems,
            {
              y: 0,
              opacity: 1,
              duration: 0.68,
              stagger: 0.09,
            },
            1.02
          )
          .to(
            searchRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
            },
            1.12
          );

        return () => {
          tl.kill();
        };
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero-pending relative w-full -mt-16 lg:-mt-[4.5rem]"
    >
      <div className="relative min-h-[100svh] w-full max-w-[100vw] overflow-x-clip border-b border-header-stroke sm:min-h-[92svh] lg:min-h-[680px]">
        <div
          ref={imageRef}
          className="hero-reveal-media absolute inset-0 z-0 will-change-transform origin-center"
        >
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
          ref={overlayRef}
          className="hero-reveal-overlay absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/75 to-black/40"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[100svh] w-full flex-col page-px pt-[5.5rem] pb-[calc(11rem+env(safe-area-inset-bottom))] sm:min-h-[92svh] sm:pt-28 sm:pb-32 lg:min-h-[680px] lg:justify-center lg:pb-36 lg:pt-28">
          <div className="flex flex-1 flex-col justify-center">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5 text-center sm:gap-6 sm:max-w-3xl">
              <p
                ref={eyebrowRef}
                className="hero-reveal type-label inline-block text-primary font-semibold tracking-[0.14em] sm:tracking-[0.12em] bg-black/55 sm:bg-primary/15 border border-primary/60 sm:border-primary/35 rounded-control px-3.5 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.35)] will-change-transform"
              >
                {slide.eyebrow}
              </p>

              <h1 className="type-hero w-full text-center text-white">
                <span
                  ref={(el) => {
                    lineRefs.current[0] = el;
                  }}
                  className="hero-reveal block will-change-transform"
                >
                  {slide.heading}
                </span>
                <span
                  ref={(el) => {
                    lineRefs.current[1] = el;
                  }}
                  className="hero-reveal type-hero-accent text-primary block will-change-transform"
                >
                  {slide.headingAccent}
                </span>
                <span
                  ref={(el) => {
                    lineRefs.current[2] = el;
                  }}
                  className="hero-reveal block will-change-transform"
                >
                  {slide.headingAfter}
                </span>
              </h1>

              <p
                ref={descriptionRef}
                className="hero-reveal hidden sm:block text-white/80 type-body max-w-xl text-balance text-center will-change-transform"
              >
                {slide.description}
              </p>

              <div
                ref={statsRef}
                className="grid w-full max-w-3xl grid-cols-3 gap-0 divide-x divide-white/10"
              >
                {HeroStats.map((stat) => (
                  <div
                    key={stat.id}
                    className="hero-reveal flex flex-col items-center justify-center text-center px-2 sm:px-5 will-change-transform"
                  >
                    <p className="text-base sm:text-xl font-semibold text-white/55 leading-none tracking-tight">
                      {stat.value}
                    </p>
                    <p className="type-caption text-white/40 mt-1.5 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={searchRef}
        className="hero-reveal relative z-20 page-px -mt-[11rem] sm:-mt-24 lg:-mt-[5.5rem] will-change-transform"
      >
        <div className="mx-auto w-full max-w-5xl pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:pb-0">
          <HeroPropertySearch trustSignals={slide.trustSignals} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
