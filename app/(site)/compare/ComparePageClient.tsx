"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Plus, X } from "lucide-react";
import PageState from "@/components/ui/PageState";
import SectionHeader from "@/components/ui/SectionHeader";
import { useCompareListings } from "@/components/providers/CompareListingsProvider";
import {
  bestValueIndices,
  highlightLabels,
  parseSpecNumber,
  specValue,
  type CompareListingItem,
  type CompareWinnerDirection,
  COMPARE_MAX,
} from "@/lib/compareListings";
import {
  formatPrice,
  formatPriceExact,
  formatPricePerSqFt,
  parseAreaSqFt,
  parsePriceDigits,
} from "@/lib/formatPrice";

type RowKey =
  | "price"
  | "pps"
  | "type"
  | "location"
  | "beds"
  | "baths"
  | "area"
  | "amenities";

type CompareRow = {
  key: RowKey;
  label: string;
  get: (i: CompareListingItem) => string;
  numeric?: (i: CompareListingItem) => number | null;
  direction?: CompareWinnerDirection;
  accent?: boolean;
  chips?: boolean;
};

const ROWS: CompareRow[] = [
  {
    key: "price",
    label: "Price",
    get: (i) => formatPrice(i.price),
    numeric: (i) => {
      const n = parsePriceDigits(i.price);
      return n > 0 ? n : null;
    },
    direction: "min",
    accent: true,
  },
  {
    key: "pps",
    label: "₹ / sq ft",
    get: (i) => formatPricePerSqFt(i.price, i.specifications) ?? "—",
    numeric: (i) => {
      const label = formatPricePerSqFt(i.price, i.specifications);
      return label ? parseSpecNumber(label) : null;
    },
    direction: "min",
  },
  {
    key: "type",
    label: "Type",
    get: (i) => (i.type === "plot" ? "Plot" : "Home"),
  },
  {
    key: "location",
    label: "Location",
    get: (i) => i.address ?? "—",
  },
  {
    key: "beds",
    label: "Bedrooms",
    get: (i) => specValue(i, "bed", "bhk"),
    numeric: (i) => parseSpecNumber(specValue(i, "bed", "bhk")),
    direction: "max",
  },
  {
    key: "baths",
    label: "Bathrooms",
    get: (i) => specValue(i, "bath"),
    numeric: (i) => parseSpecNumber(specValue(i, "bath")),
    direction: "max",
  },
  {
    key: "area",
    label: "Area",
    get: (i) => specValue(i, "area", "sq", "size", "plot"),
    numeric: (i) =>
      parseAreaSqFt(i.specifications, specValue(i, "area", "sq", "size", "plot")),
    direction: "max",
  },
  {
    key: "amenities",
    label: "Highlights",
    get: (i) => {
      const labels = highlightLabels(i);
      return labels.length ? labels.join(", ") : "—";
    },
    chips: true,
  },
];

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function EmptySlot({ index }: { index: number }) {
  return (
    <div className="flex flex-col gap-3 h-full min-h-[11rem]">
      <Link
        href="/properties"
        className="flex-1 flex flex-col items-center justify-center gap-2 rounded-media border border-dashed border-header-stroke bg-main-bg/40 text-secondary-text hover:border-primary/50 hover:text-primary transition-colors min-h-[9rem] aspect-[4/3]"
      >
        <span className="size-10 rounded-full border border-current inline-flex items-center justify-center">
          <Plus size={18} aria-hidden />
        </span>
        <span className="type-caption font-semibold">Add listing</span>
        <span className="type-caption opacity-70">Slot {index + 1}</span>
      </Link>
      <p className="type-caption text-secondary-text">Browse to add</p>
    </div>
  );
}

