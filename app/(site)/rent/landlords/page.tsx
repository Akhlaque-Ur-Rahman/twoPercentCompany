"use client";

import React from "react";
import Image from "next/image";
import PropertyForm from "@/components/PropertyForm";

const LandlordPage = () => {
  return (
    <section className="flex flex-col bg-main-bg text-white">
      <div className="section-y page-px text-center max-w-7xl mx-auto w-full">
        <h1 className="type-display text-primary mb-4">List Your Rental Property</h1>
        <p className="text-secondary-text type-body max-w-2xl mx-auto">
          Reach verified tenants and manage enquiries with 2% Company support.
        </p>
      </div>

      <div className="section-y page-px flex justify-center">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl w-full items-start">
          <div className="lg:w-1/2 hidden lg:flex flex-col items-center gap-6">
            <Image
              src="/images/sell-image.png"
              width={400}
              height={400}
              alt="Landlord illustration"
              className="mx-auto"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <PropertyForm type="rent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandlordPage;
