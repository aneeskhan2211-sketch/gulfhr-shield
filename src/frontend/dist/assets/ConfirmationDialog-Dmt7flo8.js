import { j as jsxRuntimeExports, T as TriangleAlert, a as cn } from "./index-DqipwkTD.js";
import { M as Modal } from "./Modal-Bl4Y2ID-.js";
function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { open, onClose, size: "sm", "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          destructive ? "bg-destructive/10" : "bg-muted"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TriangleAlert,
          {
            className: cn(
              "w-6 h-6",
              destructive ? "text-destructive" : "text-muted-foreground"
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          disabled: loading,
          "data-ocid": ocid ? `${ocid}.cancel_button` : "confirm.cancel_button",
          className: "btn-secondary flex-1",
          children: cancelLabel
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onConfirm,
          disabled: loading,
          "data-ocid": ocid ? `${ocid}.confirm_button` : "confirm.confirm_button",
          className: cn(
            "flex-1 px-4 py-2 rounded-md font-medium transition-smooth",
            destructive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "btn-primary"
          ),
          children: loading ? "Processing..." : confirmLabel
        }
      )
    ] })
  ] }) });
}
export {
  ConfirmationDialog as C
};
