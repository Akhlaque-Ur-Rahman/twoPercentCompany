"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ListingCardItem } from "@/components/listing/ListingCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { iconForTagLabel } from "@/lib/tagIcons";
import { formatPrice, formatPriceExact, formatPricePerSqFt } from "@/lib/formatPrice";

export type ListingRowCardProps = {
  property: ListingCardItem;
  href: string;
  ctaLabel?: string;
  index?: number;
  meta?: React.ReactNode;
  /** Eager-load image for above-the-fold rows */
  priority?: boolean;
};

const MAX_TAGS = 4;
const MAX_THUMBS = 5;

function shortLocation(address: string): string {
  const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]}, ${parts[1]}`;
  return parts[0] ?? address;
}

function gallerySources(property: ListingCardItem): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const src of [property.image, ...(property.gallery ?? [])]) {
    if (!src || seen.has(src)) continue;
    seen.add(src);
    urls.push(src);
  }
  return urls;
}

const FALLBACK_PLOT = "/images/plot2.webp";
const FALLBACK_HOME = "/images/seasidevilla.png";

function ThumbImage({
  src,
  fallback,
  priority = false,
}: {
  src: string;
  fallback: string;
  priority?: boolean;
}) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <Image
      src={current}
      alt=""
      fill
      priority={priority}
      sizes="64px"
      className="object-cover"
      aria-hidden
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}

const ListingRowCard: React.FC<ListingRowCardProps> = ({
  property,
  href,
  ctaLabel,
  index = 0,
  meta,
  priority = false,
}) => {
  const reduceMotion = usePrefersReducedMotion();
  const label =
    ctaLabel ??
    (property.type === "plot" ? "View Plot Details" : "View Property Details");
  const shortCta =
    property.type === "plot"
      ? "View Plot"
      : label.toLowerCase().includes("property")
        ? "View Details"
        : label;
  const visibleTags = property.tags.slice(0, MAX_TAGS);
  const location = shortLocation(property.address);
  const staggerDelay = reduceMotion ? 0 : Math.min(index, 6) * 0.04;

  const images = useMemo(() => gallerySources(property), [property]);
  const thumbs = images.slice(0, MAX_THUMBS);
  const extraCount = Math.max(0, images.length - MAX_THUMBS);
  const [activeSrc, setActiveSrc] = useState(images[0] ?? property.image);
  const imageFallback =
    property.type === "plot" ? FALLBACK_PLOT : FALLBACK_HOME;
  const listingStatus = href.includes("/rent") ? "For Rent" : "For Sale";
  const pricePerSqFt = formatPricePerSqFt(
    property.price,
    property.specifications
  );
  const showFeatured = index === 0;

  useEffect(() => {
    setActiveSrc(images[0] ?? property.image);
  }, [property.id, images, property.image]);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: staggerDelay }}
      className="group card flex flex-col lg:flex-row p-4 lg:p-6 gap-4 lg:gap-6 rounded-card border border-header-stroke bg-2nd-bg transition-[border-color,background] duration-300 hover:border-primary/40 hover:bg-[linear-gradient(135deg,rgba(143,115,48,0.08),transparent_55%)]"
    >
      <Link
        href={href}
        className="relative block w-full lg:w-1/3 shrink-0 overflow-hidden rounded-media aspect-[4/3] bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-2nd-bg"
        aria-label={`${property.title} — ${formatPrice(property.price)}`}
      >
        <Image
          src={activeSrc}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          aria-hidden
          onError={() => {
            if (activeSrc !== imageFallback) setActiveSrc(imageFallback);
          }}
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80"
          aria-hidden
        />
        <div className="absolute left-3 top-3 z-[1] flex flex-wrap gap-1.5">
          <span className="type-caption tracking-[0.12em] uppercase text-on-primary bg-primary px-2.5 py-1">
            {listingStatus}
          </span>
          {showFeatured && (
            <span className="type-caption tracking-[0.12em] uppercase text-white border border-white/30 bg-black/55 px-2.5 py-1">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-center gap-3 min-w-0">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-1.5 type-caption text-secondary-text max-w-full">
            <MapPin size={14} className="shrink-0 text-primary/80" aria-hidden />
            <span className="line-clamp-1">{location}</span>
          </p>
          <h2 className="type-card-title text-body text-balance leading-snug">
            <Link
              href={href}
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary"
            >
              {property.title}
            </Link>
          </h2>
          <p className="text-secondary-text type-body line-clamp-2 leading-relaxed">
            {property.description}
          </p>
          {meta}
        </div>

        {thumbs.length > 1 && (
          <ul
            className="flex gap-2 overflow-x-auto py-0.5 custom-scrollbar"
            aria-label={`${property.title} photo gallery`}
          >
            {thumbs.map((src, i) => {
              const selected = src === activeSrc;
              const isLast = i === thumbs.length - 1 && extraCount > 0;
              return (
                <li key={`${src}-${i}`} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveSrc(src)}
                    aria-label={
                      isLast
                        ? `View photo ${i + 1}, ${extraCount} more available`
                        : `View photo ${i + 1}`
                    }
                    aria-pressed={selected}
                    className={`relative block size-14 sm:size-16 overflow-hidden rounded-control bg-black cursor-pointer transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-2nd-bg ${
                      selected ? "opacity-100" : "opacity-50 hover:opacity-90"
                    }`}
                  >
                    <ThumbImage
                      src={src}
                      fallback={imageFallback}
                    />
                    {/* Selection drawn ON TOP of the photo — never behind it */}
                    <span
                      className={`pointer-events-none absolute inset-0 rounded-[inherit] border-2 ${
                        selected ? "border-white" : "border-transparent"
                      }`}
                      aria-hidden
                    />
                    {selected && (
                      <span
                        className="pointer-events-none absolute bottom-1.5 left-1.5 right-1.5 h-0.5 rounded-full bg-primary"
                        aria-hidden
                      />
                    )}
                    {isLast && (
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 type-caption font-semibold text-white">
                        +{extraCount}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {visibleTags.map((tag, idx) => {
              const Icon = tag.icon ?? iconForTagLabel(tag.label);
              return (
                <div
                  key={`${tag.label}-${idx}`}
                  className="flex items-center gap-1.5 text-secondary-text type-caption bg-main-bg/70 border border-header-stroke px-2.5 py-1.5 rounded-control"
                >
                  <Icon width={14} height={14} className="text-primary/70" aria-hidden />
                  <span>{tag.label}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 border-t border-header-stroke">
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-secondary-text type-caption tracking-wide uppercase">
              Price
            </p>
            <p
              className="type-price text-primary leading-none"
              title={formatPriceExact(property.price)}
            >
              {formatPrice(property.price)}
            </p>
            {pricePerSqFt && (
              <p className="type-caption text-secondary-text mt-1">
                {pricePerSqFt}
              </p>
            )}
          </div>
          <Link
            href={href}
            className="w-full sm:w-auto px-5 py-2.5 inline-flex justify-center items-center rounded-control border border-primary font-semibold type-body text-center transition-colors bg-primary text-on-primary lg:bg-transparent lg:text-primary hover:bg-primary hover:text-on-primary"
          >
            <span className="lg:hidden">{shortCta}</span>
            <span className="hidden lg:inline">{label}</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ListingRowCard;
