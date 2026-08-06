"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { areaChips, intentPathItems } from "@/data/IntentPathData";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const IntentPathSection = () => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="page-px pt-8 pb-10 sm:pt-12 sm:pb-12 lg:pt-16 lg:pb-16 border-b border-header-stroke">
      <div className="flex flex-col gap-8 lg:gap-10">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
        >
          <p className="type-label text-primary mb-2">How can we help</p>
          <h2 className="type-section text-body">Choose your path</h2>
          <p className="text-secondary-text type-body mt-2">
            Buy, sell, rent, or invest — pick an intent and we&apos;ll take you
            straight to the right listings and team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {intentPathItems.map((item, index) => {
            const Icon = item.icon;
            const step = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : index * 0.07,
                }}
              >
                <Link
                  href={item.href}
                  className="group relative flex flex-col justify-between h-full min-h-[148px] sm:min-h-[168px] p-5 lg:p-6 rounded-card border border-header-stroke bg-2nd-bg overflow-hidden transition-colors duration-300 hover:border-primary/45"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 motion-safe:group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
                    aria-hidden
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-control border border-header-stroke text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                      <Icon size={18} aria-hidden />
                    </span>
                    <span className="type-caption text-secondary-text/70 tabular-nums tracking-wider">
                      {step}
                    </span>
                  </div>

                  <div className="relative mt-6 space-y-2">
                    <div className="flex items-end justify-between gap-3">
                      <h3 className="type-card-title text-body transition-colors duration-300 group-hover:text-primary">
                        {item.label}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-secondary-text transition-all duration-300 ease-out group-hover:text-primary motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </div>
                    <p className="text-secondary-text type-body">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 pt-2 border-t border-header-stroke"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.1 }}
        >
          <p className="type-caption text-secondary-text shrink-0 uppercase tracking-wider">
            Explore areas
          </p>
          <div className="-mx-1.5 px-1.5 flex gap-2 overflow-x-auto custom-scrollbar sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
            {areaChips.map((area) => (
              <Link
                key={area.id}
                href={area.href}
                className="group shrink-0 inline-flex items-center gap-1.5 type-caption text-body border border-header-stroke px-3.5 py-2 rounded-control transition-colors duration-300 hover:border-primary/40 hover:text-primary"
              >
                {area.label}
                <ArrowUpRight
                  size={12}
                  className="opacity-50 transition-all duration-300 ease-out group-hover:opacity-100 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntentPathSection;