export default function ComparePageClient() {
  const { items, count, hydrated, remove, clear, max } = useCompareListings();
  const [diffOnly, setDiffOnly] = useState(false);

  const emptySlots = Math.max(0, max - count);

  const winnersByRow = useMemo(() => {
    const map = new Map<RowKey, Set<number>>();
    for (const row of ROWS) {
      if (!row.numeric || !row.direction) continue;
      const values = items.map((item) => row.numeric!(item));
      map.set(row.key, bestValueIndices(values, row.direction));
    }
    return map;
  }, [items]);

  const visibleRows = useMemo(() => {
    if (!diffOnly || count < 2) return ROWS;
    return ROWS.filter((row) => {
      const values = items.map((item) => row.get(item));
      return new Set(values).size > 1;
    });
  }, [diffOnly, items, count]);

  if (!hydrated) {
    return (
      <div className="page-px section-y min-h-[50vh]">
        <div className="space-y-6 animate-pulse">
          <div className="h-4 w-28 rounded bg-header-stroke" />
          <div className="h-10 w-64 max-w-full rounded bg-header-stroke" />
          <div className="h-4 w-48 rounded bg-header-stroke" />
          <div className="h-72 rounded-card border border-header-stroke bg-2nd-bg" />
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <PageState
        title="Nothing to compare yet"
        description="Use the compare icon on listing cards to add up to four homes or plots."
        primaryHref="/properties"
        primaryLabel="Browse homes"
        secondaryHref="/plots"
        secondaryLabel="Browse plots"
      />
    );
  }

  return (
    <div className="page-px section-y space-y-8 pb-28 lg:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <p className="type-label text-primary">Decide faster</p>
          <SectionHeader
            title="Compare listings"
            description={
              count === 1
                ? "Add one more listing to unlock side-by-side differences."
                : `Side-by-side view of ${count} listings · up to ${COMPARE_MAX}.`
            }
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start">
          {count >= 2 && (
            <button
              type="button"
              onClick={() => setDiffOnly((v) => !v)}
              aria-pressed={diffOnly}
              className={cx(
                "min-h-11 px-4 inline-flex items-center justify-center rounded-control border type-body font-semibold transition-colors",
                diffOnly
                  ? "border-primary/50 text-primary bg-primary/10"
                  : "border-header-stroke text-secondary-text hover:text-body"
              )}
            >
              {diffOnly ? "Showing differences" : "Differences only"}
            </button>
          )}
          <button
            type="button"
            onClick={clear}
            className="min-h-11 px-4 inline-flex items-center justify-center rounded-control border border-header-stroke type-body font-semibold text-secondary-text hover:text-body transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      {count === 1 && (
        <p className="type-caption text-secondary-text rounded-control border border-header-stroke/80 bg-2nd-bg px-4 py-3">
          Comparing needs at least two listings. Use empty slots below or the
          compare icon on cards.
        </p>
      )}

      {count >= 2 && (
        <p className="type-caption text-secondary-text">
          Gold check marks the stronger value in that row when numbers differ
          (lower price / ₹·sqft, higher beds · baths · area).
        </p>
      )}

      {/* Desktop / tablet table */}
      <div className="hidden md:block overflow-x-auto custom-scrollbar border border-header-stroke rounded-card bg-2nd-bg">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-header-stroke">
              <th className="sticky left-0 z-[2] bg-2nd-bg p-4 text-left type-caption text-secondary-text w-36 align-bottom">
                Detail
              </th>
              {items.map((item) => (
                <th
                  key={`${item.type}:${item.id}`}
                  className="p-4 text-left align-top min-w-[200px] max-w-[260px]"
                >
                  <div className="relative aspect-[4/3] rounded-media overflow-hidden mb-3 bg-black group">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="240px"
                      aria-hidden
                    />
                    <span className="absolute left-2 top-2 type-caption font-semibold px-2 py-0.5 rounded-control bg-black/65 text-white border border-white/10">
                      {item.type === "plot" ? "Plot" : "Home"}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(item.type, item.id)}
                      className="absolute top-2 right-2 size-8 rounded-full bg-black/70 text-white inline-flex items-center justify-center hover:bg-primary transition-colors"
                      aria-label={`Remove ${item.title}`}
                    >
                      <X size={14} aria-hidden />
                    </button>
                  </div>
                  <Link
                    href={item.href}
                    className="type-card-title text-body text-balance leading-snug hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </th>
              ))}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <th
                  key={`empty-${i}`}
                  className="p-4 text-left align-top min-w-[180px]"
                >
                  <EmptySlot index={count + i} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIndex) => {
              const winners = winnersByRow.get(row.key) ?? new Set();
              return (
                <tr
                  key={row.key}
                  className={cx(
                    "border-b border-header-stroke last:border-0",
                    rowIndex % 2 === 1 && "bg-main-bg/35"
                  )}
                >
                  <th className="sticky left-0 z-[1] bg-2nd-bg p-4 text-left type-caption font-semibold text-secondary-text align-top">
                    {row.label}
                  </th>
                  {items.map((item, colIndex) => {
                    const value = row.get(item);
                    const isBest = winners.has(colIndex);
                    const chips = row.chips ? highlightLabels(item) : [];

                    return (
                      <td
                        key={`${item.type}:${item.id}-${row.key}`}
                        className={cx(
                          "p-4 type-body text-body align-top",
                          row.accent && "type-price text-primary",
                          isBest && !row.accent && "text-body"
                        )}
                        title={
                          row.key === "price"
                            ? formatPriceExact(item.price)
                            : undefined
                        }
                      >
                        {row.chips ? (
                          chips.length ? (
                            <ul className="flex flex-wrap gap-1.5">
                              {chips.map((label) => (
                                <li
                                  key={label}
                                  className="type-caption px-2 py-1 rounded-control border border-header-stroke bg-main-bg/50 text-secondary-text"
                                >
                                  {label}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-secondary-text">—</span>
                          )
                        ) : (
                          <span
                            className={cx(
                              "inline-flex items-start gap-1.5",
                              isBest && "font-semibold"
                            )}
                          >
                            {isBest && (
                              <span
                                className="mt-0.5 size-5 shrink-0 rounded-full bg-primary/20 text-primary inline-flex items-center justify-center"
                                title="Stronger in this row"
                                aria-label="Stronger in this row"
                              >
                                <Check size={12} strokeWidth={3} aria-hidden />
                              </span>
                            )}
                            <span
                              className={cx(
                                value === "—" && "text-secondary-text",
                                isBest && !row.accent && "text-primary"
                              )}
                            >
                              {value}
                            </span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                  {Array.from({ length: emptySlots }).map((_, i) => (
                    <td
                      key={`empty-${row.key}-${i}`}
                      className="p-4 type-caption text-secondary-text/50"
                    >
                      —
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr>
              <th className="sticky left-0 z-[1] bg-2nd-bg p-4 text-left type-caption font-semibold text-secondary-text">
                Action
              </th>
              {items.map((item) => (
                <td key={`${item.type}:${item.id}-cta`} className="p-4">
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 px-4 items-center justify-center rounded-control bg-primary text-on-primary type-caption font-semibold hover:brightness-110 transition"
                  >
                    View listing
                  </Link>
                </td>
              ))}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <td key={`empty-cta-${i}`} className="p-4">
                  <Link
                    href="/properties"
                    className="inline-flex min-h-10 px-4 items-center justify-center rounded-control border border-dashed border-header-stroke type-caption font-semibold text-secondary-text hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    Add
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden space-y-4">
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1 -mx-1 px-1">
          {items.map((item, index) => (
            <span
              key={`chip-${item.type}:${item.id}`}
              className="shrink-0 type-caption font-semibold px-3 py-1.5 rounded-control border border-header-stroke bg-2nd-bg"
            >
              {index + 1}. {item.title.slice(0, 22)}
              {item.title.length > 22 ? "…" : ""}
            </span>
          ))}
        </div>

        {items.map((item, colIndex) => (
          <article
            key={`${item.type}:${item.id}-mobile`}
            className="border border-header-stroke rounded-card overflow-hidden bg-2nd-bg"
          >
            <div className="relative aspect-[16/10] bg-black">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                aria-hidden
              />
              <span className="absolute left-3 top-3 type-caption font-semibold px-2 py-0.5 rounded-control bg-black/65 text-white border border-white/10">
                {item.type === "plot" ? "Plot" : "Home"}
              </span>
              <button
                type="button"
                onClick={() => remove(item.type, item.id)}
                className="absolute top-3 right-3 size-9 rounded-full bg-black/70 text-white inline-flex items-center justify-center hover:bg-primary"
                aria-label={`Remove ${item.title}`}
              >
                <X size={14} aria-hidden />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <Link
                  href={item.href}
                  className="type-card-title text-body hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
                <p
                  className="type-price text-primary"
                  title={formatPriceExact(item.price)}
                >
                  {formatPrice(item.price)}
                </p>
              </div>

              <dl className="space-y-0 divide-y divide-header-stroke border-y border-header-stroke">
                {visibleRows
                  .filter((r) => r.key !== "price")
                  .map((row) => {
                    const winners = winnersByRow.get(row.key) ?? new Set();
                    const isBest = winners.has(colIndex);
                    const value = row.get(item);
                    const chips = row.chips ? highlightLabels(item) : [];

                    return (
                      <div
                        key={row.key}
                        className="flex gap-3 justify-between py-3"
                      >
                        <dt className="type-caption font-semibold text-secondary-text shrink-0 w-24">
                          {row.label}
                        </dt>
                        <dd className="type-body text-body text-right min-w-0">
                          {row.chips ? (
                            chips.length ? (
                              <ul className="flex flex-wrap justify-end gap-1.5">
                                {chips.map((label) => (
                                  <li
                                    key={label}
                                    className="type-caption px-2 py-1 rounded-control border border-header-stroke bg-main-bg/50 text-secondary-text"
                                  >
                                    {label}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-secondary-text">—</span>
                            )
                          ) : (
                            <span
                              className={cx(
                                "inline-flex items-center justify-end gap-1.5",
                                value === "—" && "text-secondary-text",
                                isBest && "font-semibold text-primary"
                              )}
                            >
                              {isBest && (
                                <Check
                                  size={14}
                                  className="text-primary shrink-0"
                                  aria-hidden
                                />
                              )}
                              {value}
                            </span>
                          )}
                        </dd>
                      </div>
                    );
                  })}
              </dl>

              <Link
                href={item.href}
                className="w-full inline-flex min-h-11 items-center justify-center rounded-control bg-primary text-on-primary type-caption font-semibold hover:brightness-110 transition"
              >
                View listing
              </Link>
            </div>
          </article>
        ))}

        {emptySlots > 0 && (
          <Link
            href="/properties"
            className="flex flex-col items-center justify-center gap-2 min-h-[8rem] rounded-card border border-dashed border-header-stroke text-secondary-text hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Plus size={20} aria-hidden />
            <span className="type-caption font-semibold">
              Add another listing ({count}/{max})
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
