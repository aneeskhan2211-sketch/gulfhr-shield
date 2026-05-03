import { useListAuditLogs } from "@/api/audit";
import { formatDate } from "@/api/backend";
import AppShell from "@/components/layout/AppShell";
import ComplianceDrillDown from "@/components/reports/ComplianceDrillDown";
import ComplianceScore from "@/components/reports/ComplianceScore";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AuditLog } from "@/types";
import { AuditActionType, AuditStatus } from "@/types";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  FileCheck,
  FileLock2,
  FileText,
  Lock,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";

type DrillMetric = "document" | "payroll" | "visa";

const ACTION_ICONS: Record<string, React.ReactNode> = {
  SalaryChanged: <RefreshCw className="w-3.5 h-3.5 text-chart-5" />,
  DocumentDownloaded: <Download className="w-3.5 h-3.5 text-chart-1" />,
  DocumentUploaded: <Upload className="w-3.5 h-3.5 text-chart-3" />,
  DocumentDeleted: <Trash2 className="w-3.5 h-3.5 text-destructive" />,
  PayrollApproved: <CheckCircle2 className="w-3.5 h-3.5 text-chart-3" />,
  WPSExported: <FileLock2 className="w-3.5 h-3.5 text-accent" />,
  RoleChanged: <Lock className="w-3.5 h-3.5 text-chart-4" />,
  EmployeeAdded: <Eye className="w-3.5 h-3.5 text-chart-3" />,
  EmployeeDeleted: <Trash2 className="w-3.5 h-3.5 text-destructive" />,
  AlertThresholdChanged: <FileText className="w-3.5 h-3.5 text-chart-4" />,
  CompanyProfileUpdated: <FileCheck className="w-3.5 h-3.5 text-chart-2" />,
  UserLogin: <Eye className="w-3.5 h-3.5 text-chart-1" />,
};

type RichLog = AuditLog & { displayUser: string; displayRole: string };

