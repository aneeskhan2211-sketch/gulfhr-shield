import { c as createLucideIcon, I as useGetMyProfile, r as reactExports, P as PayrollStatus, w as UserRole, j as jsxRuntimeExports, h as CircleCheck, m as formatDate, x as Lock, l as formatCurrency, o as useParams, F as useGetMyCompany, L as LoadingSpinner } from "./index-DqipwkTD.js";
import { u as useListEmployees } from "./employees-CUvviRBY.js";
import { b as useApprovePayrollRun, c as useUpsertPayrollItem, d as useGetPayrollRun, e as useListPayrollItems } from "./payroll-BT2KpQag.js";
import { C as Clock, A as AppShell } from "./AppShell-CUGPoZlf.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { u as ue } from "./index-C86RAjSP.js";
import { M as Modal } from "./Modal-Bl4Y2ID-.js";
import { C as CardContainer, a as CardHeader } from "./CardContainer-BlAWtbPm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode);
const STAGES = [
  {
    status: PayrollStatus.Draft,
    label: "Draft",
    role: UserRole.HRManager,
    next: PayrollStatus.HRApproved
  },
  {
    status: PayrollStatus.HRApproved,
    label: "HR Approved",
    role: UserRole.Accountant,
    next: PayrollStatus.AccountantReviewed
  },
  {
    status: PayrollStatus.AccountantReviewed,
    label: "Accountant Reviewed",
    role: UserRole.CompanyOwner,
    next: PayrollStatus.OwnerApproved
  },
  {
    status: PayrollStatus.OwnerApproved,
    label: "Owner Approved",
    role: UserRole.CompanyOwner,
    next: PayrollStatus.Exported
  },
  {
    status: PayrollStatus.Exported,
    label: "Exported",
    role: UserRole.CompanyOwner,
    next: PayrollStatus.Paid
  },
  {
    status: PayrollStatus.Paid,
    label: "Paid",
    role: UserRole.CompanyOwner,
    next: PayrollStatus.Paid
  }
];
const STATUS_ORDER = {
  [PayrollStatus.Draft]: 0,
  [PayrollStatus.HRApproved]: 1,
  [PayrollStatus.AccountantReviewed]: 2,
  [PayrollStatus.OwnerApproved]: 3,
  [PayrollStatus.Exported]: 4,
  [PayrollStatus.Paid]: 5
};
function getApproverInfo(run, stage) {
  if (stage.status === PayrollStatus.HRApproved) {
    return { by: run.hrApprovedBy, at: run.hrApprovedAt };
  }
  if (stage.status === PayrollStatus.AccountantReviewed) {
    return { by: run.accountantReviewedBy, at: run.accountantReviewedAt };
  }
  if (stage.status === PayrollStatus.OwnerApproved) {
    return { by: run.ownerApprovedBy, at: run.ownerApprovedAt };
  }
  return { by: void 0, at: void 0 };
}
function ApprovalChain({ run }) {
  const { data: profile } = useGetMyProfile();
  const approve = useApprovePayrollRun();
  const [comment, setComment] = reactExports.useState("");
  const currentOrder = STATUS_ORDER[run.status] ?? 0;
  const nextStage = STAGES.find(
    (s) => STATUS_ORDER[s.status] === currentOrder + 1
  );
  const canApprove = nextStage !== void 0 && profile !== null && ((profile == null ? void 0 : profile.role) === nextStage.role || (profile == null ? void 0 : profile.role) === UserRole.SuperAdmin || nextStage.role === UserRole.CompanyOwner && (profile == null ? void 0 : profile.role) === UserRole.CompanyOwner) && run.status !== PayrollStatus.Paid;
  async function handleApprove() {
    if (!nextStage) return;
    try {
      await approve.mutateAsync({ id: run.id, status: nextStage.next });
      ue.success(`Payroll advanced to ${nextStage.label}`);
      setComment("");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Approval failed");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 overflow-x-auto pb-1", children: STAGES.map((stage, i) => {
      const order = STATUS_ORDER[stage.status];
      const done = currentOrder > order;
      const active = currentOrder === order;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${done ? "bg-chart-3 border-chart-3 text-white" : active ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"}`,
              children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : active ? /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-medium text-center whitespace-nowrap ${done ? "text-chart-3" : active ? "text-primary" : "text-muted-foreground"}`,
              children: stage.label
            }
          )
        ] }),
        i < STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-0.5 w-8 md:w-12 shrink-0 mx-1 ${currentOrder > order ? "bg-chart-3" : "bg-border"}`
          }
        )
      ] }, stage.status);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: STAGES.filter(
      (s) => [
        PayrollStatus.HRApproved,
        PayrollStatus.AccountantReviewed,
        PayrollStatus.OwnerApproved
      ].includes(s.status)
    ).map((stage) => {
      const info = getApproverInfo(run, stage);
      const done = STATUS_ORDER[run.status] > STATUS_ORDER[stage.status];
      const current = run.status === stage.status;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-lg border p-3 ${done ? "border-chart-3/30 bg-chart-3/5" : current ? "border-primary/30 bg-primary/5" : "border-border bg-background"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-chart-3 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: stage.label })
            ] }),
            done && info.at ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(info.at) }) : current ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "pending", label: "Awaiting", size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "draft", label: "Not reached", size: "sm" })
          ]
        },
        stage.status
      );
    }) }),
    canApprove && nextStage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-primary/20 bg-primary/5 rounded-lg p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
        "Advance to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: nextStage.next.replace(/([A-Z])/g, " $1").trim() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: comment,
          onChange: (e) => setComment(e.target.value),
          placeholder: "Optional approval notes…",
          rows: 2,
          className: "form-input w-full resize-none text-sm",
          "data-ocid": "approval.notes.textarea"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleApprove,
          disabled: approve.isPending,
          className: "btn-primary text-sm",
          "data-ocid": "approval.approve_button",
          children: approve.isPending ? "Processing…" : `Approve — Advance to ${nextStage.next.replace(/([A-Z])/g, " $1").trim()}`
        }
      )
    ] })
  ] });
}
function calcNet(item) {
  return (item.basicSalary ?? 0n) + (item.housingAllowance ?? 0n) + (item.transportAllowance ?? 0n) + (item.overtime ?? 0n) - (item.deductions ?? 0n) - (item.advanceSalary ?? 0n) - (item.leaveDeduction ?? 0n);
}
function parseCurrency(str) {
  const num = Math.round(Number.parseFloat(str.replace(/,/g, "") || "0") * 100);
  return Number.isNaN(num) ? 0n : BigInt(Math.max(0, num));
}
function displayCurrency(val) {
  return (Number(val) / 100).toFixed(2);
}
function CurrencyInput({
  value,
  onChange,
  disabled,
  "data-ocid": ocid
}) {
  const [local, setLocal] = reactExports.useState(displayCurrency(value));
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setLocal(displayCurrency(value));
    }
  }, [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      ref: inputRef,
      type: "number",
      min: "0",
      step: "0.01",
      value: local,
      disabled,
      onChange: (e) => {
        setLocal(e.target.value);
        onChange(parseCurrency(e.target.value));
      },
      onBlur: () => setLocal(displayCurrency(value)),
      className: "w-24 px-2 py-1 text-right text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",
      "data-ocid": ocid
    }
  );
}
function PayrollItemsTable({
  run,
  items,
  onPrintPayslip
}) {
  const { data: employees = [] } = useListEmployees();
  const upsert = useUpsertPayrollItem();
  const isDraft = run.status === PayrollStatus.Draft;
  const empMap = Object.fromEntries(
    employees.map((e) => [String(e.id), e])
  );
  const [rows, setRows] = reactExports.useState(() => {
    const init = {};
    for (const empId of run.employeeIds) {
      const key = String(empId);
      const existing = items.find((i) => i.employeeId === empId);
      const emp = empMap[key];
      init[key] = {
        basicSalary: (existing == null ? void 0 : existing.basicSalary) ?? (emp == null ? void 0 : emp.basicSalary) ?? 0n,
        housingAllowance: (existing == null ? void 0 : existing.housingAllowance) ?? 0n,
        transportAllowance: (existing == null ? void 0 : existing.transportAllowance) ?? 0n,
        overtime: (existing == null ? void 0 : existing.overtime) ?? 0n,
        deductions: (existing == null ? void 0 : existing.deductions) ?? 0n,
        advanceSalary: (existing == null ? void 0 : existing.advanceSalary) ?? 0n,
        leaveDeduction: (existing == null ? void 0 : existing.leaveDeduction) ?? 0n
      };
    }
    return init;
  });
  reactExports.useEffect(() => {
    setRows((prev) => {
      const next = { ...prev };
      for (const empId of run.employeeIds) {
        const key = String(empId);
        const existing = items.find((i) => i.employeeId === empId);
        const emp = empMap[key];
        if (!next[key] || !isDraft) {
          next[key] = {
            basicSalary: (existing == null ? void 0 : existing.basicSalary) ?? (emp == null ? void 0 : emp.basicSalary) ?? 0n,
            housingAllowance: (existing == null ? void 0 : existing.housingAllowance) ?? 0n,
            transportAllowance: (existing == null ? void 0 : existing.transportAllowance) ?? 0n,
            overtime: (existing == null ? void 0 : existing.overtime) ?? 0n,
            deductions: (existing == null ? void 0 : existing.deductions) ?? 0n,
            advanceSalary: (existing == null ? void 0 : existing.advanceSalary) ?? 0n,
            leaveDeduction: (existing == null ? void 0 : existing.leaveDeduction) ?? 0n
          };
        }
      }
      return next;
    });
  }, [items, run.employeeIds, isDraft, empMap]);
  function updateRow(empId, field, val) {
    setRows((prev) => ({
      ...prev,
      [String(empId)]: { ...prev[String(empId)], [field]: val }
    }));
  }
  async function saveRow(empId) {
    const row = rows[String(empId)];
    if (!row) return;
    try {
      await upsert.mutateAsync({
        runId: run.id,
        input: {
          employeeId: empId,
          basicSalary: row.basicSalary,
          housingAllowance: row.housingAllowance,
          transportAllowance: row.transportAllowance,
          overtime: row.overtime,
          deductions: row.deductions,
          advanceSalary: row.advanceSalary,
          leaveDeduction: row.leaveDeduction
        }
      });
      ue.success("Salary saved");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to save");
    }
  }
  function exportCsv() {
    const headers = [
      "Employee",
      "Code",
      "Basic",
      "Housing",
      "Transport",
      "Overtime",
      "Deductions",
      "Advance",
      "Leave Deduction",
      "Net Salary"
    ];
    const csvRows = run.employeeIds.map((empId) => {
      const emp = empMap[String(empId)];
      const row = rows[String(empId)];
      if (!row) return null;
      const net = calcNet(row);
      return [
        (emp == null ? void 0 : emp.fullName) ?? "",
        (emp == null ? void 0 : emp.employeeCode) ?? "",
        displayCurrency(row.basicSalary),
        displayCurrency(row.housingAllowance),
        displayCurrency(row.transportAllowance),
        displayCurrency(row.overtime),
        displayCurrency(row.deductions),
        displayCurrency(row.advanceSalary),
        displayCurrency(row.leaveDeduction),
        displayCurrency(net)
      ].join(",");
    }).filter(Boolean);
    const csv = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payroll-${run.payPeriodMonth}-${run.payPeriodYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("CSV downloaded");
  }
  const totalNet = run.employeeIds.reduce((sum, empId) => {
    const row = rows[String(empId)];
    return row ? sum + calcNet(row) : sum;
  }, 0n);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Salary Breakdown" }),
        !isDraft && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
          " Locked"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: exportCsv,
          className: "btn-secondary text-xs",
          "data-ocid": "payroll-items.export_button",
          children: "Export CSV"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Employee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Basic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Housing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Transport" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Overtime" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Deductions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Advance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Leave Ded." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right font-bold", children: "Net Salary" }),
        isDraft && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center", children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center", children: "Payslip" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: run.employeeIds.map((empId, idx) => {
        const emp = empMap[String(empId)];
        const row = rows[String(empId)];
        if (!row) return null;
        const net = calcNet(row);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `payroll-items.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: (emp == null ? void 0 : emp.fullName) ?? "Unknown" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: (emp == null ? void 0 : emp.employeeCode) ?? "" })
              ] }),
              [
                ["basicSalary", "basic"],
                ["housingAllowance", "housing"],
                ["transportAllowance", "transport"],
                ["overtime", "overtime"],
                ["deductions", "deductions"],
                ["advanceSalary", "advance"],
                ["leaveDeduction", "leave"]
              ].map(([field, ocidSuffix]) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CurrencyInput,
                {
                  value: row[field],
                  onChange: (val) => updateRow(empId, field, val),
                  disabled: !isDraft,
                  "data-ocid": `payroll-items.${ocidSuffix}.${idx + 1}.input`
                }
              ) }, field)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `font-semibold text-sm ${net < 0n ? "text-destructive" : "text-foreground"}`,
                  children: formatCurrency(net < 0n ? 0n : net)
                }
              ) }),
              isDraft && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => saveRow(empId),
                  disabled: upsert.isPending,
                  className: "btn-primary text-xs py-1 px-3",
                  "data-ocid": `payroll-items.save_button.${idx + 1}`,
                  children: "Save"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onPrintPayslip(empId),
                  className: "w-7 h-7 flex items-center justify-center mx-auto rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                  "aria-label": "Print payslip",
                  "data-ocid": `payroll-items.print_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3.5 h-3.5" })
                }
              ) })
            ]
          },
          String(empId)
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 8,
            className: "text-right text-sm font-semibold text-foreground pr-4",
            children: "Total Net Salary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm text-foreground", children: formatCurrency(totalNet) }) }),
        isDraft && /* @__PURE__ */ jsxRuntimeExports.jsx("td", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", {})
      ] }) })
    ] }) })
  ] });
}
function PayslipView({
  open,
  onClose,
  run,
  item,
  employee,
  companyName
}) {
  if (!employee || !item) return null;
  const net = item.basicSalary + item.housingAllowance + item.transportAllowance + item.overtime - item.deductions - item.advanceSalary - item.leaveDeduction;
  const monthName = new Date(0, Number(run.payPeriodMonth) - 1).toLocaleString(
    "en",
    { month: "long" }
  );
  function handlePrint() {
    window.print();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Employee Payslip",
      size: "xl",
      "data-ocid": "payslip",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "payslip-print", className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between border-b border-border pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-bold text-foreground", children: companyName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "GulfHR Shield — Payslip" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
              monthName,
              " ",
              String(run.payPeriodYear)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pay Period" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wide font-medium", children: "Employee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: employee.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: employee.employeeCode }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: employee.jobTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: employee.department })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wide font-medium", children: "Bank Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: employee.bankName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-mono text-xs", children: employee.iban }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              "Work Location: ",
              employee.workLocation
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium text-foreground", children: "Component" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium text-foreground", children: "Amount" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground", children: "Basic Salary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-foreground", children: formatCurrency(item.basicSalary) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground", children: "Housing Allowance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-foreground", children: formatCurrency(item.housingAllowance) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground", children: "Transport Allowance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-foreground", children: formatCurrency(item.transportAllowance) })
            ] }),
            item.overtime > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground", children: "Overtime" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-chart-3", children: formatCurrency(item.overtime) })
            ] }),
            item.deductions > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground", children: "Deductions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-right text-destructive", children: [
                "-",
                formatCurrency(item.deductions)
              ] })
            ] }),
            item.advanceSalary > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground", children: "Advance Salary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-right text-destructive", children: [
                "-",
                formatCurrency(item.advanceSalary)
              ] })
            ] }),
            item.leaveDeduction > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground", children: "Leave Deduction" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-right text-destructive", children: [
                "-",
                formatCurrency(item.leaveDeduction)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-bold text-foreground", children: "Net Salary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-lg text-primary", children: formatCurrency(net < 0n ? 0n : net) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Generated: ",
          formatDate(BigInt(Date.now()) * 1000000n),
          " · GulfHR Shield"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "btn-secondary flex-1",
              "data-ocid": "payslip.cancel_button",
              children: "Close"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handlePrint,
              className: "btn-primary flex-1",
              "data-ocid": "payslip.print_button",
              children: "Print Payslip"
            }
          )
        ] })
      ] })
    }
  );
}
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
function PayrollDetailPage() {
  const { id } = useParams();
  const runId = id ? BigInt(id) : void 0;
  const { data: run, isLoading: runLoading } = useGetPayrollRun(runId);
  const { data: items = [], isLoading: itemsLoading } = useListPayrollItems(runId);
  const { data: employees = [] } = useListEmployees();
  const { data: company } = useGetMyCompany();
  const [payslipEmpId, setPayslipEmpId] = reactExports.useState(null);
  const payslipEmployee = payslipEmpId ? employees.find((e) => e.id === payslipEmpId) : void 0;
  const payslipItem = payslipEmpId ? items.find((i) => i.employeeId === payslipEmpId) : void 0;
  if (runLoading || itemsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppShell,
      {
        pageTitle: "Payroll Run",
        breadcrumbs: [
          { label: "Payroll", path: "/payroll" },
          { label: "Loading…" }
        ],
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading payroll run\\u2026" }) })
      }
    );
  }
  if (!run) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppShell,
      {
        pageTitle: "Payroll Run",
        breadcrumbs: [
          { label: "Payroll", path: "/payroll" },
          { label: "Not Found" }
        ],
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-muted-foreground", children: "Payroll run not found." })
      }
    );
  }
  const monthName = MONTH_NAMES[Number(run.payPeriodMonth)] ?? "";
  const pageTitle = `Payroll — ${monthName} ${run.payPeriodYear}`;
  const runStatusLabel = run.status.replace(/([A-Z])/g, " $1").trim();
  const runStatusSlug = run.status.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AppShell,
    {
      pageTitle,
      breadcrumbs: [
        { label: "Payroll", path: "/payroll" },
        { label: `${monthName} ${run.payPeriodYear}` }
      ],
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "payroll-detail.page", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: pageTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: runStatusSlug, label: runStatusLabel })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                run.employeeIds.length,
                " employees"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                formatCurrency(run.totalNetSalary),
                " total"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", children: [
                "Created ",
                formatDate(run.createdAt)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "payroll-detail.approval_card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CardHeader,
              {
                title: "Approval Chain",
                subtitle: "Track multi-stage approval progress"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ApprovalChain, { run })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContainer, { "data-ocid": "payroll-detail.salary_card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PayrollItemsTable,
            {
              run,
              items,
              onPrintPayslip: (empId) => setPayslipEmpId(empId)
            }
          ) }),
          run.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "payroll-detail.notes_card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { title: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: run.notes })
          ] })
        ] }),
        payslipEmpId !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          PayslipView,
          {
            open: payslipEmpId !== null,
            onClose: () => setPayslipEmpId(null),
            run,
            item: payslipItem,
            employee: payslipEmployee,
            companyName: (company == null ? void 0 : company.name) ?? "Your Company"
          }
        )
      ]
    }
  );
}
export {
  PayrollDetailPage as default
};
