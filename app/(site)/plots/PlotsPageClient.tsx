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
  sortListings,
  typeFilterToParam,
  typeParamToFilter,
} from "@/lib/listingFilters";

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
  const needle = value.toLowerCase();
  // Hero sends type=plot → "Plot"; plot tags are "Residential Plot", etc.
  if (needle === "plot") return true;
  return plot.tags.some((tag) => tag.label.toLowerCase().includes(needle));
}

function PlotsBrowse({ listings }: PlotsPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipUrlWrite = useRef(false);

  const [searchText, setSearchText] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [selectedType, setSelectedType] = useState(() => {
    const t = searchParams.get("type");
    return t ? typeParamToFilter(t) : "All";
  });
  const [selectedFeature, setSelectedFeature] = useState(
    () => searchParams.get("feature") ?? "All"
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

  useEffect(() => {
    skipUrlWrite.current = true;
    setSearchText(searchParams.get("q") ?? "");
    setLocation(searchParams.get("location") ?? "");
    setBudget(searchParams.get("budget") ?? "any");
    setSelectedFeature(searchParams.get("feature") ?? "All");
    const t = searchParams.get("type");
    setSelectedType(t ? typeParamToFilter(t) : "All");
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
      type:
        selectedType !== "All" ? typeFilterToParam(selectedType) : null,
      budget: budget !== "any" ? budget : null,
      feature: selectedFeature !== "All" ? selectedFeature : null,
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
    selectedType,
    selectedFeature,
    budget,
    searchText,
    sort,
    pathname,
    router,
    searchParams,
  ]);

  const debouncedSearch = useDebouncedValue(searchText, 180);

  const filteredPlots = useMemo(() => {
    const searchLower = debouncedSearch.trim().toLowerCase();
    const filtered = listings.filter((plot) => {
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

      return (
        matchesSearch &&
        matchesType &&
        matchesFeature &&
        matchesLocation(plot.address ?? "", location) &&
        matchesBudget(plot.price, budget)
      );
    });
    return sortListings(filtered, sort);
  }, [
    listings,
    debouncedSearch,
    selectedType,
    selectedFeature,
    location,
    budget,
    sort,
  ]);

  const visiblePlots = filteredPlots.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPlots.length;
  const shown = Math.min(visibleCount, filteredPlots.length);
  const resultLabel =
    filteredPlots.length === 0
      ? "No plots match"
      : `Showing ${shown} of ${filteredPlots.length} plot${
          filteredPlots.length === 1 ? "" : "s"
        }`;

  const clearFilters = () => {
    setSearchText("");
    setSelectedType("All");
    setSelectedFeature("All");
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
          <div className="flex flex-col gap-3">
            <div>
              <p className="type-label text-primary font-semibold tracking-[0.14em]">
                Browse land
              </p>
              <h2 className="type-section text-body mt-2">Find your next plot</h2>
              <p className="text-secondary-text type-body mt-2 max-w-xl">
                Filter by plot type and location features — then open a listing
                for full details.
              </p>
            </div>
          </div>

          {layout === "list" && (
            <YoutubeFacade
              title="Plot showcase"
              poster="/images/plot-plain.webp"
            />
          )}

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
            {visiblePlots.length > 0 ? (
              layout === "list" ? (
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
                <>
                  <div className="lg:hidden space-y-4">
                    <ListingHalfMap
                      listings={filteredPlots}
                      hrefFor={(item) => `/plots/${item.slug}`}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {visiblePlots.map((plot, index) => (
                        <ListingCard
                          key={plot.id}
                          property={plot}
                          href={`/plots/${plot.slug}`}
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
                          Load more plots
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-5 max-h-[calc(100vh-11rem)] overflow-y-auto custom-scrollbar space-y-4 pr-1">
                      {visiblePlots.map((plot, index) => (
                        <ListingCard
                          key={plot.id}
                          property={plot}
                          href={`/plots/${plot.slug}`}
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
                          Load more plots
                        </button>
                      )}
                    </div>
                    <div className="lg:col-span-7 lg:sticky lg:top-24">
                      <ListingHalfMap
                        listings={filteredPlots}
                        hrefFor={(item) => `/plots/${item.slug}`}
                      />
                    </div>
                  </div>
                </>
              )
            ) : (
              <div className="flex flex-col items-center text-center gap-4 py-16 px-4 rounded-card border border-header-stroke bg-2nd-bg/60">
                <p className="type-card-title text-body">No plots match</p>
                <p className="text-secondary-text type-body max-w-md">
                  Try a different search, plot type, or feature — or clear
                  filters. Prefer a shortlist from us? Contact an expert.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-6 py-3 rounded-control bg-primary text-on-primary font-semibold type-body hover:brightness-110 transition"
                  >
                    Clear filters
                  </button>
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
    </div>
  );
}

export default function PlotsPageClient(props: PlotsPageClientProps) {
  return (
    <Suspense
      fallback={
        <div className="page-px section-y type-body text-secondary-text">
          Loading plots…
        </div>
      }
    >
      <PlotsBrowse {...props} />
    </Suspense>
  );
}
