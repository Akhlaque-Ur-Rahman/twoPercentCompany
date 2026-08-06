"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropertyItem } from "@/data/PropertyData";
import PropertyCard from "@/components/PropertyCard";
import ListingToolbar from "@/components/listing/ListingToolbar";
import ActiveFilterChips, {
  locationChipLabel,
  rentChipLabel,
} from "@/components/listing/ActiveFilterChips";
import FilterSelect from "@/components/ui/FilterSelect";
import SearchField from "@/components/ui/SearchField";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  type ListingSortKey,
  buildListingQuery,
  matchesLocation,
  matchesRent,
  matchesTypeTag,
  sortListings,
  typeFilterToParam,
  typeParamToFilter,
} from "@/lib/listingFilters";

const PAGE_SIZE = 9;

const BHK_OPTIONS = ["All", "1BHK", "2BHK", "3BHK", "4BHK"] as const;

const FURNISHING_OPTIONS = [
  { label: "Any furnishing", value: "All" },
  { label: "Unfurnished", value: "Unfurnished" },
  { label: "Semi-Furnished", value: "Semi-Furnished" },
  { label: "Fully Furnished", value: "Fully Furnished" },
];

const PRICE_OPTIONS = [
  { label: "All prices", value: "All" },
  { label: "Below ₹20,000", value: "below20" },
  { label: "₹20,000 – ₹40,000", value: "20to40" },
  { label: "Above ₹40,000", value: "above40" },
] as const;

type TenantListingClientProps = {
  listings: PropertyItem[];
};

function hasTag(property: PropertyItem, value: string) {
  return property.tags.some(
    (tag) => tag.label.toLowerCase() === value.toLowerCase()
  );
}

function matchesFurnishing(property: PropertyItem, value: string) {
  if (value === "All") return true;
  const needle = value.toLowerCase();
  return (
    property.specifications?.some((s) =>
      s.value.toLowerCase().includes(needle)
    ) ||
    property.tags.some((t) => t.label.toLowerCase().includes(needle))
  );
}

