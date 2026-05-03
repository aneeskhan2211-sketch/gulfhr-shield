import { formatCurrency } from "@/api/backend";
import { useListEmployees } from "@/api/employees";
import { useUpsertPayrollItem } from "@/api/payroll";
import { PayrollStatus } from "@/types";
import type { Employee, PayrollItem, PayrollRun } from "@/types";
import { Lock, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function calcNet(item: EditRow): bigint {
  return (
    (item.basicSalary ?? 0n) +
    (item.housingAllowance ?? 0n) +
    (item.transportAllowance ?? 0n) +
    (item.overtime ?? 0n) -
    (item.deductions ?? 0n) -
    (item.advanceSalary ?? 0n) -
    (item.leaveDeduction ?? 0n)
  );
}

interface EditRow {
  basicSalary: bigint;
  housingAllowance: bigint;
  transportAllowance: bigint;
  overtime: bigint;
  deductions: bigint;
  advanceSalary: bigint;
  leaveDeduction: bigint;
}

function parseCurrency(str: string): bigint {
  const num = Math.round(Number.parseFloat(str.replace(/,/g, "") || "0") * 100);
  return Number.isNaN(num) ? 0n : BigInt(Math.max(0, num));
}

function displayCurrency(val: bigint): string {
  return (Number(val) / 100).toFixed(2);
}

interface CurrencyInputProps {
  value: bigint;
  onChange: (val: bigint) => void;
  disabled?: boolean;
  "data-ocid"?: string;
}

function CurrencyInput({
  value,
  onChange,
  disabled,
  "data-ocid": ocid,
}: CurrencyInputProps) {
  const [local, setLocal] = useState(displayCurrency(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setLocal(displayCurrency(value));
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="number"
      min="0"
      step="0.01"
      value={local}
      disabled={disabled}
      onChange={(e) => {
        setLocal(e.target.value);
        onChange(parseCurrency(e.target.value));
      }}
      onBlur={() => setLocal(displayCurrency(value))}
      className="w-24 px-2 py-1 text-right text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
      data-ocid={ocid}
    />
  );
}

interface PayrollItemsTableProps {
  run: PayrollRun;
  items: PayrollItem[];
  onPrintPayslip: (employeeId: bigint) => void;
}

export default function PayrollItemsTable({
  run,
  items,
  onPrintPayslip,
}: PayrollItemsTableProps) {
  const { data: employees = [] } = useListEmployees();
  const upsert = useUpsertPayrollItem();
  const isDraft = run.status === PayrollStatus.Draft;

  const empMap = Object.fromEntries(
    employees.map((e: Employee) => [String(e.id), e]),
  );

  // Local state keyed by employeeId string
  const [rows, setRows] = useState<Record<string, EditRow>>(() => {
    const init: Record<string, EditRow> = {};
    for (const empId of run.employeeIds) {
      const key = String(empId);
      const existing = items.find((i) => i.employeeId === empId);
      const emp = empMap[key];
      init[key] = {
        basicSalary: existing?.basicSalary ?? emp?.basicSalary ?? 0n,
        housingAllowance: existing?.housingAllowance ?? 0n,
        transportAllowance: existing?.transportAllowance ?? 0n,
        overtime: existing?.overtime ?? 0n,
        deductions: existing?.deductions ?? 0n,
        advanceSalary: existing?.advanceSalary ?? 0n,
        leaveDeduction: existing?.leaveDeduction ?? 0n,
      };
    }
    return init;
  });

  // Sync rows when items or employees change
  useEffect(() => {
    setRows((prev) => {
      const next = { ...prev };
      for (const empId of run.employeeIds) {
        const key = String(empId);
        const existing = items.find((i) => i.employeeId === empId);
        const emp = empMap[key];
        if (!next[key] || !isDraft) {
          next[key] = {
            basicSalary: existing?.basicSalary ?? emp?.basicSalary ?? 0n,
            housingAllowance: existing?.housingAllowance ?? 0n,
            transportAllowance: existing?.transportAllowance ?? 0n,
            overtime: existing?.overtime ?? 0n,
            deductions: existing?.deductions ?? 0n,
            advanceSalary: existing?.advanceSalary ?? 0n,
            leaveDeduction: existing?.leaveDeduction ?? 0n,
          };
        }
      }
      return next;
    });
  }, [items, run.employeeIds, isDraft, empMap]);
  function updateRow(empId: bigint, field: keyof EditRow, val: bigint) {
    setRows((prev) => ({
      ...prev,
      [String(empId)]: { ...prev[String(empId)], [field]: val },
    }));
  }

  async function saveRow(empId: bigint) {
    const row = rows[String(empId)];
    if (!row) return;
    try {
      await upsert.mutateAsync({
        runId: run.id,
        input: {
          employeeId: empId,
          basicSalary: row.basicSalary,
          housingAllowance: row.housingAllowance,
          transportAllowance: row.transportAllowance,
          overtime: row.overtime,
          deductions: row.deductions,
          advanceSalary: row.advanceSalary,
          leaveDeduction: row.leaveDeduction,
        },
      });
      toast.success("Salary saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    }
  }

  function exportCsv() {
    const headers = [
      "Employee",
      "Code",
      "Basic",
      "Housing",
      "Transport",
      "Overtime",
      "Deductions",
      "Advance",
      "Leave Deduction",
      "Net Salary",
    ];
    const csvRows = run.employeeIds
      .map((empId) => {
        const emp = empMap[String(empId)];
        const row = rows[String(empId)];
        if (!row) return null;
        const net = calcNet(row);
        return [
          emp?.fullName ?? "",
          emp?.employeeCode ?? "",
          displayCurrency(row.basicSalary),
          displayCurrency(row.housingAllowance),
          displayCurrency(row.transportAllowance),
          displayCurrency(row.overtime),
          displayCurrency(row.deductions),
          displayCurrency(row.advanceSalary),
          displayCurrency(row.leaveDeduction),
          displayCurrency(net),
        ].join(",");
      })
      .filter(Boolean);
    const csv = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payroll-${run.payPeriodMonth}-${run.payPeriodYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded");
  }

  const totalNet = run.employeeIds.reduce((sum, empId) => {
    const row = rows[String(empId)];
    return row ? sum + calcNet(row) : sum;
  }, 0n);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            Salary Breakdown
          </h3>
          {!isDraft && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" /> Locked
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="btn-secondary text-xs"
          data-ocid="payroll-items.export_button"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th className="text-right">Basic</th>
              <th className="text-right">Housing</th>
              <th className="text-right">Transport</th>
              <th className="text-right">Overtime</th>
              <th className="text-right">Deductions</th>
              <th className="text-right">Advance</th>
              <th className="text-right">Leave Ded.</th>
              <th className="text-right font-bold">Net Salary</th>
              {isDraft && <th className="text-center">Save</th>}
              <th className="text-center">Payslip</th>
            </tr>
          </thead>
          <tbody>
            {run.employeeIds.map((empId, idx) => {
              const emp = empMap[String(empId)];
              const row = rows[String(empId)];
              if (!row) return null;
              const net = calcNet(row);
              return (
                <tr
                  key={String(empId)}
                  data-ocid={`payroll-items.item.${idx + 1}`}
                >
                  <td>
                    <p className="font-medium text-foreground text-sm">
                      {emp?.fullName ?? "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {emp?.employeeCode ?? ""}
                    </p>
                  </td>
                  {(
                    [
                      ["basicSalary", "basic"],
                      ["housingAllowance", "housing"],
                      ["transportAllowance", "transport"],
                      ["overtime", "overtime"],
                      ["deductions", "deductions"],
                      ["advanceSalary", "advance"],
                      ["leaveDeduction", "leave"],
                    ] as [keyof EditRow, string][]
                  ).map(([field, ocidSuffix]) => (
                    <td key={field} className="text-right">
                      <CurrencyInput
                        value={row[field]}
                        onChange={(val) => updateRow(empId, field, val)}
                        disabled={!isDraft}
                        data-ocid={`payroll-items.${ocidSuffix}.${idx + 1}.input`}
                      />
                    </td>
                  ))}
                  <td className="text-right">
                    <span
                      className={`font-semibold text-sm ${net < 0n ? "text-destructive" : "text-foreground"}`}
                    >
                      {formatCurrency(net < 0n ? 0n : net)}
                    </span>
                  </td>
                  {isDraft && (
                    <td className="text-center">
                      <button
                        type="button"
                        onClick={() => saveRow(empId)}
                        disabled={upsert.isPending}
                        className="btn-primary text-xs py-1 px-3"
                        data-ocid={`payroll-items.save_button.${idx + 1}`}
                      >
                        Save
                      </button>
                    </td>
                  )}
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => onPrintPayslip(empId)}
                      className="w-7 h-7 flex items-center justify-center mx-auto rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label="Print payslip"
                      data-ocid={`payroll-items.print_button.${idx + 1}`}
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-border bg-muted/30">
              <td
                colSpan={8}
                className="text-right text-sm font-semibold text-foreground pr-4"
              >
                Total Net Salary
              </td>
              <td className="text-right">
                <span className="font-bold text-sm text-foreground">
                  {formatCurrency(totalNet)}
                </span>
              </td>
              {isDraft && <td />}
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
