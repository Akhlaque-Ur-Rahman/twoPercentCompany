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

interface PlotPageProps {
  params: Promise<{ slug: string }>;
}

export default function PlotPage(props: PlotPageProps) {
  const [selected, setSelected] = useState<string | null>(null);

  // Unwrap the params promise
  const { slug } = use(props.params);

  const plot: PropertyItem | undefined = PropertyData.find(
    (p) => p.slug === slug && p.type === "plot"
  );

  if (!plot) return notFound();

  const floorPlans = plot.floorPlans ?? [];

  // Convert Leaflet LatLngExpression to [number, number]
  const positionArray: [number, number] =
    plot.position instanceof LatLng
      ? [plot.position.lat, plot.position.lng]
      : (plot.position as [number, number]);

  const markers: MarkerType[] = [
    {
      id: plot.id,
      title: plot.title,
      slug: plot.slug,
      position: positionArray,
      image: plot.image,
      address: plot.address,
      type: plot.type,
    },
  ];

  return (
    <section>
      <Navbar />

      {/* Video Section */}
      {plot.video && (
        <div className="relative w-full flex justify-center items-center bg-black rounded-[16px] overflow-hidden border border-header-stroke mb-6 lg:mb-12">
          <video
            className="max-w-full h-auto object-contain rounded-[16px]"
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src={plot.video} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="px-6 sm:px-6 lg:px-[40px] py-6">
        <h1 className="text-primary font-bold text-[clamp(24px,4vw,48px)]">
          {plot.title}
        </h1>
      </div>

      {/* Plot Details */}
      <div className="bg-main-bg text-white px-6 sm:px-6 lg:px-[40px] py-6 lg:py-[16px] space-y-6 lg:space-y-12">
        
        {/* ========================== */}
        {/* GALLERY */}
        {/* ========================== */}
        

        {/* ========================== */}
        {/* OVERVIEW + SPECIFICATIONS */}
        {/* ========================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
          {/* Left Column – Overview */}
          <div>
            <h2 className="text-[clamp(20px,2.5vw,32px)] text-primary font-semibold">
              Overview
            </h2>

            {/* Tags */}
            {plot.tags && plot.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {plot.tags.map((tag, index) => {
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

            {/* Description */}
            <p className="text-secondary-text text-[clamp(14px,1.6vw,18px)] leading-relaxed mt-4">
              {plot.longDescription || plot.description}
            </p>
          </div>

          {/* Right Column – Plot Specifications */}
          {plot.specifications && plot.specifications.length > 0 && (
            <div>
              <h2 className="text-[clamp(20px,2.5vw,32px)] text-primary font-semibold mb-4">
                Plot Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {plot.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="bg-primary/10 text-primary border border-primary/30 px-4 py-3 rounded-lg"
                  >
                    <p className="font-medium">{spec.label}</p>
                    <p className="font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================== */}
        {/* ADDRESS & PRICE */}
        {/* ========================== */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 items-start">
          <div>
            <h3 className="font-semibold text-primary text-[clamp(18px,2vw,24px)]">
              Address
            </h3>
            <p className="text-secondary-text">{plot.address}</p>
          </div>
          <div>
            <h3 className="font-semibold text-primary text-[clamp(18px,2vw,24px)]">
              Price
            </h3>
            <p className="text-primary font-bold text-[clamp(20px,2.5vw,28px)]">
              ₹{plot.price}
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
            <h3 className="font-semibold text-primary text-[48px] mb-4">
              Floor Plan
            </h3>

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
                    width={800}
                    height={600}
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
                    alt="Floor Plan 3"
                    width={800}
                    height={600}
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

        <PropertyGallery gallery={plot.gallery || [plot.image]} />

        
        {/* ========================== */}
        {/* MAP SECTION */}
        {/* ========================== */}
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
