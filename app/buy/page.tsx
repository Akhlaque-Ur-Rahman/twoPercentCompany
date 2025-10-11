"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { PropertyData } from "@/data/PropertyData";
import PropertyCard from "@/components/PropertyCard";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selected,
  onSelect,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full sm:w-[200px]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-[12px] rounded-[16px] bg-2nd-bg border-2 border-header-stroke text-primary focus:outline-none focus:border-primary transition-all duration-200"
      >
        {selected || placeholder}
        <ChevronDown size={20} className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-2nd-bg border-2 border-header-stroke rounded-[16px] overflow-hidden max-h-60 overflow-y-auto shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className="px-4 py-2 text-primary hover:bg-primary/20 cursor-pointer transition-all duration-150"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const BuyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedFacing, setSelectedFacing] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "Below ₹50L", min: 0, max: 5000000 },
    { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
    { label: "Above ₹1Cr", min: 10000000, max: Infinity },
  ];

  const filteredData = useMemo(() => {
    return PropertyData.filter((item) => {
      const priceValue = parseInt(item.price.replace(/,/g, ""));
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.label.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesType = !selectedType || item.type === selectedType;
      const matchesFacing =
        !selectedFacing ||
        item.specifications?.some(
          (spec) =>
            spec.label === "Facing" &&
            spec.value.toLowerCase() === selectedFacing.toLowerCase()
        );

      const selectedRange = priceRanges.find(
        (range) => range.label === selectedPrice
      );

      const matchesPrice =
        !selectedRange ||
        (priceValue >= selectedRange.min && priceValue <= selectedRange.max);

      return matchesSearch && matchesType && matchesFacing && matchesPrice;
    });
  }, [searchQuery, selectedType, selectedFacing, selectedPrice]);

  return (
    <div className="min-h-screen flex flex-col bg-main-bg text-white">
      <Navbar />

      <section className="mt-[100px] w-full max-w-7xl mx-auto mb-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-[clamp(28px,4vw,38px)] font-bold text-primary">
            Find Your Dream Property
          </h1>
          <p className="text-secondary-text mt-2">
            Search and filter properties that match your preferences.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name, location or feature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-[12px] rounded-[16px] bg-2nd-bg border-2 border-header-stroke text-primary w-full sm:w-[300px] focus:outline-none focus:border-primary transition-all duration-200 placeholder:text-primary"
          />

          {/* Custom Dropdowns */}
          <CustomDropdown
            options={[
              { label: "All Types", value: "" },
              { label: "Property", value: "Property" },
              { label: "Plot", value: "Plot" },
            ]}
            selected={selectedType}
            onSelect={setSelectedType}
            placeholder="Select Type"
          />

          <CustomDropdown
            options={[
              { label: "All Facing", value: "" },
              { label: "North", value: "North" },
              { label: "East", value: "East" },
              { label: "West", value: "West" },
              { label: "South", value: "South" },
            ]}
            selected={selectedFacing}
            onSelect={setSelectedFacing}
            placeholder="Select Facing"
          />

          <CustomDropdown
            options={priceRanges.map((p) => ({ label: p.label, value: p.label }))}
            selected={selectedPrice}
            onSelect={setSelectedPrice}
            placeholder="Select Price"
          />
        </motion.div>

        {/* Property Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.length > 0 ? (
            filteredData.map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-secondary-text col-span-full py-12">
              No properties found.
            </p>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default BuyPage;
