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
      className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(10.5rem,1fr))]"
      aria-label="Property quick facts"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <li
            key={`${stat.label}-${stat.value}`}
            className="flex min-w-0 items-start gap-2.5 border border-header-stroke rounded-control bg-2nd-bg/40 px-3 py-2.5"
          >
            <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-control border border-header-stroke text-primary">
              <Icon size={16} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block type-caption text-secondary-text">
                {stat.label}
              </span>
              <span className="block type-caption font-semibold text-body break-words">
                {stat.value}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
