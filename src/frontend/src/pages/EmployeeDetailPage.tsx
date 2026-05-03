import { ArrowLeft, Briefcase, Pencil } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import EmployeeForm from "@/components/employees/EmployeeForm";
import AppShell from "@/components/layout/AppShell";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import TabsNav from "@/components/ui/TabsNav";

import { useListAttendanceLogs } from "@/api/attendance";
import { formatCurrency, formatDate, getVisaStatus } from "@/api/backend";
import { useDeleteDocument, useListDocuments } from "@/api/documents";
import { useGetEmployee, useUpdateEmployee } from "@/api/employees";
import { useListPayrollRuns } from "@/api/payroll";
import { useListVisaRecords } from "@/api/visa";
import type {
  AttendanceLog,
  Employee,
  EmployeeDocument,
  EmployeeInput,
  PayrollRun,
  VisaRecord,
} from "@/backend";
import type { TableColumn } from "@/types";

const TABS = [
  { key: "documents", label: "Documents" },
  { key: "visa", label: "Visa Status" },
  { key: "attendance", label: "Attendance" },
  { key: "payroll", label: "Payroll History" },
];

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm text-foreground font-medium truncate">
        {value || "—"}
      </p>
    </div>
  );
}

function DocumentsTab({ employeeId }: { employeeId: bigint }) {
  const { data: docs = [], isLoading } = useListDocuments(employeeId);
  const deleteDoc = useDeleteDocument();
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);

  const columns: TableColumn<EmployeeDocument>[] = [
    {
      key: "fileName",
      label: "File Name",
      render: (v) => <span className="font-medium">{String(v)}</span>,
    },
    {
      key: "documentType",
      label: "Type",
      render: (v) => <StatusBadge status={String(v)} size="sm" />,
    },
    {
      key: "fileSize",
      label: "Size",
      render: (v) => `${(Number(v as bigint) / 1024).toFixed(1)} KB`,
    },
    {
      key: "createdAt",
      label: "Uploaded",
      render: (v) => formatDate(v as bigint),
    },
    {
      key: "expiryDate",
      label: "Expiry",
      render: (v) => {
        if (!v || (v as bigint[]).length === 0) return "—";
        const ts = Array.isArray(v) ? v[0] : (v as bigint);
        return formatDate(ts);
      },
    },
    {
      key: "id",
      label: "",
      width: "160px",
      render: (_v, row) => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => window.open(row.blob.getDirectURL(), "_blank")}
            data-ocid="employee_detail.document.download_button"
            className="text-xs px-2 py-1 rounded border border-border hover:bg-muted transition-colors"
          >
            Download
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget(row.id)}
            data-ocid="employee_detail.document.delete_button"
            className="text-xs px-2 py-1 rounded border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={docs}
        loading={isLoading}
        emptyMessage="No documents uploaded for this employee"
        getRowId={(row) => String(row.id)}
        data-ocid="employee_detail.documents.table"
      />
      <ConfirmationDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          try {
            await deleteDoc.mutateAsync(deleteTarget);
            toast.success("Document deleted");
            setDeleteTarget(null);
          } catch {
            toast.error("Failed to delete document");
          }
        }}
        title="Delete document?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        destructive
        loading={deleteDoc.isPending}
        data-ocid="employee_detail.doc_delete_dialog"
      />
    </>
  );
}

