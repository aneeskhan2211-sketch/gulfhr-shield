import { j as jsxRuntimeExports, h as CircleCheck, n as Link, J as useListWpsExports, K as useGenerateWpsExport, r as reactExports, M as WpsCountryFormat, T as TriangleAlert, L as LoadingSpinner, m as formatDate } from "./index-DqipwkTD.js";
import { u as useListEmployees } from "./employees-CUvviRBY.js";
import { u as useListPayrollRuns } from "./payroll-BT2KpQag.js";
import { A as AppShell, F as FileText } from "./AppShell-CUGPoZlf.js";
import { C as CardContainer, a as CardHeader } from "./CardContainer-BlAWtbPm.js";
import { E as EmptyState } from "./EmptyState-ZgiE4Oiw.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { C as CircleAlert } from "./circle-alert-CLODWFL3.js";
import { u as ue } from "./index-C86RAjSP.js";
import { D as Download } from "./download-BXuxgTcz.js";
import { H as History } from "./history-DTN-zlv1.js";
function getMissingFields(emp) {
  const missing = [];
  if (!emp.bankName || emp.bankName.trim() === "") missing.push("Bank Name");
  if (!emp.iban || emp.iban.trim() === "") missing.push("IBAN");
  if (!emp.basicSalary || emp.basicSalary <= 0n) missing.push("Salary");
  if (!emp.employeeCode || emp.employeeCode.trim() === "")
    missing.push("Employee ID");
  return missing;
}
function WpsValidationTable({
  employees,
  isLoading
}) {
  const rows = employees.map((emp) => ({
    employee: emp,
    missingFields: getMissingFields(emp)
  }));
  const invalidCount = rows.filter((r) => r.missingFields.length > 0).length;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-sm text-muted-foreground", children: "Validating employee data…" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-sm", children: invalidCount === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-chart-3 font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
      "All ",
      employees.length,
      " employees are ready for WPS export"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-destructive font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
      invalidCount,
      " employee",
      invalidCount > 1 ? "s have" : " has",
      " ",
      "missing required fields"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Employee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Bank" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "IBAN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Salary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row, idx) => {
        const { employee: emp, missingFields } = row;
        const isInvalid = missingFields.length > 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: isInvalid ? "bg-destructive/5" : "",
            "data-ocid": `wps-validation.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: emp.fullName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: emp.nationality })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm", children: emp.employeeCode || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive text-xs", children: "Missing" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm", children: emp.bankName || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive text-xs", children: "Missing" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm font-mono", children: emp.iban ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", children: [
                emp.iban.slice(0, 8),
                "…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive text-xs", children: "Missing" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm", children: emp.basicSalary > 0n ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "AED ",
                (Number(emp.basicSalary) / 100).toLocaleString()
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive text-xs", children: "Missing" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: isInvalid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-destructive font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                missingFields.join(", ")
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-chart-3 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                "Ready"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: isInvalid && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: `/employees/${emp.id}`,
                  className: "text-xs text-primary hover:underline",
                  "data-ocid": `wps-validation.edit_link.${idx + 1}`,
                  children: "Fix record"
                }
              ) })
            ]
          },
          String(emp.id)
        );
      }) })
    ] }) })
  ] });
}
const COUNTRY_FORMATS = [
  {
    value: WpsCountryFormat.UAESIF,
    label: "UAE SIF",
    flag: "🇦🇪",
    description: "UAE Salary Information File required by UAE WPS. Columns: EID, Bank Code, Account, Routing, Salary, Start Date, Days Worked."
  },
  {
    value: WpsCountryFormat.OmanMOL,
    label: "Oman MOL",
    flag: "🇴🇲",
    description: "Oman Ministry of Labour format. Columns: Company ID, Employee ID, Net Salary, Bank, IBAN, Pay Month."
  },
  {
    value: WpsCountryFormat.QatarTemplate,
    label: "Qatar Template",
    flag: "🇶🇦",
    description: "Qatar WPS configurable template. Columns: QID, IBAN, Salary, Allowances, Pay Date."
  },
  {
    value: WpsCountryFormat.SaudiTemplate,
    label: "Saudi Template",
    flag: "🇸🇦",
    description: "Saudi Arabia Mudad/GOSI-compatible template. Columns: IQAMA/ID, IBAN, Basic, Allowances, Net Pay."
  }
];
const MONTH_NAMES = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function payPeriodLabel(run) {
  return `${MONTH_NAMES[Number(run.payPeriodMonth)] ?? run.payPeriodMonth} ${run.payPeriodYear}`;
}
function WpsPage() {
  const { data: runs = [], isLoading: runsLoading } = useListPayrollRuns();
  const { data: employees = [], isLoading: empsLoading } = useListEmployees();
  const { data: exports$1 = [], isLoading: exportsLoading } = useListWpsExports();
  const generateExport = useGenerateWpsExport();
  const [selectedFormat, setSelectedFormat] = reactExports.useState(
    WpsCountryFormat.UAESIF
  );
  const [selectedRunId, setSelectedRunId] = reactExports.useState("");
  const selectedRun = runs.find(
    (r) => String(r.id) === selectedRunId
  );
  const runEmployees = selectedRun ? employees.filter((e) => selectedRun.employeeIds.includes(e.id)) : employees;
  const missingCount = runEmployees.filter(
    (emp) => !emp.bankName || !emp.iban || emp.basicSalary <= 0n || !emp.employeeCode
  ).length;
  const canGenerate = !!selectedRun && missingCount === 0;
  async function handleGenerate() {
    if (!selectedRun) {
      ue.error("Please select a payroll run");
      return;
    }
    if (missingCount > 0) {
      ue.error(
        `${missingCount} employee(s) have missing required fields. Please fix before exporting.`
      );
      return;
    }
    try {
      const result = await generateExport.mutateAsync({
        payrollRunId: selectedRun.id,
        countryFormat: selectedFormat
      });
      const blob = new Blob([result.fileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = result.export.fileName || `wps-${selectedFormat}-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      ue.success("WPS file generated and downloaded successfully");
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to generate WPS file"
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { pageTitle: "WPS File Preparation", breadcrumbs: [{ label: "WPS" }], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "wps.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 rounded-lg border-2 border-destructive/40 bg-destructive/10 p-4",
        "data-ocid": "wps.disclaimer",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive mb-1", children: "Important Disclaimer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
              "Final file format must be verified with your bank or WPS provider before submission.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "This tool does not connect directly to any government or banking system." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Government and bank API integration is a Future Feature. Always validate the export file with your bank or WPS provider before submission." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "wps.format_card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardHeader,
            {
              title: "Country Format",
              subtitle: "Select WPS template for your country"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: COUNTRY_FORMATS.map((fmt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: `flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedFormat === fmt.value ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "wps-format",
                    value: fmt.value,
                    checked: selectedFormat === fmt.value,
                    onChange: () => setSelectedFormat(fmt.value),
                    className: "mt-0.5 shrink-0",
                    "data-ocid": `wps.format.${fmt.label.toLowerCase().replace(/\s+/g, "-")}.radio`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                    fmt.flag,
                    " ",
                    fmt.label
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: fmt.description })
                ] })
              ]
            },
            fmt.value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "wps.run_card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { title: "Select Payroll Run" }),
          runsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : runs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No payroll runs available." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: selectedRunId,
              onChange: (e) => setSelectedRunId(e.target.value),
              className: "form-input w-full",
              "data-ocid": "wps.run.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a payroll run\\u2026" }),
                runs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(r.id), children: [
                  payPeriodLabel(r),
                  " \\u2014",
                  " ",
                  r.status.replace(/([A-Z])/g, " $1").trim(),
                  " (",
                  r.employeeIds.length,
                  " employees)"
                ] }, String(r.id)))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleGenerate,
            disabled: !canGenerate || generateExport.isPending,
            className: "btn-primary w-full flex items-center justify-center gap-2",
            "data-ocid": "wps.generate_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              generateExport.isPending ? "Generating…" : "Generate WPS File"
            ]
          }
        ),
        !selectedRun && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Select a payroll run to proceed" }),
        selectedRun && missingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive text-center", children: [
          "Fix ",
          missingCount,
          " employee record",
          missingCount > 1 ? "s" : "",
          " ",
          "before generating"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "wps.validation_card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardHeader,
            {
              title: "Pre-Export Validation",
              subtitle: selectedRun ? `Employees in ${payPeriodLabel(selectedRun)}` : "Select a payroll run to validate"
            }
          ),
          empsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading employee data\\u2026" }) : runEmployees.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
              title: "No employees to validate",
              description: "Select a payroll run to see employee validation status.",
              "data-ocid": "wps.validation.empty_state"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(WpsValidationTable, { employees: runEmployees })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "wps.history_card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardHeader,
            {
              title: "Export History",
              action: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4 text-muted-foreground" })
            }
          ),
          exportsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : exports$1.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-5 h-5" }),
              title: "No exports yet",
              description: "Your WPS export history will appear here.",
              "data-ocid": "wps.history.empty_state"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Export Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center", children: "Employees" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "File" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: exports$1.map((exp, idx) => {
              var _a;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  "data-ocid": `wps.history.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm text-muted-foreground", children: formatDate(exp.createdAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "text-sm", children: [
                      ((_a = COUNTRY_FORMATS.find(
                        (f) => f.value === exp.countryFormat
                      )) == null ? void 0 : _a.flag) ?? "",
                      " ",
                      exp.countryFormat.replace(/([A-Z])/g, " $1").trim()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center tabular-nums", children: String(exp.employeeCount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatusBadge,
                      {
                        status: exp.status.toLowerCase(),
                        label: exp.status,
                        size: "sm"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-xs font-mono text-muted-foreground truncate max-w-32", children: exp.fileName })
                  ]
                },
                String(exp.id)
              );
            }) })
          ] }) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  WpsPage as default
};
