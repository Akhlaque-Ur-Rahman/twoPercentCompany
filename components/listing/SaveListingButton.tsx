"use client";

import React from "react";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useSavedListings } from "@/components/providers/SavedListingsProvider";
import {
  listingHrefFor,
  type SavedListingItem,
  type SavedListingType,
} from "@/lib/savedListings";

type SaveListingButtonProps = {
  id: number;
  type: SavedListingType;
  slug: string;
  title: string;
  image: string;
  price: string;
  href?: string;
  address?: string;
  variant?: "icon" | "label";
  className?: string;
};

const iconBtnClass =
  "min-w-10 min-h-10 sm:min-w-11 sm:min-h-11 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm hover:bg-primary hover:text-on-primary hover:border-primary transition-colors";

const labelBtnClass =
  "inline-flex items-center gap-2 type-caption font-semibold text-secondary-text hover:text-body border border-header-stroke rounded-control px-3.5 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

export default function SaveListingButton({
  id,
  type,
  slug,
  title,
  image,
  price,
  href,
  address,
  variant = "icon",
  className = "",
}: SaveListingButtonProps) {
  const { isSaved, toggle, hydrated } = useSavedListings();
  const saved = hydrated && isSaved(type, id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const item: SavedListingItem = {
      id,
      type,
      slug,
      title,
      image,
      price,
      href: listingHrefFor(type, slug, href),
      address,
    };
    const added = toggle(item);
    if (added) {
      toast.success("Saved to your shortlist");
    } else {
      toast.info("Removed from saved");
    }
  };

  if (variant === "label") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`${labelBtnClass} ${saved ? "text-primary border-primary/40" : ""} ${className}`}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      >
        <Heart
          size={16}
          className={saved ? "fill-primary text-primary" : ""}
          aria-hidden
        />
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${iconBtnClass} ${saved ? "bg-primary text-on-primary border-primary" : ""} ${className}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
    >
      <Heart
        size={16}
        className={saved ? "fill-current" : ""}
        aria-hidden
      />
    </button>
  );
}
