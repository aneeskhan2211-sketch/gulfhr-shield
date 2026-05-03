import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";

type DrillMetric = "document" | "payroll" | "visa";

interface DrillEmployee {
  name: string;
  code: string;
  issue: string;
  status: string;
}

const DRILL_DATA: Record<
  DrillMetric,
  {
    title: string;
    subtitle: string;
    employees: DrillEmployee[];
    fineBadge?: string;
  }
> = {
  document: {
    title: "Document Completeness Issues",
    subtitle: "6 employees missing documents — estimated fine: AED 7,500",
    fineBadge: "AED 7,500",
    employees: [
      {
        name: "Mohammed Al-Rashidi",
        code: "EMP-004",
        issue: "Passport expires in 12 days",
        status: "expiring",
      },
      {
        name: "Priya Nair",
        code: "EMP-009",
        issue: "Labour card expired 3 days ago",
        status: "expired",
      },
      {
        name: "Sung-Min Park",
        code: "EMP-015",
        issue: "Insurance certificate missing",
        status: "expired",
      },
      {
        name: "Ali Hassan",
        code: "EMP-018",
        issue: "Medical card expires in 25 days",
        status: "expiring",
      },
      {
        name: "Layla Al-Otaibi",
        code: "EMP-012",
        issue: "Employment contract not uploaded",
        status: "expired",
      },
      {
        name: "Rajan Patel",
        code: "EMP-020",
        issue: "Emirates ID expiring in 10 days",
        status: "expiring",
      },
    ],
  },
  payroll: {
    title: "Payroll & WPS Compliance Issues",
    subtitle:
      "April payroll overdue — WPS deadline in 2 days — estimated fine: AED 20,000",
    fineBadge: "AED 20,000",
    employees: [
      {
        name: "All Employees (20)",
        code: "PAYROLL-APR",
        issue: "April 2025 payroll not yet processed",
        status: "pending",
      },
      {
        name: "WPS File Export",
        code: "WPS-MAR",
        issue: "March WPS salary file not submitted to bank",
        status: "pending",
      },
      {
        name: "Engineering Dept",
        code: "DEPT-03",
        issue: "Payroll approval delayed by Finance Director",
        status: "draft",
      },
    ],
  },
  visa: {
    title: "Visa Validity Issues",
    subtitle:
      "4 expired + 3 expiring within 7 days — estimated fine: AED 29,000",
    fineBadge: "AED 29,000",
    employees: [
      {
        name: "Fatima Al-Zaabi",
        code: "EMP-007",
        issue: "Residence visa expired 8 days ago",
        status: "expired",
      },
      {
        name: "Ravi Kumar",
        code: "EMP-011",
        issue: "Work visa expired — deportation risk",
        status: "expired",
      },
      {
        name: "Chen Wei",
        code: "EMP-013",
        issue: "Residence visa expired 2 days ago",
        status: "expired",
      },
      {
        name: "Nadia Al-Shamsi",
        code: "EMP-016",
        issue: "Tourist visa used for work — violation",
        status: "expired",
      },
      {
        name: "Omar Hassan Al-Farsi",
        code: "EMP-003",
        issue: "Visa expires in 3 days — renew now",
        status: "expiring",
      },
      {
        name: "Sara Mohammed",
        code: "EMP-004",
        issue: "Visa expires in 6 days",
        status: "expiring",
      },
      {
        name: "Khalid Al-Mansouri",
        code: "EMP-005",
        issue: "Visa expires in 7 days",
        status: "expiring",
      },
    ],
  },
};

interface ComplianceDrillDownProps {
  metric: DrillMetric | null;
  onClose: () => void;
}

export default function ComplianceDrillDown({
  metric,
  onClose,
}: ComplianceDrillDownProps) {
  const data = metric ? DRILL_DATA[metric] : null;

  return (
    <Modal
      open={!!metric}
      onClose={onClose}
      title={data?.title ?? ""}
      description={
        data?.subtitle ??
        "Employees contributing to a lower compliance score in this category."
      }
      size="lg"
      data-ocid="compliance.drilldown.dialog"
    >
      {data && (
        <div className="space-y-3">
          {data.fineBadge && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20">
              <span className="text-xs text-destructive font-medium">
                ⚠ Estimated regulatory fine:
              </span>
              <span className="text-sm font-bold text-destructive tabular-nums">
                {data.fineBadge}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {data.employees.map((emp) => (
              <div
                key={emp.code}
                className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-muted/30"
                data-ocid={`compliance.drilldown.item.${emp.code}`}
              >
                <div className="min-w-0">
                  <div className="font-medium text-sm text-foreground">
                    {emp.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {emp.code} — {emp.issue}
                  </div>
                </div>
                <StatusBadge status={emp.status} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
