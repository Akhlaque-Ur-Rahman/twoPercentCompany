"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ListingRowCard from "@/components/listing/ListingRowCard";
import ListingCard from "@/components/listing/ListingCard";
import ListingHalfMap from "@/components/listing/ListingHalfMap";
import ListingToolbar, {
  type ListingLayoutMode,
} from "@/components/listing/ListingToolbar";
import ActiveFilterChips, {
  budgetChipLabel,
  locationChipLabel,
} from "@/components/listing/ActiveFilterChips";
import type { ListingCardItem } from "@/components/listing/ListingCard";
import FilterSelect from "@/components/ui/FilterSelect";
import SearchField from "@/components/ui/SearchField";
import YoutubeFacade from "@/components/properties/YoutubeFacade";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  type ListingSortKey,
  buildListingQuery,
  matchesBudget,
  matchesLocation,
  matchesTypeTag,
  sortListings,
  typeFilterToParam,
  typeParamToFilter,
} from "@/lib/listingFilters";

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
  const needle = value.toLowerCase();
  if (property.tags.some((tag) => tag.label.toLowerCase().includes(needle))) {
    return true;
  }
  // Soft aliases (hero Villa ↔ Independent House)
  if (needle === "villa") {
    return property.tags.some((tag) =>
      /independent house|bungalow|villa/i.test(tag.label)
    );
  }
  if (needle === "independent house") {
    return property.tags.some((tag) => /villa|independent house/i.test(tag.label));
  }
  return false;
}

