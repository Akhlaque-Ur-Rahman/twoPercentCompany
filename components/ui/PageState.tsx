"use client";

import React from "react";
import Button from "@/components/ui/Button";

export type PageStateProps = {
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

/**
 * Empty / error / loading shell used across enquiry, Suspense, and soft 404s.
 */
const PageState: React.FC<PageStateProps> = ({
  title,
  description,
  primaryHref = "/",
  primaryLabel = "Back to Home",
  secondaryHref,
  secondaryLabel,
  className = "",
}) => {
  return (
    <div
      className={`min-h-[60vh] flex flex-col items-center justify-center text-center page-px py-16 bg-main-bg ${className}`}
    >
      <h1 className="type-section text-primary max-w-xl">{title}</h1>
      {description && (
        <p className="type-body text-secondary-text mt-3 max-w-md">
          {description}
        </p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href={primaryHref}>{primaryLabel}</Button>
        {secondaryHref && secondaryLabel && (
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageState;
