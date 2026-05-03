import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, X } from "./index-DqipwkTD.js";
import { U as Upload } from "./upload-BuidvJhM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }]
];
const File = createLucideIcon("file", __iconNode);
function FileUploadZone({
  onFileSelect,
  accept,
  maxSizeMB = 10,
  className,
  label = "Upload a file",
  "data-ocid": ocid
}) {
  const inputRef = reactExports.useRef(null);
  const [dragging, setDragging] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  function handleFile(file) {
    setError(null);
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Max size: ${maxSizeMB}MB`);
      return;
    }
    setSelected(file);
    onFileSelect(file);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        onKeyDown: (e) => {
          var _a;
          return e.key === "Enter" && ((_a = inputRef.current) == null ? void 0 : _a.click());
        },
        onDragOver: (e) => {
          e.preventDefault();
          setDragging(true);
        },
        onDragLeave: () => setDragging(false),
        onDrop: (e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        },
        "data-ocid": ocid ? `${ocid}.dropzone` : "dropzone",
        className: cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-smooth",
          dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 mx-auto mb-3 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Drag & drop or click to browse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Max ",
            maxSizeMB,
            "MB"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept,
        className: "hidden",
        "data-ocid": ocid ? `${ocid}.upload_button` : "upload_button",
        onChange: (e) => {
          var _a;
          const file = (_a = e.target.files) == null ? void 0 : _a[0];
          if (file) handleFile(file);
          e.target.value = "";
        }
      }
    ),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 p-2 bg-muted/50 rounded-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(File, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate flex-1", children: selected.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            setSelected(null);
          },
          className: "text-muted-foreground hover:text-foreground",
          "aria-label": "Remove file",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", role: "alert", children: error })
  ] });
}
export {
  FileUploadZone as F
};
