"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { PropertyData } from "@/data/PropertyData";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const Dropdown = ({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (name: string, value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-w-[150px]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-2nd-bg border border-header-stroke text-primary hover:border-primary transition"
      >
        <span>
          {value
            ? options.find((o) => o.value === value)?.label
            : label}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 z-20 bg-2nd-bg border border-header-stroke rounded-lg shadow-lg mt-2 overflow-hidden"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(name, option.value);
                  setOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition ${
                  value === option.value ? "bg-primary text-white" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const TenantListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    bhk: "",
    furnished: "",
    priceRange: "",
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = useMemo(() => {
    return PropertyData.filter((p) => {
      if (p.type?.toLowerCase() === "plot") return false; // exclude plots

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

      const priceNumber = parseInt(p.price.replace(/[^0-9]/g, ""));
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
    <div className="min-h-screen flex flex-col bg-main-bg text-white">
      <Navbar />

      <section className="mt-[100px] w-full max-w-7xl mx-auto mb-6 px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-[clamp(28px,4vw,38px)] font-bold text-primary">
            Find Properties for Rent
          </h1>
          <p className="text-secondary-text mt-2">
            Search, filter, and explore verified properties for rent.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          {/* Single Search Bar */}
          <input
            type="text"
            placeholder="Search by name, feature, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg w-full sm:w-[320px] text-primary bg-2nd-bg border border-header-stroke focus:outline-none focus:border-primary transition"
          />

          {/* Custom Filters */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-3">
            <Dropdown
              label="All BHK"
              name="bhk"
              value={filters.bhk}
              onChange={handleFilterChange}
              options={[
                { label: "All BHK", value: "" },
                { label: "1BHK", value: "1bhk" },
                { label: "2BHK", value: "2bhk" },
                { label: "3BHK", value: "3bhk" },
                { label: "4BHK+", value: "4bhk" },
              ]}
            />

            <Dropdown
              label="Any Furnishing"
              name="furnished"
              value={filters.furnished}
              onChange={handleFilterChange}
              options={[
                { label: "Any Furnishing", value: "" },
                { label: "Unfurnished", value: "unfurnished" },
                { label: "Semi-Furnished", value: "semi-furnished" },
                { label: "Fully Furnished", value: "fully furnished" },
              ]}
            />

            <Dropdown
              label="All Prices"
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              options={[
                { label: "All Prices", value: "" },
                { label: "Below ₹20,000", value: "below20" },
                { label: "₹20,000 - ₹40,000", value: "20to40" },
                { label: "Above ₹40,000", value: "above40" },
              ]}
            />
          </div>
        </div>

        {/* Property Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((property) => (
              <Link key={property.id} href={`/rent/tenants/${property.slug}`}>
                <PropertyCard
                  property={property}
                  linkTo={`/rent/tenants/${property.slug}`}
                />
              </Link>
            ))
          ) : (
            <p className="text-center text-secondary-text col-span-full py-12">
              No properties match your filters.
            </p>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default TenantListingPage;
