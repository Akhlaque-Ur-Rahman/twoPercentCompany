"use client";

import React, { useEffect, useMemo, useState } from "react";

export type SectionNavItem = {
  id: string;
  label: string;
};

type ListingSectionNavProps = {
  items: SectionNavItem[];
};

export default function ListingSectionNav({ items }: ListingSectionNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  if (!items.length) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 lg:top-[4.5rem] z-30 border-b border-header-stroke bg-main-bg/90 backdrop-blur-md"
    >
      <div
        className="flex gap-1 overflow-x-auto py-2.5 custom-scrollbar"
        role="list"
      >
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              role="listitem"
              className={`shrink-0 px-3.5 py-2 rounded-control type-caption font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg ${
                isActive
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-transparent text-secondary-text border-transparent hover:text-body hover:border-header-stroke"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
