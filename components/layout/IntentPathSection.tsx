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
    <section className="page-px section-y border-b border-header-stroke">
      <div className="flex flex-col gap-8 lg:gap-10">
        <div className="max-w-2xl">
          <p className="type-label text-primary mb-2">How can we help</p>
          <h2 className="type-section text-body">Choose your path</h2>
          <p className="text-secondary-text type-body mt-2">
            Buy, sell, rent, or invest — pick an intent and we&apos;ll take you
            straight to the right listings and team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {intentPathItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : index * 0.06,
              }}
            >
              <Link
                href={item.href}
                className="group flex flex-col justify-between h-full min-h-[140px] p-5 lg:p-6 rounded-card border border-header-stroke bg-2nd-bg hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="type-card-title text-body group-hover:text-primary transition-colors">
                    {item.label}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-secondary-text group-hover:text-primary transition-colors"
                    aria-hidden
                  />
                </div>
                <p className="text-secondary-text type-body mt-3">
                  {item.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2 border-t border-header-stroke">
          <p className="type-caption text-secondary-text shrink-0 uppercase tracking-wider">
            Explore areas
          </p>
          <div className="flex flex-wrap gap-2">
            {areaChips.map((area) => (
              <Link
                key={area.id}
                href={area.href}
                className="type-caption text-body border border-header-stroke px-3.5 py-2 rounded-control hover:border-primary/40 hover:text-primary transition-colors"
              >
                {area.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntentPathSection;