function VisaTab({ employeeId }: { employeeId: bigint }) {
  const { data: records = [], isLoading } = useListVisaRecords(employeeId);

  const visaStatusLabels: Record<string, string> = {
    valid: "Valid",
    expiring: "Expiring Soon",
    expired: "Expired",
  };

  const columns: TableColumn<VisaRecord>[] = [
    {
      key: "recordType",
      label: "Record Type",
      render: (v) => <span className="font-medium">{String(v)}</span>,
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      render: (v) => formatDate(v as bigint),
    },
    {
      key: "expiryDate",
      label: "Status",
      render: (v) => {
        const status = getVisaStatus(v as bigint);
        return <StatusBadge status={status} label={visaStatusLabels[status]} />;
      },
    },
    {
      key: "notes",
      label: "Notes",
      render: (v) => (
        <span className="text-muted-foreground text-sm">
          {String(v) || "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Added",
      render: (v) => formatDate(v as bigint),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={records}
      loading={isLoading}
      emptyMessage="No visa records for this employee"
      getRowId={(row) => String(row.id)}
      data-ocid="employee_detail.visa.table"
    />
  );
}

function AttendanceTab({ employeeId }: { employeeId: bigint }) {
  const { data: logs = [], isLoading } = useListAttendanceLogs(employeeId);

  const cutoff = BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000) * 1_000_000n;
  const recent = logs
    .filter((l) => l.checkInTime >= cutoff)
    .sort((a, b) => (a.checkInTime > b.checkInTime ? -1 : 1));

  const columns: TableColumn<AttendanceLog>[] = [
    {
      key: "checkInTime",
      label: "Date",
      render: (v) => formatDate(v as bigint),
    },
    {
      key: "checkInTime",
      label: "Check-in",
      render: (v) => {
        const d = new Date(Number((v as bigint) / 1_000_000n));
        return d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      key: "checkOutTime",
      label: "Check-out",
      render: (v) => {
        if (!v || (v as bigint[]).length === 0)
          return <span className="text-muted-foreground">Active</span>;
        const ts = Array.isArray(v) ? v[0] : (v as bigint);
        const d = new Date(Number(ts / 1_000_000n));
        return d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      key: "workHours",
      label: "Work Hours",
      align: "right",
      render: (v) => {
        if (v === null || v === undefined) return "—";
        return <span className="font-mono">{(v as number).toFixed(2)}h</span>;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={recent}
      loading={isLoading}
      emptyMessage="No attendance records in the last 30 days"
      getRowId={(row) => String(row.id)}
      data-ocid="employee_detail.attendance.table"
    />
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
  "Dec",
];

function PayrollHistoryTab({ employeeId }: { employeeId: bigint }) {
  const { data: runs = [], isLoading } = useListPayrollRuns();

  const empRuns = runs.filter((r) =>
    r.employeeIds.some((id) => id === employeeId),
  );

  const columns: TableColumn<PayrollRun>[] = [
    {
      key: "payPeriodMonth",
      label: "Pay Period",
      render: (_v, row) =>
        `${MONTH_NAMES[Number(row.payPeriodMonth)]} ${row.payPeriodYear}`,
    },
    {
      key: "totalNetSalary",
      label: "Total Net Salary",
      align: "right",
      render: (v) => (
        <span className="font-mono">{formatCurrency(v as bigint)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (v) => <StatusBadge status={String(v)} />,
    },
    {
      key: "createdAt",
      label: "Created",
      render: (v) => formatDate(v as bigint),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={empRuns}
      loading={isLoading}
      emptyMessage="No payroll runs found for this employee"
      getRowId={(row) => String(row.id)}
      data-ocid="employee_detail.payroll.table"
    />
  );
}

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employeeId = id ? BigInt(id) : undefined;

  const { data: employee, isLoading } = useGetEmployee(employeeId);
  const updateEmployee = useUpdateEmployee();

  const [activeTab, setActiveTab] = useState("documents");
  const [showEditModal, setShowEditModal] = useState(false);

  async function handleEdit(input: EmployeeInput) {
    if (!employee) return;
    try {
      await updateEmployee.mutateAsync({ id: employee.id, input });
      toast.success("Employee updated");
      setShowEditModal(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update employee",
      );
    }
  }

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-32">
          <LoadingSpinner size="lg" label="Loading employee…" />
        </div>
      </AppShell>
    );
  }

  if (!employee) {
    return (
      <AppShell>
        <EmptyState
          icon={<Briefcase className="w-6 h-6" />}
          title="Employee not found"
          description="The employee you are looking for does not exist or was removed."
          data-ocid="employee_detail.empty_state"
          action={
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="btn-primary"
              data-ocid="employee_detail.back.button"
            >
              Back to Employees
            </button>
          }
        />
      </AppShell>
    );
  }

  const e = employee as Employee;

  const contractEnd = e.contractEndDate as unknown as bigint[] | undefined;

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Breadcrumb + back */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <BreadcrumbNav
            items={[
              { label: "Employees", path: "/employees" },
              { label: e.fullName },
            ]}
            data-ocid="employee_detail.breadcrumb"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              data-ocid="employee_detail.back.button"
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              data-ocid="employee_detail.edit.button"
              className="btn-primary flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Employee
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-xl">
          <div className="px-6 py-5 border-b border-border flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-display font-bold text-primary">
                {e.fullName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-display font-bold text-foreground truncate">
                {e.fullName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground font-mono">
                  {e.employeeCode}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">
                  {e.jobTitle}
                </span>
                <span className="text-muted-foreground">·</span>
                <StatusBadge status={e.status} size="sm" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5 px-6 py-5">
            <ProfileField label="Nationality" value={e.nationality} />
            <ProfileField label="Department" value={e.department} />
            <ProfileField label="Work Location" value={e.workLocation} />
            <ProfileField
              label="Joining Date"
              value={formatDate(e.joiningDate)}
            />
            <ProfileField
              label="Basic Salary"
              value={formatCurrency(e.basicSalary)}
            />
            <ProfileField label="Passport Number" value={e.passportNumber} />
            <ProfileField label="Visa Number" value={e.visaNumber} />
            <ProfileField label="Emirates / National ID" value={e.emiratesId} />
            <ProfileField label="Bank Name" value={e.bankName} />
            <ProfileField label="IBAN" value={e.iban} />
            <ProfileField
              label="Contract Start"
              value={formatDate(e.contractStartDate)}
            />
            <ProfileField
              label="Contract End"
              value={
                contractEnd && contractEnd.length > 0
                  ? formatDate(contractEnd[0])
                  : "Open-ended"
              }
            />
          </div>
        </div>

        {/* Tabs section */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 pt-4 border-b border-border">
            <TabsNav
              tabs={TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              data-ocid="employee_detail.tabs"
            />
          </div>
          <div className="p-0">
            {activeTab === "documents" && <DocumentsTab employeeId={e.id} />}
            {activeTab === "visa" && <VisaTab employeeId={e.id} />}
            {activeTab === "attendance" && <AttendanceTab employeeId={e.id} />}
            {activeTab === "payroll" && <PayrollHistoryTab employeeId={e.id} />}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Employee"
        description={`Editing ${e.fullName}`}
        size="xl"
        data-ocid="employee_detail.edit_modal"
      >
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <EmployeeForm
            employee={e}
            onSubmit={handleEdit}
            onCancel={() => setShowEditModal(false)}
            loading={updateEmployee.isPending}
          />
        </div>
      </Modal>
    </AppShell>
  );
}
