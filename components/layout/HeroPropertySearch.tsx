"use client";

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck, ChevronDown, Headset, MapPinned } from "lucide-react";
import {
  type HeroIntent,
  type HeroTrustSignal,
  heroBudgetOptions,
  heroLocationOptions,
  heroPropertyTypeOptions,
  heroRentOptions,
} from "@/data/HeroSectionData";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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
  className?: string;
};

type MenuPos = { top: number; left: number; width: number; maxHeight: number };

const FieldSelect = ({
  label,
  value,
  options,
  onChange,
  className = "",
}: FieldSelectProps) => {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const selected =
    options.find((o) => o.value === value)?.label ?? options[0]?.label;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPos = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const gap = 8;
    const spaceBelow = window.innerHeight - rect.bottom - gap - 16;
    const spaceAbove = rect.top - gap - 16;
    const preferBelow = spaceBelow >= 160 || spaceBelow >= spaceAbove;
    const maxHeight = Math.min(208, preferBelow ? spaceBelow : spaceAbove);
    const top = preferBelow
      ? rect.bottom + gap
      : Math.max(16, rect.top - gap - maxHeight);

    setMenuPos({
      top,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.max(120, maxHeight),
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updateMenuPos();
    const onReposition = () => updateMenuPos();
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open]);

  return (
    <div className={`relative min-w-0 flex-1 w-full ${className}`}>
      <p className="type-caption text-white/50 uppercase tracking-wider mb-0.5 sm:mb-1 text-left">
        {label}
      </p>
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 text-left type-body font-medium text-white min-h-10 sm:min-h-9 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
      >
        <span className="truncate">{selected}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {mounted &&
        open &&
        menuPos &&
        createPortal(
          <>
            <button
              type="button"
              className="fixed inset-0 z-[80] cursor-default"
              aria-label="Close"
              onClick={() => setOpen(false)}
            />
            <ul
              id={`${id}-list`}
              role="listbox"
              style={{
                top: menuPos.top,
                left: menuPos.left,
                width: menuPos.width,
                maxHeight: menuPos.maxHeight,
              }}
              className="fixed z-[90] bg-2nd-bg border border-header-stroke rounded-control overflow-y-auto shadow-lg custom-scrollbar text-left"
              data-lenis-prevent
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                  >
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
          </>,
          document.body
        )}
    </div>
  );
};

const bubbleTransition = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.7,
};

const HeroPropertySearch = ({ trustSignals }: HeroPropertySearchProps) => {
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
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
      // Plot type from hero → plots browse (omit type=plot; all items are plots)
      if (propertyType === "plot") {
        params.delete("type");
        const plotQs = params.toString();
        router.push(plotQs ? `/plots?${plotQs}` : "/plots");
        return;
      }
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
      <form
        onSubmit={handleSubmit}
        className="rounded-media border border-white/15 bg-black/55 sm:bg-black/50 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-visible"
      >
        <div
          role="tablist"
          aria-label="Property intent"
          className="relative grid grid-cols-3 gap-1 p-1.5 border-b border-white/10"
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
                className={`relative z-[1] flex items-center justify-center min-h-10 sm:min-h-11 type-body font-semibold tracking-wide transition-colors duration-300 ${
                  active
                    ? "text-primary"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={reduceMotion ? undefined : "hero-intent-bubble"}
                    className="absolute left-3 right-3 bottom-1 h-0.5 rounded-full bg-primary"
                    transition={
                      reduceMotion ? { duration: 0 } : bubbleTransition
                    }
                    aria-hidden
                  />
                )}
                <span className="relative z-[1]">{item.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={intent}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
            className="flex flex-col sm:flex-row sm:items-end sm:gap-5 sm:p-5 overflow-visible"
          >
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:contents">
              <div className="px-3.5 py-2.5 sm:p-0 sm:contents">
                <FieldSelect
                  label={intent === "sell" ? "Property Location" : "Location"}
                  value={location}
                  options={heroLocationOptions}
                  onChange={setLocation}
                />
              </div>

              <div
                className="hidden sm:block w-px self-stretch bg-white/15 shrink-0"
                aria-hidden
              />

              <div className="px-3.5 py-2.5 sm:p-0 sm:contents">
                <FieldSelect
                  label="Property Type"
                  value={propertyType}
                  options={heroPropertyTypeOptions}
                  onChange={setPropertyType}
                />
              </div>

              {intent !== "sell" && (
                <>
                  <div
                    className="hidden sm:block w-px self-stretch bg-white/15 shrink-0"
                    aria-hidden
                  />
                  <div className="px-3.5 py-2.5 sm:p-0 sm:contents">
                    <FieldSelect
                      label={intent === "rent" ? "Monthly Rent" : "Budget"}
                      value={intent === "rent" ? rent : budget}
                      options={
                        intent === "rent" ? heroRentOptions : heroBudgetOptions
                      }
                      onChange={intent === "rent" ? setRent : setBudget}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-3 pt-2 sm:p-0 sm:contents">
              <button
                type="submit"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 shrink-0 rounded-control bg-primary text-on-primary type-body font-semibold min-h-12 px-6 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:self-end"
              >
                <span className="sm:hidden">{submitLabel}</span>
                <span className="hidden sm:inline">
                  {intent === "sell" ? "List Property" : "Search"}
                </span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </form>

      <ul className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2.5 sm:gap-x-5">
        {trustSignals.map((signal) => {
          const Icon = trustIcons[signal.icon];
          return (
            <li
              key={signal.id}
              className="inline-flex shrink-0 items-center gap-1.5 type-caption text-white/65"
            >
              <Icon size={13} className="text-primary shrink-0" aria-hidden />
              <span>{signal.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HeroPropertySearch;
