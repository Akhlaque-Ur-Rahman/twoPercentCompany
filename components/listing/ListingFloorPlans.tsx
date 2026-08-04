"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Ruler,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { FloorPlan, PropertyItem } from "@/data/PropertyData";
import { listingEnquiryMessage, whatsappHref } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type ListingFloorPlansProps = {
  item: PropertyItem;
  plans: FloorPlan[];
  ctaHref: string;
  ctaLabel: string;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

const navBtnClass =
  "absolute top-1/2 -translate-y-1/2 z-10 min-w-11 min-h-11 inline-flex items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-sm hover:bg-neutral-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

function findSpec(
  specs: PropertyItem["specifications"],
  ...labels: string[]
): string | undefined {
  if (!specs?.length) return undefined;
  const wanted = labels.map((l) => l.toLowerCase());
  return specs.find((s) => wanted.includes(s.label.toLowerCase()))?.value;
}

function planLabel(plan: FloorPlan, index: number, type: PropertyItem["type"]) {
  if (plan.label?.trim()) return plan.label.trim();
  if (type === "plot") {
    return index === 0 ? "Site plan" : `Layout ${index + 1}`;
  }
  return `Floor plan ${index + 1}`;
}

function planWhatsAppMessage(title: string, label: string, href?: string) {
  const link = href ? `\n${href}` : "";
  return `Hi 2% Company, please share the "${label}" floor plan for "${title}" and help me understand the layout.${link}`;
}

const ListingFloorPlans: React.FC<ListingFloorPlansProps> = ({
  item,
  plans,
  ctaHref,
  ctaLabel,
}) => {
  const [active, setActive] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const dialogTitleId = useId();
  const reducedMotion = usePrefersReducedMotion();

  const area = findSpec(
    item.specifications,
    "Carpet Area",
    "Plot Area",
    "Super Area",
    "Built-up Area"
  );
  const bhkTag = item.tags.find((t) => /bhk|studio|plot/i.test(t.label))?.label;
  const listingUrl =
    item.url ??
    `https://www.2percentcompany.in/${
      item.type === "plot" ? "plots" : "properties"
    }/${item.slug}`;

  const sectionEnquireHref = whatsappHref(
    listingEnquiryMessage(item.title, listingUrl)
  );

  useEffect(() => {
    if (active == null) return;

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      [closeBtnRef.current, prevBtnRef.current, nextBtnRef.current].filter(
        (el): el is HTMLButtonElement => Boolean(el)
      );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((i) => (i == null ? i : (i - 1 + plans.length) % plans.length));
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((i) => (i == null ? i : (i + 1) % plans.length));
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = focusables();
      if (!nodes.length) return;
      e.preventDefault();
      const idx = nodes.indexOf(document.activeElement as HTMLButtonElement);
      const next = e.shiftKey
        ? nodes[(idx - 1 + nodes.length) % nodes.length]
        : nodes[(idx + 1) % nodes.length];
      next?.focus();
    };

    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocusRef.current?.focus();
    };
  }, [active, plans.length]);

  if (!plans.length) return null;

  const openPlan = active != null ? plans[active] : null;
  const openLabel =
    openPlan && active != null
      ? planLabel(openPlan, active, item.type)
      : "Floor plan";

  return (
    <section aria-labelledby="floorplan-heading" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 id="floorplan-heading" className="type-section text-body">
            {item.type === "plot" ? "Site & layout plans" : "Floor plans"}
          </h2>
          <p className="type-caption text-secondary-text mt-2 max-w-xl">
            Review the layout before you visit — tap any plan to enlarge, download,
            or ask us about room sizes.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2" aria-label="Layout facts">
          {bhkTag && (
            <li className="type-caption text-body border border-header-stroke px-3 py-1.5 rounded-control">
              {bhkTag}
            </li>
          )}
          {area && (
            <li className="inline-flex items-center gap-1.5 type-caption text-body border border-header-stroke px-3 py-1.5 rounded-control">
              <Ruler size={14} className="text-primary shrink-0" aria-hidden />
              {area}
            </li>
          )}
          <li className="type-caption text-secondary-text border border-header-stroke px-3 py-1.5 rounded-control">
            {plans.length} plan{plans.length === 1 ? "" : "s"}
          </li>
        </ul>
      </div>

      <ul
        className={`grid gap-4 ${
          plans.length === 1
            ? "grid-cols-1 max-w-2xl"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {plans.map((plan, index) => {
          const label = planLabel(plan, index, item.type);
          return (
            <li key={`${plan.url}-${index}`}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Open ${label} larger view`}
                className={`group w-full text-left rounded-control border border-header-stroke bg-2nd-bg overflow-hidden transition-[border-color] hover:border-primary/40 ${focusRing}`}
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-white p-3 sm:p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={plan.url}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-header-stroke">
                  <div className="min-w-0">
                    <p className="type-body text-body font-medium truncate">
                      {label}
                    </p>
                    <p className="type-caption text-secondary-text mt-0.5">
                      Tap to enlarge
                    </p>
                  </div>
                  <span className="type-caption text-primary shrink-0 font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-header-stroke pt-6">
        <p className="type-caption text-secondary-text max-w-md">
          Want dimensions confirmed on site? We&apos;ll walk the plan with you on a
          guided visit.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href={ctaHref}
            className={`inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-control hover:brightness-110 transition w-full sm:w-auto ${focusRing}`}
          >
            {ctaLabel}
            <ArrowRight size={16} aria-hidden />
          </Link>
          <a
            href={sectionEnquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control border border-header-stroke text-body hover:border-primary/40 transition-colors w-full sm:w-auto ${focusRing}`}
          >
            <FaWhatsapp size={16} aria-hidden />
            Ask about this layout
          </a>
        </div>
      </div>

      <AnimatePresence>
        {active != null && openPlan && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/92"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
          >
            <div
              className="relative flex w-full max-w-6xl flex-col gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 px-1">
                <div className="min-w-0">
                  <p
                    id={dialogTitleId}
                    className="type-body text-white font-semibold truncate"
                  >
                    {openLabel}
                  </p>
                  <p className="type-caption text-white/60 mt-0.5">
                    {active + 1} / {plans.length} · {item.title}
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setActive(null)}
                  className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-full border border-white/30 text-white bg-black/50 hover:bg-black/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close floor plan preview"
                >
                  <X size={22} aria-hidden className="text-white" />
                </button>
              </div>

              <div className="relative rounded-control bg-white overflow-hidden">
                <motion.div
                  key={openPlan.url + active}
                  className="flex min-h-[50vh] max-h-[72vh] w-full items-center justify-center p-4 sm:p-8"
                  initial={reducedMotion ? false : { opacity: 0.6, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={openPlan.url}
                    alt={`${openLabel} for ${item.title}`}
                    className="mx-auto block max-h-[min(64vh,720px)] max-w-full h-auto w-auto object-contain"
                  />
                </motion.div>

                {plans.length > 1 && (
                  <>
                    <button
                      ref={prevBtnRef}
                      type="button"
                      aria-label="Previous floor plan"
                      onClick={() =>
                        setActive((i) =>
                          i == null ? 0 : (i - 1 + plans.length) % plans.length
                        )
                      }
                      className={`${navBtnClass} left-2 sm:left-3`}
                    >
                      <ChevronLeft
                        size={22}
                        strokeWidth={2.5}
                        className="text-black"
                        aria-hidden
                      />
                    </button>
                    <button
                      ref={nextBtnRef}
                      type="button"
                      aria-label="Next floor plan"
                      onClick={() =>
                        setActive((i) =>
                          i == null ? 0 : (i + 1) % plans.length
                        )
                      }
                      className={`${navBtnClass} right-2 sm:right-3`}
                    >
                      <ChevronRight
                        size={22}
                        strokeWidth={2.5}
                        className="text-black"
                        aria-hidden
                      />
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a
                  href={openPlan.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-control border border-white/25 text-white hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Download size={16} aria-hidden />
                  Download plan
                </a>
                <a
                  href={whatsappHref(
                    planWhatsAppMessage(item.title, openLabel, listingUrl)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-control bg-primary text-on-primary font-semibold hover:brightness-110 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <FaWhatsapp size={16} aria-hidden />
                  Ask about this layout
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ListingFloorPlans;
