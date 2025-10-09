"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PropertyData, PropertyItem } from "@/data/PropertyData";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PropertiesPage: React.FC = () => {
  const [SearchText, setSearchText] = useState("");
  const [ActiveFilter, setActiveFilter] = useState("All");
  const [DropdownOpen, setDropdownOpen] = useState(false);

  const Filters = [
    "All",
    "1BHK",
    "2BHK",
    "3BHK",
    "4BHK",
    "5BHK",
    "Apartment",
    "Villa",
    "Independent House",
    "Studio",
    "Furnished",
    "Parking",
    "Backyard",
    "City Center",
  ];

  // ✅ Only show type="property"
  const FilteredProperties = PropertyData.filter((property: PropertyItem) => {
    if (property.type !== "property") return false;

    const MatchesSearch =
      property.title.toLowerCase().includes(SearchText.toLowerCase()) ||
      property.description.toLowerCase().includes(SearchText.toLowerCase());

    const MatchesFilter =
      ActiveFilter === "All" ||
      property.tags.some(
        (tag) => tag.label.toLowerCase() === ActiveFilter.toLowerCase()
      );

    return MatchesSearch && MatchesFilter;
  });

  return (
    <section>
      <Navbar />

      {/* Video Banner */}
      <div className="w-full mb-8 aspect-video relative rounded-lg overflow-hidden border border-header-stroke">
        <iframe
          className="absolute inset-0 w-full h-full filter brightness-90 contrast-90"
          src="https://www.youtube.com/embed/Ht6YuFAxICs?autoplay=1&mute=1&loop=1&playlist=Ht6YuFAxICs&controls=0&modestbranding=1&rel=0"
          title="Property Showcase"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      <div className="bg-main-bg text-white px-6 sm:px-6 lg:px-[40px] py-6 lg:py-[16px] lg:space-y-[16px] rounded-[16px]">
        {/* Search + Filter */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full lg:w-1/3">
            <input
              type="text"
              placeholder="Search Properties..."
              value={SearchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-lg bg-2nd-bg text-white placeholder-secondary-text border border-header-stroke focus:outline-none focus:border-primary"
            />
            <Search className="absolute left-3 top-3 text-secondary-text" size={20} />
          </div>

          {/* Custom Dropdown */}
          <div className="relative w-full lg:w-1/4">
            <button
              onClick={() => setDropdownOpen(!DropdownOpen)}
              className="w-full flex justify-between items-center px-4 py-3 bg-2nd-bg border border-header-stroke rounded-lg text-white focus:outline-none"
            >
              {ActiveFilter}
              {DropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {DropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-2nd-bg border border-header-stroke rounded-lg shadow-lg custom-scrollbar">
                {Filters.map((filter) => (
                  <li
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-3 cursor-pointer hover:bg-primary hover:text-black transition ${
                      ActiveFilter === filter ? "bg-primary text-black" : ""
                    }`}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Property Grid */}
        <div className="flex flex-col gap-6">
          {FilteredProperties.length > 0 ? (
            FilteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card flex flex-col lg:flex-row p-4 lg:p-[24px] gap-4 lg:gap-[24px] rounded-[24px] border-2 border-header-stroke bg-2nd-bg"
              >
                {/* Image */}
                <div className="w-full lg:w-1/3 flex justify-center bg-cover">
                  <Image
                    src={property.image}
                    height={240}
                    width={394}
                    alt={property.title}
                    loading="lazy"
                    className="rounded-[16px] w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between gap-4">
                  {/* Title + Description */}
                  <div>
                    <h2 className="font-semibold text-[clamp(18px,2vw,24px)] text-primary">
                      {property.title}
                    </h2>
                    <p className="text-secondary-text text-[clamp(14px,1.6vw,16px)] mt-1">
                      {property.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-[12px]">
                    {property.tags.map((tag, idx) => {
                      const Icon = tag.icon;
                      return (
                        <div
                          key={idx}
                          className="px-[8px] py-[4px] rounded-full bg-main-bg flex items-center gap-[4px]"
                        >
                          <Icon width={20} height={20} />
                          <p className="font-semibold text-[clamp(13px,1.5vw,16px)]">
                            {tag.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Price + Link */}
                  <div className="flex sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-col gap-[6px]">
                      <p className="text-secondary-text text-[clamp(13px,1.5vw,15px)]">
                        Price
                      </p>
                      <p className="font-semibold text-[clamp(18px,2vw,24px)] text-primary">
                        ₹{property.price}
                      </p>
                    </div>
                    <Link
                      href={`/properties/${property.slug}`}
                      className="px-[clamp(16px,2vw,32px)] py-[clamp(10px,1.5vw,16px)] flex justify-center items-center rounded-[16px] bg-primary font-semibold text-[clamp(14px,1.6vw,16px)] text-center hover:bg-yellow-600 transition-colors duration-300"
                    >
                      View Property Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-secondary-text text-center col-span-full">
              No Properties Match Your Search.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PropertiesPage;
