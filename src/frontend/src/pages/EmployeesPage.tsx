import {
  Download,
  Eye,
  Pencil,
  Trash2,
  UploadCloud,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import EmployeeFilters from "@/components/employees/EmployeeFilters";
import EmployeeForm from "@/components/employees/EmployeeForm";
import AppShell from "@/components/layout/AppShell";
import ActionMenu from "@/components/ui/ActionMenu";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import PaginationControls from "@/components/ui/PaginationControls";
import StatusBadge from "@/components/ui/StatusBadge";

import { formatCurrency, formatDate } from "@/api/backend";
import {
  useAddEmployee,
  useListEmployees,
  useRemoveEmployee,
  useUpdateEmployee,
} from "@/api/employees";
import type { Employee, EmployeeInput } from "@/backend";
import CSVImportModal from "@/components/employees/CSVImportModal";
import type { EmployeeFilterState } from "@/components/employees/EmployeeFilters";
import type { TableColumn } from "@/types";

const PER_PAGE = 20;

const DEFAULT_FILTERS: EmployeeFilterState = {
  search: "",
  nationality: "all",
  department: "all",
  status: "all",
};

function exportCsv(employees: Employee[]) {
  const headers = [
    "Code",
    "Full Name",
    "Nationality",
    "Job Title",
    "Department",
    "Work Location",
    "Basic Salary",
    "Status",
    "Joining Date",
  ];
  const rows = employees.map((e) => [
    e.employeeCode,
    e.fullName,
    e.nationality,
    e.jobTitle,
    e.department,
    e.workLocation,
    String(Number(e.basicSalary) / 100),
    e.status,
    formatDate(e.joiningDate),
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `employees-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function EmployeesPage() {
  const navigate = useNavigate();
  const { data: employees = [], isLoading } = useListEmployees();
  const addEmployee = useAddEmployee();
  const updateEmployee = useUpdateEmployee();
  const removeEmployee = useRemoveEmployee();

  const [filters, setFilters] = useState<EmployeeFilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const q = filters.search.toLowerCase();
      if (
        q &&
        !e.fullName.toLowerCase().includes(q) &&
        !e.employeeCode.toLowerCase().includes(q)
      )
        return false;
      if (
        filters.nationality !== "all" &&
        e.nationality !== filters.nationality
      )
        return false;
      if (filters.department !== "all" && e.department !== filters.department)
        return false;
      if (filters.status !== "all" && e.status !== filters.status) return false;
      return true;
    });
  }, [employees, filters]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  function handleFilterChange(f: EmployeeFilterState) {
    setFilters(f);
    setPage(1);
  }

  async function handleAdd(input: EmployeeInput) {
    try {
      await addEmployee.mutateAsync(input);
      toast.success("Employee added successfully");
      setShowAddModal(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to add employee",
      );
    }
  }

  async function handleEdit(input: EmployeeInput) {
    if (!editEmployee) return;
    try {
      await updateEmployee.mutateAsync({ id: editEmployee.id, input });
      toast.success("Employee updated successfully");
      setEditEmployee(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update employee",
      );
    }
  }

  async function handleDelete() {
    if (!deleteEmployee) return;
    try {
      await removeEmployee.mutateAsync(deleteEmployee.id);
      toast.success("Employee removed");
      setDeleteEmployee(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to remove employee",
      );
    }
  }

  const columns: TableColumn<Employee>[] = [
    {
      key: "employeeCode",
      label: "Code",
      sortable: true,
      width: "100px",
      render: (v) => (
        <span className="font-mono text-xs text-muted-foreground">
          {String(v)}
        </span>
      ),
    },
    {
      key: "fullName",
      label: "Full Name",
      sortable: true,
      render: (v) => (
        <span className="font-medium text-foreground">{String(v)}</span>
      ),
    },
    { key: "nationality", label: "Nationality", sortable: true },
    { key: "jobTitle", label: "Job Title", sortable: true },
    { key: "department", label: "Department", sortable: true },
    {
      key: "basicSalary",
      label: "Basic Salary",
      align: "right",
      sortable: true,
      render: (v) => (
        <span className="font-mono text-sm">{formatCurrency(v as bigint)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "120px",
      render: (v) => <StatusBadge status={String(v)} />,
    },
    {
      key: "id",
      label: "",
      width: "52px",
      render: (_v, row) => (
        <ActionMenu
          data-ocid={`employees.item.${row.employeeCode}.dropdown_menu`}
          items={[
            {
              label: "View profile",
              icon: <Eye className="w-3.5 h-3.5" />,
              onClick: () => navigate(`/employees/${row.id}`),
            },
            {
              label: "Edit",
              icon: <Pencil className="w-3.5 h-3.5" />,
              onClick: () => setEditEmployee(row),
            },
            {
              label: "Delete",
              icon: <Trash2 className="w-3.5 h-3.5" />,
              destructive: true,
              onClick: () => setDeleteEmployee(row),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Employees
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {employees.length} total employees
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => exportCsv(filtered)}
              data-ocid="employees.export_csv.button"
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => setShowImportModal(true)}
              data-ocid="employees.import_csv.button"
              className="btn-secondary flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              1-Click Import
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              data-ocid="employees.add_employee.button"
              className="btn-primary flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Filters */}
        <EmployeeFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={() => handleFilterChange(DEFAULT_FILTERS)}
        />

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {employees.length === 0 && !isLoading ? (
            <EmptyState
              icon={<Users className="w-6 h-6" />}
              title="No employees yet"
              description="Add your first employee to get started with GulfHR Shield."
              data-ocid="employees.empty_state"
              action={
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  data-ocid="employees.empty_state_add.button"
                  className="btn-primary"
                >
                  Add Employee
                </button>
              }
            />
          ) : (
            <>
              <DataTable
                columns={columns}
                data={paginated}
                loading={isLoading}
                emptyMessage="No employees match the current filters"
                onRowClick={(row) => navigate(`/employees/${row.id}`)}
                getRowId={(row) => String(row.id)}
                data-ocid="employees.table"
              />
              <div className="px-4 py-3 border-t border-border bg-muted/30">
                <PaginationControls
                  page={page}
                  perPage={PER_PAGE}
                  total={filtered.length}
                  onPageChange={setPage}
                  data-ocid="employees.pagination"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Employee"
        description="Fill in the employee details below."
        size="xl"
        data-ocid="employees.add_modal"
      >
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <EmployeeForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddModal(false)}
            loading={addEmployee.isPending}
          />
        </div>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal
        open={!!editEmployee}
        onClose={() => setEditEmployee(null)}
        title="Edit Employee"
        description={`Editing ${editEmployee?.fullName ?? "employee"}`}
        size="xl"
        data-ocid="employees.edit_modal"
      >
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <EmployeeForm
            employee={editEmployee ?? undefined}
            onSubmit={handleEdit}
            onCancel={() => setEditEmployee(null)}
            loading={updateEmployee.isPending}
          />
        </div>
      </Modal>

      {/* CSV Import Modal */}
      <CSVImportModal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImported={() => setShowImportModal(false)}
      />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        open={!!deleteEmployee}
        onClose={() => setDeleteEmployee(null)}
        onConfirm={handleDelete}
        title="Delete employee?"
        description={`This will permanently remove ${deleteEmployee?.fullName ?? "this employee"} and all associated records. This action cannot be undone.`}
        confirmLabel="Delete Employee"
        destructive
        loading={removeEmployee.isPending}
        data-ocid="employees.delete_dialog"
      />
    </AppShell>
  );
}
