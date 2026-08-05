"use client";

import React from "react";
import { X } from "lucide-react";
import { heroLocationOptions } from "@/data/HeroSectionData";
import { BUDGET_RANGES, RENT_RANGES } from "@/lib/listingFilters";

export type ActiveFilterChip = {
  id: string;
  label: string;
  onClear: () => void;
};

type ActiveFilterChipsProps = {
  chips: ActiveFilterChip[];
  className?: string;
};

export function locationChipLabel(location: string): string {
  return (
    heroLocationOptions.find((o) => o.value === location)?.label ??
    location.replace(/-/g, " ")
  );
}

export function budgetChipLabel(budget: string): string {
  const map: Record<string, string> = {
    "below-50l": "Below ₹50L",
    "50l-1cr": "₹50L – ₹1Cr",
    "above-1cr": "Above ₹1Cr",
  };
  return map[budget] ?? budget;
}

export function rentChipLabel(rent: string): string {
  const map: Record<string, string> = {
    below20: "Below ₹20K",
    "20to40": "₹20K – ₹40K",
    above40: "Above ₹40K",
  };
  return map[rent] ?? rent;
}

/** Helpers kept for callers that need range existence checks. */
export const knownBudgetKeys = Object.keys(BUDGET_RANGES);
export const knownRentKeys = Object.keys(RENT_RANGES);

export default function ActiveFilterChips({
  chips,
  className = "",
}: ActiveFilterChipsProps) {
  if (!chips.length) return null;

  return (
    <ul
      className={`flex flex-wrap gap-2 ${className}`}
      aria-label="Active filters"
    >
      {chips.map((chip) => (
        <li key={chip.id}>
          <button
            type="button"
            onClick={chip.onClear}
            className="inline-flex items-center gap-1.5 rounded-control border border-primary/35 bg-primary/10 px-3 py-1.5 type-caption font-semibold text-body hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
            aria-label={`Clear filter ${chip.label}`}
          >
            <span>{chip.label}</span>
            <X size={14} className="text-primary shrink-0" aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  );
}
