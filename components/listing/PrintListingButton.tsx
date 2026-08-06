"use client";

import React from "react";
import { Printer } from "lucide-react";

type PrintListingButtonProps = {
  className?: string;
};

export default function PrintListingButton({
  className = "",
}: PrintListingButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex items-center gap-2 type-caption font-semibold text-secondary-text hover:text-body border border-header-stroke rounded-control px-3.5 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg ${className}`}
      aria-label="Print this listing"
    >
      <Printer size={16} aria-hidden />
      Print
    </button>
  );
}
