import { c as createLucideIcon, j as jsxRuntimeExports, n as Link, b as ChevronRight, a as cn, o as useParams, k as useNavigate, r as reactExports, L as LoadingSpinner, A as ArrowLeft, m as formatDate, l as formatCurrency, p as getVisaStatus } from "./index-DqipwkTD.js";
import { u as ue } from "./index-C86RAjSP.js";
import { P as Pencil, a as EmployeeForm } from "./EmployeeForm-_ppeL-_j.js";
import { A as AppShell } from "./AppShell-CUGPoZlf.js";
import { C as ConfirmationDialog } from "./ConfirmationDialog-Dmt7flo8.js";
import { D as DataTable } from "./DataTable-BunDOGnY.js";
import { E as EmptyState } from "./EmptyState-ZgiE4Oiw.js";
import { M as Modal } from "./Modal-Bl4Y2ID-.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { T as TabsNav } from "./TabsNav-DVgEuIM0.js";
import { u as useListAttendanceLogs } from "./attendance-BHJK1AGJ.js";
import { u as useListDocuments, a as useDeleteDocument } from "./documents-U4kNqjfr.js";
import { d as useGetEmployee, b as useUpdateEmployee } from "./employees-CUvviRBY.js";
import { u as useListPayrollRuns } from "./payroll-BT2KpQag.js";
import { u as useListVisaRecords } from "./visa-DRv2T8_7.js";
import "./select-2niFz9CV.js";
import "./Combination-DaLoBBr6.js";
import "./index-DzTulS2Y.js";
import "./chevron-up-0G4ukNk8.js";
import "./label-D1bf6s9f.js";
import "./index-BzDdetvs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode);
function BreadcrumbNav({
  items,
  className,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: cn("flex items-center gap-1.5 text-sm", className),
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/dashboard",
            className: "text-muted-foreground hover:text-foreground transition-colors",
            "aria-label": "Home",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3.5 h-3.5" })
          }
        ),
        items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground" }),
          item.path && i < items.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: item.path,
              className: "text-muted-foreground hover:text-foreground transition-colors",
              children: item.label
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: item.label })
        ] }, item.label))
      ]
    }
  );
}
const TABS = [
  { key: "documents", label: "Documents" },
  { key: "visa", label: "Visa Status" },
  { key: "attendance", label: "Attendance" },
  { key: "payroll", label: "Payroll History" }
];
function ProfileField({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate", children: value || "—" })
  ] });
}
function DocumentsTab({ employeeId }) {
  const { data: docs = [], isLoading } = useListDocuments(employeeId);
  const deleteDoc = useDeleteDocument();
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const columns = [
    {
      key: "fileName",
      label: "File Name",
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: String(v) })
    },
    {
      key: "documentType",
      label: "Type",
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(v), size: "sm" })
    },
    {
      key: "fileSize",
      label: "Size",
      render: (v) => `${(Number(v) / 1024).toFixed(1)} KB`
    },
    {
      key: "createdAt",
      label: "Uploaded",
      render: (v) => formatDate(v)
    },
    {
      key: "expiryDate",
      label: "Expiry",
      render: (v) => {
        if (!v || v.length === 0) return "—";
        const ts = Array.isArray(v) ? v[0] : v;
        return formatDate(ts);
      }
    },
    {
      key: "id",
      label: "",
      width: "160px",
      render: (_v, row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => window.open(row.blob.getDirectURL(), "_blank"),
            "data-ocid": "employee_detail.document.download_button",
            className: "text-xs px-2 py-1 rounded border border-border hover:bg-muted transition-colors",
            children: "Download"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setDeleteTarget(row.id),
            "data-ocid": "employee_detail.document.delete_button",
            className: "text-xs px-2 py-1 rounded border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors",
            children: "Delete"
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns,
        data: docs,
        loading: isLoading,
        emptyMessage: "No documents uploaded for this employee",
        getRowId: (row) => String(row.id),
        "data-ocid": "employee_detail.documents.table"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmationDialog,
      {
        open: deleteTarget !== null,
        onClose: () => setDeleteTarget(null),
        onConfirm: async () => {
          if (!deleteTarget) return;
          try {
            await deleteDoc.mutateAsync(deleteTarget);
            ue.success("Document deleted");
            setDeleteTarget(null);
          } catch {
            ue.error("Failed to delete document");
          }
        },
        title: "Delete document?",
        description: "This action cannot be undone.",
        confirmLabel: "Delete",
        destructive: true,
        loading: deleteDoc.isPending,
        "data-ocid": "employee_detail.doc_delete_dialog"
      }
    )
  ] });
}
function VisaTab({ employeeId }) {
  const { data: records = [], isLoading } = useListVisaRecords(employeeId);
  const visaStatusLabels = {
    valid: "Valid",
    expiring: "Expiring Soon",
    expired: "Expired"
  };
  const columns = [
    {
      key: "recordType",
      label: "Record Type",
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: String(v) })
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      render: (v) => formatDate(v)
    },
    {
      key: "expiryDate",
      label: "Status",
      render: (v) => {
        const status = getVisaStatus(v);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status, label: visaStatusLabels[status] });
      }
    },
    {
      key: "notes",
      label: "Notes",
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: String(v) || "—" })
    },
    {
      key: "createdAt",
      label: "Added",
      render: (v) => formatDate(v)
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DataTable,
    {
      columns,
      data: records,
      loading: isLoading,
      emptyMessage: "No visa records for this employee",
      getRowId: (row) => String(row.id),
      "data-ocid": "employee_detail.visa.table"
    }
  );
}
function AttendanceTab({ employeeId }) {
  const { data: logs = [], isLoading } = useListAttendanceLogs(employeeId);
  const cutoff = BigInt(Date.now() - 30 * 24 * 60 * 60 * 1e3) * 1000000n;
  const recent = logs.filter((l) => l.checkInTime >= cutoff).sort((a, b) => a.checkInTime > b.checkInTime ? -1 : 1);
  const columns = [
    {
      key: "checkInTime",
      label: "Date",
      render: (v) => formatDate(v)
    },
    {
      key: "checkInTime",
      label: "Check-in",
      render: (v) => {
        const d = new Date(Number(v / 1000000n));
        return d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    },
    {
      key: "checkOutTime",
      label: "Check-out",
      render: (v) => {
        if (!v || v.length === 0)
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Active" });
        const ts = Array.isArray(v) ? v[0] : v;
        const d = new Date(Number(ts / 1000000n));
        return d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    },
    {
      key: "workHours",
      label: "Work Hours",
      align: "right",
      render: (v) => {
        if (v === null || v === void 0) return "—";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
          v.toFixed(2),
          "h"
        ] });
      }
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DataTable,
    {
      columns,
      data: recent,
      loading: isLoading,
      emptyMessage: "No attendance records in the last 30 days",
      getRowId: (row) => String(row.id),
      "data-ocid": "employee_detail.attendance.table"
    }
  );
}
const MONTH_NAMES = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function PayrollHistoryTab({ employeeId }) {
  const { data: runs = [], isLoading } = useListPayrollRuns();
  const empRuns = runs.filter(
    (r) => r.employeeIds.some((id) => id === employeeId)
  );
  const columns = [
    {
      key: "payPeriodMonth",
      label: "Pay Period",
      render: (_v, row) => `${MONTH_NAMES[Number(row.payPeriodMonth)]} ${row.payPeriodYear}`
    },
    {
      key: "totalNetSalary",
      label: "Total Net Salary",
      align: "right",
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatCurrency(v) })
    },
    {
      key: "status",
      label: "Status",
      render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(v) })
    },
    {
      key: "createdAt",
      label: "Created",
      render: (v) => formatDate(v)
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DataTable,
    {
      columns,
      data: empRuns,
      loading: isLoading,
      emptyMessage: "No payroll runs found for this employee",
      getRowId: (row) => String(row.id),
      "data-ocid": "employee_detail.payroll.table"
    }
  );
}
function EmployeeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const employeeId = id ? BigInt(id) : void 0;
  const { data: employee, isLoading } = useGetEmployee(employeeId);
  const updateEmployee = useUpdateEmployee();
  const [activeTab, setActiveTab] = reactExports.useState("documents");
  const [showEditModal, setShowEditModal] = reactExports.useState(false);
  async function handleEdit(input) {
    if (!employee) return;
    try {
      await updateEmployee.mutateAsync({ id: employee.id, input });
      ue.success("Employee updated");
      setShowEditModal(false);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update employee"
      );
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading employee…" }) }) });
  }
  if (!employee) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-6 h-6" }),
        title: "Employee not found",
        description: "The employee you are looking for does not exist or was removed.",
        "data-ocid": "employee_detail.empty_state",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate("/employees"),
            className: "btn-primary",
            "data-ocid": "employee_detail.back.button",
            children: "Back to Employees"
          }
        )
      }
    ) });
  }
  const e = employee;
  const contractEnd = e.contractEndDate;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BreadcrumbNav,
          {
            items: [
              { label: "Employees", path: "/employees" },
              { label: e.fullName }
            ],
            "data-ocid": "employee_detail.breadcrumb"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate("/employees"),
              "data-ocid": "employee_detail.back.button",
              className: "btn-secondary flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowEditModal(true),
              "data-ocid": "employee_detail.edit.button",
              className: "btn-primary flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }),
                "Edit Employee"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-b border-border flex flex-col sm:flex-row sm:items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-primary", children: e.fullName.slice(0, 2).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground truncate", children: e.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-mono", children: e.employeeCode }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: e.jobTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: e.status, size: "sm" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5 px-6 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileField, { label: "Nationality", value: e.nationality }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileField, { label: "Department", value: e.department }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileField, { label: "Work Location", value: e.workLocation }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileField,
            {
              label: "Joining Date",
              value: formatDate(e.joiningDate)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileField,
            {
              label: "Basic Salary",
              value: formatCurrency(e.basicSalary)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileField, { label: "Passport Number", value: e.passportNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileField, { label: "Visa Number", value: e.visaNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileField, { label: "Emirates / National ID", value: e.emiratesId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileField, { label: "Bank Name", value: e.bankName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileField, { label: "IBAN", value: e.iban }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileField,
            {
              label: "Contract Start",
              value: formatDate(e.contractStartDate)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileField,
            {
              label: "Contract End",
              value: contractEnd && contractEnd.length > 0 ? formatDate(contractEnd[0]) : "Open-ended"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsNav,
          {
            tabs: TABS,
            activeTab,
            onTabChange: setActiveTab,
            "data-ocid": "employee_detail.tabs"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-0", children: [
          activeTab === "documents" && /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentsTab, { employeeId: e.id }),
          activeTab === "visa" && /* @__PURE__ */ jsxRuntimeExports.jsx(VisaTab, { employeeId: e.id }),
          activeTab === "attendance" && /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceTab, { employeeId: e.id }),
          activeTab === "payroll" && /* @__PURE__ */ jsxRuntimeExports.jsx(PayrollHistoryTab, { employeeId: e.id })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showEditModal,
        onClose: () => setShowEditModal(false),
        title: "Edit Employee",
        description: `Editing ${e.fullName}`,
        size: "xl",
        "data-ocid": "employee_detail.edit_modal",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[70vh] overflow-y-auto pr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmployeeForm,
          {
            employee: e,
            onSubmit: handleEdit,
            onCancel: () => setShowEditModal(false),
            loading: updateEmployee.isPending
          }
        ) })
      }
    )
  ] });
}
export {
  EmployeeDetailPage as default
};
