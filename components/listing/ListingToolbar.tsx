"use client";

import React from "react";
import { LayoutList, Map } from "lucide-react";
import FilterSelect from "@/components/ui/FilterSelect";
import {
  LISTING_SORT_OPTIONS,
  type ListingSortKey,
} from "@/lib/listingFilters";

export type ListingLayoutMode = "list" | "map";

type ListingToolbarProps = {
  resultLabel: string;
  sort: ListingSortKey;
  onSortChange: (value: ListingSortKey) => void;
  layout?: ListingLayoutMode;
  onLayoutChange?: (value: ListingLayoutMode) => void;
  className?: string;
};

export default function ListingToolbar({
  resultLabel,
  sort,
  onSortChange,
  layout,
  onLayoutChange,
  className = "",
}: ListingToolbarProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-header-stroke pb-4 ${className}`}
    >
      <p className="type-body text-body font-medium" aria-live="polite">
        {resultLabel}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end w-full sm:w-auto">
        {onLayoutChange && layout && (
          <div
            className="inline-flex rounded-control border border-header-stroke p-0.5 bg-2nd-bg"
            role="group"
            aria-label="View layout"
          >
            <button
              type="button"
              onClick={() => onLayoutChange("list")}
              aria-pressed={layout === "list"}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-[calc(var(--radius-control)-2px)] type-caption font-semibold transition-colors ${
                layout === "list"
                  ? "bg-primary text-on-primary"
                  : "text-secondary-text hover:text-body"
              }`}
            >
              <LayoutList size={16} aria-hidden />
              List
            </button>
            <button
              type="button"
              onClick={() => onLayoutChange("map")}
              aria-pressed={layout === "map"}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-[calc(var(--radius-control)-2px)] type-caption font-semibold transition-colors ${
                layout === "map"
                  ? "bg-primary text-on-primary"
                  : "text-secondary-text hover:text-body"
              }`}
            >
              <Map size={16} aria-hidden />
              Map
            </button>
          </div>
        )}
        <FilterSelect
          label="Sort by"
          className="w-full sm:w-[220px]"
          value={sort}
          onChange={(v) => onSortChange(v as ListingSortKey)}
          options={LISTING_SORT_OPTIONS}
        />
      </div>
    </div>
  );
}
