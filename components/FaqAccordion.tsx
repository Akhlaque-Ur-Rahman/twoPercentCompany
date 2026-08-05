"use client";

import React, { useId, useState } from "react";
import type { FaqItem } from "@/data/FaqData";
import { ChevronDown } from "lucide-react";

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <ul className="divide-y divide-header-stroke border border-header-stroke rounded-card overflow-hidden">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;
        return (
          <li key={item.id} className="bg-2nd-bg">
            <button
              id={buttonId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
              className="w-full flex items-start justify-between gap-4 text-left px-5 py-4 type-body font-semibold text-body hover:bg-main-bg/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            >
              <span>{item.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-primary transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-5 pb-4 type-body text-secondary-text leading-relaxed"
            >
              {item.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
