import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn } from "./index-DqipwkTD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
const EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode);
function ActionMenu({
  items,
  "data-ocid": ocid
}) {
  const [open, setOpen] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      var _a;
      if (!((_a = ref.current) == null ? void 0 : _a.contains(e.target))) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative inline-block", "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: (e) => {
          e.stopPropagation();
          setOpen(!open);
        },
        "data-ocid": ocid ? `${ocid}.dropdown_menu` : "dropdown_menu",
        "aria-label": "Actions",
        className: "w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-4 h-4" })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full mt-1 z-50 min-w-36 bg-card border border-border rounded-lg shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        disabled: item.disabled,
        onClick: (e) => {
          e.stopPropagation();
          setOpen(false);
          item.onClick();
        },
        className: cn(
          "flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors",
          item.destructive ? "text-destructive hover:bg-destructive/10" : "text-foreground hover:bg-muted",
          item.disabled && "opacity-50 cursor-not-allowed"
        ),
        children: [
          item.icon,
          item.label
        ]
      },
      item.label
    )) })
  ] });
}
export {
  ActionMenu as A
};
