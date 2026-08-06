"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  COMPARE_MAX,
  compareListingKey,
  readCompareListings,
  writeCompareListings,
  type CompareListingItem,
} from "@/lib/compareListings";
import type { SavedListingType } from "@/lib/savedListings";

type ToggleResult = "added" | "removed" | "full";

type CompareListingsContextValue = {
  items: CompareListingItem[];
  count: number;
  hydrated: boolean;
  isCompared: (type: SavedListingType, id: number) => boolean;
  toggle: (item: CompareListingItem) => ToggleResult;
  remove: (type: SavedListingType, id: number) => void;
  clear: () => void;
  max: number;
};

const CompareListingsContext =
  createContext<CompareListingsContextValue | null>(null);

export function CompareListingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CompareListingItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCompareListings());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeCompareListings(items);
  }, [items, hydrated]);

  const isCompared = useCallback(
    (type: SavedListingType, id: number) =>
      items.some(
        (item) =>
          compareListingKey(item.type, item.id) ===
          compareListingKey(type, id)
      ),
    [items]
  );

  const toggle = useCallback(
    (item: CompareListingItem): ToggleResult => {
      const key = compareListingKey(item.type, item.id);
      const exists = items.some(
        (p) => compareListingKey(p.type, p.id) === key
      );
      if (exists) {
        setItems((prev) =>
          prev.filter((p) => compareListingKey(p.type, p.id) !== key)
        );
        return "removed";
      }
      if (items.length >= COMPARE_MAX) {
        return "full";
      }
      setItems((prev) =>
        prev.length >= COMPARE_MAX
          ? prev
          : [
              ...prev.filter((p) => compareListingKey(p.type, p.id) !== key),
              item,
            ]
      );
      return "added";
    },
    [items]
  );

  const remove = useCallback((type: SavedListingType, id: number) => {
    const key = compareListingKey(type, id);
    setItems((prev) =>
      prev.filter((p) => compareListingKey(p.type, p.id) !== key)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      hydrated,
      isCompared,
      toggle,
      remove,
      clear,
      max: COMPARE_MAX,
    }),
    [items, hydrated, isCompared, toggle, remove, clear]
  );

  return (
    <CompareListingsContext.Provider value={value}>
      {children}
    </CompareListingsContext.Provider>
  );
}

export function useCompareListings(): CompareListingsContextValue {
  const ctx = useContext(CompareListingsContext);
  if (!ctx) {
    throw new Error(
      "useCompareListings must be used within CompareListingsProvider"
    );
  }
  return ctx;
}
