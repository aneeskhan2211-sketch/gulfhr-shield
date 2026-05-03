import { j as jsxRuntimeExports, a as cn } from "./index-DqipwkTD.js";
const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-4 md:p-5",
  lg: "p-6 md:p-8"
};
function CardContainer({
  children,
  className,
  padding = "md",
  hover = false,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "bg-card border border-border rounded-xl",
        paddingClasses[padding],
        hover && "transition-smooth hover:shadow-md",
        className
      ),
      "data-ocid": ocid,
      children
    }
  );
}
function CardHeader({
  title,
  subtitle,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("flex items-start justify-between gap-4 mb-4", className),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base", children: title }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: action })
      ]
    }
  );
}
export {
  CardContainer as C,
  CardHeader as a
};
