import { c as createLucideIcon, j as jsxRuntimeExports, C as ChevronLeft, a as cn, b as ChevronRight, u as useActor, d as useQueryClient, e as useMutation, f as unwrapResult, g as createActor, r as reactExports, h as CircleCheck, i as LoaderCircle, k as useNavigate, U as Users, l as formatCurrency, m as formatDate } from "./index-DqipwkTD.js";
import { u as ue } from "./index-C86RAjSP.js";
import { E as EmployeeFilters, a as EmployeeForm, P as Pencil } from "./EmployeeForm-_ppeL-_j.js";
import { A as AppShell } from "./AppShell-CUGPoZlf.js";
import { A as ActionMenu } from "./ActionMenu-D6bdbVm_.js";
import { C as ConfirmationDialog } from "./ConfirmationDialog-Dmt7flo8.js";
import { D as DataTable } from "./DataTable-BunDOGnY.js";
import { E as EmptyState } from "./EmptyState-ZgiE4Oiw.js";
import { M as Modal } from "./Modal-Bl4Y2ID-.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { u as useListEmployees, a as useAddEmployee, b as useUpdateEmployee, c as useRemoveEmployee } from "./employees-CUvviRBY.js";
import { F as FileUploadZone } from "./FileUploadZone-1uxJvMUp.js";
import { C as CircleAlert } from "./circle-alert-CLODWFL3.js";
import { D as Download } from "./download-BXuxgTcz.js";
import { U as UserPlus } from "./user-plus-CVlGN4Bl.js";
import { E as Eye } from "./eye-D-bmwEpS.js";
import { T as Trash2 } from "./trash-2-zR8XdvHL.js";
import "./select-2niFz9CV.js";
import "./Combination-DaLoBBr6.js";
import "./index-DzTulS2Y.js";
import "./chevron-up-0G4ukNk8.js";
import "./label-D1bf6s9f.js";
import "./index-BzDdetvs.js";
import "./upload-BuidvJhM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode);
function PaginationControls({
  page,
  perPage,
  total,
  onPageChange,
  className,
  "data-ocid": ocid
}) {
  const totalPages = Math.ceil(total / perPage);
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  if (totalPages <= 1 && total <= perPage) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-center justify-between gap-4 text-sm",
        className
      ),
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "Showing ",
          from,
          "–",
          to,
          " of ",
          total
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onPageChange(page - 1),
              disabled: page <= 1,
              "data-ocid": ocid ? `${ocid}.pagination_prev` : "pagination_prev",
              "aria-label": "Previous page",
              className: "w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const p = i + 1;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onPageChange(p),
                className: cn(
                  "w-8 h-8 flex items-center justify-center rounded-md border text-sm transition-colors",
                  p === page ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-muted"
                ),
                children: p
              },
              p
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onPageChange(page + 1),
              disabled: page >= totalPages,
              "data-ocid": ocid ? `${ocid}.pagination_next` : "pagination_next",
              "aria-label": "Next page",
              className: "w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            }
          )
        ] })
      ]
    }
  );
}
function useBulkImportEmployees() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rows) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.bulkImportEmployees(rows));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] })
  });
}
const FIELD_KEYWORDS = {
  fullName: ["name", "full name", "employee name", "staff name"],
  employeeCode: ["code", "emp code", "employee id", "id", "staff id", "number"],
  nationality: ["nationality", "national", "country"],
  jobTitle: ["job", "title", "position", "role", "designation"],
  department: ["department", "dept", "division", "team", "unit"],
  basicSalary: ["salary", "basic", "wage", "pay", "compensation", "ctc"],
  workLocation: [
    "location",
    "work location",
    "office",
    "site",
    "branch",
    "city"
  ]
};
function detectColumn(header) {
  const h = header.toLowerCase().trim();
  for (const [field, keywords] of Object.entries(FIELD_KEYWORDS)) {
    if (keywords.some((kw) => h.includes(kw))) {
      return field;
    }
  }
  return null;
}
function buildMapping(headers) {
  const map = {};
  const used = /* @__PURE__ */ new Set();
  headers.forEach((h, i) => {
    const field = detectColumn(h);
    if (field && !used.has(field)) {
      map[i] = field;
      used.add(field);
    }
  });
  return map;
}
function parseCsv(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };
  const parse = (line) => {
    const result = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuote = !inQuote;
        continue;
      }
      if (ch === "," && !inQuote) {
        result.push(cur.trim());
        cur = "";
        continue;
      }
      cur += ch;
    }
    result.push(cur.trim());
    return result;
  };
  return { headers: parse(lines[0]), rows: lines.slice(1).map(parse) };
}
function toImportRow(raw, mapping) {
  const row = {
    fullName: "",
    employeeCode: "",
    nationality: "",
    jobTitle: "",
    department: "",
    basicSalary: 0n,
    workLocation: ""
  };
  for (const [colIdx, field] of Object.entries(mapping)) {
    const val = raw[Number(colIdx)] ?? "";
    if (field === "basicSalary") {
      const num = Number(val.replace(/[^0-9.]/g, "")) || 0;
      row.basicSalary = BigInt(Math.round(num * 100));
    } else {
      row[field] = val;
    }
  }
  return row;
}
function validateRow(row, idx) {
  if (!row.fullName.trim()) return `Row ${idx + 1}: Missing employee name`;
  if (row.basicSalary <= 0n)
    return `Row ${idx + 1}: Salary must be greater than 0`;
  return null;
}
const FIELD_LABELS = {
  fullName: "Full Name *",
  employeeCode: "Code",
  nationality: "Nationality",
  jobTitle: "Job Title",
  department: "Department",
  basicSalary: "Basic Salary *",
  workLocation: "Work Location"
};
const PREVIEW_LIMIT = 5;
function CSVImportModal({ open, onClose, onImported }) {
  const [step, setStep] = reactExports.useState("upload");
  const [parsed, setParsed] = reactExports.useState(null);
  const [mapping, setMapping] = reactExports.useState({});
  const importMutation = useBulkImportEmployees();
  const allFields = Object.keys(FIELD_LABELS);
  const reset = reactExports.useCallback(() => {
    setStep("upload");
    setParsed(null);
    setMapping({});
    importMutation.reset();
  }, [importMutation]);
  const handleClose = () => {
    reset();
    onClose();
  };
  async function handleFile(file) {
    const text = await file.text();
    const { headers, rows } = parseCsv(text);
    if (headers.length === 0 || rows.length === 0) {
      ue.error("File appears to be empty or unreadable");
      return;
    }
    const detectedMapping = buildMapping(headers);
    setParsed({ headers, rows, mapping: detectedMapping });
    setMapping(detectedMapping);
    setStep("mapping");
  }
  function handleMappingChange(colIdx, field) {
    setMapping((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) {
        if (next[k] === field) delete next[k];
      }
      if (field === "__none__") {
        delete next[colIdx];
      } else {
        next[colIdx] = field;
      }
      return next;
    });
  }
  const importRows = parsed ? parsed.rows.map((r) => toImportRow(r, mapping)) : [];
  const validationErrors = importRows.map((r, i) => validateRow(r, i)).filter(Boolean);
  async function handleImport() {
    if (!parsed) return;
    try {
      const result = await importMutation.mutateAsync(importRows);
      const importedCount = Number(result.imported);
      const errorCount = result.errors.length;
      setStep("result");
      if (importedCount > 0) {
        ue.success(
          `${importedCount} employee${importedCount !== 1 ? "s" : ""} imported successfully`
        );
        onImported();
      }
      if (errorCount > 0) {
        ue.warning(
          `${errorCount} row${errorCount !== 1 ? "s" : ""} had errors`
        );
      }
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Import failed");
    }
  }
  const stepTitles = {
    upload: "Import Employees — Upload File",
    mapping: "Map Columns",
    preview: "Preview & Validate",
    result: "Import Complete"
  };
  const stepDesc = {
    upload: "Upload a CSV or Excel-exported CSV file to bulk-import employees.",
    mapping: "Verify or adjust how CSV columns map to employee fields.",
    preview: `${importRows.length} employees ready — review before importing.`,
    result: "Your import has been processed."
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose: handleClose,
      title: stepTitles[step],
      description: stepDesc[step],
      size: "xl",
      "data-ocid": "csv_import",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[72vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-5", children: ["upload", "mapping", "preview", "result"].map(
          (s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                  step === s ? "bg-primary text-primary-foreground" : ["upload", "mapping", "preview", "result"].indexOf(
                    step
                  ) > i ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                ),
                children: i + 1
              }
            ),
            i < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex-1 h-px w-8",
                  ["upload", "mapping", "preview", "result"].indexOf(step) > i ? "bg-primary/40" : "bg-border"
                )
              }
            )
          ] }, s)
        ) }),
        step === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 flex gap-3 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-5 h-5 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Supported format: CSV" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-0.5", children: [
                "Required columns:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Full Name" }),
                ",",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Basic Salary" }),
                ". Optional: Code, Nationality, Job Title, Department, Work Location. Export from Excel as CSV (UTF-8)."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileUploadZone,
            {
              onFileSelect: handleFile,
              accept: ".csv,.txt",
              maxSizeMB: 5,
              label: "Drop your CSV file here, or click to browse",
              "data-ocid": "csv_import.upload"
            }
          )
        ] }),
        step === "mapping" && parsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: parsed.rows.length }),
            " ",
            "rows detected. Columns marked",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" }),
            " are required."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: parsed.headers.map((header, colIdx) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-2 gap-3 items-center p-2.5 rounded-lg bg-muted/20 border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: header }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                      "e.g. ",
                      ((_a = parsed.rows[0]) == null ? void 0 : _a[colIdx]) ?? "—"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: mapping[colIdx] ?? "__none__",
                      onChange: (e) => handleMappingChange(colIdx, e.target.value),
                      className: "w-full rounded-md border border-input bg-background text-sm px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      "data-ocid": `csv_import.mapping.col_${colIdx}.select`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "__none__", children: "— Skip —" }),
                        allFields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, children: FIELD_LABELS[f] }, f))
                      ]
                    }
                  )
                ]
              },
              header || String(colIdx)
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setStep("upload"),
                className: "btn-secondary flex items-center gap-2",
                "data-ocid": "csv_import.mapping.back_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  " Back"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setStep("preview"),
                className: "btn-primary flex items-center gap-2",
                "data-ocid": "csv_import.mapping.next_button",
                children: [
                  "Preview ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ] }),
        step === "preview" && parsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/10 border border-primary/20 p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-primary", children: importRows.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Employees" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-emerald-600", children: importRows.length - validationErrors.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ready to Import" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: cn(
                  "rounded-lg p-3 text-center border",
                  validationErrors.length > 0 ? "bg-destructive/10 border-destructive/20" : "bg-muted/30 border-border"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: cn(
                        "text-lg font-bold",
                        validationErrors.length > 0 ? "text-destructive" : "text-muted-foreground"
                      ),
                      children: validationErrors.length
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Validation Issues" })
                ]
              }
            )
          ] }),
          validationErrors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg border border-destructive/40 bg-destructive/5 p-3 space-y-1",
              "data-ocid": "csv_import.preview.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-destructive flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
                  " Validation Errors"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs text-destructive/80 space-y-0.5 max-h-24 overflow-y-auto", children: validationErrors.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  "• ",
                  e
                ] }, e)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto rounded-lg border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-muted-foreground font-medium", children: "#" }),
                Object.values(mapping).map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "px-3 py-2 text-left text-muted-foreground font-medium whitespace-nowrap",
                    children: FIELD_LABELS[field]
                  },
                  field
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-muted-foreground font-medium", children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: importRows.slice(0, PREVIEW_LIMIT).map((row) => {
                const rowKey = row.employeeCode || row.fullName;
                const rowIdx = importRows.indexOf(row);
                const err = validateRow(row, rowIdx);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: cn(
                      "border-b border-border last:border-0",
                      err ? "bg-destructive/5" : "hover:bg-muted/20"
                    ),
                    "data-ocid": `csv_import.preview.item.${rowIdx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: rowIdx + 1 }),
                      Object.keys(mapping).map((colIdx) => {
                        const field = mapping[Number(colIdx)];
                        const val = field === "basicSalary" ? `${Number(row.basicSalary) / 100}` : String(
                          row[field] ?? "—"
                        );
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: cn(
                              "px-3 py-2 max-w-[140px] truncate",
                              err && (field === "fullName" || field === "basicSalary") ? "text-destructive font-medium" : "text-foreground"
                            ),
                            children: val || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "empty" })
                          },
                          colIdx
                        );
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: err ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        "Error"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-600 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                        "OK"
                      ] }) })
                    ]
                  },
                  rowKey
                );
              }) })
            ] }),
            importRows.length > PREVIEW_LIMIT && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground px-3 py-2 border-t border-border bg-muted/20", children: [
              "… and ",
              importRows.length - PREVIEW_LIMIT,
              " more rows not shown"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setStep("mapping"),
                className: "btn-secondary flex items-center gap-2",
                "data-ocid": "csv_import.preview.back_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  " Back"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleImport,
                disabled: importMutation.isPending || importRows.length === 0,
                className: "btn-primary flex items-center gap-2 disabled:opacity-60",
                "data-ocid": "csv_import.preview.import_button",
                children: importMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  " Importing…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-4 h-4" }),
                  " Import All",
                  " ",
                  importRows.length,
                  " Employees"
                ] })
              }
            )
          ] })
        ] }),
        step === "result" && importMutation.data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-center py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-display font-semibold text-foreground", children: [
                Number(importMutation.data.imported),
                " Employees Imported"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your employee records have been added successfully." })
            ] })
          ] }),
          importMutation.data.errors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg border border-destructive/30 bg-destructive/5 p-4",
              "data-ocid": "csv_import.result.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-destructive mb-2", children: [
                  importMutation.data.errors.length,
                  " rows could not be imported:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs text-destructive/80 space-y-1 max-h-32 overflow-y-auto", children: importMutation.data.errors.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  "Row ",
                  Number(e.row),
                  ": ",
                  e.reason
                ] }, `${Number(e.row)}-${e.reason}`)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  reset();
                },
                className: "btn-secondary",
                "data-ocid": "csv_import.result.import_more_button",
                children: "Import More"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleClose,
                className: "btn-primary",
                "data-ocid": "csv_import.result.close_button",
                children: "Done"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
const PER_PAGE = 20;
const DEFAULT_FILTERS = {
  search: "",
  nationality: "all",
  department: "all",
  status: "all"
};
function exportCsv(employees) {
  const headers = [
    "Code",
    "Full Name",
    "Nationality",
    "Job Title",
    "Department",
    "Work Location",
    "Basic Salary",
    "Status",
    "Joining Date"
  ];
  const rows = employees.map((e) => [
    e.employeeCode,
    e.fullName,
    e.nationality,
    e.jobTitle,
    e.department,
    e.workLocation,
    String(Number(e.basicSalary) / 100),
    e.status,
    formatDate(e.joiningDate)
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `employees-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function EmployeesPage() {
  const navigate = useNavigate();
  const { data: employees = [], isLoading } = useListEmployees();
  const addEmployee = useAddEmployee();
  const updateEmployee = useUpdateEmployee();
  const removeEmployee = useRemoveEmployee();
  const [filters, setFilters] = reactExports.useState(DEFAULT_FILTERS);
  const [page, setPage] = reactExports.useState(1);
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [showImportModal, setShowImportModal] = reactExports.useState(false);
  const [editEmployee, setEditEmployee] = reactExports.useState(null);
  const [deleteEmployee, setDeleteEmployee] = reactExports.useState(null);
  const filtered = reactExports.useMemo(() => {
    return employees.filter((e) => {
      const q = filters.search.toLowerCase();
      if (q && !e.fullName.toLowerCase().includes(q) && !e.employeeCode.toLowerCase().includes(q))
        return false;
      if (filters.nationality !== "all" && e.nationality !== filters.nationality)
        return false;
      if (filters.department !== "all" && e.department !== filters.department)
        return false;
      if (filters.status !== "all" && e.status !== filters.status) return false;
      return true;
    });
  }, [employees, filters]);
  const paginated = reactExports.useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);
  function handleFilterChange(f) {
    setFilters(f);
    setPage(1);
  }
  async function handleAdd(input) {
    try {
      await addEmployee.mutateAsync(input);
      ue.success("Employee added successfully");
      setShowAddModal(false);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to add employee"
      );
    }
  }
  async function handleEdit(input) {
    if (!editEmployee) return;
    try {
      await updateEmployee.mutateAsync({ id: editEmployee.id, input });
      ue.success("Employee updated successfully");
      setEditEmployee(null);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update employee"
      );
    }
  }
  async function handleDelete() {
    if (!deleteEmployee) return;
    try {
      await removeEmployee.mutateAsync(deleteEmployee.id);
      ue.success("Employee removed");
      setDeleteEmployee(null);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to remove employee"
      );
    }
  }
  const columns = [
    {
      key: "employeeCode",
      label: "Code",
      sortable: true,
      width: "100px",
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: String(v) })
    },
    {
      key: "fullName",
      label: "Full Name",
      sortable: true,
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: String(v) })
    },
    { key: "nationality", label: "Nationality", sortable: true },
    { key: "jobTitle", label: "Job Title", sortable: true },
    { key: "department", label: "Department", sortable: true },
    {
      key: "basicSalary",
      label: "Basic Salary",
      align: "right",
      sortable: true,
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: formatCurrency(v) })
    },
    {
      key: "status",
      label: "Status",
      width: "120px",
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(v) })
    },
    {
      key: "id",
      label: "",
      width: "52px",
      render: (_v, row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActionMenu,
        {
          "data-ocid": `employees.item.${row.employeeCode}.dropdown_menu`,
          items: [
            {
              label: "View profile",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
              onClick: () => navigate(`/employees/${row.id}`)
            },
            {
              label: "Edit",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
              onClick: () => setEditEmployee(row)
            },
            {
              label: "Delete",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
              destructive: true,
              onClick: () => setDeleteEmployee(row)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Employees" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            employees.length,
            " total employees"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => exportCsv(filtered),
              "data-ocid": "employees.export_csv.button",
              className: "btn-secondary flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                "Export CSV"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowImportModal(true),
              "data-ocid": "employees.import_csv.button",
              className: "btn-secondary flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-4 h-4" }),
                "1-Click Import"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowAddModal(true),
              "data-ocid": "employees.add_employee.button",
              className: "btn-primary flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                "Add Employee"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmployeeFilters,
        {
          filters,
          onChange: handleFilterChange,
          onReset: () => handleFilterChange(DEFAULT_FILTERS)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: employees.length === 0 && !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" }),
          title: "No employees yet",
          description: "Add your first employee to get started with GulfHR Shield.",
          "data-ocid": "employees.empty_state",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowAddModal(true),
              "data-ocid": "employees.empty_state_add.button",
              className: "btn-primary",
              children: "Add Employee"
            }
          )
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DataTable,
          {
            columns,
            data: paginated,
            loading: isLoading,
            emptyMessage: "No employees match the current filters",
            onRowClick: (row) => navigate(`/employees/${row.id}`),
            getRowId: (row) => String(row.id),
            "data-ocid": "employees.table"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-t border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PaginationControls,
          {
            page,
            perPage: PER_PAGE,
            total: filtered.length,
            onPageChange: setPage,
            "data-ocid": "employees.pagination"
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showAddModal,
        onClose: () => setShowAddModal(false),
        title: "Add Employee",
        description: "Fill in the employee details below.",
        size: "xl",
        "data-ocid": "employees.add_modal",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[70vh] overflow-y-auto pr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmployeeForm,
          {
            onSubmit: handleAdd,
            onCancel: () => setShowAddModal(false),
            loading: addEmployee.isPending
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: !!editEmployee,
        onClose: () => setEditEmployee(null),
        title: "Edit Employee",
        description: `Editing ${(editEmployee == null ? void 0 : editEmployee.fullName) ?? "employee"}`,
        size: "xl",
        "data-ocid": "employees.edit_modal",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[70vh] overflow-y-auto pr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmployeeForm,
          {
            employee: editEmployee ?? void 0,
            onSubmit: handleEdit,
            onCancel: () => setEditEmployee(null),
            loading: updateEmployee.isPending
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CSVImportModal,
      {
        open: showImportModal,
        onClose: () => setShowImportModal(false),
        onImported: () => setShowImportModal(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmationDialog,
      {
        open: !!deleteEmployee,
        onClose: () => setDeleteEmployee(null),
        onConfirm: handleDelete,
        title: "Delete employee?",
        description: `This will permanently remove ${(deleteEmployee == null ? void 0 : deleteEmployee.fullName) ?? "this employee"} and all associated records. This action cannot be undone.`,
        confirmLabel: "Delete Employee",
        destructive: true,
        loading: removeEmployee.isPending,
        "data-ocid": "employees.delete_dialog"
      }
    )
  ] });
}
export {
  EmployeesPage as default
};
