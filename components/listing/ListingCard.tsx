"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PropertyItem } from "@/data/PropertyData";

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
  const defaultCta =
    property.type === "plot" ? "View Plot Details" : "View Property Details";
  const label = ctaLabel ?? defaultCta;

  return (
    <article
      className={`group card p-4 lg:p-6 gap-4 flex flex-col justify-between rounded-card border border-header-stroke bg-2nd-bg transition-colors duration-300 hover:border-primary/40 h-full ${className}`}
    >
      <div className="w-full overflow-hidden rounded-media">
        <Image
          src={property.image}
          height={240}
          width={394}
          alt={`${property.title} in ${property.address}`}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="w-full object-cover aspect-[4/3] transition-transform duration-500 ease-out motion-safe:group-hover:scale-110"
        />
      </div>

      <div className="w-full">
        <h2 className="type-card-title text-body">{property.title}</h2>
        <p className="text-secondary-text type-body mt-1">{property.description}</p>
      </div>

      {showAddress && (
        <div className="flex items-center gap-2 text-secondary-text type-caption">
          <MapPin width={16} height={16} className="text-secondary-text shrink-0" />
          <span>{property.address}</span>
        </div>
      )}

      {property.tags.length > 0 && (
        <div className="w-full flex flex-wrap items-center gap-2">
          {property.tags.map((tag, index) => {
            const Icon = tag.icon;
            return (
              <div
                key={`${tag.label}-${index}`}
                className="flex items-center gap-1.5 text-secondary-text type-caption border border-header-stroke px-3 py-1.5 rounded-control"
              >
                <Icon width={14} height={14} />
                <span>{tag.label}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-secondary-text type-caption">Price</p>
          <p className="type-price text-body">₹{property.price}</p>
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
    </article>
  );
};

export default ListingCard;
