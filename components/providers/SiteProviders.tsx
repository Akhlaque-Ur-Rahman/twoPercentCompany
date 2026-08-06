"use client";

import React from "react";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { SavedListingsProvider } from "@/components/providers/SavedListingsProvider";
import { CompareListingsProvider } from "@/components/providers/CompareListingsProvider";
import AppToast from "@/components/ui/AppToast";

export default function SiteProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <SavedListingsProvider>
        <CompareListingsProvider>
          {children}
          <AppToast />
        </CompareListingsProvider>
      </SavedListingsProvider>
    </SmoothScroll>
  );
}
