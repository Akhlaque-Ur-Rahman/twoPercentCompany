"use client";

import React from "react";
import { UserRound, Building2 } from "lucide-react";
import Button from "@/components/ui/Button";

const rentOptions = [
  {
    title: "For Tenants",
    description:
      "Browse verified rental listings and enquire about homes that fit your budget and lifestyle.",
    href: "/rent/tenants",
    cta: "Browse Rentals",
    Icon: UserRound,
  },
  {
    title: "For Landlords",
    description:
      "List your property for rent, reach verified tenants, and manage enquiries with ease.",
    href: "/rent/landlords",
    cta: "List Your Property",
    Icon: Building2,
  },
];

const RentPage = () => {
  return (
    <main className="flex-1 page-px section-y">
      <div className="max-w-7xl mx-auto">
        <h1 className="type-section text-primary mb-3">
          Rent With 2% Company
        </h1>
        <p className="text-secondary-text type-body prose-measure mb-10">
          Whether you are looking for a place to stay or want to rent out your
          property — choose your path below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {rentOptions.map(({ title, description, href, cta, Icon }) => (
            <div
              key={href}
              className="flex flex-col p-6 lg:p-8 rounded-card border-2 border-header-stroke bg-2nd-bg"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-control bg-primary/10 text-primary mb-4">
                <Icon size={24} />
              </div>
              <h2 className="type-card-title text-primary mb-2">
                {title}
              </h2>
              <p className="text-secondary-text type-body leading-relaxed flex-1 mb-6">
                {description}
              </p>
              <Button href={href} className="w-full sm:w-auto">
                {cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RentPage;
