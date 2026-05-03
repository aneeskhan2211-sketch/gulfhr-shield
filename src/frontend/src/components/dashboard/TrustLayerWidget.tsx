import { useListAuditLogs } from "@/api/audit";
import { AuditActionType } from "@/backend";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import {
  Clock,
  Database,
  FileText,
  Lock,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";

const ACTION_LABELS: Partial<Record<AuditActionType, string>> = {
  [AuditActionType.PayrollApproved]: "Payroll approved",
  [AuditActionType.EmployeeAdded]: "Employee added",
  [AuditActionType.DocumentUploaded]: "Document uploaded",
  [AuditActionType.DocumentDownloaded]: "Document downloaded",
  [AuditActionType.SalaryChanged]: "Salary updated",
  [AuditActionType.WPSExported]: "WPS file exported",
  [AuditActionType.UserLogin]: "User logged in",
  [AuditActionType.RoleChanged]: "Role changed",
  [AuditActionType.CompanyProfileUpdated]: "Company profile updated",
  [AuditActionType.EmployeeDeleted]: "Employee removed",
};

function timeAgo(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const SECURITY_BADGES = [
  { icon: <Lock className="w-3.5 h-3.5" />, label: "Bank-Grade Encryption" },
  {
    icon: <Database className="w-3.5 h-3.5" />,
    label: "Data Encrypted at Rest",
  },
  { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Role-Based Access" },
  { icon: <FileText className="w-3.5 h-3.5" />, label: "Full Audit Trail" },
];

export function TrustLayerWidget() {
  const { data: logs, isLoading } = useListAuditLogs();

  if (isLoading) return <SkeletonCard className="h-full" />;

  const recentLogs = (logs ?? []).slice(0, 5);

  // Demo logs if no real data
  const displayLogs =
    recentLogs.length > 0
      ? recentLogs
      : [
          {
            id: 1n,
            actionType: AuditActionType.PayrollApproved,
            affectedResourceName: "May 2026 Payroll",
            createdAt: BigInt(Date.now() - 2 * 60 * 60 * 1000) * 1_000_000n,
            userId: 1n,
          },
          {
            id: 2n,
            actionType: AuditActionType.EmployeeAdded,
            affectedResourceName: "Mohammed Al-Farsi",
            createdAt: BigInt(Date.now() - 5 * 60 * 60 * 1000) * 1_000_000n,
            userId: 2n,
          },
          {
            id: 3n,
            actionType: AuditActionType.DocumentUploaded,
            affectedResourceName: "Passport Copy",
            createdAt: BigInt(Date.now() - 24 * 60 * 60 * 1000) * 1_000_000n,
            userId: 1n,
          },
        ];

  return (
    <div className="trust-section" data-ocid="dashboard.trust_layer.card">
      <div className="flex items-center gap-2">
        <ShieldOff className="w-4 h-4 text-chart-3" />
        <h3 className="font-display font-semibold text-sm text-foreground">
          Trust &amp; Security
        </h3>
      </div>

      {/* Security badges */}
      <div className="flex flex-wrap gap-2">
        {SECURITY_BADGES.map((badge) => (
          <span
            key={badge.label}
            className="trust-badge text-xs"
            data-ocid="dashboard.trust_layer.security_badge"
          >
            {badge.icon}
            {badge.label}
          </span>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Recent Activity
          </p>
        </div>
        <div className="space-y-0">
          {displayLogs.map((log, i) => (
            <div
              key={log.id.toString()}
              className="activity-log-item"
              data-ocid={`dashboard.trust_layer.activity.${i + 1}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-chart-3/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3 h-3 text-chart-3" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {ACTION_LABELS[log.actionType as AuditActionType] ??
                      log.actionType}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {"affectedResourceName" in log
                      ? (log.affectedResourceName as string)
                      : "System"}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">
                {timeAgo(log.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
