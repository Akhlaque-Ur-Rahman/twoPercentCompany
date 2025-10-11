"use client";

import React, { useState } from "react";
import { use } from "react"; // for unwrapping params promise
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import PropertyGallery from "@/components/PropertyGallery";
import { PropertyData, PropertyItem } from "@/data/PropertyData";
import { MarkerType } from "@/types/MarkerType";
import { LatLng } from "leaflet";
import Image from "next/image";

const MapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false,
});

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export default function PropertyPage(props: PropertyPageProps) {
  const [selected, setSelected] = useState<string | null>(null);

  // Unwrap the params promise
  const { slug } = use(props.params);

  const property: PropertyItem | undefined = PropertyData.find(
    (p) => p.slug === slug
  );

  if (!property) return notFound();

  const floorPlans = property.floorPlans ?? [];

  // Convert Leaflet LatLngExpression to [number, number]
  const positionArray: [number, number] =
    property.position instanceof LatLng
      ? [property.position.lat, property.position.lng]
      : (property.position as [number, number]);

  const markers: MarkerType[] = [
    {
      id: property.id,
      title: property.title,
      slug: property.slug,
      position: positionArray,
      image: property.image,
      address: property.address,
      type: property.type,
    },
  ];

  return (
    <section>
      <Navbar />

      {/* Gallery Section */}
      <PropertyGallery gallery={property.gallery || [property.image]} />

      {/* Property Details */}
      <div className="bg-main-bg text-white px-6 sm:px-6 lg:px-[40px] py-6 lg:py-[16px] space-y-6 lg:space-y-12">
        <h1 className="text-primary font-bold text-[clamp(24px,4vw,48px)]">
          {property.title}
        </h1>

        {/* Overview */}
        <h2 className="text-[clamp(20px,2.5vw,32px)] text-primary font-semibold">
          Overview
        </h2>
        {property.tags && property.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {property.tags.map((tag, index) => {
              const Icon = tag.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-4 py-2 rounded-full text-[clamp(13px,1.4vw,16px)] font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span>{tag.label}</span>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-secondary-text text-[clamp(14px,1.6vw,18px)] leading-relaxed mt-4">
          {property.longDescription || property.description}
        </p>

        {/* Address & Price */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 items-start">
          <div>
            <h3 className="font-semibold text-primary text-[clamp(18px,2vw,24px)]">
              Address
            </h3>
            <p className="text-secondary-text">{property.address}</p>
          </div>
          <div>
            <h3 className="font-semibold text-primary text-[clamp(18px,2vw,24px)]">Price</h3>
            <p className="text-primary font-bold text-[clamp(20px,2.5vw,28px)]">
              ₹{property.price}
            </p>

            <a
              href="/contact"
              className="mt-4 inline-block bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* ========================== */}
        {/* FLOOR PLAN SECTION */}
        {/* ========================== */}
        {floorPlans.length > 0 && (
          <div className="floorplan">
            <h3 className="font-semibold text-primary text-[clamp(24px,4vw,48px)] mb-4">Floor Plan</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {floorPlans.slice(0, 2).map((plan, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-[12px] cursor-pointer"
                  onClick={() => setSelected(plan)}
                >
                  <Image
                    src={plan}
                    alt={`Floor Plan ${index + 1}`}
                    width={800} // set approximate width
                    height={600} // set approximate height
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}

              {floorPlans[2] && (
                <div
                  className="relative overflow-hidden rounded-[12px] md:col-span-2 cursor-pointer"
                  onClick={() => setSelected(floorPlans[2])}
                >
                  <Image
                    src={floorPlans[2]}
                    width={800} // set approximate width
                    height={600} // set approximate height
                    alt="Floor Plan 3"
                    className="w-full h-[300px] sm:h-[400px] md:h-[400px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
            </div>

            {/* Fullscreen Popup */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelected(null)}
                >
                  <motion.img
                    src={selected}
                    alt="Floor Plan Full"
                    className="max-w-full max-h-full rounded-lg shadow-lg"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Map Section */}
        <div className="w-full h-[400px] rounded-[16px] overflow-hidden border border-header-stroke">
          <MapSection
            markers={markers}
            center={positionArray}
            zoom={15}
            showLink={false}
          />
        </div>
      </div>

      <Footer />
    </section>
  );
}
