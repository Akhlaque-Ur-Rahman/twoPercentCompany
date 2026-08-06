import React from "react";
import type { PropertyItem } from "@/data/PropertyData";
import { getQuickStats } from "@/lib/listingQuickStats";

type ListingQuickStatsProps = {
  item: PropertyItem;
};

export default function ListingQuickStats({ item }: ListingQuickStatsProps) {
  const stats = getQuickStats(item);
  if (!stats.length) return null;

  return (
    <ul
      className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      aria-label="Property quick facts"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <li
            key={`${stat.label}-${stat.value}`}
            className="flex items-start gap-2.5 border border-header-stroke rounded-control bg-2nd-bg/40 px-3 py-2.5"
          >
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-control border border-header-stroke text-primary">
              <Icon size={16} aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block type-caption text-secondary-text">
                {stat.label}
              </span>
              <span className="block type-caption font-semibold text-body truncate">
                {stat.value}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
