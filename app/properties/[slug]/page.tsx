"use client";

import React from "react";
import { use } from "react"; // for unwrapping params promise
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import PropertyGallery from "@/components/PropertyGallery";
import { PropertyData, PropertyItem } from "@/data/PropertyData";
import { MarkerType } from "@/types/MarkerType";
import { LatLng } from "leaflet";

const MapSection = dynamic(() => import("@/components/MapSection"), { ssr: false });

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export default function PropertyPage(props: PropertyPageProps) {
  // Unwrap the params promise
  const { slug } = use(props.params);

  const property: PropertyItem | undefined = PropertyData.find(
    (p) => p.slug === slug
  );

  if (!property) return notFound();

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

      {/* Property Details */}
      <div className="bg-main-bg text-white px-6 sm:px-6 lg:px-[40px] py-6 lg:py-[16px] space-y-6 lg:space-y-12">
        <h1 className="text-white font-bold text-[clamp(24px,4vw,48px)]">
          {property.title}
        </h1>

        {/* Gallery */}
        <PropertyGallery gallery={property.gallery || [property.image]} />

        {/* Overview */}
        <h2 className="text-[clamp(20px,2.5vw,32px)] font-semibold">Overview</h2>
        <p className="text-secondary-text text-[clamp(14px,1.6vw,18px)] leading-relaxed">
          {property.longDescription || property.description}
        </p>

        {/* Address & Price */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 items-start">
          <div>
            <h3 className="font-semibold text-[clamp(18px,2vw,24px)]">Address</h3>
            <p className="text-secondary-text">{property.address}</p>
          </div>
          <div>
            <h3 className="font-semibold text-[clamp(18px,2vw,24px)]">Price</h3>
            <p className="text-primary font-bold text-[clamp(20px,2.5vw,28px)]">
              ₹{property.price}
            </p>

            {/* Contact CTA */}
            <a
              href="/contact"
              className="mt-4 inline-block bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[400px] rounded-[16px] overflow-hidden border border-header-stroke">
          <MapSection markers={markers} center={positionArray} zoom={15} showLink={false} />
        </div>
      </div>

      <Footer />
    </section>
  );
}
