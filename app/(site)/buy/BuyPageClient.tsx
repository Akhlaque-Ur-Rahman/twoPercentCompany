"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropertyItem } from "@/data/PropertyData";
import PropertyCard from "@/components/PropertyCard";
import ListingToolbar from "@/components/listing/ListingToolbar";
import FilterSelect from "@/components/ui/FilterSelect";
import SearchField from "@/components/ui/SearchField";
import {
  type ListingSortKey,
  buildListingQuery,
  matchesBudget,
  matchesLocation,
  sortListings,
  typeFilterToParam,
  typeParamToFilter,
} from "@/lib/listingFilters";

type BuyPageClientProps = {
  listings: PropertyItem[];
};

const BUDGET_UI_TO_PARAM: Record<string, string> = {
  "Below ₹50L": "below-50l",
  "₹50L - ₹1Cr": "50l-1cr",
  "Above ₹1Cr": "above-1cr",
};

const BUDGET_PARAM_TO_UI: Record<string, string> = {
  "below-50l": "Below ₹50L",
  "50l-1cr": "₹50L - ₹1Cr",
  "above-1cr": "Above ₹1Cr",
};

function BuyBrowse({ listings }: BuyPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipUrlWrite = useRef(false);

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [selectedType, setSelectedType] = useState(() => {
    const t = searchParams.get("type");
    return t ? typeParamToFilter(t) : "All";
  });
  const [selectedFacing, setSelectedFacing] = useState(
    () => searchParams.get("facing") ?? "All"
  );
  const [selectedPrice, setSelectedPrice] = useState(() => {
    const b = searchParams.get("budget");
    return b ? BUDGET_PARAM_TO_UI[b] ?? "All" : "All";
  });
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

  useEffect(() => {
    skipUrlWrite.current = true;
    setSearchQuery(searchParams.get("q") ?? "");
    setLocation(searchParams.get("location") ?? "");
    setSelectedFacing(searchParams.get("facing") ?? "All");
    const t = searchParams.get("type");
    setSelectedType(t ? typeParamToFilter(t) : "All");
    const b = searchParams.get("budget");
    setSelectedPrice(b ? BUDGET_PARAM_TO_UI[b] ?? "All" : "All");
    const s = searchParams.get("sort");
    setSort(
      s === "price-asc" ||
        s === "price-desc" ||
        s === "newest" ||
        s === "featured"
        ? s
        : "default"
    );
  }, [searchParams]);

  useEffect(() => {
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false;
      return;
    }
    const qs = buildListingQuery({
      location: location || null,
      type: selectedType !== "All" ? typeFilterToParam(selectedType) : null,
      budget:
        selectedPrice !== "All"
          ? BUDGET_UI_TO_PARAM[selectedPrice] ?? null
          : null,
      facing: selectedFacing !== "All" ? selectedFacing : null,
      q: searchQuery.trim() || null,
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
    selectedFacing,
    selectedPrice,
    searchQuery,
    sort,
    pathname,
    router,
    searchParams,
  ]);

  const filteredData = useMemo(() => {
    const budgetParam =
      selectedPrice !== "All"
        ? BUDGET_UI_TO_PARAM[selectedPrice]
        : null;

    const filtered = listings.filter((item) => {
      if (item.type !== "property") return false;
      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "All" ||
        item.tags.some((t) =>
          t.label.toLowerCase().includes(selectedType.toLowerCase())
        );

      const facingTag = item.specifications?.find((s) =>
        s.label.toLowerCase().includes("facing")
      );
      const matchesFacing =
        selectedFacing === "All" ||
        facingTag?.value.toLowerCase() === selectedFacing.toLowerCase();

      return (
        matchesSearch &&
        matchesType &&
        matchesFacing &&
        matchesBudget(item.price, budgetParam) &&
        matchesLocation(item.address, location)
      );
    });

    return sortListings(filtered, sort);
  }, [
    listings,
    searchQuery,
    selectedType,
    selectedFacing,
    selectedPrice,
    location,
    sort,
  ]);

  const resultLabel =
    filteredData.length === 1
      ? "1 property"
      : `${filteredData.length} properties`;

  return (
    <div className="flex flex-col bg-main-bg text-body">
      <section className="page-px section-y space-y-8">
        <div>
          <h1 className="type-display text-body mb-2">Buy a Property</h1>
          <p className="text-secondary-text type-body">
            Filter listings by type, facing, and budget.
          </p>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row flex-wrap gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SearchField
            id="buy-search"
            label="Search properties"
            placeholder="Search by title, area..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="sm:w-[300px]"
          />

          <FilterSelect
            label="Property type"
            value={selectedType}
            onChange={setSelectedType}
            options={[
              { label: "All types", value: "All" },
              { label: "Apartment", value: "Apartment" },
              { label: "Villa", value: "Villa" },
              { label: "1BHK", value: "1BHK" },
              { label: "2BHK", value: "2BHK" },
              { label: "3BHK", value: "3BHK" },
            ]}
          />

          <FilterSelect
            label="Facing"
            value={selectedFacing}
            onChange={setSelectedFacing}
            options={[
              { label: "All facing", value: "All" },
              { label: "East", value: "East" },
              { label: "West", value: "West" },
              { label: "North", value: "North" },
              { label: "South", value: "South" },
            ]}
          />

          <FilterSelect
            label="Price range"
            value={selectedPrice}
            onChange={setSelectedPrice}
            options={[
              { label: "All", value: "All" },
              { label: "Below ₹50L", value: "Below ₹50L" },
              { label: "₹50L - ₹1Cr", value: "₹50L - ₹1Cr" },
              { label: "Above ₹1Cr", value: "Above ₹1Cr" },
            ]}
          />
        </motion.div>

        <ListingToolbar resultLabel={resultLabel} sort={sort} onSortChange={setSort} />

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.length > 0 ? (
            filteredData.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PropertyCard
                  property={property}
                  href={`/properties/${property.slug}`}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-secondary-text col-span-full py-12">
              No properties found.
            </p>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default function BuyPageClient(props: BuyPageClientProps) {
  return (
    <Suspense
      fallback={
        <div className="page-px section-y type-body text-secondary-text">
          Loading…
        </div>
      }
    >
      <BuyBrowse {...props} />
    </Suspense>
  );
}
