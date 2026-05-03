import { formatCurrency, formatDate } from "@/api/backend";
import { useListPayrollRuns } from "@/api/payroll";
import AppShell from "@/components/layout/AppShell";
import PayrollRunForm from "@/components/payroll/PayrollRunForm";
import ActionMenu from "@/components/ui/ActionMenu";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StatusBadge from "@/components/ui/StatusBadge";
import { type PayrollRun, PayrollStatus } from "@/types";
import {
  ArrowRight,
  CheckSquare,
  Download,
  Eye,
  Plus,
  Receipt,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const WORKFLOW_STAGES = [
  { status: PayrollStatus.Draft, label: "Draft" },
  { status: PayrollStatus.HRApproved, label: "HR Approved" },
  { status: PayrollStatus.AccountantReviewed, label: "Accountant Reviewed" },
  { status: PayrollStatus.OwnerApproved, label: "Owner Approved" },
  { status: PayrollStatus.Exported, label: "Exported" },
  { status: PayrollStatus.Paid, label: "Paid" },
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
  "December",
];

function payPeriodLabel(run: PayrollRun): string {
  const m = Number(run.payPeriodMonth);
  const y = Number(run.payPeriodYear);
  return `${MONTH_NAMES[m] ?? m} ${y}`;
}

function statusSlug(status: string): string {
  return status.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function statusLabel(status: string): string {
  return status.replace(/([A-Z])/g, " $1").trim();
}

export default function PayrollPage() {
  const navigate = useNavigate();
  const { data: runs = [], isLoading } = useListPayrollRuns();
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterMonth, setFilterMonth] = useState<string>("all");

  const months = useMemo(() => {
    const seen = new Set<string>();
    return runs.reduce<{ label: string; value: string }[]>((acc, r) => {
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
    if (
      filterMonth !== "all" &&
      `${r.payPeriodMonth}-${r.payPeriodYear}` !== filterMonth
    )
      return false;
    return true;
  });

  return (
    <AppShell pageTitle="Payroll" breadcrumbs={[{ label: "Payroll" }]}>
      <div className="space-y-5">
        {/* Workflow explanation */}
        <CardContainer data-ocid="payroll.workflow_card">
          <CardHeader
            title="Payroll Approval Workflow"
            subtitle="Each run must progress through all stages before payment."
          />
          <div className="flex items-center gap-1 flex-wrap">
            {WORKFLOW_STAGES.map((stage, i) => (
              <div key={stage.status} className="flex items-center gap-1">
                <StatusBadge
                  status={statusSlug(stage.status)}
                  label={stage.label}
                  size="sm"
                />
                {i < WORKFLOW_STAGES.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContainer>

        {/* Header controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input text-sm"
              data-ocid="payroll.status.select"
            >
              <option value="all">All Statuses</option>
              {WORKFLOW_STAGES.map((s) => (
                <option key={s.status} value={s.status}>
                  {s.label}
                </option>
              ))}
            </select>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="form-input text-sm"
              data-ocid="payroll.month.select"
            >
              <option value="all">All Periods</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2 shrink-0"
            data-ocid="payroll.create_button"
          >
            <Plus className="w-4 h-4" /> New Payroll Run
          </button>
        </div>

        {/* Table */}
        <CardContainer padding="none" data-ocid="payroll.list_card">
          {isLoading ? (
            <div className="py-16 flex items-center justify-center">
              <LoadingSpinner label="Loading payroll runs\u2026" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Receipt className="w-6 h-6" />}
              title={
                runs.length === 0
                  ? "No payroll runs yet"
                  : "No runs match filters"
              }
              description={
                runs.length === 0
                  ? "Create your first payroll run to get started."
                  : "Try clearing the filters."
              }
              action={
                runs.length === 0 ? (
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="btn-primary"
                    data-ocid="payroll.empty_create_button"
                  >
                    Create Payroll Run
                  </button>
                ) : undefined
              }
              data-ocid="payroll.empty_state"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Pay Period</th>
                    <th>Status</th>
                    <th className="text-right">Employees</th>
                    <th className="text-right">Total Net</th>
                    <th>Created</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((run, idx) => (
                    <tr
                      key={String(run.id)}
                      className="cursor-pointer"
                      onClick={() => navigate(`/payroll/${run.id}`)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && navigate(`/payroll/${run.id}`)
                      }
                      tabIndex={0}
                      data-ocid={`payroll.item.${idx + 1}`}
                    >
                      <td>
                        <span className="font-medium text-foreground">
                          {payPeriodLabel(run)}
                        </span>
                      </td>
                      <td>
                        <StatusBadge
                          status={statusSlug(run.status)}
                          label={statusLabel(run.status)}
                        />
                      </td>
                      <td className="text-right tabular-nums">
                        {run.employeeIds.length}
                      </td>
                      <td className="text-right">
                        <span className="font-semibold tabular-nums">
                          {formatCurrency(run.totalNetSalary)}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(run.createdAt)}
                        </span>
                      </td>
                      <td
                        className="text-center"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <ActionMenu
                          items={[
                            {
                              label: "View Details",
                              icon: <Eye className="w-3.5 h-3.5" />,
                              onClick: () => navigate(`/payroll/${run.id}`),
                            },
                            {
                              label: "Approve Run",
                              icon: <CheckSquare className="w-3.5 h-3.5" />,
                              onClick: () => navigate(`/payroll/${run.id}`),
                              disabled: run.status === PayrollStatus.Paid,
                            },
                            {
                              label: "Download CSV",
                              icon: <Download className="w-3.5 h-3.5" />,
                              onClick: () => navigate(`/payroll/${run.id}`),
                            },
                            {
                              label: "Delete",
                              icon: <Trash2 className="w-3.5 h-3.5" />,
                              destructive: true,
                              disabled: run.status !== PayrollStatus.Draft,
                              onClick: () => {},
                            },
                          ]}
                          data-ocid={`payroll.action_menu.${idx + 1}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContainer>
      </div>

      <PayrollRunForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={(id) => navigate(`/payroll/${id}`)}
      />
    </AppShell>
  );
}
