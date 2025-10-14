"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { PropertyData } from "@/data/PropertyData";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";

const TenantListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return PropertyData.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
            Find Properties for Rent
          </h1>
          <p className="text-secondary-text mt-2">
            Browse available properties or list your own for tenants.
          </p>
        </motion.div>

        {/* Search */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search by name, location or feature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg w-full sm:w-[400px] text-primary bg-2nd-bg border-2 border-header-stroke focus:outline-none"
          />
        </div>

        {/* Property Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.length > 0 ? (
            filteredData.map((property) => (
              <Link
                key={property.id}
                href={`/rent/tenants/${property.slug}`}
              >
                {/* Pass the linkTo prop to PropertyCard */}
                <PropertyCard
                  property={property}
                  linkTo={`/rent/tenants/${property.slug}`}
                />
              </Link>
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

export default TenantListingPage;
