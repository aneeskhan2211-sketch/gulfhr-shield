import { r as reactExports, j as jsxRuntimeExports, X, a as cn } from "./index-DqipwkTD.js";
const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl"
};
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  "data-ocid": ocid
}) {
  const panelRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);
  reactExports.useEffect(() => {
    var _a;
    if (open) {
      document.body.style.overflow = "hidden";
      (_a = panelRef.current) == null ? void 0 : _a.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "aria-labelledby": title ? `${ocid}-title` : void 0,
      "data-ocid": ocid,
      role: "presentation",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: () => onClose(),
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            ref: panelRef,
            open: true,
            className: cn(
              "relative w-full bg-card border border-border rounded-xl shadow-xl outline-none",
              "animate-in fade-in zoom-in-95 duration-200",
              sizeClasses[size]
            ),
            "data-ocid": ocid ? `${ocid}.dialog` : void 0,
            children: [
              (title || !!onClose) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between p-6 pb-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      id: ocid ? `${ocid}-title` : void 0,
                      className: "text-lg font-display font-semibold text-foreground",
                      children: title
                    }
                  ),
                  description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "aria-label": "Close modal",
                    "data-ocid": ocid ? `${ocid}.close_button` : "modal.close_button",
                    className: "ml-4 text-muted-foreground hover:text-foreground transition-colors rounded-md p-1 hover:bg-muted",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 pt-4", children })
            ]
          }
        )
      ]
    }
  );
}
export {
  Modal as M
};
