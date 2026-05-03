import { formatCurrency, formatDate } from "@/api/backend";
import { useGetMyCompany } from "@/api/company";
import { useListEmployees } from "@/api/employees";
import { useGetPayrollRun, useListPayrollItems } from "@/api/payroll";
import AppShell from "@/components/layout/AppShell";
import ApprovalChain from "@/components/payroll/ApprovalChain";
import PayrollItemsTable from "@/components/payroll/PayrollItemsTable";
import PayslipView from "@/components/payroll/PayslipView";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Employee, PayrollItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

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

export default function PayrollDetailPage() {
  const { id } = useParams<{ id: string }>();
  const runId = id ? BigInt(id) : undefined;

  const { data: run, isLoading: runLoading } = useGetPayrollRun(runId);
  const { data: items = [], isLoading: itemsLoading } =
    useListPayrollItems(runId);
  const { data: employees = [] } = useListEmployees();
  const { data: company } = useGetMyCompany();

  const [payslipEmpId, setPayslipEmpId] = useState<bigint | null>(null);

  const payslipEmployee = payslipEmpId
    ? employees.find((e: Employee) => e.id === payslipEmpId)
    : undefined;
  const payslipItem = payslipEmpId
    ? items.find((i: PayrollItem) => i.employeeId === payslipEmpId)
    : undefined;

  if (runLoading || itemsLoading) {
    return (
      <AppShell
        pageTitle="Payroll Run"
        breadcrumbs={[
          { label: "Payroll", path: "/payroll" },
          { label: "Loading\u2026" },
        ]}
      >
        <div className="py-20 flex items-center justify-center">
          <LoadingSpinner label="Loading payroll run\u2026" />
        </div>
      </AppShell>
    );
  }

  if (!run) {
    return (
      <AppShell
        pageTitle="Payroll Run"
        breadcrumbs={[
          { label: "Payroll", path: "/payroll" },
          { label: "Not Found" },
        ]}
      >
        <div className="py-20 text-center text-muted-foreground">
          Payroll run not found.
        </div>
      </AppShell>
    );
  }

  const monthName = MONTH_NAMES[Number(run.payPeriodMonth)] ?? "";
  const pageTitle = `Payroll \u2014 ${monthName} ${run.payPeriodYear}`;
  const runStatusLabel = run.status.replace(/([A-Z])/g, " $1").trim();
  const runStatusSlug = run.status
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  return (
    <AppShell
      pageTitle={pageTitle}
      breadcrumbs={[
        { label: "Payroll", path: "/payroll" },
        { label: `${monthName} ${run.payPeriodYear}` },
      ]}
    >
      <div className="space-y-6" data-ocid="payroll-detail.page">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-display font-bold text-foreground">
              {pageTitle}
            </h1>
            <StatusBadge status={runStatusSlug} label={runStatusLabel} />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{run.employeeIds.length} employees</span>
            <span className="font-semibold text-foreground">
              {formatCurrency(run.totalNetSalary)} total
            </span>
            <span className="text-xs">Created {formatDate(run.createdAt)}</span>
          </div>
        </div>

        {/* Approval chain */}
        <CardContainer data-ocid="payroll-detail.approval_card">
          <CardHeader
            title="Approval Chain"
            subtitle="Track multi-stage approval progress"
          />
          <ApprovalChain run={run} />
        </CardContainer>

        {/* Salary breakdown table */}
        <CardContainer data-ocid="payroll-detail.salary_card">
          <PayrollItemsTable
            run={run}
            items={items}
            onPrintPayslip={(empId) => setPayslipEmpId(empId)}
          />
        </CardContainer>

        {run.notes && (
          <CardContainer data-ocid="payroll-detail.notes_card">
            <CardHeader title="Notes" />
            <p className="text-sm text-muted-foreground">{run.notes}</p>
          </CardContainer>
        )}
      </div>

      {payslipEmpId !== null && (
        <PayslipView
          open={payslipEmpId !== null}
          onClose={() => setPayslipEmpId(null)}
          run={run}
          item={payslipItem}
          employee={payslipEmployee}
          companyName={company?.name ?? "Your Company"}
        />
      )}
    </AppShell>
  );
}
