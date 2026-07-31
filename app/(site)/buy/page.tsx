"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PropertyData } from "@/data/PropertyData";
import PropertyCard from "@/components/PropertyCard";
import FilterSelect from "@/components/ui/FilterSelect";

const BuyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFacing, setSelectedFacing] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  const priceRanges = useMemo(
    () => [
      { label: "All", min: 0, max: Infinity },
      { label: "Below ₹50L", min: 0, max: 5000000 },
      { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
      { label: "Above ₹1Cr", min: 10000000, max: Infinity },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return PropertyData.filter((item) => {
      if (item.type !== "property") return false;
      const priceValue = parseInt(item.price.replace(/,/g, ""), 10);
      const matchesSearch =
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

      const range =
        priceRanges.find((p) => p.label === selectedPrice) ?? priceRanges[0];
      const matchesPrice = priceValue >= range.min && priceValue <= range.max;

      return matchesSearch && matchesType && matchesFacing && matchesPrice;
    });
  }, [searchQuery, selectedType, selectedFacing, selectedPrice, priceRanges]);

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
          <div className="w-full sm:w-[300px]">
            <label htmlFor="buy-search" className="sr-only">
              Search properties
            </label>
            <input
              id="buy-search"
              type="text"
              placeholder="Search by title, area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-3 rounded-control bg-2nd-bg border-2 border-header-stroke text-primary w-full focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary placeholder:text-secondary-text"
            />
          </div>

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
            options={priceRanges.map((p) => ({
              label: p.label,
              value: p.label,
            }))}
          />
        </motion.div>

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
};

export default BuyPage;
