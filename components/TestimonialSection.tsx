"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import {
  TestimonialData,
  type TestimonialItem,
} from "@/data/TestimonialData";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const COLUMN_DURATIONS = [42, 48, 44] as const;

function buildColumns(items: TestimonialItem[]): TestimonialItem[][] {
  const cols: TestimonialItem[][] = [[], [], []];
  items.forEach((item, i) => {
    cols[i % 3].push(item);
  });
  return cols;
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <article className="shrink-0 flex flex-col gap-5 rounded-card border border-header-stroke bg-2nd-bg p-6 lg:p-7 transition-colors duration-300 hover:border-primary/40">
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
        <h3 className="type-card-title text-body">{testimonial.title}</h3>
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
  );
}

function MarqueeColumn({
  items,
  direction,
  paused,
  duration,
}: {
  items: TestimonialItem[];
  direction: "up" | "down";
  paused: boolean;
  duration: number;
}) {
  const loopItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="testimonial-column-mask relative h-[560px] overflow-hidden lg:h-[620px]">
      <div
        className={cx(
          "flex flex-col gap-4 will-change-transform",
          direction === "up"
            ? "animate-testimonial-up"
            : "animate-testimonial-down",
          paused && "[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {loopItems.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}

const TestimonialSection = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [hoverPaused, setHoverPaused] = useState(false);

  const columns = useMemo(() => buildColumns(TestimonialData), []);
  const columnDirections: Array<"up" | "down"> = ["up", "down", "up"];

  return (
    <section className="relative page-px section-y border-b border-header-stroke overflow-x-clip">
      <div className="flex flex-col gap-8 lg:gap-10">
        <div className="max-w-xl">
          <p className="type-label text-primary mb-2">Testimonials</p>
          <h2 className="type-section text-body">
            Trusted by families across Patna
          </h2>
          <p className="text-secondary-text type-body mt-2">
            Real stories from buyers, sellers, and investors who worked with 2%
            Company.
          </p>
        </div>

        {reduceMotion ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {TestimonialData.slice(0, 3).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
          >
            {columns.map((items, index) => (
              <div
                key={index}
                className={cx(
                  index === 0 && "block",
                  index === 1 && "hidden md:block",
                  index === 2 && "hidden lg:block",
                )}
              >
                <MarqueeColumn
                  items={items}
                  direction={columnDirections[index]}
                  paused={hoverPaused}
                  duration={COLUMN_DURATIONS[index]}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialSection;
