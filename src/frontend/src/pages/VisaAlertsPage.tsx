import { formatDate, getDaysUntilExpiry, getVisaStatus } from "@/api/backend";
import { useGetMyCompany, useUpdateAlertThresholds } from "@/api/company";
import { useListEmployees } from "@/api/employees";
import {
  useAddVisaRecord,
  useListAllVisaRecords,
  useRemoveVisaRecord,
  useUpdateVisaRecord,
} from "@/api/visa";
import type {
  Employee,
  VisaRecord,
  VisaRecordId,
  VisaRecordInput,
} from "@/backend";
import { VisaRecordType } from "@/backend";
import AppShell from "@/components/layout/AppShell";
import ActionMenu from "@/components/ui/ActionMenu";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Modal from "@/components/ui/Modal";
import SearchFilter from "@/components/ui/SearchFilter";
import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import VisaRecordForm, {
  formatDateInputValue,
} from "@/components/visa/VisaRecordForm";
import VisaStatusMatrix from "@/components/visa/VisaStatusMatrix";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  FileText,
  MailX,
  Plus,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

const RECORD_TYPE_LABELS: Record<VisaRecordType, string> = {
  [VisaRecordType.Passport]: "Passport",
  [VisaRecordType.Visa]: "Visa",
  [VisaRecordType.LabourCard]: "Labour Card",
  [VisaRecordType.Insurance]: "Insurance",
  [VisaRecordType.MedicalCard]: "Medical Card",
  [VisaRecordType.Contract]: "Contract",
};

const RECORD_TYPE_OPTIONS = Object.values(VisaRecordType).map((t) => ({
  label: RECORD_TYPE_LABELS[t],
  value: t,
}));

const STATUS_OPTIONS = [
  { label: "Expired", value: "expired" },
  { label: "Expiring Soon", value: "expiring" },
  { label: "Valid", value: "valid" },
];

type VisaStatusFilter = "expired" | "expiring" | "valid" | "";

