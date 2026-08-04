"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type FilterOption = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
};

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  value,
  onChange,
  className = "",
  buttonClassName = "",
}) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const listId = `${id}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? value ?? label;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex justify-between items-center gap-2 px-4 py-3 rounded-control bg-2nd-bg border-2 border-header-stroke text-primary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg ${buttonClassName}`}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute z-50 mt-1 w-full bg-2nd-bg border-2 border-header-stroke rounded-control overflow-hidden max-h-60 overflow-y-auto shadow-lg custom-scrollbar"
          data-lenis-prevent
        >
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`w-full text-left px-4 py-3 transition ${
                    selected
                      ? "bg-primary text-on-primary"
                      : "hover:bg-primary hover:text-on-primary"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterSelect;
