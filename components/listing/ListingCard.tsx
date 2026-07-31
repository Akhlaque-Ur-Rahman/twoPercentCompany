"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { PropertyItem } from "@/data/PropertyData";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type ListingCardItem = Pick<
  PropertyItem,
  "id" | "slug" | "title" | "description" | "address" | "price" | "image" | "tags" | "type"
>;

export type ListingCardProps = {
  property: ListingCardItem;
  href?: string;
  ctaLabel?: string;
  showAddress?: boolean;
  className?: string;
};

const ListingCard: React.FC<ListingCardProps> = ({
  property,
  href,
  ctaLabel,
  showAddress = true,
  className = "",
}) => {
  const reduceMotion = usePrefersReducedMotion();
  const defaultCta =
    property.type === "plot" ? "View Plot Details" : "View Property Details";
  const label = ctaLabel ?? defaultCta;

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`card p-4 lg:p-6 gap-4 flex flex-col justify-between rounded-card border-2 border-header-stroke bg-2nd-bg transition-all duration-300 hover:border-primary/40 h-full ${className}`}
    >
      <div className="w-full flex justify-center items-center">
        <Image
          src={property.image}
          height={240}
          width={394}
          alt={`${property.title} in ${property.address}`}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="rounded-media w-full object-cover aspect-[4/3]"
        />
      </div>

      <div className="w-full">
        <h2 className="type-card-title text-primary">{property.title}</h2>
        <p className="text-secondary-text type-body mt-1">{property.description}</p>
      </div>

      {showAddress && (
        <div className="flex items-center gap-2 text-secondary-text type-caption">
          <MapPin width={16} height={16} className="text-primary shrink-0" />
          <span>{property.address}</span>
        </div>
      )}

      <div className="w-full flex flex-wrap items-center gap-3">
        {property.tags.map((tag, index) => {
          const Icon = tag.icon;
          return (
            <div
              key={`${tag.label}-${index}`}
              className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-4 py-2 rounded-full type-caption font-medium"
            >
              <Icon width={20} height={20} />
              <span className="font-semibold">{tag.label}</span>
            </div>
          );
        })}
      </div>

      <div className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <p className="text-secondary-text font-semibold type-caption">Price</p>
          <p className="type-price text-primary">₹{property.price}</p>
        </div>

        {href && (
          <Link
            href={href}
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 rounded-control bg-primary text-on-primary font-semibold type-body text-center hover:brightness-110 transition"
          >
            {label}
          </Link>
        )}
      </div>
    </motion.article>
  );
};

export default ListingCard;
