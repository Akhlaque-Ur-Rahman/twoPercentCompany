"use client";

import React, { useState } from "react";
import { Check, Share2 } from "lucide-react";

type ShareListingProps = {
  title: string;
  url: string;
  className?: string;
};

export default function ShareListing({
  title,
  url,
  className = "",
}: ShareListingProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text: `Check out ${title} with 2% Company`,
      url,
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // cancelled
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 type-caption font-semibold text-secondary-text hover:text-body border border-header-stroke rounded-control px-3.5 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg ${className}`}
      aria-label={copied ? "Link copied" : `Share ${title}`}
    >
      {copied ? <Check size={16} aria-hidden /> : <Share2 size={16} aria-hidden />}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
