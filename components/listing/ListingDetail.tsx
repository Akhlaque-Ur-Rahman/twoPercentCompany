"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LatLng } from "leaflet";
import { X } from "lucide-react";
import PropertyGallery from "@/components/PropertyGallery";
import MapPlaceholder from "@/components/MapPlaceholder";
import ListingDetailHero from "@/components/listing/ListingDetailHero";
import ListingVideoFacade from "@/components/listing/ListingVideoFacade";
import { PropertyItem } from "@/data/PropertyData";
import { MarkerType } from "@/types/MarkerType";
import { iconForTagLabel } from "@/lib/tagIcons";
import { formatPrice, formatPriceExact } from "@/lib/formatPrice";
import { listingEnquiryMessage, whatsappHref } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { FaWhatsapp } from "react-icons/fa";

const MapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

export type ListingDetailProps = {
  item: PropertyItem;
  ctaHref: string;
  ctaLabel: string;
  priceLabel?: string;
  modeNote?: string;
  specificationsTitle?: string;
  backHref?: string;
  backLabel?: string;
};

function toPositionArray(position: PropertyItem["position"]): [number, number] {
  if (position instanceof LatLng) {
    return [position.lat, position.lng];
  }
  return position as [number, number];
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

const ListingDetail: React.FC<ListingDetailProps> = ({
  item,
  ctaHref,
  ctaLabel,
  priceLabel = "Price",
  modeNote,
  specificationsTitle = "Specifications",
  backHref,
  backLabel,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const dialogTitleId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const floorPlans = item.floorPlans ?? [];
  const positionArray = toPositionArray(item.position);

  const resolvedBackHref =
    backHref ?? (item.type === "plot" ? "/plots" : "/properties");
  const resolvedBackLabel =
    backLabel ?? (item.type === "plot" ? "All plots" : "All homes");

  useEffect(() => {
    if (!selected) return;

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key !== "Tab" || !closeBtnRef.current) return;
      // Single focusable control in the dialog — keep focus there.
      e.preventDefault();
      closeBtnRef.current.focus();
    };

    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocusRef.current?.focus();
    };
  }, [selected]);

  const markers: MarkerType[] = [
    {
      id: item.id,
      title: item.title,
      slug: item.slug,
      position: positionArray,
      image: item.image,
      address: item.address,
      type: item.type,
    },
  ];

  const listingUrl =
    item.url ??
    `https://www.2percentcompany.in/${
      item.type === "plot" ? "plots" : "properties"
    }/${item.slug}`;
  const enquireHref = whatsappHref(listingEnquiryMessage(item.title, listingUrl));

  const sectionMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.45, ease: "easeOut" as const },
      };

  return (
    <article className="flex flex-col bg-main-bg text-body">
      <ListingDetailHero
        title={item.title}
        address={item.address}
        image={item.image}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
      />

      <div id="details" className="page-px section-y-sm border-b border-header-stroke">
        <nav className="mb-4" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 type-caption text-secondary-text">
            <li>
              <Link
                href={resolvedBackHref}
                className={`hover:text-body transition-colors ${focusRing} rounded-sm`}
              >
                {resolvedBackLabel}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-body truncate max-w-[40ch]">{item.title}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            {modeNote && (
              <p className="type-caption text-secondary-text italic mb-2">{modeNote}</p>
            )}
            <p className="type-caption text-secondary-text">{priceLabel}</p>
            <p
              className="text-body type-price mt-1"
              title={formatPriceExact(item.price)}
            >
              {formatPrice(item.price)}
            </p>
            <p className="type-caption text-secondary-text mt-2 max-w-xl">
              {item.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              href={ctaHref}
              className={`inline-flex items-center justify-center bg-primary text-on-primary font-semibold px-6 py-3 rounded-control hover:brightness-110 transition w-full sm:w-auto ${focusRing}`}
            >
              {ctaLabel}
            </Link>
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control border border-header-stroke text-secondary-text hover:text-body hover:border-primary/40 transition-colors w-full sm:w-auto ${focusRing}`}
            >
              <FaWhatsapp size={16} aria-hidden />
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="page-px section-y space-y-14 lg:space-y-20">
        <motion.section {...sectionMotion} aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="type-section text-body mb-4">
            Gallery
          </h2>
          <PropertyGallery gallery={item.gallery || [item.image]} />
        </motion.section>

        <motion.section
          {...sectionMotion}
          aria-labelledby="overview-heading"
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14"
        >
          <div>
            <h2 id="overview-heading" className="type-subhead text-body">
              Overview
            </h2>

            {item.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2 mt-4" aria-label="Property features">
                {item.tags.map((tag, index) => {
                  const Icon = tag.icon ?? iconForTagLabel(tag.label);
                  return (
                    <li
                      key={`${tag.label}-${index}`}
                      className="flex items-center gap-1.5 text-secondary-text border border-header-stroke px-3 py-1.5 rounded-control type-caption"
                    >
                      <Icon className="w-4 h-4" aria-hidden />
                      <span>{tag.label}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <p className="text-secondary-text type-body leading-relaxed mt-4">
              {item.longDescription || item.description}
            </p>
          </div>

          {item.specifications && item.specifications.length > 0 && (
            <div>
              <h2 className="type-subhead text-body mb-4">{specificationsTitle}</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.specifications.map((spec, index) => (
                  <div
                    key={`${spec.label}-${index}`}
                    className="border-b border-header-stroke py-3"
                  >
                    <dt className="type-caption text-secondary-text">{spec.label}</dt>
                    <dd className="type-body text-body font-medium mt-0.5">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </motion.section>

        {floorPlans.length > 0 && (
          <motion.section {...sectionMotion} aria-labelledby="floorplan-heading">
            <h2 id="floorplan-heading" className="type-section text-body mb-4">
              Floor Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {floorPlans.slice(0, 2).map((plan, index) => (
                <button
                  key={plan + index}
                  type="button"
                  className={`relative overflow-hidden rounded-control text-left group ${focusRing}`}
                  onClick={() => setSelected(plan)}
                  aria-label={`Open floor plan ${index + 1} larger view`}
                >
                  <Image
                    src={plan}
                    alt={`Floor plan ${index + 1} for ${item.title}`}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                  />
                </button>
              ))}

              {floorPlans[2] && (
                <button
                  type="button"
                  className={`relative overflow-hidden rounded-control md:col-span-2 text-left group ${focusRing}`}
                  onClick={() => setSelected(floorPlans[2])}
                  aria-label="Open floor plan 3 larger view"
                >
                  <Image
                    src={floorPlans[2]}
                    alt={`Floor plan 3 for ${item.title}`}
                    width={800}
                    height={600}
                    sizes="100vw"
                    className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                  />
                </button>
              )}
            </div>

            <AnimatePresence>
              {selected && (
                <motion.div
                  className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  onClick={() => setSelected(null)}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={dialogTitleId}
                >
                  <p id={dialogTitleId} className="sr-only">
                    Floor plan preview
                  </p>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 z-10 min-w-11 min-h-11 inline-flex items-center justify-center rounded-full border border-white/30 text-white bg-black/50 hover:bg-black/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Close floor plan preview"
                  >
                    <X size={22} aria-hidden />
                  </button>
                  <motion.img
                    src={selected}
                    alt={`Enlarged floor plan for ${item.title}`}
                    className="max-w-full max-h-[90vh] rounded-control shadow-lg"
                    initial={reducedMotion ? false : { scale: 0.92 }}
                    animate={{ scale: 1 }}
                    exit={reducedMotion ? undefined : { scale: 0.92 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {item.video && (
          <motion.section {...sectionMotion} aria-labelledby="video-heading">
            <h2 id="video-heading" className="type-section text-body mb-4">
              Walkthrough
            </h2>
            <ListingVideoFacade
              src={item.video}
              poster={item.image}
              title={`${item.title} walkthrough`}
            />
          </motion.section>
        )}

        <motion.section {...sectionMotion} aria-labelledby="location-heading">
          <h2 id="location-heading" className="type-section text-body mb-4">
            Location
          </h2>
          <p className="type-body text-secondary-text mb-4">{item.address}</p>
          <MapSection
            markers={markers}
            center={positionArray}
            zoom={15}
            showLink={false}
            mapClassName="h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px]"
          />
        </motion.section>

        <section
          className="border-t border-header-stroke pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          aria-label="Next steps"
        >
          <div>
            <p className="type-subhead text-body">Interested in this listing?</p>
            <p className="type-caption text-secondary-text mt-1">
              Talk to 2% Company — we&apos;ll share availability and next steps.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href={ctaHref}
              className={`inline-flex items-center justify-center bg-primary text-on-primary font-semibold px-6 py-3 rounded-control hover:brightness-110 transition w-full sm:w-auto ${focusRing}`}
            >
              {ctaLabel}
            </Link>
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control border border-header-stroke text-secondary-text hover:text-body hover:border-primary/40 transition-colors w-full sm:w-auto ${focusRing}`}
            >
              <FaWhatsapp size={16} aria-hidden />
              WhatsApp
            </a>
          </div>
        </section>
      </div>
    </article>
  );
};

export default ListingDetail;
