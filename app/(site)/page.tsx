import React from "react";
import HeroSection from "@/components/layout/HeroSection";
import IntentPathSection from "@/components/layout/IntentPathSection";
import CategoryBrowseSection from "@/components/layout/CategoryBrowseSection";
import ExploreLocalitiesSection from "@/components/layout/ExploreLocalitiesSection";
import FeaturedPropertySection from "@/components/layout/FeaturedPropertySection";
import FeaturedLandSection from "@/components/layout/FeaturedLandSection";
import HomeInquirySection from "@/components/layout/HomeInquirySection";
import TeamStrip from "@/components/TeamStrip";
import TestimonialSection from "@/components/TestimonialSection";
import CTA from "@/components/CTA";
import HomeMap from "@/components/layout/HomeMap";
import { getListings } from "@/lib/listings";
import { getTeamMembers } from "@/lib/team";
import { MarkerType } from "@/types/MarkerType";

export default async function Home() {
  const [listings, team] = await Promise.all([
    getListings(),
    getTeamMembers(),
  ]);
  const markers: MarkerType[] = listings.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    position: item.position,
    image: item.image,
    address: item.address,
    type: item.type,
    url:
      item.url ??
      (item.type === "plot"
        ? `/plots/${item.slug}`
        : `/properties/${item.slug}`),
    price: item.price,
  }));

  return (
    <div>
      <HeroSection />
      <IntentPathSection />
      <CategoryBrowseSection listings={listings} />
      <ExploreLocalitiesSection listings={listings} />
      <FeaturedPropertySection />
      <FeaturedLandSection />
      <TeamStrip members={team} />
      <HomeInquirySection />
      <TestimonialSection />
      <HomeMap markers={markers} />
      <CTA />
    </div>
  );
}
