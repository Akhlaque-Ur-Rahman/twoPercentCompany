"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ListingRowCard from "@/components/listing/ListingRowCard";
import type { ListingCardItem } from "@/components/listing/ListingCard";
import FilterSelect from "@/components/ui/FilterSelect";
import YoutubeFacade from "@/components/properties/YoutubeFacade";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const PAGE_SIZE = 9;

const TYPE_OPTIONS = [
  { label: "All types", value: "All" },
  { label: "Apartment", value: "Apartment" },
  { label: "Villa", value: "Villa" },
  { label: "Independent House", value: "Independent House" },
  { label: "Studio", value: "Studio" },
];

const BHK_OPTIONS = ["All", "1BHK", "2BHK", "3BHK", "4BHK", "5BHK"] as const;

const AMENITY_OPTIONS = [
  { label: "All amenities", value: "All" },
  { label: "Furnished", value: "Furnished" },
  { label: "Parking", value: "Parking" },
  { label: "Backyard", value: "Backyard" },
  { label: "City Center", value: "City Center" },
];

type PropertiesPageClientProps = {
  listings: ListingCardItem[];
};

function hasTag(property: ListingCardItem, value: string) {
  return property.tags.some(
    (tag) => tag.label.toLowerCase() === value.toLowerCase()
  );
}

export default function PropertiesPageClient({
  listings,
}: PropertiesPageClientProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBhk, setSelectedBhk] = useState<string>("All");
  const [selectedAmenity, setSelectedAmenity] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const debouncedSearch = useDebouncedValue(searchText, 180);

  const filteredProperties = useMemo(() => {
    const searchLower = debouncedSearch.trim().toLowerCase();

    return listings.filter((property) => {
      const matchesSearch =
        !searchLower ||
        property.title.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower) ||
        property.address?.toLowerCase().includes(searchLower) ||
        property.tags.some((tag) =>
          tag.label.toLowerCase().includes(searchLower)
        );

      const matchesType =
        selectedType === "All" || hasTag(property, selectedType);
      const matchesBhk =
        selectedBhk === "All" || hasTag(property, selectedBhk);
      const matchesAmenity =
        selectedAmenity === "All" || hasTag(property, selectedAmenity);

      return matchesSearch && matchesType && matchesBhk && matchesAmenity;
    });
  }, [listings, debouncedSearch, selectedType, selectedBhk, selectedAmenity]);

  const visibleProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;
  const resultLabel =
    filteredProperties.length === 1
      ? "1 home"
      : `${filteredProperties.length} homes`;

  const clearFilters = () => {
    setSearchText("");
    setSelectedType("All");
    setSelectedBhk("All");
    setSelectedAmenity("All");
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
                Browse homes
              </p>
              <h2 className="type-section text-body mt-2">
                Find your next residence
              </h2>
              <p className="text-secondary-text type-body mt-2 max-w-xl">
                Filter by layout, home type, and amenities — then open a listing
                for full details.
              </p>
            </div>
            <p className="type-caption text-secondary-text shrink-0" aria-live="polite">
              {resultLabel}
            </p>
          </div>

          <YoutubeFacade title="Property showcase" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
              <div className="flex items-center gap-2 bg-2nd-bg border border-header-stroke px-4 py-3 rounded-control w-full lg:flex-1 focus-within:border-primary">
                <Search className="text-primary shrink-0" size={20} aria-hidden />
                <label htmlFor="property-search" className="sr-only">
                  Search properties
                </label>
                <input
                  id="property-search"
                  type="text"
                  placeholder="Search by title, area, or amenity..."
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="bg-transparent outline-none w-full text-body placeholder:text-secondary-text focus-visible:ring-0"
                />
              </div>

              <FilterSelect
                label="Property type"
                className="w-full lg:w-[200px]"
                value={selectedType}
                onChange={onFilterChange(setSelectedType)}
                options={TYPE_OPTIONS}
              />

              <FilterSelect
                label="Amenities"
                className="w-full lg:w-[200px]"
                value={selectedAmenity}
                onChange={onFilterChange(setSelectedAmenity)}
                options={AMENITY_OPTIONS}
              />
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by BHK"
            >
              {BHK_OPTIONS.map((bhk) => {
                const active = selectedBhk === bhk;
                return (
                  <button
                    key={bhk}
                    type="button"
                    onClick={() => onFilterChange(setSelectedBhk)(bhk)}
                    className={`px-3.5 py-2 rounded-control type-caption font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg ${
                      active
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-2nd-bg text-secondary-text border-header-stroke hover:border-primary/40 hover:text-body"
                    }`}
                  >
                    {bhk === "All" ? "All BHK" : bhk}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {visibleProperties.length > 0 ? (
              <>
                {visibleProperties.map((property, index) => (
                  <ListingRowCard
                    key={property.id}
                    property={property}
                    href={`/properties/${property.slug}`}
                    index={index}
                    priority={index < 2}
                  />
                ))}

                {hasMore && (
                  <div className="flex justify-center pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((n) => n + PAGE_SIZE)
                      }
                      className="px-6 py-3 rounded-control border border-header-stroke bg-2nd-bg text-primary font-semibold type-body hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                    >
                      Load more homes
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center text-center gap-4 py-16 px-4 rounded-card border border-header-stroke bg-2nd-bg/60">
                <p className="type-card-title text-body">No homes match</p>
                <p className="text-secondary-text type-body max-w-md">
                  Try a different search, BHK, or amenity — or clear filters to
                  see the full list.
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