function PropertiesBrowse({ listings }: PropertiesPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipUrlWrite = useRef(false);

  const [searchText, setSearchText] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [selectedType, setSelectedType] = useState(() => {
    const t = searchParams.get("type");
    if (!t) return "All";
    const mapped = typeParamToFilter(t);
    return /bhk/i.test(mapped) ? "All" : mapped;
  });
  const [selectedBhk, setSelectedBhk] = useState(() => {
    const t = searchParams.get("type");
    if (!t) return "All";
    const mapped = typeParamToFilter(t);
    return /bhk/i.test(mapped) ? mapped : "All";
  });
  const [selectedAmenity, setSelectedAmenity] = useState(
    () => searchParams.get("amenity") ?? "All"
  );
  const [location, setLocation] = useState(
    () => searchParams.get("location") ?? ""
  );
  const [budget, setBudget] = useState(
    () => searchParams.get("budget") ?? "any"
  );
  const [sort, setSort] = useState<ListingSortKey>(() => {
    const s = searchParams.get("sort");
    return s === "price-asc" ||
      s === "price-desc" ||
      s === "newest" ||
      s === "featured"
      ? s
      : "default";
  });
  const [layout, setLayout] = useState<ListingLayoutMode>("list");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // External URL changes (hero / back button)
  useEffect(() => {
    skipUrlWrite.current = true;
    setSearchText(searchParams.get("q") ?? "");
    setLocation(searchParams.get("location") ?? "");
    setBudget(searchParams.get("budget") ?? "any");
    setSelectedAmenity(searchParams.get("amenity") ?? "All");
    const t = searchParams.get("type");
    if (t) {
      const mapped = typeParamToFilter(t);
      if (/bhk/i.test(mapped)) {
        setSelectedBhk(mapped);
        setSelectedType("All");
      } else {
        setSelectedType(mapped);
        setSelectedBhk("All");
      }
    } else {
      setSelectedType("All");
      setSelectedBhk("All");
    }
    const s = searchParams.get("sort");
    setSort(
      s === "price-asc" ||
        s === "price-desc" ||
        s === "newest" ||
        s === "featured"
        ? s
        : "default"
    );
    setVisibleCount(PAGE_SIZE);
  }, [searchParams]);

  // Write filters back to URL
  useEffect(() => {
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false;
      return;
    }
    const typeParam =
      selectedBhk !== "All"
        ? typeFilterToParam(selectedBhk)
        : selectedType !== "All"
          ? typeFilterToParam(selectedType)
          : null;
    const qs = buildListingQuery({
      location: location || null,
      type: typeParam,
      budget: budget !== "any" ? budget : null,
      amenity: selectedAmenity !== "All" ? selectedAmenity : null,
      q: searchText.trim() || null,
      sort: sort !== "default" ? sort : null,
    });
    const next = `${pathname}${qs}`;
    const current = `${pathname}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    if (next !== current) {
      router.replace(next, { scroll: false });
    }
  }, [
    location,
    selectedType,
    selectedBhk,
    selectedAmenity,
    budget,
    searchText,
    sort,
    pathname,
    router,
    searchParams,
  ]);

  const debouncedSearch = useDebouncedValue(searchText, 180);

  const filteredProperties = useMemo(() => {
    const searchLower = debouncedSearch.trim().toLowerCase();

    const filtered = listings.filter((property) => {
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
      const matchesLoc = matchesLocation(property.address ?? "", location);
      const matchesBud = matchesBudget(property.price, budget);

      // Also match hero type param against tags loosely
      const typeFromUrl = searchParams.get("type");
      const matchesHeroType =
        !typeFromUrl ||
        selectedType !== "All" ||
        selectedBhk !== "All" ||
        matchesTypeTag(property.tags, typeFromUrl, property.title);

      return (
        matchesSearch &&
        matchesType &&
        matchesBhk &&
        matchesAmenity &&
        matchesLoc &&
        matchesBud &&
        matchesHeroType
      );
    });

    return sortListings(filtered, sort);
  }, [
    listings,
    debouncedSearch,
    selectedType,
    selectedBhk,
    selectedAmenity,
    location,
    budget,
    sort,
    searchParams,
  ]);

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
    setLocation("");
    setBudget("any");
    setSort("default");
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
          </div>

          {layout === "list" && <YoutubeFacade title="Property showcase" />}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
              <SearchField
                id="property-search"
                label="Search properties"
                placeholder="Search by title, area, or amenity..."
                value={searchText}
                onChange={(value) => {
                  setSearchText(value);
                  setVisibleCount(PAGE_SIZE);
                }}
                className="lg:flex-1"
              />

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

            <ActiveFilterChips
              chips={[
                ...(location
                  ? [
                      {
                        id: "location",
                        label: locationChipLabel(location),
                        onClear: () => {
                          setLocation("");
                          setVisibleCount(PAGE_SIZE);
                        },
                      },
                    ]
                  : []),
                ...(budget !== "any"
                  ? [
                      {
                        id: "budget",
                        label: budgetChipLabel(budget),
                        onClear: () => {
                          setBudget("any");
                          setVisibleCount(PAGE_SIZE);
                        },
                      },
                    ]
                  : []),
              ]}
            />

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

          <ListingToolbar
            resultLabel={resultLabel}
            sort={sort}
            onSortChange={(v) => {
              setSort(v);
              setVisibleCount(PAGE_SIZE);
            }}
            layout={layout}
            onLayoutChange={setLayout}
          />

          <div className="flex flex-col gap-6">
            {visibleProperties.length > 0 ? (
              layout === "list" ? (
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
                <>
                  <div className="lg:hidden space-y-4">
                    <ListingHalfMap
                      listings={filteredProperties}
                      hrefFor={(item) => `/properties/${item.slug}`}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {visibleProperties.map((property, index) => (
                        <ListingCard
                          key={property.id}
                          property={property}
                          href={`/properties/${property.slug}`}
                          index={index}
                          compact
                        />
                      ))}
                    </div>
                    {hasMore && (
                      <div className="flex justify-center pt-2">
                        <button
                          type="button"
                          onClick={() =>
                            setVisibleCount((n) => n + PAGE_SIZE)
                          }
                          className="px-6 py-3 rounded-control border border-header-stroke bg-2nd-bg text-primary font-semibold type-body"
                        >
                          Load more homes
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-5 max-h-[calc(100vh-11rem)] overflow-y-auto custom-scrollbar space-y-4 pr-1">
                      {visibleProperties.map((property, index) => (
                        <ListingCard
                          key={property.id}
                          property={property}
                          href={`/properties/${property.slug}`}
                          index={index}
                          compact
                        />
                      ))}
                      {hasMore && (
                        <button
                          type="button"
                          onClick={() =>
                            setVisibleCount((n) => n + PAGE_SIZE)
                          }
                          className="w-full px-6 py-3 rounded-control border border-header-stroke bg-2nd-bg text-primary font-semibold type-body"
                        >
                          Load more homes
                        </button>
                      )}
                    </div>
                    <div className="lg:col-span-7 lg:sticky lg:top-24">
                      <ListingHalfMap
                        listings={filteredProperties}
                        hrefFor={(item) => `/properties/${item.slug}`}
                      />
                    </div>
                  </div>
                </>
              )
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

export default function PropertiesPageClient(props: PropertiesPageClientProps) {
  return (
    <Suspense
      fallback={
        <div className="page-px section-y type-body text-secondary-text">
          Loading listings…
        </div>
      }
    >
      <PropertiesBrowse {...props} />
    </Suspense>
  );
}
