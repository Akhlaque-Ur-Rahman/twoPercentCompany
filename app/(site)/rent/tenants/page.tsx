"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PropertyData } from "@/data/PropertyData";
import PropertyCard from "@/components/PropertyCard";
import FilterSelect from "@/components/ui/FilterSelect";

const TenantListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    bhk: "",
    furnished: "",
    priceRange: "",
  });

  const filteredData = useMemo(() => {
    return PropertyData.filter((p) => {
      if (p.type?.toLowerCase() === "plot") return false;

      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBHK =
        !filters.bhk ||
        p.tags.some((t) =>
          t.label.toLowerCase().includes(filters.bhk.toLowerCase())
        );

      const matchesFurnished =
        !filters.furnished ||
        p.specifications?.some((s) =>
          s.value.toLowerCase().includes(filters.furnished.toLowerCase())
        );

      const priceNumber = parseInt(p.price.replace(/[^0-9]/g, ""), 10);
      const matchesPrice =
        !filters.priceRange ||
        (filters.priceRange === "below20" && priceNumber < 20000) ||
        (filters.priceRange === "20to40" &&
          priceNumber >= 20000 &&
          priceNumber <= 40000) ||
        (filters.priceRange === "above40" && priceNumber > 40000);

      return matchesSearch && matchesBHK && matchesFurnished && matchesPrice;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen flex flex-col bg-main-bg text-body">
      <section className="page-px section-y w-full max-w-7xl mx-auto mb-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="type-display text-primary">Find Properties for Rent</h1>
          <p className="text-secondary-text mt-2 type-body">
            Search, filter, and explore verified properties for rent.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div className="w-full sm:w-[320px]">
            <label htmlFor="tenant-search" className="sr-only">
              Search rentals
            </label>
            <input
              id="tenant-search"
              type="text"
              placeholder="Search by name, feature, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-control w-full text-primary bg-2nd-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition"
            />
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-3">
            <FilterSelect
              label="BHK"
              value={filters.bhk}
              onChange={(v) => setFilters((prev) => ({ ...prev, bhk: v }))}
              options={[
                { label: "All BHK", value: "" },
                { label: "1BHK", value: "1bhk" },
                { label: "2BHK", value: "2bhk" },
                { label: "3BHK", value: "3bhk" },
                { label: "4BHK+", value: "4bhk" },
              ]}
            />

            <FilterSelect
              label="Furnishing"
              value={filters.furnished}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, furnished: v }))
              }
              options={[
                { label: "Any Furnishing", value: "" },
                { label: "Unfurnished", value: "unfurnished" },
                { label: "Semi-Furnished", value: "semi-furnished" },
                { label: "Fully Furnished", value: "fully furnished" },
              ]}
            />

            <FilterSelect
              label="Price"
              value={filters.priceRange}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, priceRange: v }))
              }
              options={[
                { label: "All Prices", value: "" },
                { label: "Below ₹20,000", value: "below20" },
                { label: "₹20,000 - ₹40,000", value: "20to40" },
                { label: "Above ₹40,000", value: "above40" },
              ]}
            />
          </div>
        </div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                href={`/rent/tenants/${property.slug}`}
                ctaLabel="View Rental"
              />
            ))
          ) : (
            <p className="text-center text-secondary-text col-span-full py-12">
              No properties match your filters.
            </p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default TenantListingPage;
