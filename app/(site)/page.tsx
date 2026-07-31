"use client";

import dynamic from "next/dynamic";
import React from "react";
import HeroSection from "@/components/layout/HeroSection";
import HomeCTASection from "@/components/layout/HomeCTASection";
import FeaturedPropertySection from "@/components/layout/FeaturedPropertySection";
import FeaturedLandSection from "@/components/layout/FeaturedLandSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTA from "@/components/CTA";
import { PropertyData } from "@/data/PropertyData";
import { MarkerType } from "@/types/MarkerType";
import MapPlaceholder from "@/components/MapPlaceholder";

const MapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

const Home: React.FC = () => {
  const markers: MarkerType[] = PropertyData.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    position: item.position,
    image: item.image,
    address: item.address,
    type: item.type,
    url: item.url,
  }));

  return (
    <div>
      <HeroSection />
      <HomeCTASection />
      <FeaturedPropertySection />
      <FeaturedLandSection />
      <TestimonialSection />
      <MapSection markers={markers} center={[25.5941, 85.1376]} zoom={13} showLink={true} />
      <CTA />
    </div>
  );
};

export default Home;
