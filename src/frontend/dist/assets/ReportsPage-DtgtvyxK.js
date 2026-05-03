import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, N as Variant_Low_High_Medium_Critical, O as Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError, Q as TrendingUp, r as reactExports, Y as AuditStatus, y as AuditActionType, m as formatDate, x as Lock, h as CircleCheck } from "./index-DqipwkTD.js";
import { u as useListAuditLogs } from "./audit-C2N5k9eD.js";
import { A as AppShell, F as FileText } from "./AppShell-CUGPoZlf.js";
import { M as Modal } from "./Modal-Bl4Y2ID-.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { u as useGetComplianceRiskScore, R as ResponsiveContainer, X as XAxis, Y as YAxis, T as Tooltip } from "./generateCategoricalChart-FZbN6Ag_.js";
import { C as CardContainer, a as CardHeader } from "./CardContainer-BlAWtbPm.js";
import { T as TrendingDown } from "./trending-down-BHvE2-0E.js";
import { L as LineChart, C as CartesianGrid, a as Line } from "./LineChart-M47G77zK.js";
import { B as Button } from "./button-B4kMrH3h.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, I as Input } from "./select-2niFz9CV.js";
import { D as Download } from "./download-BXuxgTcz.js";
import { C as CircleAlert } from "./circle-alert-CLODWFL3.js";
import { E as Eye } from "./eye-D-bmwEpS.js";
import { F as FileCheck } from "./file-check-8IyGltKi.js";
import { T as Trash2 } from "./trash-2-zR8XdvHL.js";
import { U as Upload } from "./upload-BuidvJhM.js";
import "./index-DzTulS2Y.js";
import "./Combination-DaLoBBr6.js";
import "./chevron-up-0G4ukNk8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1", key: "jmtmu2" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["rect", { width: "8", height: "5", x: "2", y: "13", rx: "1", key: "10y5wo" }],
  ["path", { d: "M8 13v-2a2 2 0 1 0-4 0v2", key: "1pdxzg" }]
];
const FileLock2 = createLucideIcon("file-lock-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const DRILL_DATA = {
  document: {
    title: "Document Completeness Issues",
    subtitle: "6 employees missing documents — estimated fine: AED 7,500",
    fineBadge: "AED 7,500",
    employees: [
      {
        name: "Mohammed Al-Rashidi",
        code: "EMP-004",
        issue: "Passport expires in 12 days",
        status: "expiring"
      },
      {
        name: "Priya Nair",
        code: "EMP-009",
        issue: "Labour card expired 3 days ago",
        status: "expired"
      },
      {
        name: "Sung-Min Park",
        code: "EMP-015",
        issue: "Insurance certificate missing",
        status: "expired"
      },
      {
        name: "Ali Hassan",
        code: "EMP-018",
        issue: "Medical card expires in 25 days",
        status: "expiring"
      },
      {
        name: "Layla Al-Otaibi",
        code: "EMP-012",
        issue: "Employment contract not uploaded",
        status: "expired"
      },
      {
        name: "Rajan Patel",
        code: "EMP-020",
        issue: "Emirates ID expiring in 10 days",
        status: "expiring"
      }
    ]
  },
  payroll: {
    title: "Payroll & WPS Compliance Issues",
    subtitle: "April payroll overdue — WPS deadline in 2 days — estimated fine: AED 20,000",
    fineBadge: "AED 20,000",
    employees: [
      {
        name: "All Employees (20)",
        code: "PAYROLL-APR",
        issue: "April 2025 payroll not yet processed",
        status: "pending"
      },
      {
        name: "WPS File Export",
        code: "WPS-MAR",
        issue: "March WPS salary file not submitted to bank",
        status: "pending"
      },
      {
        name: "Engineering Dept",
        code: "DEPT-03",
        issue: "Payroll approval delayed by Finance Director",
        status: "draft"
      }
    ]
  },
  visa: {
    title: "Visa Validity Issues",
    subtitle: "4 expired + 3 expiring within 7 days — estimated fine: AED 29,000",
    fineBadge: "AED 29,000",
    employees: [
      {
        name: "Fatima Al-Zaabi",
        code: "EMP-007",
        issue: "Residence visa expired 8 days ago",
        status: "expired"
      },
      {
        name: "Ravi Kumar",
        code: "EMP-011",
        issue: "Work visa expired — deportation risk",
        status: "expired"
      },
      {
        name: "Chen Wei",
        code: "EMP-013",
        issue: "Residence visa expired 2 days ago",
        status: "expired"
      },
      {
        name: "Nadia Al-Shamsi",
        code: "EMP-016",
        issue: "Tourist visa used for work — violation",
        status: "expired"
      },
      {
        name: "Omar Hassan Al-Farsi",
        code: "EMP-003",
        issue: "Visa expires in 3 days — renew now",
        status: "expiring"
      },
      {
        name: "Sara Mohammed",
        code: "EMP-004",
        issue: "Visa expires in 6 days",
        status: "expiring"
      },
      {
        name: "Khalid Al-Mansouri",
        code: "EMP-005",
        issue: "Visa expires in 7 days",
        status: "expiring"
      }
    ]
  }
};
function ComplianceDrillDown({
  metric,
  onClose
}) {
  const data = metric ? DRILL_DATA[metric] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: !!metric,
      onClose,
      title: (data == null ? void 0 : data.title) ?? "",
      description: (data == null ? void 0 : data.subtitle) ?? "Employees contributing to a lower compliance score in this category.",
      size: "lg",
      "data-ocid": "compliance.drilldown.dialog",
      children: data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        data.fineBadge && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-medium", children: "⚠ Estimated regulatory fine:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-destructive tabular-nums", children: data.fineBadge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: data.employees.map((emp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-muted/30",
            "data-ocid": `compliance.drilldown.item.${emp.code}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground", children: emp.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  emp.code,
                  " — ",
                  emp.issue
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: emp.status, size: "sm" })
            ]
          },
          emp.code
        )) })
      ] })
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const CATEGORIES = [
  {
    key: "visa",
    label: "Visa Validity",
    weight: "30%",
    tooltip: "Expired / expiring visa records"
  },
  {
    key: "payroll",
    label: "Payroll / WPS",
    weight: "30%",
    tooltip: "On-time salary runs & WPS submissions"
  },
  {
    key: "documents",
    label: "Document Completeness",
    weight: "20%",
    tooltip: "Passports, contracts & labour cards"
  },
  {
    key: "attendance",
    label: "Attendance Tracking",
    weight: "10%",
    tooltip: "Monthly check-in/out records"
  },
  {
    key: "employee",
    label: "Employee Data",
    weight: "10%",
    tooltip: "Required profile fields"
  }
];
function scoreColor(score) {
  if (score >= 80) return "text-chart-3";
  if (score >= 60) return "text-chart-5";
  return "text-destructive";
}
function scoreBg(score) {
  if (score >= 80) return "border-chart-3/40 bg-chart-3/5";
  if (score >= 60) return "border-chart-5/40 bg-chart-5/5";
  return "border-destructive/40 bg-destructive/5";
}
function riskLabel(level) {
  switch (level) {
    case Variant_Low_High_Medium_Critical.Low:
      return "Safe";
    case Variant_Low_High_Medium_Critical.Medium:
      return "Warning";
    case Variant_Low_High_Medium_Critical.High:
      return "High Risk";
    case Variant_Low_High_Medium_Critical.Critical:
      return "Critical";
  }
}
function CategoryRow({ label, weight, score }) {
  const bar = score >= 80 ? "bg-chart-3" : score >= 50 ? "bg-chart-5" : "bg-destructive";
  const text = score >= 80 ? "text-chart-3" : score >= 50 ? "text-chart-5" : "text-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
          "(",
          weight,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-xs font-bold tabular-nums", text), children: [
        score,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn("h-full rounded-full transition-all duration-700", bar),
        style: { width: `${score}%` }
      }
    ) })
  ] });
}
function ComplianceScore({
  overallScore,
  documentValidity: _documentValidity,
  payrollTimeliness: _payrollTimeliness,
  visaCompletion: _visaCompletion,
  onDrillDown
}) {
  const { data: risk, isLoading } = useGetComplianceRiskScore();
  const score = risk ? Number(risk.score) : overallScore;
  const riskLevel = (risk == null ? void 0 : risk.riskLevel) ?? Variant_Low_High_Medium_Critical.High;
  const riskFactors = (risk == null ? void 0 : risk.riskFactors) ?? [];
  const visaFactors = riskFactors.filter(
    (f) => f.factorType === Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.VisaExpiry
  );
  const payrollFactors = riskFactors.filter(
    (f) => f.factorType === Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.PayrollDelay || f.factorType === Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.WpsError
  );
  const docFactors = riskFactors.filter(
    (f) => f.factorType === Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.MissingDocument
  );
  const visaImpact = visaFactors.reduce(
    (s, f) => s + Number(f.employeeCount) * 3,
    0
  );
  const payrollImpact = payrollFactors.reduce(
    (s, f) => s + (f.severity === "Critical" ? 20 : f.severity === "High" ? 12 : 6),
    0
  );
  const docImpact = docFactors.reduce(
    (s, f) => s + Number(f.employeeCount) * 2,
    0
  );
  const categoryScores = [
    Math.max(0, Math.min(100, 100 - visaImpact)),
    Math.max(0, Math.min(100, 100 - payrollImpact)),
    Math.max(0, Math.min(100, 100 - docImpact)),
    score >= 60 ? 85 : 60,
    score >= 50 ? 80 : 55
  ];
  const trendData = Array.from({ length: 12 }, (_, i) => {
    const months = [
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May"
    ];
    const base = score - 22 + i * 2 + (i % 3 === 0 ? -3 : i % 3 === 1 ? 1 : 2);
    return { month: months[i], score: Math.max(30, Math.min(100, base)) };
  });
  trendData[11] = { month: "May", score };
  const prevScore = trendData[10].score;
  const scoreDelta = score - prevScore;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "compliance.score.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CardHeader,
        {
          title: "Overall Compliance Score",
          subtitle: "Weighted across 5 compliance categories"
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-32 h-32 rounded-full border-8 flex items-center justify-center",
              score >= 80 ? "border-chart-3" : score >= 60 ? "border-chart-5" : "border-destructive"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "text-3xl font-bold font-display",
                    scoreColor(score)
                  ),
                  children: score
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "/100" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "mt-3 text-sm font-semibold px-3 py-1 rounded-full border",
              scoreBg(score),
              scoreColor(score)
            ),
            children: riskLabel(riskLevel)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-3 text-xs text-muted-foreground", children: [
          scoreDelta >= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-chart-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            scoreDelta >= 0 ? "+" : "",
            scoreDelta,
            " vs last month"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "compliance.metrics.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CardHeader,
        {
          title: "Category Breakdown",
          subtitle: "5-factor weighted compliance analysis"
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, i.toString())) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            if (cat.key === "documents") onDrillDown("document");
            else if (cat.key === "payroll") onDrillDown("payroll");
            else if (cat.key === "visa") onDrillDown("visa");
          },
          className: cn(
            "w-full text-left p-2.5 rounded-lg border transition-colors hover:bg-muted/40",
            scoreBg(categoryScores[i])
          ),
          "data-ocid": `compliance.category.${cat.key}.button`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CategoryRow,
            {
              label: cat.label,
              weight: cat.weight,
              score: categoryScores[i]
            }
          )
        },
        cat.key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "compliance.trend.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CardHeader,
        {
          title: "12-Month Trend",
          subtitle: "Compliance score history"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        LineChart,
        {
          data: trendData,
          margin: { top: 4, right: 8, left: -16, bottom: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", className: "stroke-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "month",
                tick: { fontSize: 11 },
                className: "text-muted-foreground"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [0, 100], tick: { fontSize: 11 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12
                },
                formatter: (val) => [`${val}/100`, "Score"]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "score",
                stroke: "oklch(var(--chart-1))",
                strokeWidth: 2.5,
                dot: { r: 3, fill: "oklch(var(--chart-1))" },
                activeDot: { r: 5 }
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
const ACTION_ICONS = {
  SalaryChanged: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 text-chart-5" }),
  DocumentDownloaded: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 text-chart-1" }),
  DocumentUploaded: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5 text-chart-3" }),
  DocumentDeleted: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-destructive" }),
  PayrollApproved: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-chart-3" }),
  WPSExported: /* @__PURE__ */ jsxRuntimeExports.jsx(FileLock2, { className: "w-3.5 h-3.5 text-accent" }),
  RoleChanged: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-chart-4" }),
  EmployeeAdded: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5 text-chart-3" }),
  EmployeeDeleted: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-destructive" }),
  AlertThresholdChanged: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 text-chart-4" }),
  CompanyProfileUpdated: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "w-3.5 h-3.5 text-chart-2" }),
  UserLogin: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5 text-chart-1" })
};
const DEMO_AUDIT_LOGS = [
  {
    id: 1n,
    userId: 1n,
    actionType: AuditActionType.SalaryChanged,
    affectedResourceType: "Employee",
    affectedResourceName: "Mohammed Al-Rashidi",
    oldValue: "AED 12,000",
    newValue: "AED 13,500",
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 36e5) * 1000000n,
    companyId: 1n,
    affectedResourceId: "1",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager"
  },
  {
    id: 2n,
    userId: 2n,
    actionType: AuditActionType.DocumentDownloaded,
    affectedResourceType: "Document",
    affectedResourceName: "Passport_Ali_Hassan.pdf",
    oldValue: void 0,
    newValue: void 0,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 72e5) * 1000000n,
    companyId: 1n,
    affectedResourceId: "2",
    displayUser: "Rajan Mehta",
    displayRole: "Accountant"
  },
  {
    id: 3n,
    userId: 1n,
    actionType: AuditActionType.PayrollApproved,
    affectedResourceType: "PayrollRun",
    affectedResourceName: "April 2026 Payroll",
    oldValue: "HrApproved",
    newValue: "AccountantReviewed",
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 144e5) * 1000000n,
    companyId: 1n,
    affectedResourceId: "3",
    displayUser: "Ahmed Al-Farsi",
    displayRole: "Company Owner"
  },
  {
    id: 4n,
    userId: 3n,
    actionType: AuditActionType.WPSExported,
    affectedResourceType: "WpsExport",
    affectedResourceName: "UAE SIF - April 2026",
    oldValue: void 0,
    newValue: void 0,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 288e5) * 1000000n,
    companyId: 1n,
    affectedResourceId: "4",
    displayUser: "Rajan Mehta",
    displayRole: "Accountant"
  },
  {
    id: 5n,
    userId: 2n,
    actionType: AuditActionType.DocumentUploaded,
    affectedResourceType: "Document",
    affectedResourceName: "Visa_Priya_Nair.pdf",
    oldValue: void 0,
    newValue: void 0,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 864e5) * 1000000n,
    companyId: 1n,
    affectedResourceId: "5",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager"
  },
  {
    id: 6n,
    userId: 1n,
    actionType: AuditActionType.SalaryChanged,
    affectedResourceType: "Employee",
    affectedResourceName: "Fatima Al-Zaabi",
    oldValue: "AED 9,500",
    newValue: "AED 10,200",
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 1728e5) * 1000000n,
    companyId: 1n,
    affectedResourceId: "6",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager"
  },
  {
    id: 7n,
    userId: 4n,
    actionType: AuditActionType.DocumentDeleted,
    affectedResourceType: "Document",
    affectedResourceName: "Old_Insurance_2024.pdf",
    oldValue: void 0,
    newValue: void 0,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 2592e5) * 1000000n,
    companyId: 1n,
    affectedResourceId: "7",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager"
  },
  {
    id: 8n,
    userId: 1n,
    actionType: AuditActionType.RoleChanged,
    affectedResourceType: "User",
    affectedResourceName: "John Smith",
    oldValue: "Employee",
    newValue: "BranchManager",
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 432e6) * 1000000n,
    companyId: 1n,
    affectedResourceId: "8",
    displayUser: "Ahmed Al-Farsi",
    displayRole: "Company Owner"
  },
  {
    id: 9n,
    userId: 2n,
    actionType: AuditActionType.EmployeeAdded,
    affectedResourceType: "PayrollRun",
    affectedResourceName: "May 2026 Payroll",
    oldValue: void 0,
    newValue: void 0,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 5184e5) * 1000000n,
    companyId: 1n,
    affectedResourceId: "9",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager"
  },
  {
    id: 10n,
    userId: 3n,
    actionType: AuditActionType.DocumentUploaded,
    affectedResourceType: "VisaRecord",
    affectedResourceName: "Sung-Min Park",
    oldValue: void 0,
    newValue: void 0,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 6048e5) * 1000000n,
    companyId: 1n,
    affectedResourceId: "10",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager"
  }
];
const PAGE_SIZE = 50;
const ACTION_OPTIONS = [
  { value: "all", label: "All Actions" },
  { value: AuditActionType.SalaryChanged, label: "Salary Changed" },
  { value: AuditActionType.DocumentDownloaded, label: "Document Downloaded" },
  { value: AuditActionType.DocumentUploaded, label: "Document Uploaded" },
  { value: AuditActionType.DocumentDeleted, label: "Document Deleted" },
  { value: AuditActionType.PayrollApproved, label: "Payroll Approved" },
  { value: AuditActionType.WPSExported, label: "WPS Exported" },
  { value: AuditActionType.RoleChanged, label: "Role Changed" }
];
function exportCSV(logs) {
  const headers = [
    "Timestamp",
    "Action",
    "User",
    "Role",
    "Resource Type",
    "Resource",
    "Old Value",
    "New Value",
    "Status"
  ];
  const rows = logs.map((l) => [
    formatDate(l.createdAt),
    l.actionType,
    l.displayUser,
    l.displayRole,
    l.affectedResourceType,
    l.affectedResourceName,
    l.oldValue ?? "",
    l.newValue ?? "",
    l.status
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit-log-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function ReportsPage() {
  const { data: auditLogs } = useListAuditLogs();
  const [actionFilter, setActionFilter] = reactExports.useState("all");
  const [userFilter, setUserFilter] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [drillMetric, setDrillMetric] = reactExports.useState(null);
  const displayLogs = reactExports.useMemo(() => {
    const rawLogs = (auditLogs == null ? void 0 : auditLogs.length) ? auditLogs : null;
    const richLogs = rawLogs ? rawLogs.map((l) => ({
      ...l,
      displayUser: String(l.userId),
      displayRole: ""
    })) : DEMO_AUDIT_LOGS;
    return richLogs.filter((l) => {
      if (actionFilter !== "all" && l.actionType !== actionFilter)
        return false;
      if (userFilter && !l.displayUser.toLowerCase().includes(userFilter.toLowerCase()))
        return false;
      if (dateFrom) {
        const fromTs = new Date(dateFrom).getTime();
        if (Number(l.createdAt / 1000000n) < fromTs) return false;
      }
      if (dateTo) {
        const toTs = new Date(dateTo).getTime() + 864e5;
        if (Number(l.createdAt / 1000000n) > toTs) return false;
      }
      return true;
    }).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
  }, [auditLogs, actionFilter, userFilter, dateFrom, dateTo]);
  const totalPages = Math.ceil(displayLogs.length / PAGE_SIZE);
  const paginated = displayLogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { pageTitle: "Compliance & Reports", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ComplianceScore,
      {
        overallScore: 91,
        documentValidity: 88,
        payrollTimeliness: 96,
        visaCompletion: 89,
        onDrillDown: setDrillMetric
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ComplianceDrillDown,
      {
        metric: drillMetric,
        onClose: () => setDrillMetric(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "reports.audit_log.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CardHeader,
        {
          title: "Audit Log",
          subtitle: "Append-only record of all sensitive actions",
          action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => exportCSV(displayLogs),
              "data-ocid": "reports.export_csv.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Export CSV"
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: actionFilter,
            onValueChange: (v) => {
              setActionFilter(v);
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-48",
                  "data-ocid": "reports.action_filter.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by action" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ACTION_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Filter by user…",
            value: userFilter,
            onChange: (e) => {
              setUserFilter(e.target.value);
              setPage(1);
            },
            className: "w-44",
            "data-ocid": "reports.user_filter.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateFrom,
            onChange: (e) => setDateFrom(e.target.value),
            className: "w-40",
            "aria-label": "Date from",
            "data-ocid": "reports.date_from.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateTo,
            onChange: (e) => setDateTo(e.target.value),
            className: "w-40",
            "aria-label": "Date to",
            "data-ocid": "reports.date_to.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Timestamp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Resource" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Old Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "New Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 9,
            className: "text-center py-12 text-muted-foreground",
            "data-ocid": "reports.audit_log.empty_state",
            children: "No audit log entries found."
          }
        ) }) : paginated.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `reports.audit_log.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-xs text-muted-foreground whitespace-nowrap", children: formatDate(log.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                ACTION_ICONS[log.actionType] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: log.actionType })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm", children: log.displayUser }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  status: log.displayRole || "info",
                  size: "sm",
                  label: log.displayRole || "Staff"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-xs text-muted-foreground", children: log.affectedResourceType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-[160px] truncate text-sm", children: log.affectedResourceName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-xs text-muted-foreground max-w-[120px] truncate", children: log.oldValue ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-xs text-muted-foreground max-w-[120px] truncate", children: log.newValue ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  status: log.status === AuditStatus.Success ? "success" : "failure",
                  size: "sm"
                }
              ) })
            ]
          },
          String(log.id)
        )) })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 pt-4 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          (page - 1) * PAGE_SIZE + 1,
          "–",
          Math.min(page * PAGE_SIZE, displayLogs.length),
          " of",
          " ",
          displayLogs.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              disabled: page === 1,
              onClick: () => setPage((p) => p - 1),
              "data-ocid": "reports.pagination_prev",
              children: "Previous"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            page,
            " / ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              disabled: page === totalPages,
              onClick: () => setPage((p) => p + 1),
              "data-ocid": "reports.pagination_next",
              children: "Next"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
export {
  ReportsPage as default
};