export default function VisaAlertsPage() {
  const { data: records = [], isLoading } = useListAllVisaRecords();
  const { data: employees = [] } = useListEmployees();
  const { data: company } = useGetMyCompany();
  const addMutation = useAddVisaRecord();
  const updateMutation = useUpdateVisaRecord();
  const removeMutation = useRemoveVisaRecord();
  const updateThresholds = useUpdateAlertThresholds();

  // Derive threshold from company data (max of alertThresholdDays)
  const companyThresholds = company?.alertThresholdDays ?? [30n];
  const threshold = Math.max(...companyThresholds.map(Number));

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<VisaRecordType | "">("");
  const [filterStatus, setFilterStatus] = useState<VisaStatusFilter>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editRecord, setEditRecord] = useState<VisaRecord | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<VisaRecord | null>(null);
  const [showThreshold, setShowThreshold] = useState(false);

  // Employee lookup
  const employeeMap = new Map<string, Employee>();
  for (const emp of employees) {
    employeeMap.set(String(emp.id), emp);
  }

  // Enrich records with employee name + status
  const enriched = records
    .map((rec) => {
      const emp = employeeMap.get(String(rec.employeeId));
      const status = getVisaStatus(rec.expiryDate, [threshold]);
      const days = getDaysUntilExpiry(rec.expiryDate);
      return { rec, emp, status, days };
    })
    .sort((a, b) => a.days - b.days); // soonest/most expired first

  // Apply filters
  const filtered = enriched.filter(({ rec, emp, status }) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = emp?.fullName.toLowerCase() ?? "";
      if (!name.includes(q)) return false;
    }
    if (filterType && rec.recordType !== filterType) return false;
    if (filterStatus && status !== filterStatus) return false;
    return true;
  });

  // KPI counts
  const expiredCount = enriched.filter((r) => r.status === "expired").length;
  const expiringCount = enriched.filter((r) => r.status === "expiring").length;
  const validCount = enriched.filter((r) => r.status === "valid").length;

  async function handleAdd(input: VisaRecordInput) {
    try {
      await addMutation.mutateAsync(input);
      toast.success("Visa record added");
      setShowAddModal(false);
    } catch (e) {
      toast.error(String(e));
    }
  }

  async function handleEdit(input: VisaRecordInput) {
    if (!editRecord) return;
    try {
      await updateMutation.mutateAsync({ id: editRecord.id, input });
      toast.success("Visa record updated");
      setEditRecord(null);
    } catch (e) {
      toast.error(String(e));
    }
  }

  async function handleDelete(id: VisaRecordId) {
    try {
      await removeMutation.mutateAsync(id);
      toast.success("Visa record deleted");
      setDeleteRecord(null);
    } catch (e) {
      toast.error(String(e));
    }
  }

  async function handleSetThreshold(days: number) {
    try {
      await updateThresholds.mutateAsync([BigInt(days)]);
      toast.success(`Alert threshold set to ${days} days`);
      setShowThreshold(false);
    } catch (e) {
      toast.error(String(e));
    }
  }

  return (
    <AppShell
      pageTitle="Visa & Document Alerts"
      breadcrumbs={[{ label: "Visa Alerts" }]}
    >
      <div className="space-y-6">
        {/* ── Summary KPI Cards ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          data-ocid="visa-alerts.kpi.section"
        >
          <KpiCard
            label="Expired"
            value={expiredCount}
            icon={<AlertTriangle className="w-5 h-5" />}
            variant="expired"
            ocid="visa-alerts.kpi.expired.card"
          />
          <KpiCard
            label="Expiring Soon"
            value={expiringCount}
            icon={<Bell className="w-5 h-5" />}
            variant="expiring"
            ocid="visa-alerts.kpi.expiring.card"
          />
          <KpiCard
            label="Valid"
            value={validCount}
            icon={<CheckCircle2 className="w-5 h-5" />}
            variant="valid"
            ocid="visa-alerts.kpi.valid.card"
          />
          <KpiCard
            label="Total Records"
            value={records.length}
            icon={<FileText className="w-5 h-5" />}
            variant="neutral"
            ocid="visa-alerts.kpi.total.card"
          />
        </div>

        {/* ── Email Placeholder Notice ── */}
        <div
          className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30"
          data-ocid="visa-alerts.email-notice.panel"
        >
          <MailX className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              Email notifications
            </span>{" "}
            are not enabled on this platform. Alerts are shown in-dashboard
            only.
          </p>
        </div>

        {/* ── Records Table ── */}
        <CardContainer padding="none" data-ocid="visa-alerts.table.panel">
          <div className="p-4 md:p-5 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardHeader
                title="Visa & Document Records"
                subtitle={`${filtered.length} of ${records.length} records`}
                className="mb-0"
              />
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowThreshold(true)}
                  data-ocid="visa-alerts.threshold.open_modal_button"
                >
                  <Settings className="w-3.5 h-3.5 mr-1.5" />
                  Threshold ({threshold}d)
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setShowAddModal(true)}
                  data-ocid="visa-alerts.add.open_modal_button"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add Record
                </Button>
              </div>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="px-4 md:px-5 py-3 border-b border-border bg-muted/20">
            <SearchFilter
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search by employee name…"
              filters={[
                {
                  key: "type",
                  label: "Record Type",
                  options: RECORD_TYPE_OPTIONS,
                  value: filterType,
                  onChange: (v) => setFilterType(v as VisaRecordType | ""),
                },
                {
                  key: "status",
                  label: "Status",
                  options: STATUS_OPTIONS,
                  value: filterStatus,
                  onChange: (v) => setFilterStatus(v as VisaStatusFilter),
                },
              ]}
              data-ocid="visa-alerts.table.filter"
            />
          </div>

          {/* Table body */}
          {isLoading ? (
            <div className="py-16" data-ocid="visa-alerts.table.loading_state">
              <LoadingSpinner label="Loading records…" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<ShieldCheck className="w-6 h-6" />}
              title="No records found"
              description="Try adjusting your filters or add a new record."
              data-ocid="visa-alerts.table.empty_state"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-ocid="visa-alerts.table">
                <thead className="bg-muted/40 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">
                      Employee
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">
                      Record Type
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">
                      Expiry Date
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">
                      Days
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3" aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(({ rec, emp, status, days }, idx) => (
                    <tr
                      key={`${rec.employeeId}-${rec.recordType}-${rec.id}`}
                      data-ocid={`visa-alerts.table.item.${idx + 1}`}
                      className={cn(
                        "border-b border-border transition-colors hover:bg-muted/20",
                        status === "expired" && "bg-destructive/5",
                        status === "expiring" && "bg-chart-5/5",
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground truncate max-w-40">
                          {emp?.fullName ?? `Employee #${rec.employeeId}`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {emp?.employeeCode}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {RECORD_TYPE_LABELS[rec.recordType]}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {formatDate(rec.expiryDate)}
                      </td>
                      <td
                        className={cn(
                          "px-4 py-3 text-right font-mono font-medium",
                          days < 0
                            ? "text-destructive"
                            : days <= threshold
                              ? "text-chart-5"
                              : "text-chart-3",
                        )}
                      >
                        {days < 0 ? `${days}` : `+${days}`}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <StatusBadge status={status} />
                      </td>
                      <td className="px-4 py-3">
                        <ActionMenu
                          items={[
                            {
                              label: "Edit Record",
                              onClick: () => setEditRecord(rec),
                            },
                            {
                              label: "Delete",
                              destructive: true,
                              onClick: () => setDeleteRecord(rec),
                            },
                          ]}
                          data-ocid={`visa-alerts.table.item.${idx + 1}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContainer>

        {/* ── Per-employee Status Matrix ── */}
        <CardContainer padding="none" data-ocid="visa-alerts.matrix.panel">
          <div className="p-4 md:p-5 border-b border-border">
            <CardHeader
              title="Employee Document Status Matrix"
              subtitle="All document types per employee"
            />
          </div>
          <VisaStatusMatrix
            employees={employees}
            records={records}
            threshold={threshold}
          />
        </CardContainer>
      </div>

      {/* ── Add Record Modal ── */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Visa / Document Record"
        description="Track a passport, visa, or other document expiry date for an employee."
        size="md"
        data-ocid="visa-alerts.add"
      >
        <VisaRecordForm
          onSubmit={handleAdd}
          onCancel={() => setShowAddModal(false)}
          isSubmitting={addMutation.isPending}
          submitLabel="Add Record"
        />
      </Modal>

      {/* ── Edit Record Modal ── */}
      <Modal
        open={!!editRecord}
        onClose={() => setEditRecord(null)}
        title="Edit Record"
        description="Update the expiry date or details for this document record."
        size="md"
        data-ocid="visa-alerts.edit"
      >
        {editRecord && (
          <VisaRecordForm
            initialValues={{
              employeeId: editRecord.employeeId,
              recordType: editRecord.recordType,
              expiryDate: formatDateInputValue(editRecord.expiryDate),
              notes: editRecord.notes,
            }}
            lockedEmployeeId={editRecord.employeeId}
            onSubmit={handleEdit}
            onCancel={() => setEditRecord(null)}
            isSubmitting={updateMutation.isPending}
            submitLabel="Update Record"
          />
        )}
      </Modal>

      {/* ── Delete Confirmation Modal ── */}
      <Modal
        open={!!deleteRecord}
        onClose={() => setDeleteRecord(null)}
        title="Delete Record"
        description="Are you sure you want to delete this visa record? This action cannot be undone."
        size="sm"
        data-ocid="visa-alerts.delete"
      >
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setDeleteRecord(null)}
            data-ocid="visa-alerts.delete.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={removeMutation.isPending}
            onClick={() => deleteRecord && handleDelete(deleteRecord.id)}
            data-ocid="visa-alerts.delete.confirm_button"
          >
            {removeMutation.isPending ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </Modal>

      {/* ── Alert Threshold Modal ── */}
      <Modal
        open={showThreshold}
        onClose={() => setShowThreshold(false)}
        title="Alert Threshold Settings"
        description={`Currently alerting for documents expiring within ${threshold} days.`}
        size="sm"
        data-ocid="visa-alerts.threshold"
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Choose how many days in advance to flag documents as &quot;Expiring
            Soon&quot;.
          </p>
          <div className="flex gap-2">
            {[7, 30, 60].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => handleSetThreshold(days)}
                disabled={updateThresholds.isPending}
                data-ocid={`visa-alerts.threshold.${days}d.button`}
                className={cn(
                  "flex-1 py-2.5 rounded-md text-sm font-medium border transition-colors",
                  threshold === days
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-muted",
                )}
              >
                {days} days
              </button>
            ))}
          </div>
          <div className="flex justify-end pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowThreshold(false)}
              data-ocid="visa-alerts.threshold.close_button"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}

// ── KPI Card helper ──────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  variant: "expired" | "expiring" | "valid" | "neutral";
  ocid: string;
}

function KpiCard({ label, value, icon, variant, ocid }: KpiCardProps) {
  const colorMap = {
    expired: "border-destructive/30 bg-destructive/8 text-destructive",
    expiring: "border-chart-5/30 bg-chart-5/8 text-chart-5",
    valid: "border-chart-3/30 bg-chart-3/8 text-chart-3",
    neutral: "border-border bg-card text-foreground",
  } as const;

  const iconColorMap = {
    expired: "text-destructive",
    expiring: "text-chart-5",
    valid: "text-chart-3",
    neutral: "text-muted-foreground",
  } as const;

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-smooth",
        colorMap[variant],
      )}
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium uppercase tracking-wide opacity-70">
          {label}
        </span>
        <span className={cn("opacity-80", iconColorMap[variant])}>{icon}</span>
      </div>
      <p className="text-3xl font-display font-bold">{value}</p>
    </div>
  );
}
