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
  readSavedListings,
  savedListingKey,
  writeSavedListings,
  type SavedListingItem,
  type SavedListingType,
} from "@/lib/savedListings";

type SavedListingsContextValue = {
  items: SavedListingItem[];
  count: number;
  hydrated: boolean;
  isSaved: (type: SavedListingType, id: number) => boolean;
  toggle: (item: SavedListingItem) => boolean;
  remove: (type: SavedListingType, id: number) => void;
  clear: () => void;
};

const SavedListingsContext = createContext<SavedListingsContextValue | null>(
  null
);

export function SavedListingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<SavedListingItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readSavedListings());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeSavedListings(items);
  }, [items, hydrated]);

  const isSaved = useCallback(
    (type: SavedListingType, id: number) =>
      items.some((item) => savedListingKey(item.type, item.id) === savedListingKey(type, id)),
    [items]
  );

  const toggle = useCallback(
    (item: SavedListingItem) => {
      const key = savedListingKey(item.type, item.id);
      const exists = items.some(
        (p) => savedListingKey(p.type, p.id) === key
      );
      if (exists) {
        setItems((prev) =>
          prev.filter((p) => savedListingKey(p.type, p.id) !== key)
        );
        return false;
      }
      setItems((prev) => [
        item,
        ...prev.filter((p) => savedListingKey(p.type, p.id) !== key),
      ]);
      return true;
    },
    [items]
  );

  const remove = useCallback((type: SavedListingType, id: number) => {
    const key = savedListingKey(type, id);
    setItems((prev) =>
      prev.filter((p) => savedListingKey(p.type, p.id) !== key)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      hydrated,
      isSaved,
      toggle,
      remove,
      clear,
    }),
    [items, hydrated, isSaved, toggle, remove, clear]
  );

  return (
    <SavedListingsContext.Provider value={value}>
      {children}
    </SavedListingsContext.Provider>
  );
}

export function useSavedListings(): SavedListingsContextValue {
  const ctx = useContext(SavedListingsContext);
  if (!ctx) {
    throw new Error("useSavedListings must be used within SavedListingsProvider");
  }
  return ctx;
}
