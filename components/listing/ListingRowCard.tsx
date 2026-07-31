"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ListingCardItem } from "@/components/listing/ListingCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type ListingRowCardProps = {
  property: ListingCardItem;
  href: string;
  ctaLabel?: string;
  index?: number;
  meta?: React.ReactNode;
};

const ListingRowCard: React.FC<ListingRowCardProps> = ({
  property,
  href,
  ctaLabel,
  index = 0,
  meta,
}) => {
  const reduceMotion = usePrefersReducedMotion();
  const label =
    ctaLabel ??
    (property.type === "plot" ? "View Plot Details" : "View Property Details");

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.05 }}
      className="card flex flex-col lg:flex-row p-4 lg:p-6 gap-4 lg:gap-6 rounded-card border border-header-stroke bg-2nd-bg"
    >
      <div className="w-full lg:w-1/3 flex justify-center">
        <Image
          src={property.image}
          height={240}
          width={394}
          alt={`${property.title} in ${property.address}`}
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="rounded-media w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-4">
        <div>
          <h2 className="type-card-title text-body">{property.title}</h2>
          <p className="text-secondary-text type-body mt-1">{property.description}</p>
          {meta}
        </div>

        {property.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {property.tags.map((tag, idx) => {
              const Icon = tag.icon;
              return (
                <div
                  key={`${tag.label}-${idx}`}
                  className="flex items-center gap-1.5 text-secondary-text type-caption border border-header-stroke px-3 py-1.5 rounded-control"
                >
                  <Icon width={14} height={14} />
                  <span>{tag.label}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="text-secondary-text type-caption">Price</p>
            <p className="type-price text-body">₹{property.price}</p>
          </div>
          <Link
            href={href}
            className="px-6 py-3 inline-flex justify-center items-center rounded-control bg-primary text-on-primary font-semibold type-body text-center hover:brightness-110 transition"
          >
            {label}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingRowCard;
