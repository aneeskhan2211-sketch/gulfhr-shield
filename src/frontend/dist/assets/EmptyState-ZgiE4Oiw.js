import { j as jsxRuntimeExports, a as cn } from "./index-DqipwkTD.js";
function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      ),
      "data-ocid": ocid,
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg mb-1", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: description }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: action })
      ]
    }
  );
}
export {
  EmptyState as E
};
