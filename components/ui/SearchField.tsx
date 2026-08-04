"use client";

import React, { useId } from "react";
import { Search, X } from "lucide-react";

export type SearchFieldProps = {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export default function SearchField({
  id,
  label,
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  className = "",
  inputClassName = "",
}: SearchFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasQuery = value.length > 0;

  const clear = () => {
    if (onClear) onClear();
    else onChange("");
  };

  return (
    <div
      className={`flex items-center gap-2 bg-2nd-bg border border-header-stroke px-4 py-3 rounded-control w-full focus-within:border-primary transition-colors ${className}`}
    >
      <Search className="text-primary shrink-0" size={20} aria-hidden />
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-transparent outline-none w-full min-w-0 text-body placeholder:text-secondary-text focus-visible:ring-0 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden ${inputClassName}`}
      />
      {hasQuery && (
        <button
          type="button"
          onClick={clear}
          className="shrink-0 inline-flex items-center justify-center size-8 -mr-1 rounded-control text-secondary-text hover:text-body hover:bg-main-bg/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-2nd-bg"
          aria-label="Clear search"
        >
          <X size={16} aria-hidden />
        </button>
      )}
    </div>
  );
}
