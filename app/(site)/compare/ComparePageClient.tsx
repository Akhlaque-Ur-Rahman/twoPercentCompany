"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import PageState from "@/components/ui/PageState";
import SectionHeader from "@/components/ui/SectionHeader";
import { useCompareListings } from "@/components/providers/CompareListingsProvider";
import { specValue } from "@/lib/compareListings";
import { formatPrice, formatPriceExact } from "@/lib/formatPrice";

const ROWS: { key: string; label: string; get: (i: Parameters<typeof specValue>[0]) => string }[] = [
  {
    key: "price",
    label: "Price",
    get: (i) => formatPrice(i.price),
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
  },
  {
    key: "baths",
    label: "Bathrooms",
    get: (i) => specValue(i, "bath"),
  },
  {
    key: "area",
    label: "Area",
    get: (i) => specValue(i, "area", "sq", "size", "plot"),
  },
  {
    key: "amenities",
    label: "Highlights",
    get: (i) => {
      const fromFeatures = (i.features ?? []).slice(0, 3).join(", ");
      if (fromFeatures) return fromFeatures;
      const fromTags = (i.tags ?? [])
        .slice(0, 3)
        .map((t) => t.label)
        .join(", ");
      return fromTags || "—";
    },
  },
];

export default function ComparePageClient() {
  const { items, count, hydrated, remove, clear } = useCompareListings();

  if (!hydrated) {
    return (
      <div className="page-px section-y min-h-[50vh]">
        <p className="type-body text-secondary-text">Loading compare…</p>
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

  if (count === 1) {
    return (
      <div className="page-px section-y space-y-6">
        <SectionHeader
          title="Compare listings"
          description="Add at least one more listing to see a side-by-side table."
        />
        <div className="max-w-sm border border-header-stroke rounded-card overflow-hidden bg-2nd-bg">
          <div className="relative aspect-[4/3]">
            <Image
              src={items[0].image}
              alt=""
              fill
              className="object-cover"
              sizes="400px"
              aria-hidden
            />
          </div>
          <div className="p-4 space-y-2">
            <p className="type-card-title text-body">{items[0].title}</p>
            <p className="type-price text-primary" title={formatPriceExact(items[0].price)}>
              {formatPrice(items[0].price)}
            </p>
            <Link
              href={items[0].href}
              className="inline-flex type-caption font-semibold text-primary"
            >
              View listing
            </Link>
          </div>
        </div>
        <Link
          href="/properties"
          className="inline-flex min-h-11 px-5 items-center rounded-control bg-primary text-on-primary font-semibold"
        >
          Add another listing
        </Link>
      </div>
    );
  }

  return (
    <div className="page-px section-y space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <p className="type-label text-primary">Decide faster</p>
          <SectionHeader
            title="Compare listings"
            description={`Side-by-side view of ${count} listings.`}
          />
        </div>
        <button
          type="button"
          onClick={clear}
          className="min-h-11 px-4 inline-flex items-center justify-center rounded-control border border-header-stroke type-body font-semibold text-secondary-text hover:text-body transition-colors self-start"
        >
          Clear all
        </button>
      </div>

      <div className="overflow-x-auto border border-header-stroke rounded-card bg-2nd-bg">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-header-stroke">
              <th className="sticky left-0 z-[1] bg-2nd-bg p-3 text-left type-caption text-secondary-text w-32">
                Detail
              </th>
              {items.map((item) => (
                <th
                  key={`${item.type}:${item.id}`}
                  className="p-3 text-left align-top min-w-[180px]"
                >
                  <div className="relative aspect-[4/3] rounded-media overflow-hidden mb-3 bg-black">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="220px"
                      aria-hidden
                    />
                    <button
                      type="button"
                      onClick={() => remove(item.type, item.id)}
                      className="absolute top-2 right-2 size-8 rounded-full bg-black/70 text-white inline-flex items-center justify-center hover:bg-primary"
                      aria-label={`Remove ${item.title}`}
                    >
                      <X size={14} aria-hidden />
                    </button>
                  </div>
                  <p className="type-card-title text-body text-balance leading-snug">
                    {item.title}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className="border-b border-header-stroke last:border-0">
                <th className="sticky left-0 z-[1] bg-2nd-bg p-3 text-left type-caption font-semibold text-secondary-text">
                  {row.label}
                </th>
                {items.map((item) => (
                  <td
                    key={`${item.type}:${item.id}-${row.key}`}
                    className={`p-3 type-body text-body ${
                      row.key === "price" ? "type-price text-primary" : ""
                    }`}
                    title={row.key === "price" ? formatPriceExact(item.price) : undefined}
                  >
                    {row.get(item)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th className="sticky left-0 z-[1] bg-2nd-bg p-3 text-left type-caption font-semibold text-secondary-text">
                Action
              </th>
              {items.map((item) => (
                <td key={`${item.type}:${item.id}-cta`} className="p-3">
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 px-4 items-center justify-center rounded-control bg-primary text-on-primary type-caption font-semibold hover:brightness-110"
                  >
                    View
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
