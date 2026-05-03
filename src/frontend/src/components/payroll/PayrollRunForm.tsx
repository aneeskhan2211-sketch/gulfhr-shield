import { useListEmployees } from "@/api/employees";
import { useCreatePayrollRun } from "@/api/payroll";
import Modal from "@/components/ui/Modal";
import type { Employee } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const MONTHS = [
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

interface PayrollRunFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (id: bigint) => void;
}

export default function PayrollRunForm({
  open,
  onClose,
  onSuccess,
}: PayrollRunFormProps) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [selected, setSelected] = useState<Set<bigint>>(new Set());
  const [search, setSearch] = useState("");

  const { data: employees = [], isLoading } = useListEmployees();
  const createRun = useCreatePayrollRun();

  const filtered = employees.filter(
    (e: Employee) =>
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.employeeCode.toLowerCase().includes(search.toLowerCase()),
  );

  function toggleEmployee(id: bigint) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((e: Employee) => e.id)));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selected.size === 0) {
      toast.error("Select at least one employee");
      return;
    }
    try {
      const run = await createRun.mutateAsync({
        payPeriodMonth: BigInt(month),
        payPeriodYear: BigInt(year),
        employeeIds: Array.from(selected),
        notes: "",
      });
      toast.success("Payroll run created");
      onSuccess?.(run.id);
      onClose();
      setSelected(new Set());
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create payroll run",
      );
    }
  }

  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 2 + i);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Payroll Run"
      description="Select the pay period and employees to include in this payroll run."
      size="lg"
      data-ocid="payroll-run-form"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Period selector */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="payroll-month"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Month
            </label>
            <select
              id="payroll-month"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="form-input w-full"
              data-ocid="payroll-run-form.month.select"
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="payroll-year"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Year
            </label>
            <select
              id="payroll-year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="form-input w-full"
              data-ocid="payroll-run-form.year.select"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Employee selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="block text-sm font-medium text-foreground">
              Employees
              <span className="ml-2 text-xs text-muted-foreground font-normal">
                {selected.size} selected
              </span>
            </span>
            <button
              type="button"
              onClick={toggleAll}
              className="text-xs text-primary hover:underline"
              data-ocid="payroll-run-form.select-all_button"
            >
              {selected.size === filtered.length
                ? "Deselect all"
                : "Select all"}
            </button>
          </div>
          <input
            type="search"
            placeholder="Search employees…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input w-full mb-2"
            data-ocid="payroll-run-form.search_input"
          />
          <div className="border border-border rounded-lg overflow-y-auto max-h-56">
            {isLoading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Loading employees…
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No employees found
              </div>
            ) : (
              filtered.map((emp: Employee) => (
                <label
                  key={String(emp.id)}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted/40 cursor-pointer border-b border-border last:border-0 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selected.has(emp.id)}
                    onChange={() => toggleEmployee(emp.id)}
                    className="rounded border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {emp.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {emp.employeeCode} · {emp.department}
                    </p>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
            data-ocid="payroll-run-form.cancel_button"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createRun.isPending || selected.size === 0}
            className="btn-primary flex-1"
            data-ocid="payroll-run-form.submit_button"
          >
            {createRun.isPending
              ? "Creating…"
              : `Create Run (${selected.size} employees)`}
          </button>
        </div>
      </form>
    </Modal>
  );
}
