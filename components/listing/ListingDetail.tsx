"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import PropertyGallery from "@/components/PropertyGallery";
import MapPlaceholder from "@/components/MapPlaceholder";
import ListingDetailHero from "@/components/listing/ListingDetailHero";
import ListingFloorPlans from "@/components/listing/ListingFloorPlans";
import ListingOverview from "@/components/listing/ListingOverview";
import ListingVideoFacade from "@/components/listing/ListingVideoFacade";
import ScheduleVisit from "@/components/listing/ScheduleVisit";
import ShareListing from "@/components/listing/ShareListing";
import SaveListingButton from "@/components/listing/SaveListingButton";
import CompareListingButton from "@/components/listing/CompareListingButton";
import PrintListingButton from "@/components/listing/PrintListingButton";
import SimilarListings from "@/components/listing/SimilarListings";
import EmiCalculator from "@/components/listing/EmiCalculator";
import ListingSectionNav from "@/components/listing/ListingSectionNav";
import ListingQuickStats from "@/components/listing/ListingQuickStats";
import ListingFeatures from "@/components/listing/ListingFeatures";
import ListingVirtualTour from "@/components/listing/ListingVirtualTour";
import ListingExpertCard from "@/components/listing/ListingExpertCard";
import ListingEnquireForm from "@/components/listing/ListingEnquireForm";
import SectionHeader from "@/components/ui/SectionHeader";
import type { PropertyItem } from "@/data/PropertyData";
import type { MarkerType } from "@/types/MarkerType";
import { formatPrice, formatPriceExact, formatPricePerSqFt } from "@/lib/formatPrice";
import { listingEnquiryMessage, whatsappHref } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { FaWhatsapp } from "react-icons/fa";
import { MapPin } from "lucide-react";

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
  similar?: PropertyItem[];
  similarHrefFor?: (item: PropertyItem) => string;
};

