import React from "react";
import HeroSection from "@/components/layout/HeroSection";
import IntentPathSection from "@/components/layout/IntentPathSection";
import FeaturedPropertySection from "@/components/layout/FeaturedPropertySection";
import FeaturedLandSection from "@/components/layout/FeaturedLandSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTA from "@/components/CTA";
import HomeMap from "@/components/layout/HomeMap";
import { getListings } from "@/lib/listings";
import { MarkerType } from "@/types/MarkerType";

export default async function Home() {
  const listings = await getListings();
  const markers: MarkerType[] = listings.map((item) => ({
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
      <IntentPathSection />
      <FeaturedPropertySection />
      <FeaturedLandSection />
      <TestimonialSection />
      <HomeMap markers={markers} />
      <CTA />
    </div>
  );
}
