import { cn } from "@/lib/utils";
import type { FilterOption } from "@/types";
import { Search, X } from "lucide-react";
import React from "react";

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: Array<{
    key: string;
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }>;
  className?: string;
  "data-ocid"?: string;
}

export default function SearchFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  className,
  "data-ocid": ocid,
}: SearchFilterProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3", className)}
      data-ocid={ocid}
    >
      {/* Search input */}
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          data-ocid={ocid ? `${ocid}.search_input` : "search_input"}
          className="w-full pl-9 pr-8 py-2 text-sm bg-card border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {searchValue && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter dropdowns */}
      {filters.map((filter) => (
        <select
          key={filter.key}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          data-ocid={
            ocid ? `${ocid}.${filter.key}.select` : `${filter.key}.select`
          }
          className="py-2 px-3 text-sm bg-card border border-input rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring min-w-36"
          aria-label={filter.label}
        >
          <option value="">{filter.label}</option>
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
