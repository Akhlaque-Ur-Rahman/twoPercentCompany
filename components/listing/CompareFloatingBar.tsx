"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useCompareListings } from "@/components/providers/CompareListingsProvider";
import { formatPrice } from "@/lib/formatPrice";
import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/admin"];

export default function CompareFloatingBar() {
  const { items, count, clear, remove, hydrated } = useCompareListings();
  const pathname = usePathname() ?? "";

  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!hydrated || count === 0 || hidden) return null;

  const onComparePage = pathname === "/compare";

  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] pointer-events-none">
      <div className="pointer-events-auto border-t border-header-stroke bg-2nd-bg/95 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.28)] pb-[max(0.5rem,env(safe-area-inset-bottom))] mb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:mb-0">
        <div className="page-px py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar min-w-0 flex-1">
            <p className="type-caption font-semibold text-body shrink-0">
              Compare ({count}/4)
            </p>
            {items.map((item) => (
              <div
                key={`${item.type}:${item.id}`}
                className="relative shrink-0 size-12 rounded-control overflow-hidden border border-header-stroke bg-black"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => remove(item.type, item.id)}
                  className="absolute top-0.5 right-0.5 size-5 rounded-full bg-black/70 text-white inline-flex items-center justify-center hover:bg-primary"
                  aria-label={`Remove ${item.title} from compare`}
                >
                  <X size={12} aria-hidden />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={clear}
              className="min-h-10 px-3 type-caption font-semibold text-secondary-text border border-header-stroke rounded-control hover:text-body transition-colors"
            >
              Clear
            </button>
            {!onComparePage && (
              <Link
                href="/compare"
                className="min-h-10 px-4 inline-flex items-center justify-center rounded-control bg-primary text-on-primary type-caption font-semibold hover:brightness-110 transition"
              >
                Open compare
              </Link>
            )}
          </div>
        </div>
        {count === 1 && (
          <p className="page-px pb-2 type-caption text-secondary-text">
            Add at least one more listing to compare — {formatPrice(items[0].price)}
          </p>
        )}
      </div>
    </div>
  );
}
