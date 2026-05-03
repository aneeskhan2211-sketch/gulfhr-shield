import { j as jsxRuntimeExports, a as cn } from "./index-DqipwkTD.js";
function Skeleton({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("animate-pulse rounded-md bg-muted/60", className) });
}
function SkeletonCard({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-xl border border-border bg-card p-5 space-y-3 shadow-sm",
        className
      ),
      "data-ocid": "skeleton.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
      ]
    }
  );
}
function SkeletonKPI({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-xl border border-border bg-card p-5 space-y-2 shadow-sm",
        className
      ),
      "data-ocid": "skeleton.kpi",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
        ] })
      ]
    }
  );
}
function SkeletonTable({
  rows = 5,
  cols = 4,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-xl border border-border bg-card overflow-hidden",
        className
      ),
      "data-ocid": "skeleton.table",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/30", children: Array.from({ length: cols }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-3 flex-1"
          },
          i
        )) }),
        Array.from({ length: rows }).map((_, rowIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-4 px-4 py-3 border-b border-border last:border-0",
            children: Array.from({ length: cols }).map((_2, colIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: cn(
                  "h-4 flex-1",
                  colIdx === 0 && "max-w-[40px] rounded-full"
                )
              },
              colIdx
            ))
          },
          rowIdx
        ))
      ]
    }
  );
}
export {
  SkeletonTable as S,
  SkeletonKPI as a,
  SkeletonCard as b
};
