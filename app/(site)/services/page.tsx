"use client";

import React from "react";
import Link from "next/link";
import { MapPinned, Home, KeyRound, TrendingUp } from "lucide-react";

const services = [
  {
    title: "Plots & Land",
    description:
      "Browse verified residential and commercial plots across Patna and surrounding areas.",
    href: "/plots",
    Icon: MapPinned,
  },
  {
    title: "Sell Your Property",
    description:
      "List your property with professional support and reach genuine buyers faster.",
    href: "/sell",
    Icon: Home,
  },
  {
    title: "Rent Solutions",
    description:
      "Find a rental as a tenant or list your space as a landlord — we handle both.",
    href: "/rent",
    Icon: KeyRound,
  },
  {
    title: "Be An Investor",
    description:
      "Explore investment opportunities with curated plots and properties built for growth.",
    href: "/beaninvestor",
    Icon: TrendingUp,
  },
];

const ServicesPage = () => {
  return (
    <main className="flex-1 page-px section-y">
      <div className="max-w-7xl mx-auto">
        <h1 className="type-section text-primary mb-3">
          Our Services
        </h1>
        <p className="text-secondary-text type-body prose-measure mb-10">
          From buying and selling to rentals and investments — 2% Company
          covers every step of your real estate journey in Patna.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {services.map(({ title, description, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group p-6 lg:p-8 rounded-card border-2 border-header-stroke bg-2nd-bg hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-control bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon size={24} />
              </div>
              <h2 className="type-card-title text-primary mb-2">
                {title}
              </h2>
              <p className="text-secondary-text type-body leading-relaxed">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