function TenantsBrowse({ listings }: TenantListingClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipUrlWrite = useRef(false);

  const [searchText, setSearchText] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [selectedBhk, setSelectedBhk] = useState(() => {
    const t = searchParams.get("type");
    if (!t) return "All";
    const mapped = typeParamToFilter(t);
    return /bhk/i.test(mapped) ? mapped : "All";
  });
  const [selectedFurnishing, setSelectedFurnishing] = useState(
    () => searchParams.get("furnishing") ?? "All"
  );
  const [selectedPrice, setSelectedPrice] = useState(
    () => searchParams.get("rent") ?? "All"
  );
  const [location, setLocation] = useState(
    () => searchParams.get("location") ?? ""
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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    skipUrlWrite.current = true;
    setSearchText(searchParams.get("q") ?? "");
    setLocation(searchParams.get("location") ?? "");
    setSelectedFurnishing(searchParams.get("furnishing") ?? "All");
    setSelectedPrice(searchParams.get("rent") ?? "All");
    const t = searchParams.get("type");
    if (t) {
      const mapped = typeParamToFilter(t);
      setSelectedBhk(/bhk/i.test(mapped) ? mapped : "All");
    } else {
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

  useEffect(() => {
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false;
      return;
    }
    const qs = buildListingQuery({
      location: location || null,
      type: selectedBhk !== "All" ? typeFilterToParam(selectedBhk) : null,
      rent: selectedPrice !== "All" ? selectedPrice : null,
      furnishing:
        selectedFurnishing !== "All" ? selectedFurnishing : null,
      q: searchText.trim() || null,
      sort: sort !== "default" ? sort : null,
    });
    const next = `${pathname}${qs}`;
    const current = `${pathname}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    if (next !== current) router.replace(next, { scroll: false });
  }, [
    location,
    selectedBhk,
    selectedFurnishing,
    selectedPrice,
    searchText,
    sort,
    pathname,
    router,
    searchParams,
  ]);

  const debouncedSearch = useDebouncedValue(searchText, 180);

  const filteredData = useMemo(() => {
    const searchLower = debouncedSearch.trim().toLowerCase();
    const typeParam = searchParams.get("type");

    const filtered = listings.filter((property) => {
      if (property.type?.toLowerCase() === "plot") return false;

      const matchesSearch =
        !searchLower ||
        property.title.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower) ||
        property.address.toLowerCase().includes(searchLower) ||
        property.tags.some((tag) =>
          tag.label.toLowerCase().includes(searchLower)
        );

      const matchesBhk =
        selectedBhk === "All" ||
        hasTag(property, selectedBhk) ||
        (selectedBhk === "4BHK" &&
          property.tags.some((t) => {
            const label = t.label.toLowerCase();
            return label.includes("4bhk") || label.includes("5bhk");
          }));

      const matchesHeroType =
        !typeParam ||
        selectedBhk !== "All" ||
        matchesTypeTag(property.tags, typeParam, property.title);

      return (
        matchesSearch &&
        matchesBhk &&
        matchesFurnishing(property, selectedFurnishing) &&
        matchesRent(
          property.price,
          selectedPrice === "All" ? null : selectedPrice
        ) &&
        matchesLocation(property.address, location) &&
        matchesHeroType
      );
    });

    return sortListings(filtered, sort);
  }, [
    listings,
    debouncedSearch,
    selectedBhk,
    selectedFurnishing,
    selectedPrice,
    location,
    sort,
    searchParams,
  ]);

  const visibleListings = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;
  const hasActiveFilters =
    Boolean(searchText.trim()) ||
    selectedBhk !== "All" ||
    selectedFurnishing !== "All" ||
    selectedPrice !== "All" ||
    Boolean(location);

  const shown = Math.min(visibleCount, filteredData.length);
  const resultLabel =
    filteredData.length === 0
      ? "No rentals match"
      : `Showing ${shown} of ${filteredData.length} rental${
          filteredData.length === 1 ? "" : "s"
        }`;

  const clearFilters = () => {
    setSearchText("");
    setSelectedBhk("All");
    setSelectedFurnishing("All");
    setSelectedPrice("All");
    setLocation("");
    setSort("default");
    setVisibleCount(PAGE_SIZE);
  };

  const onFilterChange = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="border-b border-header-stroke bg-main-bg text-body">
      <div className="relative page-px section-y">
        <div
          className="pointer-events-none absolute inset-0 opacity-90 bg-[radial-gradient(ellipse_at_top,rgba(143,115,48,0.1),transparent_55%)]"
          aria-hidden
        />

        <div className="relative space-y-8 lg:space-y-10">
          <div>
            <p className="type-label text-primary font-semibold tracking-[0.14em]">
              Browse rentals
            </p>
            <h1 className="type-section text-body mt-2">Find a place to rent</h1>
            <p className="text-secondary-text type-body mt-2 max-w-xl">
              Filter by layout, furnishing, and budget — then open a listing for
              full details.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
              <SearchField
                id="tenant-search"
                label="Search rentals"
                placeholder="Search by title, area, or feature..."
                value={searchText}
                onChange={(value) => {
                  setSearchText(value);
                  setVisibleCount(PAGE_SIZE);
                }}
                className="lg:flex-1"
              />

              <FilterSelect
                label="Furnishing"
                className="w-full lg:w-[200px]"
                value={selectedFurnishing}
                onChange={onFilterChange(setSelectedFurnishing)}
                options={FURNISHING_OPTIONS}
              />

              <FilterSelect
                label="Price"
                className="w-full lg:w-[200px]"
                value={selectedPrice}
                onChange={onFilterChange(setSelectedPrice)}
                options={PRICE_OPTIONS.map(({ label, value }) => ({
                  label,
                  value,
                }))}
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
                ...(selectedPrice !== "All"
                  ? [
                      {
                        id: "rent",
                        label: rentChipLabel(selectedPrice),
                        onClear: () => {
                          setSelectedPrice("All");
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
                    {bhk === "All" ? "All BHK" : bhk === "4BHK" ? "4BHK+" : bhk}
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
          />

          {visibleListings.length > 0 ? (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                {visibleListings.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    href={`/rent/tenants/${property.slug}`}
                    ctaLabel="View Rental"
                    index={index}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                    className="px-6 py-3 rounded-control border border-header-stroke bg-2nd-bg text-primary font-semibold type-body hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                  >
                    Load more rentals
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-4 py-16 px-4 rounded-card border border-header-stroke bg-2nd-bg/60">
              <p className="type-card-title text-body">No rentals match</p>
              <p className="text-secondary-text type-body max-w-md">
                Try a different search, BHK, furnishing, or budget — or clear
                filters. Need help? Ask an expert.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-6 py-3 rounded-control bg-primary text-on-primary font-semibold type-body hover:brightness-110 transition"
                  >
                    Clear filters
                  </button>
                )}
                <a
                  href="/contact"
                  className="px-6 py-3 rounded-control border border-header-stroke font-semibold type-body text-body hover:border-primary/40 transition-colors"
                >
                  Contact an expert
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TenantListingClient(props: TenantListingClientProps) {
  return (
    <Suspense
      fallback={
        <div className="page-px section-y type-body text-secondary-text">
          Loading rentals…
        </div>
      }
    >
      <TenantsBrowse {...props} />
    </Suspense>
  );
}
