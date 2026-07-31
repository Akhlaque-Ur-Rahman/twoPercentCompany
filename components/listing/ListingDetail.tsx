"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LatLng } from "leaflet";
import PropertyGallery from "@/components/PropertyGallery";
import MapPlaceholder from "@/components/MapPlaceholder";
import { PropertyItem } from "@/data/PropertyData";
import { MarkerType } from "@/types/MarkerType";

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
};

function toPositionArray(position: PropertyItem["position"]): [number, number] {
  if (position instanceof LatLng) {
    return [position.lat, position.lng];
  }
  return position as [number, number];
}

const ListingDetail: React.FC<ListingDetailProps> = ({
  item,
  ctaHref,
  ctaLabel,
  priceLabel = "Price",
  modeNote,
  specificationsTitle = "Specifications",
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const floorPlans = item.floorPlans ?? [];
  const positionArray = toPositionArray(item.position);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

  return (
    <section>
      {item.video && (
        <div className="relative w-full flex justify-center items-center bg-main-bg rounded-media overflow-hidden border border-header-stroke mb-6 lg:mb-12">
          <video
            className="max-w-full h-auto object-contain rounded-media"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={item.video} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="page-px section-y-sm">
        <h1 className="text-primary type-display">{item.title}</h1>
          {modeNote && (
          <p className="text-secondary-text italic type-caption mt-1">{modeNote}</p>
          )}
      </div>

      <div className="bg-main-bg page-px section-y-sm space-y-6 lg:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
          <div>
            <h2 className="type-subhead text-primary">Overview</h2>

            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {item.tags.map((tag, index) => {
                  const Icon = tag.icon;
                  return (
                    <div
                      key={`${tag.label}-${index}`}
                      className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-4 py-2 rounded-full type-caption font-medium"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tag.label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <p className="text-secondary-text type-body leading-relaxed mt-4">
              {item.longDescription || item.description}
            </p>
          </div>

          {item.specifications && item.specifications.length > 0 && (
            <div>
              <h2 className="type-subhead text-primary mb-4">{specificationsTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.specifications.map((spec, index) => (
                  <div
                    key={`${spec.label}-${index}`}
                    className="bg-primary/10 text-primary border border-primary/30 px-4 py-3 rounded-control"
                  >
                    <p className="font-medium">{spec.label}</p>
                    <p className="font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-6 items-start">
          <div>
            <h3 className="type-card-title text-primary">Address</h3>
            <p className="text-secondary-text type-body">{item.address}</p>
          </div>
          <div>
            <h3 className="type-card-title text-primary">{priceLabel}</h3>
            <p className="text-primary type-price">
              ₹{item.price}
            </p>
            <Link
              href={ctaHref}
              className="mt-4 inline-flex bg-primary text-on-primary font-semibold px-6 py-2 rounded-control hover:brightness-110 transition"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        {floorPlans.length > 0 && (
          <div>
            <h3 className="type-section text-primary mb-4">Floor Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {floorPlans.slice(0, 2).map((plan, index) => (
                <button
                  key={plan + index}
                  type="button"
                  className="relative overflow-hidden rounded-control text-left"
                  onClick={() => setSelected(plan)}
                >
                  <Image
                    src={plan}
                    alt={`Floor Plan ${index + 1}`}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </button>
              ))}

              {floorPlans[2] && (
                <button
                  type="button"
                  className="relative overflow-hidden rounded-control md:col-span-2 text-left"
                  onClick={() => setSelected(floorPlans[2])}
                >
                  <Image
                    src={floorPlans[2]}
                    alt="Floor Plan 3"
                    width={800}
                    height={600}
                    sizes="100vw"
                    className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </button>
              )}
            </div>

            <AnimatePresence>
              {selected && (
                <motion.div
                  className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelected(null)}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Floor plan preview"
                >
                  <motion.img
                    src={selected}
                    alt="Floor Plan Full"
                    className="max-w-full max-h-full rounded-control shadow-lg"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <PropertyGallery gallery={item.gallery || [item.image]} />

        <div className="w-full rounded-media overflow-hidden border border-header-stroke">
          <MapSection markers={markers} center={positionArray} zoom={15} showLink={false} />
        </div>
      </div>
    </section>
  );
};

export default ListingDetail;
