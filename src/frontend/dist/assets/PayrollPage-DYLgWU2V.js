import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, k as useNavigate, P as PayrollStatus, H as ArrowRight, L as LoadingSpinner, l as formatCurrency, m as formatDate } from "./index-DqipwkTD.js";
import { a as useCreatePayrollRun, u as useListPayrollRuns } from "./payroll-BT2KpQag.js";
import { A as AppShell } from "./AppShell-CUGPoZlf.js";
import { u as useListEmployees } from "./employees-CUvviRBY.js";
import { M as Modal } from "./Modal-Bl4Y2ID-.js";
import { u as ue } from "./index-C86RAjSP.js";
import { A as ActionMenu } from "./ActionMenu-D6bdbVm_.js";
import { C as CardContainer, a as CardHeader } from "./CardContainer-BlAWtbPm.js";
import { E as EmptyState } from "./EmptyState-ZgiE4Oiw.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { P as Plus } from "./plus-XRZrAAnZ.js";
import { E as Eye } from "./eye-D-bmwEpS.js";
import { D as Download } from "./download-BXuxgTcz.js";
import { T as Trash2 } from "./trash-2-zR8XdvHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const SquareCheckBig = createLucideIcon("square-check-big", __iconNode);
const MONTHS = [
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
function PayrollRunForm({
  open,
  onClose,
  onSuccess
}) {
  const now = /* @__PURE__ */ new Date();
  const [month, setMonth] = reactExports.useState(now.getMonth() + 1);
  const [year, setYear] = reactExports.useState(now.getFullYear());
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [search, setSearch] = reactExports.useState("");
  const { data: employees = [], isLoading } = useListEmployees();
  const createRun = useCreatePayrollRun();
  const filtered = employees.filter(
    (e) => e.fullName.toLowerCase().includes(search.toLowerCase()) || e.employeeCode.toLowerCase().includes(search.toLowerCase())
  );
  function toggleEmployee(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(/* @__PURE__ */ new Set());
    } else {
      setSelected(new Set(filtered.map((e) => e.id)));
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (selected.size === 0) {
      ue.error("Select at least one employee");
      return;
    }
    try {
      const run = await createRun.mutateAsync({
        payPeriodMonth: BigInt(month),
        payPeriodYear: BigInt(year),
        employeeIds: Array.from(selected),
        notes: ""
      });
      ue.success("Payroll run created");
      onSuccess == null ? void 0 : onSuccess(run.id);
      onClose();
      setSelected(/* @__PURE__ */ new Set());
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to create payroll run"
      );
    }
  }
  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 2 + i);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Create Payroll Run",
      description: "Select the pay period and employees to include in this payroll run.",
      size: "lg",
      "data-ocid": "payroll-run-form",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "payroll-month",
                className: "block text-sm font-medium text-foreground mb-1.5",
                children: "Month"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "payroll-month",
                value: month,
                onChange: (e) => setMonth(Number(e.target.value)),
                className: "form-input w-full",
                "data-ocid": "payroll-run-form.month.select",
                children: MONTHS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i + 1, children: m }, m))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "payroll-year",
                className: "block text-sm font-medium text-foreground mb-1.5",
                children: "Year"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "payroll-year",
                value: year,
                onChange: (e) => setYear(Number(e.target.value)),
                className: "form-input w-full",
                "data-ocid": "payroll-run-form.year.select",
                children: years.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: y, children: y }, y))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-sm font-medium text-foreground", children: [
              "Employees",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-muted-foreground font-normal", children: [
                selected.size,
                " selected"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: toggleAll,
                className: "text-xs text-primary hover:underline",
                "data-ocid": "payroll-run-form.select-all_button",
                children: selected.size === filtered.length ? "Deselect all" : "Select all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "search",
              placeholder: "Search employees…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "form-input w-full mb-2",
              "data-ocid": "payroll-run-form.search_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-lg overflow-y-auto max-h-56", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-sm text-muted-foreground", children: "Loading employees…" }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-sm text-muted-foreground", children: "No employees found" }) : filtered.map((emp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center gap-3 px-3 py-2.5 hover:bg-muted/40 cursor-pointer border-b border-border last:border-0 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: selected.has(emp.id),
                    onChange: () => toggleEmployee(emp.id),
                    className: "rounded border-border"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: emp.fullName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    emp.employeeCode,
                    " · ",
                    emp.department
                  ] })
                ] })
              ]
            },
            String(emp.id)
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "btn-secondary flex-1",
              "data-ocid": "payroll-run-form.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: createRun.isPending || selected.size === 0,
              className: "btn-primary flex-1",
              "data-ocid": "payroll-run-form.submit_button",
              children: createRun.isPending ? "Creating…" : `Create Run (${selected.size} employees)`
            }
          )
        ] })
      ] })
    }
  );
}
const WORKFLOW_STAGES = [
  { status: PayrollStatus.Draft, label: "Draft" },
  { status: PayrollStatus.HRApproved, label: "HR Approved" },
  { status: PayrollStatus.AccountantReviewed, label: "Accountant Reviewed" },
  { status: PayrollStatus.OwnerApproved, label: "Owner Approved" },
  { status: PayrollStatus.Exported, label: "Exported" },
  { status: PayrollStatus.Paid, label: "Paid" }
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
  const m = Number(run.payPeriodMonth);
  const y = Number(run.payPeriodYear);
  return `${MONTH_NAMES[m] ?? m} ${y}`;
}
function statusSlug(status) {
  return status.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function statusLabel(status) {
  return status.replace(/([A-Z])/g, " $1").trim();
}
function PayrollPage() {
  const navigate = useNavigate();
  const { data: runs = [], isLoading } = useListPayrollRuns();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [filterMonth, setFilterMonth] = reactExports.useState("all");
  const months = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    return runs.reduce((acc, r) => {
      const key = `${r.payPeriodMonth}-${r.payPeriodYear}`;
      if (!seen.has(key)) {
        seen.add(key);
        acc.push({ label: payPeriodLabel(r), value: key });
      }
      return acc;
    }, []);
  }, [runs]);
  const filtered = runs.filter((r) => {
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    if (filterMonth !== "all" && `${r.payPeriodMonth}-${r.payPeriodYear}` !== filterMonth)
      return false;
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { pageTitle: "Payroll", breadcrumbs: [{ label: "Payroll" }], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "payroll.workflow_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CardHeader,
          {
            title: "Payroll Approval Workflow",
            subtitle: "Each run must progress through all stages before payment."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 flex-wrap", children: WORKFLOW_STAGES.map((stage, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBadge,
            {
              status: statusSlug(stage.status),
              label: stage.label,
              size: "sm"
            }
          ),
          i < WORKFLOW_STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" })
        ] }, stage.status)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filterStatus,
              onChange: (e) => setFilterStatus(e.target.value),
              className: "form-input text-sm",
              "data-ocid": "payroll.status.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
                WORKFLOW_STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.status, children: s.label }, s.status))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filterMonth,
              onChange: (e) => setFilterMonth(e.target.value),
              className: "form-input text-sm",
              "data-ocid": "payroll.month.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Periods" }),
                months.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.value, children: m.label }, m.value))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowForm(true),
            className: "btn-primary flex items-center gap-2 shrink-0",
            "data-ocid": "payroll.create_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " New Payroll Run"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContainer, { padding: "none", "data-ocid": "payroll.list_card", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-16 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading payroll runs\\u2026" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-6 h-6" }),
          title: runs.length === 0 ? "No payroll runs yet" : "No runs match filters",
          description: runs.length === 0 ? "Create your first payroll run to get started." : "Try clearing the filters.",
          action: runs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(true),
              className: "btn-primary",
              "data-ocid": "payroll.empty_create_button",
              children: "Create Payroll Run"
            }
          ) : void 0,
          "data-ocid": "payroll.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Pay Period" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Employees" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Total Net" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((run, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "cursor-pointer",
            onClick: () => navigate(`/payroll/${run.id}`),
            onKeyDown: (e) => e.key === "Enter" && navigate(`/payroll/${run.id}`),
            tabIndex: 0,
            "data-ocid": `payroll.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: payPeriodLabel(run) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  status: statusSlug(run.status),
                  label: statusLabel(run.status)
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right tabular-nums", children: run.employeeIds.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums", children: formatCurrency(run.totalNetSalary) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: formatDate(run.createdAt) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "text-center",
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ActionMenu,
                    {
                      items: [
                        {
                          label: "View Details",
                          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                          onClick: () => navigate(`/payroll/${run.id}`)
                        },
                        {
                          label: "Approve Run",
                          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-3.5 h-3.5" }),
                          onClick: () => navigate(`/payroll/${run.id}`),
                          disabled: run.status === PayrollStatus.Paid
                        },
                        {
                          label: "Download CSV",
                          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                          onClick: () => navigate(`/payroll/${run.id}`)
                        },
                        {
                          label: "Delete",
                          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                          destructive: true,
                          disabled: run.status !== PayrollStatus.Draft,
                          onClick: () => {
                          }
                        }
                      ],
                      "data-ocid": `payroll.action_menu.${idx + 1}`
                    }
                  )
                }
              )
            ]
          },
          String(run.id)
        )) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PayrollRunForm,
      {
        open: showForm,
        onClose: () => setShowForm(false),
        onSuccess: (id) => navigate(`/payroll/${id}`)
      }
    )
  ] });
}
export {
  PayrollPage as default
};
