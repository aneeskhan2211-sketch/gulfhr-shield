import { useListEmployees } from "@/api/employees";
import {
  useCreateNotificationLog,
  useListNotificationLogs,
} from "@/api/notifications";
import { useUpdateWhatsAppSettings } from "@/api/notifications";
import {
  Variant_Failed_Sent_Pending,
  Variant_Salary_VisaAlert_PayrollApproval,
} from "@/backend";
import type { WhatsAppSettings } from "@/backend";
import { SkeletonTable } from "@/components/ui/SkeletonLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  Info,
  MessageCircle,
  Search,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Company-level toggles (local state only, visual) ─────────────────────────
function CompanyToggles() {
  const [cfg, setCfg] = useState({
    salary: true,
    visa: true,
    payroll: false,
  });

  const rows = [
    {
      key: "salary" as const,
      label: "Salary Confirmations",
      desc: "Notify employees when salary is processed",
    },
    {
      key: "visa" as const,
      label: "Visa Expiry Alerts",
      desc: "Warn employees 30 days before visa expiry",
    },
    {
      key: "payroll" as const,
      label: "Payroll Approval Notifications",
      desc: "Alert owners when payroll awaits approval",
    },
  ];

  return (
    <div className="space-y-3" data-ocid="whatsapp.company_toggles.section">
      {rows.map((r) => (
        <div
          key={r.key}
          className="flex items-center justify-between p-4 rounded-xl border border-border bg-background"
        >
          <div>
            <p className="text-sm font-medium text-foreground">{r.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
          </div>
          <Switch
            checked={cfg[r.key]}
            onCheckedChange={(v) => setCfg((c) => ({ ...c, [r.key]: v }))}
            aria-label={r.label}
            data-ocid={`whatsapp.company.${r.key}.switch`}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Per-employee row ─────────────────────────────────────────────────────────
interface EmployeeRowProps {
  emp: { id: bigint; fullName: string; jobTitle: string };
  idx: number;
}

function EmployeeRow({ emp, idx }: EmployeeRowProps) {
  const [phone, setPhone] = useState("");
  const [settings, setSettings] = useState<
    Omit<WhatsAppSettings, "employeeId">
  >({
    salaryEnabled: false,
    visaAlertEnabled: false,
    payrollApprovalEnabled: false,
    phoneNumber: "",
  });
  const update = useUpdateWhatsAppSettings();

  function toggle(
    field: keyof Omit<WhatsAppSettings, "employeeId" | "phoneNumber">,
  ) {
    const next = { ...settings, [field]: !settings[field] };
    setSettings(next);
    update.mutate({
      employeeId: emp.id,
      phoneNumber: phone,
      salaryEnabled: next.salaryEnabled,
      visaAlertEnabled: next.visaAlertEnabled,
      payrollApprovalEnabled: next.payrollApprovalEnabled,
    });
  }

  function savePhone() {
    update.mutate({
      employeeId: emp.id,
      phoneNumber: phone,
      salaryEnabled: settings.salaryEnabled,
      visaAlertEnabled: settings.visaAlertEnabled,
      payrollApprovalEnabled: settings.payrollApprovalEnabled,
    });
    toast.success(`Phone number saved for ${emp.fullName}`);
  }

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 border-b border-border last:border-0"
      data-ocid={`whatsapp.employee.item.${idx}`}
    >
      {/* Employee info */}
      <div className="min-w-0 sm:w-52 shrink-0">
        <p className="text-sm font-medium text-foreground truncate">
          {emp.fullName}
        </p>
        <p className="text-xs text-muted-foreground truncate">{emp.jobTitle}</p>
      </div>
      {/* Phone */}
      <div className="flex items-center gap-2 sm:w-48 shrink-0">
        <Input
          placeholder="+971 50 000 0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-8 text-xs"
          data-ocid={`whatsapp.employee.phone.${idx}`}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 px-2 text-xs shrink-0"
          onClick={savePhone}
          data-ocid={`whatsapp.employee.save_button.${idx}`}
        >
          Save
        </Button>
      </div>
      {/* Toggles */}
      <div className="flex items-center gap-4 flex-wrap">
        <label
          htmlFor={`salary-switch-${idx}`}
          className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer"
        >
          <Switch
            id={`salary-switch-${idx}`}
            checked={settings.salaryEnabled}
            onCheckedChange={() => toggle("salaryEnabled")}
            data-ocid={`whatsapp.employee.salary.${idx}`}
          />
          Salary
        </label>
        <label
          htmlFor={`visa-switch-${idx}`}
          className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer"
        >
          <Switch
            id={`visa-switch-${idx}`}
            checked={settings.visaAlertEnabled}
            onCheckedChange={() => toggle("visaAlertEnabled")}
            data-ocid={`whatsapp.employee.visa.${idx}`}
          />
          Visa
        </label>
        <label
          htmlFor={`payroll-switch-${idx}`}
          className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer"
        >
          <Switch
            id={`payroll-switch-${idx}`}
            checked={settings.payrollApprovalEnabled}
            onCheckedChange={() => toggle("payrollApprovalEnabled")}
            data-ocid={`whatsapp.employee.payroll.${idx}`}
          />
          Payroll
        </label>
      </div>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Variant_Failed_Sent_Pending }) {
  const map: Record<
    Variant_Failed_Sent_Pending,
    { label: string; icon: React.ReactNode; cls: string }
  > = {
    [Variant_Failed_Sent_Pending.Sent]: {
      label: "Sent",
      icon: <CheckCircle2 className="w-3 h-3" />,
      cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    [Variant_Failed_Sent_Pending.Pending]: {
      label: "Pending",
      icon: <Clock className="w-3 h-3" />,
      cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    [Variant_Failed_Sent_Pending.Failed]: {
      label: "Failed",
      icon: <XCircle className="w-3 h-3" />,
      cls: "bg-destructive/10 text-destructive border-destructive/20",
    },
  };
  const { label, icon, cls } = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium",
        cls,
      )}
    >
      {icon}
      {label}
    </span>
  );
}

function typeLabel(t: Variant_Salary_VisaAlert_PayrollApproval): string {
  return {
    [Variant_Salary_VisaAlert_PayrollApproval.Salary]: "Salary",
    [Variant_Salary_VisaAlert_PayrollApproval.VisaAlert]: "Visa Alert",
    [Variant_Salary_VisaAlert_PayrollApproval.PayrollApproval]:
      "Payroll Approval",
  }[t];
}

function formatTs(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleString();
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function WhatsAppNotificationSettings() {
  const [search, setSearch] = useState("");
  const { data: employees, isLoading: loadingEmp } = useListEmployees();
  const { data: logs, isLoading: loadingLogs } = useListNotificationLogs(50);
  const createLog = useCreateNotificationLog();

  const filtered = useMemo(() => {
    if (!employees) return [];
    const q = search.toLowerCase();
    return employees.filter(
      (e) =>
        e.fullName.toLowerCase().includes(q) ||
        e.jobTitle.toLowerCase().includes(q),
    );
  }, [employees, search]);

  function sendTestNotification() {
    createLog.mutate(
      {
        notificationType: Variant_Salary_VisaAlert_PayrollApproval.Salary,
        message:
          "[Test] GulfHR Shield: Salary has been processed for this month.",
      },
      {
        onSuccess: () => toast.success("Test notification queued (Pending)"),
        onError: () => toast.error("Failed to queue test notification"),
      },
    );
  }

  return (
    <div className="space-y-7" data-ocid="whatsapp.settings.section">
      {/* Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">
            WhatsApp Notification System
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Notifications are logged in-system. WhatsApp delivery requires a
            valid phone number — manage employee contacts in their profile or
            below. Delivery is queued and shown as Pending until dispatched.
          </p>
        </div>
      </div>

      {/* Company-level toggles */}
      <section data-ocid="whatsapp.company.section">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Company Notification Settings
        </h4>
        <CompanyToggles />
      </section>

      {/* Per-employee section */}
      <section data-ocid="whatsapp.employees.section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <h4 className="text-sm font-semibold text-foreground">
            Per-Employee Settings
          </h4>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search employees…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
              data-ocid="whatsapp.employees.search_input"
            />
          </div>
        </div>

        {loadingEmp ? (
          <SkeletonTable rows={5} cols={4} />
        ) : filtered.length === 0 ? (
          <div
            className="text-sm text-muted-foreground py-8 text-center"
            data-ocid="whatsapp.employees.empty_state"
          >
            No employees found.
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-2 bg-muted/30 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground sm:w-52">
                Employee
              </p>
              <p className="text-xs font-semibold text-muted-foreground hidden sm:block sm:w-48">
                Phone Number
              </p>
              <p className="text-xs font-semibold text-muted-foreground">
                Notification Types
              </p>
            </div>
            {filtered.slice(0, 20).map((emp, i) => (
              <EmployeeRow key={String(emp.id)} emp={emp} idx={i + 1} />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mt-3">
          <Info className="w-4 h-4 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            WhatsApp delivery requires phone number — manage contacts in
            employee profiles.
          </p>
        </div>
      </section>

      {/* Notification Log */}
      <section data-ocid="whatsapp.log.section">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">
            Recent Notification Log
          </h4>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={sendTestNotification}
            disabled={createLog.isPending}
            data-ocid="whatsapp.test.button"
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            Send Test Notification
          </Button>
        </div>

        {loadingLogs ? (
          <SkeletonTable rows={4} cols={5} />
        ) : !logs?.length ? (
          <div
            className="text-sm text-muted-foreground py-8 text-center"
            data-ocid="whatsapp.log.empty_state"
          >
            No notifications sent yet.
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-auto">
            <table
              className="min-w-full text-sm"
              data-ocid="whatsapp.log.table"
            >
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    Timestamp
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Employee
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Type
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Message Preview
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.slice(0, 20).map((log, i) => {
                  const emp = employees?.find(
                    (e) => log.employeeId && e.id === log.employeeId,
                  );
                  return (
                    <tr
                      key={String(log.id)}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid={`whatsapp.log.item.${i + 1}`}
                    >
                      <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                        {formatTs(log.createdAt)}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-foreground">
                        {emp?.fullName ?? (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <Badge variant="outline" className="text-xs">
                          {typeLabel(log.notificationType)}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground max-w-xs truncate">
                        {log.message}
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={log.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
