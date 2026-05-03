import { getDaysUntilExpiry, getVisaStatus } from "@/api/backend";
import type { Employee, VisaRecord } from "@/backend";
import { VisaRecordType } from "@/backend";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const ALL_TYPES: VisaRecordType[] = [
  VisaRecordType.Passport,
  VisaRecordType.Visa,
  VisaRecordType.LabourCard,
  VisaRecordType.Insurance,
  VisaRecordType.MedicalCard,
  VisaRecordType.Contract,
];

const TYPE_LABELS: Record<VisaRecordType, string> = {
  [VisaRecordType.Passport]: "Passport",
  [VisaRecordType.Visa]: "Visa",
  [VisaRecordType.LabourCard]: "Labour Card",
  [VisaRecordType.Insurance]: "Insurance",
  [VisaRecordType.MedicalCard]: "Medical Card",
  [VisaRecordType.Contract]: "Contract",
};

interface VisaStatusMatrixProps {
  employees: Employee[];
  records: VisaRecord[];
  threshold: number;
}

export default function VisaStatusMatrix({
  employees,
  records,
  threshold,
}: VisaStatusMatrixProps) {
  // Build a lookup: employeeId -> recordType -> VisaRecord
  const lookup = new Map<string, VisaRecord>();
  for (const rec of records) {
    lookup.set(`${rec.employeeId}-${rec.recordType}`, rec);
  }

  if (employees.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No employees to display.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-sm border-collapse"
        data-ocid="visa-matrix.table"
      >
        <thead>
          <tr className="bg-muted/60 border-b border-border">
            <th className="text-left px-4 py-3 font-semibold text-foreground sticky left-0 bg-muted/60 min-w-48">
              Employee
            </th>
            {ALL_TYPES.map((type) => (
              <th
                key={type}
                className="text-center px-3 py-3 font-semibold text-foreground whitespace-nowrap min-w-28"
              >
                {TYPE_LABELS[type]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr
              key={emp.employeeCode}
              data-ocid={`visa-matrix.row.${idx + 1}`}
              className="border-b border-border hover:bg-muted/20 transition-colors"
            >
              <td className="px-4 py-3 sticky left-0 bg-card">
                <div className="font-medium text-foreground truncate max-w-44">
                  {emp.fullName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {emp.employeeCode}
                </div>
              </td>
              {ALL_TYPES.map((type) => {
                const rec = lookup.get(`${emp.id}-${type}`);
                if (!rec) {
                  return (
                    <td key={type} className="px-3 py-3 text-center">
                      <span className="text-xs text-muted-foreground">—</span>
                    </td>
                  );
                }
                const status = getVisaStatus(rec.expiryDate, [threshold]);
                const days = getDaysUntilExpiry(rec.expiryDate);
                return (
                  <td
                    key={type}
                    className={cn(
                      "px-3 py-3 text-center",
                      status === "expired" && "bg-destructive/5",
                      status === "expiring" && "bg-chart-5/5",
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <StatusBadge status={status} size="sm" />
                      <span className="text-xs text-muted-foreground">
                        {days < 0 ? `${Math.abs(days)}d ago` : `${days}d`}
                      </span>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
