"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BedDouble,
  Bath,
  Check,
  MapPin,
  MoreVertical,
  Ruler,
  Share2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PropertyItem } from "@/data/PropertyData";
import {
  formatPrice,
  formatPriceExact,
  formatPricePerSqFt,
} from "@/lib/formatPrice";
import { listingEnquiryMessage, whatsappHref } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SaveListingButton from "@/components/listing/SaveListingButton";
import CompareListingButton from "@/components/listing/CompareListingButton";

export type ListingCardItem = Pick<
  PropertyItem,
  | "id"
  | "slug"
  | "title"
  | "description"
  | "address"
  | "price"
  | "image"
  | "tags"
  | "type"
  | "gallery"
  | "specifications"
  | "position"
>;

export type ListingBadge = "Featured" | "New" | "Plot" | "Home";

export type ListingStatus = "For Sale" | "For Rent";

export type ListingCardProps = {
  property: ListingCardItem;
  href?: string;
  ctaLabel?: string;
  showAddress?: boolean;
  className?: string;
  badge?: ListingBadge;
  status?: ListingStatus;
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

function findSpec(
  specs: ListingCardItem["specifications"],
  ...needles: string[]
): string | undefined {
  if (!specs?.length) return undefined;
  const lower = needles.map((n) => n.toLowerCase());
  return specs.find((s) =>
    lower.some((n) => s.label.toLowerCase().includes(n))
  )?.value;
}

function listingPathUrl(href?: string): string | undefined {
  if (!href) return undefined;
  return `https://www.2percentcompany.in${href}`;
}

function inferStatus(
  href: string | undefined,
  explicit?: ListingStatus
): ListingStatus {
  if (explicit) return explicit;
  if (href?.includes("/rent")) return "For Rent";
  return "For Sale";
}

const actionBtnClass =
  "min-w-10 min-h-10 sm:min-w-11 sm:min-h-11 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm hover:bg-primary hover:text-on-primary hover:border-primary transition-colors";

const menuItemClass =
  "!w-full !justify-start !rounded-none !border-0 !bg-transparent !px-3 !py-2.5 !min-h-0 type-caption font-semibold text-white/90 hover:!bg-white/10 hover:!text-white";

const ListingCard: React.FC<ListingCardProps> = ({
  property,
  href,
  ctaLabel,
  showAddress = true,
  className = "",
  badge,
  status,
  index = 0,
  featured = false,
  compact = false,
  showEnquire = true,
}) => {
  const reduceMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
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
  const pricePerSqFt = formatPricePerSqFt(
    property.price,
    property.specifications
  );
  const listingUrl = listingPathUrl(href);
  const enquireHref = whatsappHref(
    listingEnquiryMessage(property.title, listingUrl)
  );
  const resolvedBadge =
    badge ??
    (featured
      ? "Featured"
      : property.type === "plot"
        ? "Plot"
        : undefined);
  const listingStatus = inferStatus(href, status);
  const location = shortLocation(property.address);
  const meta = metaLine(property.tags, property.type);
  const beds = findSpec(property.specifications, "bed", "bhk");
  const baths = findSpec(property.specifications, "bath");
  const area =
    findSpec(property.specifications, "area", "sq", "size") ??
    property.tags.find((t) => /sq|acre|katha|marla/i.test(t.label))?.label;

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

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
        setMenuOpen(false);
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
      setMenuOpen(false);
    } catch {
      // User cancelled share sheet — ignore
    }
  };

  const shellClass = [
    "group relative overflow-hidden rounded-media border border-white/10 bg-black",
    "transition-[border-color] duration-300 hover:border-primary/45",
    featured
      ? "min-h-[240px] sm:min-h-[280px] h-full aspect-[3/4] lg:aspect-auto lg:min-h-0"
      : compact
        ? "min-h-[160px] sm:min-h-[170px] h-full lg:min-h-0"
        : "aspect-[3/4] sm:aspect-[4/3]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const saveCompareProps = {
    id: property.id,
    type: property.type,
    slug: property.slug,
    title: property.title,
    image: property.image,
    price: property.price,
    href,
    address: property.address,
  } as const;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.09 }}
      className="h-full min-h-0"
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

        <div className="pointer-events-none absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5 max-w-[70%]">
          <span className="type-caption tracking-[0.12em] uppercase text-on-primary bg-primary px-2.5 py-1 rounded-control">
            {listingStatus}
          </span>
          {resolvedBadge && (
            <span className="type-caption tracking-[0.12em] uppercase text-white/90 border border-white/25 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-control">
              {resolvedBadge}
            </span>
          )}
        </div>

        {/* Desktop: reveal on hover · Mobile: always visible (no hover) */}
        <div
          className={`absolute right-4 top-4 z-[3] transition-all duration-300 ${
            menuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-100 translate-y-0 lg:opacity-0 lg:-translate-y-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
          }`}
        >
          {compact ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className={actionBtnClass}
                aria-label={`More actions for ${property.title}`}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen((open) => !open);
                }}
              >
                <MoreVertical size={18} aria-hidden />
              </button>

              {menuOpen && (
                <div
                  id={menuId}
                  role="menu"
                  aria-label={`Actions for ${property.title}`}
                  className="absolute right-full top-0 mr-1.5 w-44 overflow-hidden rounded-control border border-white/15 bg-black/90 py-1 shadow-lg backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div role="none" onClick={() => setMenuOpen(false)}>
                    <SaveListingButton
                      {...saveCompareProps}
                      variant="label"
                      className={menuItemClass}
                    />
                  </div>
                  <div role="none" onClick={() => setMenuOpen(false)}>
                    <CompareListingButton
                      {...saveCompareProps}
                      tags={property.tags}
                      specifications={property.specifications}
                      variant="label"
                      className={menuItemClass}
                    />
                  </div>
                  {href && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleShare}
                      className={`inline-flex w-full items-center gap-2 px-3 py-2.5 type-caption font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-colors ${
                        copied ? "text-primary" : ""
                      }`}
                    >
                      {copied ? (
                        <Check size={16} aria-hidden />
                      ) : (
                        <Share2 size={16} aria-hidden />
                      )}
                      {copied ? "Copied" : "Share"}
                    </button>
                  )}
                  {showEnquire && (
                    <a
                      href={enquireHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex w-full items-center gap-2 px-3 py-2.5 type-caption font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <FaWhatsapp size={16} aria-hidden />
                      WhatsApp
                    </a>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <SaveListingButton {...saveCompareProps} />
              <CompareListingButton
                {...saveCompareProps}
                tags={property.tags}
                specifications={property.specifications}
              />
              {href && (
                <button
                  type="button"
                  onClick={handleShare}
                  className={actionBtnClass}
                  aria-label={
                    copied ? "Link copied" : `Share ${property.title}`
                  }
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
          )}
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 z-[2] flex flex-col ${
            compact
              ? "px-3.5 pt-3 pb-4 gap-1.5"
              : featured
                ? "p-4 sm:p-5 lg:p-5 lg:pb-6 gap-2.5"
                : "p-3.5 sm:p-4 lg:p-5 gap-2.5"
          }`}
        >
          <div className={`pointer-events-none ${compact ? "space-y-0.5" : "space-y-1.5"}`}>
            {showAddress && (
              <p className="inline-flex items-center gap-1.5 type-caption text-white/65">
                <MapPin size={14} className="shrink-0 opacity-80" aria-hidden />
                <span className="line-clamp-1">{location}</span>
              </p>
            )}

            <h2
              className={`text-white font-semibold leading-snug text-balance line-clamp-2 ${
                featured
                  ? "type-subhead"
                  : compact
                    ? "type-body"
                    : "type-card-title"
              }`}
            >
              {property.title}
            </h2>
            {!compact &&
              ((beds || baths || area) ? (
                <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 type-caption text-white/60">
                  {beds && (
                    <li className="inline-flex items-center gap-1">
                      <BedDouble size={13} aria-hidden />
                      {beds}
                    </li>
                  )}
                  {baths && (
                    <li className="inline-flex items-center gap-1">
                      <Bath size={13} aria-hidden />
                      {baths}
                    </li>
                  )}
                  {area && (
                    <li className="inline-flex items-center gap-1">
                      <Ruler size={13} aria-hidden />
                      {area}
                    </li>
                  )}
                </ul>
              ) : (
                <p className="type-caption text-white/55 line-clamp-2 sm:line-clamp-1">
                  {meta}
                </p>
              ))}
          </div>

          <div
            className={`flex ${
              compact
                ? "flex-row items-center justify-between gap-3"
                : "flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            }`}
          >
            <div className="pointer-events-none shrink-0 min-w-0">
              <p
                className={`text-primary leading-none ${
                  compact ? "type-card-title font-semibold" : "type-price"
                }`}
                title={exactPrice}
              >
                {displayPrice}
              </p>
              {!compact && pricePerSqFt && (
                <p className="type-caption text-white/55 mt-1">{pricePerSqFt}</p>
              )}
            </div>

            {href && (
              <Link
                href={href}
                className={`group/cta pointer-events-auto relative z-[3] inline-flex items-center justify-center gap-1.5 rounded-control border border-primary font-semibold type-body transition-colors duration-300 bg-primary text-on-primary lg:bg-transparent lg:text-primary hover:bg-primary hover:text-on-primary hover:border-primary ${
                  compact
                    ? "min-h-9 px-3.5 shrink-0"
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
