"use client";

import React, { useState } from "react";
import { PropertyItem } from "@/data/PropertyData";
import { Search } from "lucide-react";
import ListingRowCard from "@/components/listing/ListingRowCard";
import FilterSelect from "@/components/ui/FilterSelect";
import HomeMap from "@/components/layout/HomeMap";
import { MarkerType } from "@/types/MarkerType";

type PlotsPageClientProps = {
  listings: PropertyItem[];
};

function toLatLng(position: PropertyItem["position"]): [number, number] {
  if (Array.isArray(position)) return position as [number, number];
  const p = position as { lat: number; lng: number };
  return [p.lat, p.lng];
}

export default function PlotsPageClient({ listings }: PlotsPageClientProps) {
  const [SearchText, setSearchText] = useState("");
  const [ActiveFilter, setActiveFilter] = useState("All");

  const Filters = [
    "All",
    "Residential Plot",
    "Commercial Plot",
    "Easy Access",
    "Prime Location",
    "Wide Roads",
    "Scenic View",
    "Luxury Housing",
  ];

  const FilteredPlots = listings.filter((plot: PropertyItem) => {
    const searchLower = SearchText.toLowerCase();
    const matchesSearch =
      plot.title.toLowerCase().includes(searchLower) ||
      plot.description.toLowerCase().includes(searchLower) ||
      plot.address?.toLowerCase().includes(searchLower) ||
      plot.tags.some((tag) => tag.label.toLowerCase().includes(searchLower));
    const matchesFilter =
      ActiveFilter === "All" ||
      plot.tags.some(
        (tag) => tag.label.toLowerCase() === ActiveFilter.toLowerCase()
      ) ||
      plot.type.toLowerCase() === ActiveFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const mapMarkers: MarkerType[] = FilteredPlots.map((plot) => ({
    id: plot.id,
    title: plot.title,
    slug: plot.slug,
    position: toLatLng(plot.position),
    image: plot.image,
    address: plot.address,
    type: "plot" as const,
    url: plot.url,
  }));

  const mapCenter = mapMarkers[0]
    ? (mapMarkers[0].position as [number, number])
    : ([25.5941, 85.1376] as [number, number]);

  return (
    <section>
      <div className="w-full mb-8 aspect-video relative rounded-media overflow-hidden border border-header-stroke">
        <iframe
          className="absolute inset-0 w-full h-full filter brightness-90 contrast-90"
          src="https://www.youtube.com/embed/Ht6YuFAxICs?autoplay=1&mute=1&loop=1&playlist=Ht6YuFAxICs&controls=0&modestbranding=1&rel=0"
          title="Plot Showcase"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      </div>

      <div className="bg-main-bg page-px section-y-sm lg:space-y-4 rounded-media">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-2nd-bg border-2 border-header-stroke px-4 py-3 rounded-control w-full lg:w-1/2">
            <Search className="text-primary" size={20} aria-hidden />
            <label htmlFor="plot-search" className="sr-only">
              Search plots
            </label>
            <input
              id="plot-search"
              type="text"
              placeholder="Search plots..."
              value={SearchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent outline-none w-full text-primary placeholder:text-secondary-text"
            />
          </div>

          <FilterSelect
            label="Filter plots"
            className="w-full lg:w-[220px]"
            value={ActiveFilter}
            onChange={setActiveFilter}
            options={Filters.map((f) => ({ label: f, value: f }))}
          />
        </div>

        <div className="flex flex-col gap-6">
          {FilteredPlots.length > 0 ? (
            FilteredPlots.map((plot, index) => (
              <ListingRowCard
                key={plot.id}
                property={plot}
                href={`/plots/${plot.slug}`}
                index={index}
              />
            ))
          ) : (
            <p className="text-secondary-text text-center">
              No Plots Match Your Search.
            </p>
          )}
        </div>
      </div>

      {mapMarkers.length > 0 && (
        <HomeMap
          markers={mapMarkers}
          center={mapCenter}
          zoom={13}
          showLink
          eyebrow="Land locations"
          title="Explore plots on the map"
          description="Browse verified residential and commercial plots across Patna. Scroll freely past the map — click it when you want to zoom."
          action={{ label: "Enquire about land", href: "/contact" }}
          className="page-px section-y border-t border-header-stroke"
        />
      )}
    </section>
  );
}
