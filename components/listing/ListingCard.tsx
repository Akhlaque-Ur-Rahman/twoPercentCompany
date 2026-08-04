"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, MapPin, Share2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
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

function listingPathUrl(href?: string): string | undefined {
  if (!href) return undefined;
  return `https://www.2percentcompany.in${href}`;
}

const actionBtnClass =
  "min-w-10 min-h-10 sm:min-w-11 sm:min-h-11 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm hover:bg-primary hover:text-on-primary hover:border-primary transition-colors";

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
  const [copied, setCopied] = useState(false);
  const defaultCta = property.type === "plot" ? "View Plot" : "View Home";
  const label = ctaLabel ?? defaultCta;
  const shortCta =
    property.type === "plot"
      ? "View Plot"
      : label.toLowerCase().includes("property")
        ? "View Details"
        : label;
  const displayPrice = formatPrice(property.price);
  const exactPrice = formatPriceExact(property.price);
  const listingUrl = listingPathUrl(href);
  const enquireHref = whatsappHref(
    listingEnquiryMessage(property.title, listingUrl)
  );
  const resolvedBadge =
    badge ?? (property.type === "plot" ? "Plot" : undefined);
  const location = shortLocation(property.address);
  const meta = metaLine(property.tags, property.type);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!href) return;

    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${href}`
        : listingUrl;
    if (!shareUrl) return;

    const shareData = {
      title: property.title,
      text: `Check out ${property.title} with 2% Company — ${displayPrice}`,
      url: shareUrl,
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // User cancelled share sheet — ignore
    }
  };

  const shellClass = [
    "group relative overflow-hidden rounded-media border border-white/10 bg-black",
    "transition-[border-color] duration-300 hover:border-primary/45",
    featured
      ? "min-h-[320px] sm:min-h-[380px] h-full aspect-[4/5] lg:aspect-auto"
      : compact
        ? "min-h-[210px] sm:min-h-[230px] h-full"
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
          className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15"
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

        {/* Desktop: reveal on hover · Mobile: always visible (no hover) */}
        <div className="absolute right-3 top-3 z-[3] flex items-center gap-2 opacity-100 translate-y-0 lg:opacity-0 lg:-translate-y-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
          {href && (
            <button
              type="button"
              onClick={handleShare}
              className={actionBtnClass}
              aria-label={copied ? "Link copied" : `Share ${property.title}`}
            >
              {copied ? (
                <Check size={16} aria-hidden />
              ) : (
                <Share2 size={16} aria-hidden />
              )}
            </button>
          )}

          {showEnquire && (
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className={actionBtnClass}
              aria-label={`Enquire about ${property.title} on WhatsApp`}
            >
              <FaWhatsapp size={18} aria-hidden />
            </a>
          )}
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 z-[2] flex flex-col ${
            compact
              ? "p-3.5 sm:p-4 gap-2"
              : featured
                ? "p-4 sm:p-5 lg:p-7 gap-3"
                : "p-3.5 sm:p-4 lg:p-5 gap-2.5"
          }`}
        >
          <div className="pointer-events-none space-y-1.5">
            {showAddress && (
              <p className="inline-flex items-center gap-1.5 type-caption text-white/65">
                <MapPin size={14} className="shrink-0 opacity-80" aria-hidden />
                <span className="line-clamp-1">{location}</span>
              </p>
            )}

            <h2
              className={`text-white font-semibold leading-snug text-balance ${
                featured ? "type-subhead" : "type-card-title"
              }`}
            >
              {property.title}
            </h2>
            <p className="type-caption text-white/55 line-clamp-2 sm:line-clamp-1">
              {meta}
            </p>
          </div>

          <div
            className={`flex ${
              compact
                ? "flex-row items-center justify-between gap-3"
                : "flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            }`}
          >
            <p
              className="pointer-events-none type-price text-primary leading-none shrink-0"
              title={exactPrice}
            >
              {displayPrice}
            </p>

            {href && (
              <Link
                href={href}
                className={`group/cta pointer-events-auto relative z-[3] inline-flex items-center justify-center gap-1.5 rounded-control border border-primary font-semibold type-body transition-colors duration-300 bg-primary text-on-primary lg:bg-transparent lg:text-primary hover:bg-primary hover:text-on-primary hover:border-primary ${
                  compact
                    ? "min-h-10 px-4 shrink-0"
                    : "min-h-11 w-full sm:w-auto px-5"
                }`}
              >
                {compact ? "View" : shortCta}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 ease-out motion-safe:group-hover/cta:translate-x-0.5 motion-safe:group-hover/cta:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ListingCard;
