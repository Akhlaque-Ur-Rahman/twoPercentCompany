"use client";

import React, { useMemo, useState } from "react";
import ListingRowCard from "@/components/listing/ListingRowCard";
import type { ListingCardItem } from "@/components/listing/ListingCard";
import FilterSelect from "@/components/ui/FilterSelect";
import SearchField from "@/components/ui/SearchField";
import YoutubeFacade from "@/components/properties/YoutubeFacade";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const PAGE_SIZE = 9;

const TYPE_OPTIONS = [
  { label: "All types", value: "All" },
  { label: "Residential Plot", value: "Residential Plot" },
  { label: "Commercial Use", value: "Commercial Use" },
  { label: "Luxury Housing", value: "Luxury Housing" },
];

const FEATURE_OPTIONS = [
  "All",
  "Easy Access",
  "Prime Location",
  "Wide Roads",
  "Accessible Road",
  "Spacious Area",
] as const;

type PlotsPageClientProps = {
  listings: ListingCardItem[];
};

function hasTag(plot: ListingCardItem, value: string) {
  return plot.tags.some(
    (tag) => tag.label.toLowerCase() === value.toLowerCase()
  );
}

export default function PlotsPageClient({ listings }: PlotsPageClientProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFeature, setSelectedFeature] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const debouncedSearch = useDebouncedValue(searchText, 180);

  const filteredPlots = useMemo(() => {
    const searchLower = debouncedSearch.trim().toLowerCase();

    return listings.filter((plot) => {
      const matchesSearch =
        !searchLower ||
        plot.title.toLowerCase().includes(searchLower) ||
        plot.description.toLowerCase().includes(searchLower) ||
        plot.address?.toLowerCase().includes(searchLower) ||
        plot.tags.some((tag) =>
          tag.label.toLowerCase().includes(searchLower)
        );

      const matchesType =
        selectedType === "All" || hasTag(plot, selectedType);
      const matchesFeature =
        selectedFeature === "All" || hasTag(plot, selectedFeature);

      return matchesSearch && matchesType && matchesFeature;
    });
  }, [listings, debouncedSearch, selectedType, selectedFeature]);

  const visiblePlots = filteredPlots.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPlots.length;
  const resultLabel =
    filteredPlots.length === 1
      ? "1 plot"
      : `${filteredPlots.length} plots`;

  const clearFilters = () => {
    setSearchText("");
    setSelectedType("All");
    setSelectedFeature("All");
    setVisibleCount(PAGE_SIZE);
  };

  const onFilterChange = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div id="browse" className="scroll-mt-24 border-b border-header-stroke">
      <div className="relative page-px section-y">
        <div
          className="pointer-events-none absolute inset-0 opacity-90 bg-[radial-gradient(ellipse_at_top,rgba(143,115,48,0.1),transparent_55%)]"
          aria-hidden
        />

        <div className="relative space-y-8 lg:space-y-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="type-label text-primary font-semibold tracking-[0.14em]">
                Browse land
              </p>
              <h2 className="type-section text-body mt-2">
                Find your next plot
              </h2>
              <p className="text-secondary-text type-body mt-2 max-w-xl">
                Filter by plot type and location features — then open a listing
                for full details.
              </p>
            </div>
            <p
              className="type-caption text-secondary-text shrink-0"
              aria-live="polite"
            >
              {resultLabel}
            </p>
          </div>

          <YoutubeFacade
            title="Plot showcase"
            poster="/images/plot-plain.webp"
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
              <SearchField
                id="plot-search"
                label="Search plots"
                placeholder="Search by title, area, or feature..."
                value={searchText}
                onChange={(value) => {
                  setSearchText(value);
                  setVisibleCount(PAGE_SIZE);
                }}
                className="lg:flex-1"
              />

              <FilterSelect
                label="Plot type"
                className="w-full lg:w-[200px]"
                value={selectedType}
                onChange={onFilterChange(setSelectedType)}
                options={TYPE_OPTIONS}
              />
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by feature"
            >
              {FEATURE_OPTIONS.map((feature) => {
                const active = selectedFeature === feature;
                return (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => onFilterChange(setSelectedFeature)(feature)}
                    className={`px-3.5 py-2 rounded-control type-caption font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg ${
                      active
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-2nd-bg text-secondary-text border-header-stroke hover:border-primary/40 hover:text-body"
                    }`}
                  >
                    {feature === "All" ? "All features" : feature}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {visiblePlots.length > 0 ? (
              <>
                {visiblePlots.map((plot, index) => (
                  <ListingRowCard
                    key={plot.id}
                    property={plot}
                    href={`/plots/${plot.slug}`}
                    index={index}
                    priority={index < 2}
                  />
                ))}

                {hasMore && (
                  <div className="flex justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                      className="px-6 py-3 rounded-control border border-header-stroke bg-2nd-bg text-primary font-semibold type-body hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                    >
                      Load more plots
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center text-center gap-4 py-16 px-4 rounded-card border border-header-stroke bg-2nd-bg/60">
                <p className="type-card-title text-body">No plots match</p>
                <p className="text-secondary-text type-body max-w-md">
                  Try a different search, plot type, or feature — or clear
                  filters to see the full list.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-control bg-primary text-on-primary font-semibold type-body hover:brightness-110 transition"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
