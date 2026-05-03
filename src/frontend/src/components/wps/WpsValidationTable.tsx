import type { Employee } from "@/types";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ValidationRow {
  employee: Employee;
  missingFields: string[];
}

function getMissingFields(emp: Employee): string[] {
  const missing: string[] = [];
  if (!emp.bankName || emp.bankName.trim() === "") missing.push("Bank Name");
  if (!emp.iban || emp.iban.trim() === "") missing.push("IBAN");
  if (!emp.basicSalary || emp.basicSalary <= 0n) missing.push("Salary");
  if (!emp.employeeCode || emp.employeeCode.trim() === "")
    missing.push("Employee ID");
  return missing;
}

interface WpsValidationTableProps {
  employees: Employee[];
  isLoading?: boolean;
}

export default function WpsValidationTable({
  employees,
  isLoading,
}: WpsValidationTableProps) {
  const rows: ValidationRow[] = employees.map((emp) => ({
    employee: emp,
    missingFields: getMissingFields(emp),
  }));

  const invalidCount = rows.filter((r) => r.missingFields.length > 0).length;

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="py-8 text-center text-sm text-muted-foreground">
          Validating employee data…
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm">
        {invalidCount === 0 ? (
          <span className="flex items-center gap-1.5 text-chart-3 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            All {employees.length} employees are ready for WPS export
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-destructive font-medium">
            <AlertCircle className="w-4 h-4" />
            {invalidCount} employee{invalidCount > 1 ? "s have" : " has"}{" "}
            missing required fields
          </span>
        )}
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Code</th>
              <th>Bank</th>
              <th>IBAN</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const { employee: emp, missingFields } = row;
              const isInvalid = missingFields.length > 0;
              return (
                <tr
                  key={String(emp.id)}
                  className={isInvalid ? "bg-destructive/5" : ""}
                  data-ocid={`wps-validation.item.${idx + 1}`}
                >
                  <td>
                    <p className="font-medium text-foreground text-sm">
                      {emp.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {emp.nationality}
                    </p>
                  </td>
                  <td className="text-sm">
                    {emp.employeeCode || (
                      <span className="text-destructive text-xs">Missing</span>
                    )}
                  </td>
                  <td className="text-sm">
                    {emp.bankName || (
                      <span className="text-destructive text-xs">Missing</span>
                    )}
                  </td>
                  <td className="text-sm font-mono">
                    {emp.iban ? (
                      <span className="text-xs">{emp.iban.slice(0, 8)}…</span>
                    ) : (
                      <span className="text-destructive text-xs">Missing</span>
                    )}
                  </td>
                  <td className="text-sm">
                    {emp.basicSalary > 0n ? (
                      <span>
                        AED {(Number(emp.basicSalary) / 100).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-destructive text-xs">Missing</span>
                    )}
                  </td>
                  <td>
                    {isInvalid ? (
                      <span className="inline-flex items-center gap-1 text-xs text-destructive font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {missingFields.join(", ")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-chart-3 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Ready
                      </span>
                    )}
                  </td>
                  <td>
                    {isInvalid && (
                      <Link
                        to={`/employees/${emp.id}`}
                        className="text-xs text-primary hover:underline"
                        data-ocid={`wps-validation.edit_link.${idx + 1}`}
                      >
                        Fix record
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
