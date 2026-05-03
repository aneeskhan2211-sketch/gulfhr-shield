import { r as reactExports, j as jsxRuntimeExports, a as cn } from "./index-DqipwkTD.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-0G4ukNk8.js";
function DataTable({
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
  "data-ocid": ocid
}) {
  const [sortKey, setSortKey] = reactExports.useState(null);
  const [sortDir, setSortDir] = reactExports.useState("asc");
  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }
  const sorted = sortKey ? [...data].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = String(av ?? "").localeCompare(
      String(bv ?? ""),
      void 0,
      { numeric: true }
    );
    return sortDir === "asc" ? cmp : -cmp;
  }) : data;
  const allSelected = selectable && data.length > 0 && data.every((row) => {
    const id = getRowId == null ? void 0 : getRowId(row);
    return id !== void 0 && (selectedIds == null ? void 0 : selectedIds.has(id));
  });
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-full", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        selectable && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10" }),
        columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: col.label }, String(col.key)))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [1, 2, 3, 4, 5].map((skeletonKey) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        selectable && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 bg-muted rounded animate-pulse" }) }),
        columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-4 bg-muted rounded animate-pulse",
            style: { width: `${60 + Math.random() * 30}%` }
          }
        ) }, String(col.key)))
      ] }, `skeleton-row-${skeletonKey}`)) })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-full", className), "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      selectable && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: !!allSelected,
          onChange: (e) => onSelectAll == null ? void 0 : onSelectAll(e.target.checked),
          className: "rounded border-border",
          "aria-label": "Select all"
        }
      ) }),
      columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: cn(
            col.sortable && "cursor-pointer select-none hover:bg-muted/60",
            col.align === "right" && "text-right",
            col.align === "center" && "text-center"
          ),
          style: col.width ? { width: col.width } : void 0,
          onClick: () => col.sortable && handleSort(String(col.key)),
          onKeyDown: (e) => e.key === "Enter" && col.sortable && handleSort(String(col.key)),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            col.label,
            col.sortable && sortKey === String(col.key) && (sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" }))
          ] })
        },
        String(col.key)
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "td",
      {
        colSpan: columns.length + (selectable ? 1 : 0),
        className: "text-center py-12 text-muted-foreground",
        children: emptyMessage
      }
    ) }) : sorted.map((row, i) => {
      const rowId = getRowId == null ? void 0 : getRowId(row);
      const isSelected = rowId !== void 0 && (selectedIds == null ? void 0 : selectedIds.has(rowId));
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: cn(
            onRowClick && "cursor-pointer",
            isSelected && "bg-primary/5"
          ),
          onClick: () => onRowClick == null ? void 0 : onRowClick(row),
          onKeyDown: (e) => e.key === "Enter" && (onRowClick == null ? void 0 : onRowClick(row)),
          "data-ocid": ocid ? `${ocid}.row.${i + 1}` : void 0,
          children: [
            selectable && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                onClick: (e) => e.stopPropagation(),
                onKeyDown: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: !!isSelected,
                    onChange: (e) => onSelectRow == null ? void 0 : onSelectRow(row, e.target.checked),
                    className: "rounded border-border",
                    "aria-label": "Select row"
                  }
                )
              }
            ),
            columns.map((col) => {
              const val = row[String(col.key)];
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: cn(
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center"
                  ),
                  children: col.render ? col.render(val, row) : String(val ?? "")
                },
                String(col.key)
              );
            })
          ]
        },
        rowId !== void 0 ? String(rowId) : `row-${i}`
      );
    }) })
  ] }) }) });
}
export {
  DataTable as D
};