const DEMO_AUDIT_LOGS: RichLog[] = [
  {
    id: 1n,
    userId: 1n,
    actionType: AuditActionType.SalaryChanged,
    affectedResourceType: "Employee",
    affectedResourceName: "Mohammed Al-Rashidi",
    oldValue: "AED 12,000",
    newValue: "AED 13,500",
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 3_600_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "1",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager",
  },
  {
    id: 2n,
    userId: 2n,
    actionType: AuditActionType.DocumentDownloaded,
    affectedResourceType: "Document",
    affectedResourceName: "Passport_Ali_Hassan.pdf",
    oldValue: undefined,
    newValue: undefined,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 7_200_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "2",
    displayUser: "Rajan Mehta",
    displayRole: "Accountant",
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
    createdAt: BigInt(Date.now() - 14_400_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "3",
    displayUser: "Ahmed Al-Farsi",
    displayRole: "Company Owner",
  },
  {
    id: 4n,
    userId: 3n,
    actionType: AuditActionType.WPSExported,
    affectedResourceType: "WpsExport",
    affectedResourceName: "UAE SIF - April 2026",
    oldValue: undefined,
    newValue: undefined,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 28_800_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "4",
    displayUser: "Rajan Mehta",
    displayRole: "Accountant",
  },
  {
    id: 5n,
    userId: 2n,
    actionType: AuditActionType.DocumentUploaded,
    affectedResourceType: "Document",
    affectedResourceName: "Visa_Priya_Nair.pdf",
    oldValue: undefined,
    newValue: undefined,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 86_400_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "5",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager",
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
    createdAt: BigInt(Date.now() - 172_800_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "6",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager",
  },
  {
    id: 7n,
    userId: 4n,
    actionType: AuditActionType.DocumentDeleted,
    affectedResourceType: "Document",
    affectedResourceName: "Old_Insurance_2024.pdf",
    oldValue: undefined,
    newValue: undefined,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 259_200_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "7",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager",
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
    createdAt: BigInt(Date.now() - 432_000_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "8",
    displayUser: "Ahmed Al-Farsi",
    displayRole: "Company Owner",
  },
  {
    id: 9n,
    userId: 2n,
    actionType: AuditActionType.EmployeeAdded,
    affectedResourceType: "PayrollRun",
    affectedResourceName: "May 2026 Payroll",
    oldValue: undefined,
    newValue: undefined,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 518_400_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "9",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager",
  },
  {
    id: 10n,
    userId: 3n,
    actionType: AuditActionType.DocumentUploaded,
    affectedResourceType: "VisaRecord",
    affectedResourceName: "Sung-Min Park",
    oldValue: undefined,
    newValue: undefined,
    status: AuditStatus.Success,
    createdAt: BigInt(Date.now() - 604_800_000) * 1_000_000n,
    companyId: 1n,
    affectedResourceId: "10",
    displayUser: "Sarah Johnson",
    displayRole: "HR Manager",
  },
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
  { value: AuditActionType.RoleChanged, label: "Role Changed" },
];

function exportCSV(logs: RichLog[]) {
  const headers = [
    "Timestamp",
    "Action",
    "User",
    "Role",
    "Resource Type",
    "Resource",
    "Old Value",
    "New Value",
    "Status",
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
    l.status,
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((v) => `"${v}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const { data: auditLogs } = useListAuditLogs();
  const [actionFilter, setActionFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [drillMetric, setDrillMetric] = useState<DrillMetric | null>(null);

  const displayLogs = useMemo(() => {
    const rawLogs = auditLogs?.length ? auditLogs : null;
    const richLogs: RichLog[] = rawLogs
      ? rawLogs.map((l) => ({
          ...l,
          displayUser: String(l.userId),
          displayRole: "",
        }))
      : DEMO_AUDIT_LOGS;
    return richLogs
      .filter((l) => {
        if (actionFilter !== "all" && l.actionType !== actionFilter)
          return false;
        if (
          userFilter &&
          !l.displayUser.toLowerCase().includes(userFilter.toLowerCase())
        )
          return false;
        if (dateFrom) {
          const fromTs = new Date(dateFrom).getTime();
          if (Number(l.createdAt / 1_000_000n) < fromTs) return false;
        }
        if (dateTo) {
          const toTs = new Date(dateTo).getTime() + 86_400_000;
          if (Number(l.createdAt / 1_000_000n) > toTs) return false;
        }
        return true;
      })
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  }, [auditLogs, actionFilter, userFilter, dateFrom, dateTo]);

  const totalPages = Math.ceil(displayLogs.length / PAGE_SIZE);
  const paginated = displayLogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <AppShell pageTitle="Compliance & Reports">
      <div className="space-y-6">
        <ComplianceScore
          overallScore={91}
          documentValidity={88}
          payrollTimeliness={96}
          visaCompletion={89}
          onDrillDown={setDrillMetric}
        />
        <ComplianceDrillDown
          metric={drillMetric}
          onClose={() => setDrillMetric(null)}
        />

        <CardContainer data-ocid="reports.audit_log.section">
          <CardHeader
            title="Audit Log"
            subtitle="Append-only record of all sensitive actions"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportCSV(displayLogs)}
                data-ocid="reports.export_csv.button"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Export CSV
              </Button>
            }
          />

          <div className="flex flex-wrap gap-3 mb-4">
            <Select
              value={actionFilter}
              onValueChange={(v) => {
                setActionFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger
                className="w-48"
                data-ocid="reports.action_filter.select"
              >
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                {ACTION_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Filter by user…"
              value={userFilter}
              onChange={(e) => {
                setUserFilter(e.target.value);
                setPage(1);
              }}
              className="w-44"
              data-ocid="reports.user_filter.input"
            />
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-40"
              aria-label="Date from"
              data-ocid="reports.date_from.input"
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-40"
              aria-label="Date to"
              data-ocid="reports.date_to.input"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Resource</th>
                  <th>Name</th>
                  <th>Old Value</th>
                  <th>New Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center py-12 text-muted-foreground"
                      data-ocid="reports.audit_log.empty_state"
                    >
                      No audit log entries found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((log, i) => (
                    <tr
                      key={String(log.id)}
                      data-ocid={`reports.audit_log.item.${i + 1}`}
                    >
                      <td className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(log.createdAt)}
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {ACTION_ICONS[log.actionType] ?? (
                            <AlertCircle className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                          <span className="text-xs font-medium">
                            {log.actionType}
                          </span>
                        </div>
                      </td>
                      <td className="text-sm">{log.displayUser}</td>
                      <td>
                        <StatusBadge
                          status={log.displayRole || "info"}
                          size="sm"
                          label={log.displayRole || "Staff"}
                        />
                      </td>
                      <td className="text-xs text-muted-foreground">
                        {log.affectedResourceType}
                      </td>
                      <td className="max-w-[160px] truncate text-sm">
                        {log.affectedResourceName}
                      </td>
                      <td className="text-xs text-muted-foreground max-w-[120px] truncate">
                        {log.oldValue ?? "—"}
                      </td>
                      <td className="text-xs text-muted-foreground max-w-[120px] truncate">
                        {log.newValue ?? "—"}
                      </td>
                      <td>
                        <StatusBadge
                          status={
                            log.status === AuditStatus.Success
                              ? "success"
                              : "failure"
                          }
                          size="sm"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Showing {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, displayLogs.length)} of{" "}
                {displayLogs.length}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  data-ocid="reports.pagination_prev"
                >
                  Previous
                </Button>
                <span className="text-xs text-muted-foreground">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  data-ocid="reports.pagination_next"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContainer>
      </div>
    </AppShell>
  );
}
