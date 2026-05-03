import { c as createLucideIcon, j as jsxRuntimeExports, X, a as cn, r as reactExports, V as VisaRecordType, q as dateToTimestamp, t as timestampToDate, p as getVisaStatus, B as getDaysUntilExpiry, F as useGetMyCompany, G as useUpdateAlertThresholds, T as TriangleAlert, h as CircleCheck, L as LoadingSpinner, m as formatDate } from "./index-DqipwkTD.js";
import { u as useListEmployees } from "./employees-CUvviRBY.js";
import { a as useListAllVisaRecords, b as useAddVisaRecord, c as useUpdateVisaRecord, d as useRemoveVisaRecord } from "./visa-DRv2T8_7.js";
import { A as AppShell, B as Bell, F as FileText, S as Settings } from "./AppShell-CUGPoZlf.js";
import { A as ActionMenu } from "./ActionMenu-D6bdbVm_.js";
import { C as CardContainer, a as CardHeader } from "./CardContainer-BlAWtbPm.js";
import { E as EmptyState } from "./EmptyState-ZgiE4Oiw.js";
import { M as Modal } from "./Modal-Bl4Y2ID-.js";
import { S as Search, L as Label } from "./label-D1bf6s9f.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { B as Button } from "./button-B4kMrH3h.js";
import { u as ue } from "./index-C86RAjSP.js";
import { P as Plus } from "./plus-XRZrAAnZ.js";
import { S as ShieldCheck } from "./shield-check-Chn_N5_O.js";
import "./index-BzDdetvs.js";
import "./index-DzTulS2Y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9", key: "1j9vog" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "m17 17 4 4", key: "1b3523" }],
  ["path", { d: "m21 17-4 4", key: "uinynz" }]
];
const MailX = createLucideIcon("mail-x", __iconNode);
function SearchFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  className,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("flex flex-wrap items-center gap-3", className),
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "search",
              value: searchValue,
              onChange: (e) => onSearchChange(e.target.value),
              placeholder: searchPlaceholder,
              "data-ocid": ocid ? `${ocid}.search_input` : "search_input",
              className: "w-full pl-9 pr-8 py-2 text-sm bg-card border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            }
          ),
          searchValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onSearchChange(""),
              className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        filters.map((filter) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filter.value,
            onChange: (e) => filter.onChange(e.target.value),
            "data-ocid": ocid ? `${ocid}.${filter.key}.select` : `${filter.key}.select`,
            className: "py-2 px-3 text-sm bg-card border border-input rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring min-w-36",
            "aria-label": filter.label,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: filter.label }),
              filter.options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
            ]
          },
          filter.key
        ))
      ]
    }
  );
}
const RECORD_TYPE_LABELS$1 = {
  [VisaRecordType.Passport]: "Passport",
  [VisaRecordType.Visa]: "Visa",
  [VisaRecordType.LabourCard]: "Labour Card",
  [VisaRecordType.Insurance]: "Insurance",
  [VisaRecordType.MedicalCard]: "Medical Card",
  [VisaRecordType.Contract]: "Contract"
};
function VisaRecordForm({
  initialValues,
  lockedEmployeeId,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Save Record"
}) {
  const { data: employees = [] } = useListEmployees();
  const [values, setValues] = reactExports.useState({
    employeeId: lockedEmployeeId ?? (initialValues == null ? void 0 : initialValues.employeeId) ?? "",
    recordType: (initialValues == null ? void 0 : initialValues.recordType) ?? "",
    expiryDate: (initialValues == null ? void 0 : initialValues.expiryDate) ?? "",
    notes: (initialValues == null ? void 0 : initialValues.notes) ?? ""
  });
  const [errors, setErrors] = reactExports.useState({});
  function validate() {
    const newErrors = {};
    if (!values.employeeId) newErrors.employeeId = "Employee is required";
    if (!values.recordType) newErrors.recordType = "Record type is required";
    if (!values.expiryDate) newErrors.expiryDate = "Expiry date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      employeeId: BigInt(values.employeeId),
      recordType: values.recordType,
      expiryDate: dateToTimestamp(new Date(values.expiryDate)),
      notes: values.notes.trim()
    });
  }
  function set(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    !lockedEmployeeId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vrf-employee", children: "Employee" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "vrf-employee",
          value: String(values.employeeId),
          onChange: (e) => {
            const v = e.target.value;
            set("employeeId", v ? BigInt(v) : "");
          },
          "data-ocid": "visa-record-form.employee.select",
          className: "w-full py-2 px-3 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
          "aria-label": "Select employee",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select employee…" }),
            employees.map((emp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(emp.id), children: [
              emp.fullName,
              " (",
              emp.employeeCode,
              ")"
            ] }, emp.employeeCode))
          ]
        }
      ),
      errors.employeeId && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "visa-record-form.employee.field_error",
          children: errors.employeeId
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vrf-type", children: "Record Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "vrf-type",
          value: values.recordType,
          onChange: (e) => set("recordType", e.target.value),
          "data-ocid": "visa-record-form.record_type.select",
          className: "w-full py-2 px-3 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
          "aria-label": "Select record type",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select type…" }),
            Object.values(VisaRecordType).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: RECORD_TYPE_LABELS$1[t] }, t))
          ]
        }
      ),
      errors.recordType && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "visa-record-form.record_type.field_error",
          children: errors.recordType
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vrf-expiry", children: "Expiry Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "vrf-expiry",
          type: "date",
          value: values.expiryDate,
          onChange: (e) => set("expiryDate", e.target.value),
          "data-ocid": "visa-record-form.expiry_date.input",
          className: "w-full py-2 px-3 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        }
      ),
      errors.expiryDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "visa-record-form.expiry_date.field_error",
          children: errors.expiryDate
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vrf-notes", children: "Notes (optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "vrf-notes",
          value: values.notes,
          onChange: (e) => set("notes", e.target.value),
          rows: 2,
          placeholder: "Additional notes…",
          "data-ocid": "visa-record-form.notes.textarea",
          className: "w-full py-2 px-3 text-sm bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          disabled: isSubmitting,
          "data-ocid": "visa-record-form.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: isSubmitting,
          "data-ocid": "visa-record-form.submit_button",
          children: isSubmitting ? "Saving…" : submitLabel
        }
      )
    ] })
  ] });
}
function formatDateInputValue(ts) {
  return timestampToDate(ts).toISOString().substring(0, 10);
}
const ALL_TYPES = [
  VisaRecordType.Passport,
  VisaRecordType.Visa,
  VisaRecordType.LabourCard,
  VisaRecordType.Insurance,
  VisaRecordType.MedicalCard,
  VisaRecordType.Contract
];
const TYPE_LABELS = {
  [VisaRecordType.Passport]: "Passport",
  [VisaRecordType.Visa]: "Visa",
  [VisaRecordType.LabourCard]: "Labour Card",
  [VisaRecordType.Insurance]: "Insurance",
  [VisaRecordType.MedicalCard]: "Medical Card",
  [VisaRecordType.Contract]: "Contract"
};
function VisaStatusMatrix({
  employees,
  records,
  threshold
}) {
  const lookup = /* @__PURE__ */ new Map();
  for (const rec of records) {
    lookup.set(`${rec.employeeId}-${rec.recordType}`, rec);
  }
  if (employees.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-8", children: "No employees to display." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "table",
    {
      className: "w-full text-sm border-collapse",
      "data-ocid": "visa-matrix.table",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/60 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground sticky left-0 bg-muted/60 min-w-48", children: "Employee" }),
          ALL_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-center px-3 py-3 font-semibold text-foreground whitespace-nowrap min-w-28",
              children: TYPE_LABELS[type]
            },
            type
          ))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: employees.map((emp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `visa-matrix.row.${idx + 1}`,
            className: "border-b border-border hover:bg-muted/20 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 sticky left-0 bg-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground truncate max-w-44", children: emp.fullName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: emp.employeeCode })
              ] }),
              ALL_TYPES.map((type) => {
                const rec = lookup.get(`${emp.id}-${type}`);
                if (!rec) {
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }, type);
                }
                const status = getVisaStatus(rec.expiryDate, [threshold]);
                const days = getDaysUntilExpiry(rec.expiryDate);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: cn(
                      "px-3 py-3 text-center",
                      status === "expired" && "bg-destructive/5",
                      status === "expiring" && "bg-chart-5/5"
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status, size: "sm" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: days < 0 ? `${Math.abs(days)}d ago` : `${days}d` })
                    ] })
                  },
                  type
                );
              })
            ]
          },
          emp.employeeCode
        )) })
      ]
    }
  ) });
}
const RECORD_TYPE_LABELS = {
  [VisaRecordType.Passport]: "Passport",
  [VisaRecordType.Visa]: "Visa",
  [VisaRecordType.LabourCard]: "Labour Card",
  [VisaRecordType.Insurance]: "Insurance",
  [VisaRecordType.MedicalCard]: "Medical Card",
  [VisaRecordType.Contract]: "Contract"
};
const RECORD_TYPE_OPTIONS = Object.values(VisaRecordType).map((t) => ({
  label: RECORD_TYPE_LABELS[t],
  value: t
}));
const STATUS_OPTIONS = [
  { label: "Expired", value: "expired" },
  { label: "Expiring Soon", value: "expiring" },
  { label: "Valid", value: "valid" }
];
function VisaAlertsPage() {
  const { data: records = [], isLoading } = useListAllVisaRecords();
  const { data: employees = [] } = useListEmployees();
  const { data: company } = useGetMyCompany();
  const addMutation = useAddVisaRecord();
  const updateMutation = useUpdateVisaRecord();
  const removeMutation = useRemoveVisaRecord();
  const updateThresholds = useUpdateAlertThresholds();
  const companyThresholds = (company == null ? void 0 : company.alertThresholdDays) ?? [30n];
  const threshold = Math.max(...companyThresholds.map(Number));
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("");
  const [filterStatus, setFilterStatus] = reactExports.useState("");
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editRecord, setEditRecord] = reactExports.useState(null);
  const [deleteRecord, setDeleteRecord] = reactExports.useState(null);
  const [showThreshold, setShowThreshold] = reactExports.useState(false);
  const employeeMap = /* @__PURE__ */ new Map();
  for (const emp of employees) {
    employeeMap.set(String(emp.id), emp);
  }
  const enriched = records.map((rec) => {
    const emp = employeeMap.get(String(rec.employeeId));
    const status = getVisaStatus(rec.expiryDate, [threshold]);
    const days = getDaysUntilExpiry(rec.expiryDate);
    return { rec, emp, status, days };
  }).sort((a, b) => a.days - b.days);
  const filtered = enriched.filter(({ rec, emp, status }) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = (emp == null ? void 0 : emp.fullName.toLowerCase()) ?? "";
      if (!name.includes(q)) return false;
    }
    if (filterType && rec.recordType !== filterType) return false;
    if (filterStatus && status !== filterStatus) return false;
    return true;
  });
  const expiredCount = enriched.filter((r) => r.status === "expired").length;
  const expiringCount = enriched.filter((r) => r.status === "expiring").length;
  const validCount = enriched.filter((r) => r.status === "valid").length;
  async function handleAdd(input) {
    try {
      await addMutation.mutateAsync(input);
      ue.success("Visa record added");
      setShowAddModal(false);
    } catch (e) {
      ue.error(String(e));
    }
  }
  async function handleEdit(input) {
    if (!editRecord) return;
    try {
      await updateMutation.mutateAsync({ id: editRecord.id, input });
      ue.success("Visa record updated");
      setEditRecord(null);
    } catch (e) {
      ue.error(String(e));
    }
  }
  async function handleDelete(id) {
    try {
      await removeMutation.mutateAsync(id);
      ue.success("Visa record deleted");
      setDeleteRecord(null);
    } catch (e) {
      ue.error(String(e));
    }
  }
  async function handleSetThreshold(days) {
    try {
      await updateThresholds.mutateAsync([BigInt(days)]);
      ue.success(`Alert threshold set to ${days} days`);
      setShowThreshold(false);
    } catch (e) {
      ue.error(String(e));
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AppShell,
    {
      pageTitle: "Visa & Document Alerts",
      breadcrumbs: [{ label: "Visa Alerts" }],
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
              "data-ocid": "visa-alerts.kpi.section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  KpiCard,
                  {
                    label: "Expired",
                    value: expiredCount,
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
                    variant: "expired",
                    ocid: "visa-alerts.kpi.expired.card"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  KpiCard,
                  {
                    label: "Expiring Soon",
                    value: expiringCount,
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }),
                    variant: "expiring",
                    ocid: "visa-alerts.kpi.expiring.card"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  KpiCard,
                  {
                    label: "Valid",
                    value: validCount,
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
                    variant: "valid",
                    ocid: "visa-alerts.kpi.valid.card"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  KpiCard,
                  {
                    label: "Total Records",
                    value: records.length,
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
                    variant: "neutral",
                    ocid: "visa-alerts.kpi.total.card"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30",
              "data-ocid": "visa-alerts.email-notice.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MailX, { className: "w-4 h-4 text-muted-foreground mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Email notifications" }),
                  " ",
                  "are not enabled on this platform. Alerts are shown in-dashboard only."
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { padding: "none", "data-ocid": "visa-alerts.table.panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 md:p-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CardHeader,
                {
                  title: "Visa & Document Records",
                  subtitle: `${filtered.length} of ${records.length} records`,
                  className: "mb-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => setShowThreshold(true),
                    "data-ocid": "visa-alerts.threshold.open_modal_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Threshold (",
                      threshold,
                      "d)"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    onClick: () => setShowAddModal(true),
                    "data-ocid": "visa-alerts.add.open_modal_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Add Record"
                    ]
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 md:px-5 py-3 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SearchFilter,
              {
                searchValue: searchQuery,
                onSearchChange: setSearchQuery,
                searchPlaceholder: "Search by employee name…",
                filters: [
                  {
                    key: "type",
                    label: "Record Type",
                    options: RECORD_TYPE_OPTIONS,
                    value: filterType,
                    onChange: (v) => setFilterType(v)
                  },
                  {
                    key: "status",
                    label: "Status",
                    options: STATUS_OPTIONS,
                    value: filterStatus,
                    onChange: (v) => setFilterStatus(v)
                  }
                ],
                "data-ocid": "visa-alerts.table.filter"
              }
            ) }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-16", "data-ocid": "visa-alerts.table.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading records…" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6" }),
                title: "No records found",
                description: "Try adjusting your filters or add a new record.",
                "data-ocid": "visa-alerts.table.empty_state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "visa-alerts.table", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Employee" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Record Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-foreground", children: "Expiry Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-foreground", children: "Days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", "aria-label": "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map(({ rec, emp, status, days }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  "data-ocid": `visa-alerts.table.item.${idx + 1}`,
                  className: cn(
                    "border-b border-border transition-colors hover:bg-muted/20",
                    status === "expired" && "bg-destructive/5",
                    status === "expiring" && "bg-chart-5/5"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground truncate max-w-40", children: (emp == null ? void 0 : emp.fullName) ?? `Employee #${rec.employeeId}` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: emp == null ? void 0 : emp.employeeCode })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: RECORD_TYPE_LABELS[rec.recordType] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: formatDate(rec.expiryDate) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: cn(
                          "px-4 py-3 text-right font-mono font-medium",
                          days < 0 ? "text-destructive" : days <= threshold ? "text-chart-5" : "text-chart-3"
                        ),
                        children: days < 0 ? `${days}` : `+${days}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenu,
                      {
                        items: [
                          {
                            label: "Edit Record",
                            onClick: () => setEditRecord(rec)
                          },
                          {
                            label: "Delete",
                            destructive: true,
                            onClick: () => setDeleteRecord(rec)
                          }
                        ],
                        "data-ocid": `visa-alerts.table.item.${idx + 1}`
                      }
                    ) })
                  ]
                },
                `${rec.employeeId}-${rec.recordType}-${rec.id}`
              )) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { padding: "none", "data-ocid": "visa-alerts.matrix.panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 md:p-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CardHeader,
              {
                title: "Employee Document Status Matrix",
                subtitle: "All document types per employee"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              VisaStatusMatrix,
              {
                employees,
                records,
                threshold
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Modal,
          {
            open: showAddModal,
            onClose: () => setShowAddModal(false),
            title: "Add Visa / Document Record",
            description: "Track a passport, visa, or other document expiry date for an employee.",
            size: "md",
            "data-ocid": "visa-alerts.add",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              VisaRecordForm,
              {
                onSubmit: handleAdd,
                onCancel: () => setShowAddModal(false),
                isSubmitting: addMutation.isPending,
                submitLabel: "Add Record"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Modal,
          {
            open: !!editRecord,
            onClose: () => setEditRecord(null),
            title: "Edit Record",
            description: "Update the expiry date or details for this document record.",
            size: "md",
            "data-ocid": "visa-alerts.edit",
            children: editRecord && /* @__PURE__ */ jsxRuntimeExports.jsx(
              VisaRecordForm,
              {
                initialValues: {
                  employeeId: editRecord.employeeId,
                  recordType: editRecord.recordType,
                  expiryDate: formatDateInputValue(editRecord.expiryDate),
                  notes: editRecord.notes
                },
                lockedEmployeeId: editRecord.employeeId,
                onSubmit: handleEdit,
                onCancel: () => setEditRecord(null),
                isSubmitting: updateMutation.isPending,
                submitLabel: "Update Record"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Modal,
          {
            open: !!deleteRecord,
            onClose: () => setDeleteRecord(null),
            title: "Delete Record",
            description: "Are you sure you want to delete this visa record? This action cannot be undone.",
            size: "sm",
            "data-ocid": "visa-alerts.delete",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setDeleteRecord(null),
                  "data-ocid": "visa-alerts.delete.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  disabled: removeMutation.isPending,
                  onClick: () => deleteRecord && handleDelete(deleteRecord.id),
                  "data-ocid": "visa-alerts.delete.confirm_button",
                  children: removeMutation.isPending ? "Deleting…" : "Delete"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Modal,
          {
            open: showThreshold,
            onClose: () => setShowThreshold(false),
            title: "Alert Threshold Settings",
            description: `Currently alerting for documents expiring within ${threshold} days.`,
            size: "sm",
            "data-ocid": "visa-alerts.threshold",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Choose how many days in advance to flag documents as "Expiring Soon".' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [7, 30, 60].map((days) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleSetThreshold(days),
                  disabled: updateThresholds.isPending,
                  "data-ocid": `visa-alerts.threshold.${days}d.button`,
                  className: cn(
                    "flex-1 py-2.5 rounded-md text-sm font-medium border transition-colors",
                    threshold === days ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-muted"
                  ),
                  children: [
                    days,
                    " days"
                  ]
                },
                days
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: () => setShowThreshold(false),
                  "data-ocid": "visa-alerts.threshold.close_button",
                  children: "Close"
                }
              ) })
            ] })
          }
        )
      ]
    }
  );
}
function KpiCard({ label, value, icon, variant, ocid }) {
  const colorMap = {
    expired: "border-destructive/30 bg-destructive/8 text-destructive",
    expiring: "border-chart-5/30 bg-chart-5/8 text-chart-5",
    valid: "border-chart-3/30 bg-chart-3/8 text-chart-3",
    neutral: "border-border bg-card text-foreground"
  };
  const iconColorMap = {
    expired: "text-destructive",
    expiring: "text-chart-5",
    valid: "text-chart-3",
    neutral: "text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-xl border p-4 transition-smooth",
        colorMap[variant]
      ),
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wide opacity-70", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("opacity-80", iconColorMap[variant]), children: icon })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display font-bold", children: value })
      ]
    }
  );
}
export {
  VisaAlertsPage as default
};
