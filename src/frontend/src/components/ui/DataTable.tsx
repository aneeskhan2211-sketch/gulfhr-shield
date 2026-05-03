import { cn } from "@/lib/utils";
import type { TableColumn } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  selectedIds?: Set<number | string>;
  onSelectRow?: (row: T, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  getRowId?: (row: T) => number | string;
  "data-ocid"?: string;
}

export default function DataTable<T>({
  columns,
  data,
  loading,
  emptyMessage = "No data found",
  className,
  onRowClick,
  selectable,
  selectedIds,
  onSelectRow,
  onSelectAll,
  getRowId,
  "data-ocid": ocid,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = (a as Record<string, unknown>)[sortKey];
        const bv = (b as Record<string, unknown>)[sortKey];
        const cmp = String(av ?? "").localeCompare(
          String(bv ?? ""),
          undefined,
          { numeric: true },
        );
        return sortDir === "asc" ? cmp : -cmp;
      })
    : data;

  const allSelected =
    selectable &&
    data.length > 0 &&
    data.every((row) => {
      const id = getRowId?.(row);
      return id !== undefined && selectedIds?.has(id);
    });

  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                {selectable && <th className="w-10" />}
                {columns.map((col) => (
                  <th key={String(col.key)}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([1, 2, 3, 4, 5] as const).map((skeletonKey) => (
                <tr key={`skeleton-row-${skeletonKey}`}>
                  {selectable && (
                    <td>
                      <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={String(col.key)}>
                      <div
                        className="h-4 bg-muted rounded animate-pulse"
                        style={{ width: `${60 + Math.random() * 30}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} data-ocid={ocid}>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {selectable && (
                <th className="w-10">
                  <input
                    type="checkbox"
                    checked={!!allSelected}
                    onChange={(e) => onSelectAll?.(e.target.checked)}
                    className="rounded border-border"
                    aria-label="Select all"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    col.sortable &&
                      "cursor-pointer select-none hover:bg-muted/60",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    col.sortable &&
                    handleSort(String(col.key))
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable &&
                      sortKey === String(col.key) &&
                      (sortDir === "asc" ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      ))}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center py-12 text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sorted.map((row, i) => {
                const rowId = getRowId?.(row);
                const isSelected =
                  rowId !== undefined && selectedIds?.has(rowId);
                return (
                  <tr
                    key={rowId !== undefined ? String(rowId) : `row-${i}`}
                    className={cn(
                      onRowClick && "cursor-pointer",
                      isSelected && "bg-primary/5",
                    )}
                    onClick={() => onRowClick?.(row)}
                    onKeyDown={(e) => e.key === "Enter" && onRowClick?.(row)}
                    data-ocid={ocid ? `${ocid}.row.${i + 1}` : undefined}
                  >
                    {selectable && (
                      <td
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={!!isSelected}
                          onChange={(e) => onSelectRow?.(row, e.target.checked)}
                          className="rounded border-border"
                          aria-label="Select row"
                        />
                      </td>
                    )}
                    {columns.map((col) => {
                      const val = (row as Record<string, unknown>)[
                        String(col.key)
                      ];
                      return (
                        <td
                          key={String(col.key)}
                          className={cn(
                            col.align === "right" && "text-right",
                            col.align === "center" && "text-center",
                          )}
                        >
                          {col.render
                            ? col.render(val, row)
                            : String(val ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
