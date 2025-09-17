"use client";
import React, { useState } from "react";
import { PropertyData, PropertyItem } from "@/data/PropertyData";
import Image from "next/image";
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

  const FilteredProperties = PropertyData.filter((Property: PropertyItem) => {
    const MatchesSearch =
      Property.title.toLowerCase().includes(SearchText.toLowerCase()) ||
      Property.description.toLowerCase().includes(SearchText.toLowerCase());

    const MatchesFilter =
      ActiveFilter === "All" ||
      Property.tags.some(
        (Tag) => Tag.label.toLowerCase() === ActiveFilter.toLowerCase()
      );

    return MatchesSearch && MatchesFilter;
  });

  return (
    <section>
      <Navbar />
      <div className="bg-main-bg text-white px-6 sm:px-6 lg:px-[40px] py-6 lg:py-[16px] lg:space-y-[16px] rounded-[16px]">
        {/* Video Banner */}
{/* Video Banner */}
<div className="w-full mb-8 relative rounded-lg overflow-hidden border border-header-stroke h-[300px] lg:h-[400px]">
  {/* YouTube Video */}
  <iframe
    className="absolute inset-0 w-full h-full filter brightness-90 contrast-90"
    src="https://www.youtube.com/embed/Ht6YuFAxICs?autoplay=1&mute=1&loop=1&playlist=Ht6YuFAxICs&controls=0&modestbranding=1&rel=0"
    title="Property Showcase"
    frameBorder="0"
    allow="autoplay; encrypted-media; fullscreen"
    allowFullScreen
  ></iframe>

  {/* Optional Overlay */}
  <div className="absolute inset-0 bg-black/10 z-10 rounded-lg"></div>
</div>




        {/* Search + Custom Dropdown */}
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
            <Search
              className="absolute left-3 top-3 text-secondary-text"
              size={20}
            />
          </div>

          {/* Custom Dropdown */}
          <div className="relative w-full lg:w-1/4">
            <button
              onClick={() => setDropdownOpen(!DropdownOpen)}
              className="w-full flex justify-between items-center px-4 py-3 bg-2nd-bg border border-header-stroke rounded-lg text-white focus:outline-none"
            >
              {ActiveFilter}
              {DropdownOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {DropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-2nd-bg border border-header-stroke rounded-lg shadow-lg custom-scrollbar">
                {Filters.map((Filter) => (
                  <li
                    key={Filter}
                    onClick={() => {
                      setActiveFilter(Filter);
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-3 cursor-pointer hover:bg-primary hover:text-black transition ${
                      ActiveFilter === Filter ? "bg-primary text-black" : ""
                    }`}
                  >
                    {Filter}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FilteredProperties.length > 0 ? (
            FilteredProperties.map((Property) => (
              <div
                key={Property.id}
                className="card p-4 lg:p-[24px] gap-[16px] flex flex-col justify-between rounded-[24px] border-2 border-header-stroke"
              >
                {/* Image */}
                <div className="w-full flex justify-center bg-cover">
                  <Image
                    src={Property.image}
                    height={240}
                    width={394}
                    alt={Property.title}
                    className="rounded-[16px] w-full object-cover"
                  />
                </div>

                {/* Title + Desc */}
                <div className="w-full">
                  <h2 className="font-semibold text-[clamp(18px,2vw,24px)]">
                    {Property.title}
                  </h2>
                  <p className="text-secondary-text text-[clamp(14px,1.6vw,16px)] mt-1">
                    {Property.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="card-category-tags w-full flex flex-wrap items-center gap-[12px]">
                  {Property.tags.map((Tag, index) => {
                    const Icon = Tag.icon;
                    return (
                      <div
                        key={index}
                        className="px-[8px] py-[4px] rounded-full bg-2nd-bg flex items-center gap-[4px]"
                      >
                        <Icon width={20} height={20} />
                        <p className="font-semibold text-[clamp(13px,1.5vw,16px)]">
                          {Tag.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Price + Button */}
                <div className="price-btn-container py-[8px] flex sm:flex-row sm:items-center justify-between gap-3">
                  <div className="price-box flex items-center sm:items-start flex-col gap-[6px]">
                    <p className="text-secondary-text text-[clamp(13px,1.5vw,15px)]">
                      Price
                    </p>
                    <p className="font-semibold text-[clamp(18px,2vw,24px)]">
                      ₹{Property.price}
                    </p>
                  </div>
                  <button className="px-[clamp(16px,2vw,32px)] py-[clamp(10px,1.5vw,16px)] rounded-[16px] bg-primary font-semibold text-[clamp(14px,1.6vw,16px)]">
                    View Property Details
                  </button>
                </div>
              </div>
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