/** Avoid importing leaflet here — it touches `window` and breaks SSR/prerender. */
function toPositionArray(position: PropertyItem["position"]): [number, number] {
  if (Array.isArray(position)) {
    return [Number(position[0]), Number(position[1])];
  }
  if (
    position &&
    typeof position === "object" &&
    "lat" in position &&
    "lng" in position
  ) {
    const { lat, lng } = position as { lat: number; lng: number };
    return [lat, lng];
  }
  return [0, 0];
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
  similar = [],
  similarHrefFor,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const floorPlans = item.floorPlans ?? [];
  const features = item.features ?? [];
  const positionArray = toPositionArray(item.position);

  const resolvedBackHref =
    backHref ?? (item.type === "plot" ? "/plots" : "/properties");
  const resolvedBackLabel =
    backLabel ?? (item.type === "plot" ? "All plots" : "All homes");

  const listingUrl =
    item.url ??
    `https://www.2percentcompany.in/${
      item.type === "plot" ? "plots" : "properties"
    }/${item.slug}`;
  const defaultSimilarHref = (s: PropertyItem) =>
    s.type === "plot" ? `/plots/${s.slug}` : `/properties/${s.slug}`;
  const hrefForSimilar = similarHrefFor ?? defaultSimilarHref;
  const listingPath = hrefForSimilar(item);
  const enquireHref = whatsappHref(listingEnquiryMessage(item.title, listingUrl));
  const pricePerSqFt = formatPricePerSqFt(item.price, item.specifications);

  const markers: MarkerType[] = [
    {
      id: item.id,
      title: item.title,
      slug: item.slug,
      position: positionArray,
      image: item.image,
      address: item.address,
      type: item.type,
      url: listingPath,
      price: item.price,
    },
  ];

  const navItems = useMemo(() => {
    const items: { id: string; label: string }[] = [
      { id: "gallery", label: "Gallery" },
      { id: "overview", label: "Overview" },
    ];
    if (features.length) items.push({ id: "features", label: "Features" });
    if (item.specifications?.length) {
      items.push({ id: "specifications", label: "Details" });
    }
    if (floorPlans.length) items.push({ id: "floor-plans", label: "Floor plans" });
    items.push({ id: "visit", label: "Visit" });
    if (item.type === "property") items.push({ id: "emi", label: "EMI" });
    if (item.video) items.push({ id: "video", label: "Video" });
    if (item.virtualTourUrl) items.push({ id: "virtual-tour", label: "360°" });
    items.push({ id: "contact", label: "Contact" });
    items.push({ id: "map", label: "Map" });
    if (similar.length) items.push({ id: "similar", label: "Similar" });
    return items;
  }, [
    features.length,
    floorPlans.length,
    item.specifications?.length,
    item.type,
    item.video,
    item.virtualTourUrl,
    similar.length,
  ]);

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

        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="min-w-0 flex-1">
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
              {pricePerSqFt && (
                <p className="type-caption text-secondary-text mt-1">{pricePerSqFt}</p>
              )}
              <p className="type-caption text-secondary-text mt-2 max-w-xl">
                {item.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0 sm:items-center sm:flex-wrap">
              <SaveListingButton
                id={item.id}
                type={item.type}
                slug={item.slug}
                title={item.title}
                image={item.image}
                price={item.price}
                href={listingPath}
                address={item.address}
                variant="label"
              />
              <CompareListingButton
                id={item.id}
                type={item.type}
                slug={item.slug}
                title={item.title}
                image={item.image}
                price={item.price}
                href={listingPath}
                address={item.address}
                tags={item.tags}
                specifications={item.specifications}
                features={item.features}
                variant="label"
              />
              <ShareListing title={item.title} url={listingUrl} />
              <PrintListingButton />
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

          <ListingQuickStats item={item} />
        </div>
      </div>

      <div className="page-px">
        <ListingSectionNav items={navItems} />
      </div>

      <div className="page-px section-y space-y-14 lg:space-y-20">
        <motion.section
          {...sectionMotion}
          id="gallery"
          aria-labelledby="gallery-heading"
          className="scroll-mt-28"
        >
          <h2 id="gallery-heading" className="type-section text-body mb-4">
            Gallery
          </h2>
          <PropertyGallery gallery={item.gallery || [item.image]} />
        </motion.section>

        <motion.section
          {...sectionMotion}
          id="overview"
          aria-labelledby="overview-heading"
          className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-start"
        >
          <ListingOverview
            item={item}
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
            enquireHref={enquireHref}
            priceLabel={priceLabel}
          />

          {item.specifications && item.specifications.length > 0 && (
            <div id="specifications" className="scroll-mt-28 lg:sticky lg:top-28">
              <h2 className="type-subhead text-body mb-1">
                {specificationsTitle}
              </h2>
              <p className="type-caption text-secondary-text mb-4">
                Facts to verify before you visit.
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.specifications.map((spec, index) => (
                  <div
                    key={`${spec.label}-${index}`}
                    className="border-b border-header-stroke py-3"
                  >
                    <dt className="type-caption text-secondary-text">
                      {spec.label}
                    </dt>
                    <dd className="type-body text-body font-medium mt-0.5">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </motion.section>

        {features.length > 0 && (
          <motion.div {...sectionMotion}>
            <ListingFeatures features={features} />
          </motion.div>
        )}

        {floorPlans.length > 0 && (
          <motion.div
            {...sectionMotion}
            id="floor-plans"
            className="scroll-mt-28"
          >
            <ListingFloorPlans
              item={item}
              plans={floorPlans}
              ctaHref={ctaHref}
              ctaLabel={ctaLabel}
            />
          </motion.div>
        )}

        <motion.div {...sectionMotion} id="visit" className="scroll-mt-28">
          <ScheduleVisit title={item.title} listingUrl={listingUrl} />
        </motion.div>

        {item.type === "property" && (
          <motion.div {...sectionMotion} id="emi" className="scroll-mt-28">
            <EmiCalculator price={item.price} />
          </motion.div>
        )}

        {item.video && (
          <motion.section
            {...sectionMotion}
            id="video"
            aria-labelledby="video-heading"
            className="scroll-mt-28"
          >
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

        {item.virtualTourUrl && (
          <motion.div {...sectionMotion}>
            <ListingVirtualTour url={item.virtualTourUrl} />
          </motion.div>
        )}

        <motion.div
          {...sectionMotion}
          id="contact"
          className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:items-start"
        >
          {item.expert && (
            <ListingExpertCard
              expert={item.expert}
              listingTitle={item.title}
              listingUrl={listingUrl}
            />
          )}
          <ListingEnquireForm
            title={item.title}
            listingUrl={listingUrl}
            expertPhone={item.expert?.phone}
          />
        </motion.div>

        <motion.section
          {...sectionMotion}
          id="map"
          aria-label="Location"
          className="scroll-mt-28 flex flex-col gap-6 lg:gap-8"
        >
          <div className="space-y-2">
            <p className="type-label text-primary">Location</p>
            <SectionHeader
              title={
                item.type === "plot"
                  ? "See this plot on the map"
                  : "See this home on the map"
              }
              description={`${item.address}. Scroll freely past the map — click it when you want to zoom.`}
              action={{
                label:
                  item.type === "plot" ? "View all plots" : "View all homes",
                href: resolvedBackHref,
              }}
              actionVariant="secondary"
              actionAlwaysVisible
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 type-caption text-secondary-text">
            <span className="inline-flex items-center gap-2">
              <span
                className={`size-2.5 rounded-full shrink-0 ${
                  item.type === "plot" ? "bg-emerald-600" : "bg-primary"
                }`}
                aria-hidden
              />
              {item.type === "plot" ? "Plot" : "Property"} on map
            </span>
            <span className="inline-flex items-center gap-1.5 min-w-0">
              <MapPin size={14} className="text-primary/80 shrink-0" aria-hidden />
              <span className="truncate">{item.address}</span>
            </span>
          </div>

          <MapSection
            markers={markers}
            center={positionArray}
            zoom={15}
            showLink={false}
            pricePins
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

        {similar.length > 0 && (
          <motion.div
            {...sectionMotion}
            id="similar"
            className="scroll-mt-28 border-t border-header-stroke pt-10"
          >
            <SimilarListings items={similar} hrefFor={hrefForSimilar} />
          </motion.div>
        )}
      </div>
    </article>
  );
};

export default ListingDetail;
