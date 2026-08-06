"use client";

import React from "react";
import Link from "next/link";
import ListingCard from "@/components/listing/ListingCard";
import PageState from "@/components/ui/PageState";
import SectionHeader from "@/components/ui/SectionHeader";
import { useSavedListings } from "@/components/providers/SavedListingsProvider";
import type { ListingCardItem } from "@/components/listing/ListingCard";

export default function SavedPageClient() {
  const { items, count, hydrated, clear } = useSavedListings();

  if (!hydrated) {
    return (
      <div className="page-px section-y min-h-[50vh]">
        <p className="type-body text-secondary-text">Loading saved listings…</p>
      </div>
    );
  }

  if (count === 0) {
    return (
      <PageState
        title="No saved listings yet"
        description="Tap the heart on any home or plot to build your shortlist. It stays on this device."
        primaryHref="/properties"
        primaryLabel="Browse homes"
        secondaryHref="/plots"
        secondaryLabel="Browse plots"
      />
    );
  }

  return (
    <div className="page-px section-y space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <p className="type-label text-primary">Shortlist</p>
          <SectionHeader
            title="Saved listings"
            description={`${count} saved on this device. Compare or enquire when you’re ready.`}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/compare"
            className="min-h-11 px-4 inline-flex items-center justify-center rounded-control border border-header-stroke type-body font-semibold text-body hover:border-primary/40 transition-colors"
          >
            Compare
          </Link>
          <button
            type="button"
            onClick={clear}
            className="min-h-11 px-4 inline-flex items-center justify-center rounded-control border border-header-stroke type-body font-semibold text-secondary-text hover:text-body transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      <p className="type-caption text-secondary-text">
        Showing {count} saved listing{count === 1 ? "" : "s"}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {items.map((item, index) => {
          const card: ListingCardItem = {
            id: item.id,
            slug: item.slug,
            title: item.title,
            description: item.address ?? "",
            address: item.address ?? "",
            price: item.price,
            image: item.image,
            tags: [],
            type: item.type,
            position: [25.5941, 85.1376],
          };
          return (
            <li key={`${item.type}:${item.id}`}>
              <ListingCard
                property={card}
                href={item.href}
                index={index}
                badge={item.type === "plot" ? "Plot" : undefined}
                status={
                  item.href.includes("/rent") ? "For Rent" : "For Sale"
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
