"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { PropertyItem } from "@/data/PropertyData";
import { formatPrice, formatPriceExact } from "@/lib/formatPrice";
import { listingEnquiryMessage, whatsappHref } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type ListingCardItem = Pick<
  PropertyItem,
  "id" | "slug" | "title" | "description" | "address" | "price" | "image" | "tags" | "type"
>;

export type ListingBadge = "Featured" | "New" | "Plot" | "Home";

export type ListingCardProps = {
  property: ListingCardItem;
  href?: string;
  ctaLabel?: string;
  showAddress?: boolean;
  className?: string;
  badge?: ListingBadge;
  index?: number;
  featured?: boolean;
  compact?: boolean;
  showEnquire?: boolean;
};

function shortLocation(address: string): string {
  const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]}, ${parts[1]}`;
  return parts[0] ?? address;
}

function metaLine(
  tags: ListingCardItem["tags"],
  type: ListingCardItem["type"]
): string {
  const labels = tags.slice(0, 3).map((t) => t.label);
  if (labels.length) return labels.join(" · ");
  return type === "plot" ? "Plot" : "Residence";
}

const ListingCard: React.FC<ListingCardProps> = ({
  property,
  href,
  ctaLabel,
  showAddress = true,
  className = "",
  badge,
  index = 0,
  featured = false,
  compact = false,
  showEnquire = true,
}) => {
  const reduceMotion = usePrefersReducedMotion();
  const defaultCta = property.type === "plot" ? "View plot" : "View home";
  const label = ctaLabel ?? defaultCta;
  const ctaHint = label.replace(/^View\s+/i, "").trim() || "Details";
  const displayPrice = formatPrice(property.price);
  const exactPrice = formatPriceExact(property.price);
  const enquireHref = whatsappHref(
    listingEnquiryMessage(
      property.title,
      href ? `https://www.2percentcompany.in${href}` : undefined
    )
  );
  const resolvedBadge =
    badge ?? (property.type === "plot" ? "Plot" : undefined);
  const location = shortLocation(property.address);
  const meta = metaLine(property.tags, property.type);

  const shellClass = [
    "group relative overflow-hidden rounded-media border border-white/10 bg-black",
    "transition-[border-color] duration-300 hover:border-primary/45",
    featured
      ? "min-h-[360px] h-full aspect-[4/5] lg:aspect-auto"
      : compact
        ? "min-h-[200px] h-full"
        : "aspect-[4/5] sm:aspect-[3/4]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.09 }}
      className="h-full"
    >
      <div className={shellClass}>
        <Image
          src={property.image}
          alt=""
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 58vw"
              : compact
                ? "(max-width: 1024px) 100vw, 40vw"
                : "(max-width: 1024px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06]"
          aria-hidden
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/15"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-0 motion-safe:group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"
          aria-hidden
        />

        {href && (
          <Link
            href={href}
            className="absolute inset-0 z-[1]"
            aria-label={`${property.title} — ${displayPrice}`}
          />
        )}

        {resolvedBadge && (
          <span className="pointer-events-none absolute left-4 top-4 z-[2] type-caption tracking-[0.18em] uppercase text-white/90 border border-white/25 bg-black/40 backdrop-blur-sm px-3 py-1.5">
            {resolvedBadge}
          </span>
        )}

        {showEnquire && (
          <a
            href={enquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 z-[3] min-w-11 min-h-11 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm hover:bg-primary hover:text-on-primary hover:border-primary transition-colors"
            aria-label={`Enquire about ${property.title} on WhatsApp`}
          >
            <MessageCircle size={18} aria-hidden />
          </a>
        )}

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex flex-col ${
            compact
              ? "p-4 gap-1.5"
              : featured
                ? "p-5 lg:p-7 gap-2.5"
                : "p-4 lg:p-5 gap-2"
          }`}
        >
          {showAddress && (
            <p className="inline-flex items-center gap-1.5 type-caption text-white/65">
              <MapPin size={14} className="shrink-0 opacity-80" aria-hidden />
              <span className="line-clamp-1">{location}</span>
            </p>
          )}

          <div className="space-y-1">
            <h2
              className={`text-white font-semibold leading-snug ${
                featured ? "type-subhead" : "type-card-title"
              }`}
            >
              {property.title}
            </h2>
            <p className="type-caption text-white/55 line-clamp-1">{meta}</p>
          </div>

          <div className="flex items-end justify-between gap-3 pt-1">
            <p className="type-price text-primary leading-none" title={exactPrice}>
              {displayPrice}
            </p>
            {href && (
              <span className="inline-flex items-center gap-1 type-caption font-medium text-white/75 opacity-100 lg:opacity-0 lg:translate-y-1 motion-safe:group-hover:opacity-100 motion-safe:group-hover:translate-y-0 transition-all duration-300">
                {compact ? "View" : ctaHint}
                <ArrowUpRight size={15} aria-hidden />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ListingCard;
