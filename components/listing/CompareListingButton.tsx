"use client";

import React from "react";
import { Columns2 } from "lucide-react";
import { toast } from "react-toastify";
import { useCompareListings } from "@/components/providers/CompareListingsProvider";
import { listingHrefFor, type SavedListingType } from "@/lib/savedListings";
import type { CompareListingItem } from "@/lib/compareListings";

type CompareListingButtonProps = {
  id: number;
  type: SavedListingType;
  slug: string;
  title: string;
  image: string;
  price: string;
  href?: string;
  address?: string;
  tags?: { label: string }[];
  specifications?: { label: string; value: string }[];
  features?: string[];
  variant?: "icon" | "label";
  className?: string;
};

const iconBtnClass =
  "min-w-10 min-h-10 sm:min-w-11 sm:min-h-11 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm hover:bg-primary hover:text-on-primary hover:border-primary transition-colors";

const labelBtnClass =
  "inline-flex items-center gap-2 type-caption font-semibold text-secondary-text hover:text-body border border-header-stroke rounded-control px-3.5 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

export default function CompareListingButton({
  id,
  type,
  slug,
  title,
  image,
  price,
  href,
  address,
  tags,
  specifications,
  features,
  variant = "icon",
  className = "",
}: CompareListingButtonProps) {
  const { isCompared, toggle, hydrated, max } = useCompareListings();
  const compared = hydrated && isCompared(type, id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const item: CompareListingItem = {
      id,
      type,
      slug,
      title,
      image,
      price,
      href: listingHrefFor(type, slug, href),
      address,
      tags,
      specifications,
      features,
    };
    const result = toggle(item);
    if (result === "added") {
      toast.success("Added to compare");
    } else if (result === "removed") {
      toast.info("Removed from compare");
    } else {
      toast.warning(`You can compare up to ${max} listings`);
    }
  };

  if (variant === "label") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`${labelBtnClass} ${compared ? "text-primary border-primary/40" : ""} ${className}`}
        aria-pressed={compared}
        aria-label={
          compared ? `Remove ${title} from compare` : `Compare ${title}`
        }
      >
        <Columns2 size={16} aria-hidden />
        {compared ? "Comparing" : "Compare"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${iconBtnClass} ${compared ? "bg-primary text-on-primary border-primary" : ""} ${className}`}
      aria-pressed={compared}
      aria-label={
        compared ? `Remove ${title} from compare` : `Compare ${title}`
      }
    >
      <Columns2 size={16} aria-hidden />
    </button>
  );
}
