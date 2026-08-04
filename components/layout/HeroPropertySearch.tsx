"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck, ChevronDown, Headset, MapPinned } from "lucide-react";
import {
  type HeroIntent,
  type HeroTrustSignal,
  heroBudgetOptions,
  heroLocationOptions,
  heroPropertyTypeOptions,
  heroRentOptions,
} from "@/data/HeroSectionData";

type HeroPropertySearchProps = {
  trustSignals: HeroTrustSignal[];
};

const trustIcons = {
  verified: BadgeCheck,
  experts: MapPinned,
  support: Headset,
} as const;

const intents: { id: HeroIntent; label: string }[] = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "sell", label: "Sell" },
];

type FieldSelectProps = {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

const FieldSelect = ({ label, value, options, onChange }: FieldSelectProps) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const selected =
    options.find((o) => o.value === value)?.label ?? options[0]?.label;

  return (
    <div className="relative min-w-0 flex-1">
      <p className="type-caption text-secondary-text uppercase tracking-wider mb-1 text-left">
        {label}
      </p>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 text-left type-body font-medium text-body min-h-9 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-2nd-bg rounded-sm"
      >
        <span className="truncate">{selected}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-secondary-text transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <ul
            id={`${id}-list`}
            role="listbox"
            className="absolute z-50 left-0 right-0 top-full mt-2 bg-2nd-bg border border-header-stroke rounded-control overflow-hidden max-h-52 overflow-y-auto shadow-lg custom-scrollbar text-left"
            data-lenis-prevent
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    className={`w-full text-left px-3 py-2.5 type-body transition ${
                      isSelected
                        ? "bg-primary text-on-primary"
                        : "text-body hover:bg-primary/15"
                    }`}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

const HeroPropertySearch = ({ trustSignals }: HeroPropertySearchProps) => {
  const router = useRouter();
  const [intent, setIntent] = useState<HeroIntent>("buy");
  const [location, setLocation] = useState("patna");
  const [propertyType, setPropertyType] = useState("all");
  const [budget, setBudget] = useState("any");
  const [rent, setRent] = useState("any");

  const submitLabel =
    intent === "sell"
      ? "List Property"
      : intent === "rent"
        ? "Search Rentals"
        : "Search";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (propertyType && propertyType !== "all") params.set("type", propertyType);

    if (intent === "buy") {
      if (budget && budget !== "any") params.set("budget", budget);
      const qs = params.toString();
      router.push(qs ? `/properties?${qs}` : "/properties");
      return;
    }

    if (intent === "rent") {
      if (rent && rent !== "any") params.set("rent", rent);
      const qs = params.toString();
      router.push(qs ? `/rent/tenants?${qs}` : "/rent/tenants");
      return;
    }

    const qs = params.toString();
    router.push(qs ? `/sell?${qs}` : "/sell");
  };

  return (
    <div className="w-full">
      {/* Unified search panel: tabs + fields share one background */}
      <form
        onSubmit={handleSubmit}
        className="rounded-media border border-white/20 bg-black/65 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        <div
          role="tablist"
          aria-label="Property intent"
          className="flex justify-center gap-1 border-b border-white/15 px-2 pt-1"
        >
          {intents.map((item) => {
            const active = intent === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setIntent(item.id)}
                className={`relative min-h-12 px-7 type-body font-semibold tracking-wide transition-colors ${
                  active
                    ? "text-primary"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute inset-x-4 bottom-0 h-0.5 bg-primary rounded-full"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-end sm:gap-5 sm:p-5">
          <FieldSelect
            label={intent === "sell" ? "Property Location" : "Location"}
            value={location}
            options={heroLocationOptions}
            onChange={setLocation}
          />

          <div
            className="hidden sm:block w-px self-stretch bg-white/15 shrink-0"
            aria-hidden
          />

          <FieldSelect
            label="Property Type"
            value={propertyType}
            options={heroPropertyTypeOptions}
            onChange={setPropertyType}
          />

          {intent !== "sell" && (
            <>
              <div
                className="hidden sm:block w-px self-stretch bg-white/15 shrink-0"
                aria-hidden
              />
              <FieldSelect
                label={intent === "rent" ? "Monthly Rent" : "Budget"}
                value={intent === "rent" ? rent : budget}
                options={intent === "rent" ? heroRentOptions : heroBudgetOptions}
                onChange={intent === "rent" ? setRent : setBudget}
              />
            </>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-control bg-primary text-on-primary type-body font-semibold min-h-12 px-6 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:self-end"
          >
            <span className="sm:hidden">{submitLabel}</span>
            <span className="hidden sm:inline">
              {intent === "sell" ? "List Property" : "Search"}
            </span>
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      </form>

      {/* Trust strip */}
      <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {trustSignals.map((signal) => {
          const Icon = trustIcons[signal.icon];
          return (
            <li
              key={signal.id}
              className="inline-flex items-center gap-2 type-caption text-white/70"
            >
              <span className="inline-flex items-center justify-center size-7 rounded-control bg-primary/15 border border-primary/30 shrink-0">
                <Icon size={14} className="text-primary" aria-hidden />
              </span>
              {signal.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HeroPropertySearch;
