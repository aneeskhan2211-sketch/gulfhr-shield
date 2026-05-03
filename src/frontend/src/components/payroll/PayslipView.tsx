import { formatCurrency, formatDate } from "@/api/backend";
import Modal from "@/components/ui/Modal";
import type { Employee, PayrollItem, PayrollRun } from "@/types";

interface PayslipViewProps {
  open: boolean;
  onClose: () => void;
  run: PayrollRun;
  item: PayrollItem | undefined;
  employee: Employee | undefined;
  companyName: string;
}

export default function PayslipView({
  open,
  onClose,
  run,
  item,
  employee,
  companyName,
}: PayslipViewProps) {
  if (!employee || !item) return null;

  const net =
    item.basicSalary +
    item.housingAllowance +
    item.transportAllowance +
    item.overtime -
    item.deductions -
    item.advanceSalary -
    item.leaveDeduction;

  const monthName = new Date(0, Number(run.payPeriodMonth) - 1).toLocaleString(
    "en",
    { month: "long" },
  );

  function handlePrint() {
    window.print();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Employee Payslip"
      size="xl"
      data-ocid="payslip"
    >
      <div id="payslip-print" className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-lg font-display font-bold text-foreground">
              {companyName}
            </h2>
            <p className="text-sm text-muted-foreground">
              GulfHR Shield — Payslip
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {monthName} {String(run.payPeriodYear)}
            </p>
            <p className="text-xs text-muted-foreground">Pay Period</p>
          </div>
        </div>

        {/* Employee info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs uppercase tracking-wide font-medium">
              Employee
            </p>
            <p className="font-semibold text-foreground">{employee.fullName}</p>
            <p className="text-muted-foreground">{employee.employeeCode}</p>
            <p className="text-muted-foreground">{employee.jobTitle}</p>
            <p className="text-muted-foreground">{employee.department}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs uppercase tracking-wide font-medium">
              Bank Details
            </p>
            <p className="font-semibold text-foreground">{employee.bankName}</p>
            <p className="text-muted-foreground font-mono text-xs">
              {employee.iban}
            </p>
            <p className="text-muted-foreground">
              Work Location: {employee.workLocation}
            </p>
          </div>
        </div>

        {/* Salary components */}
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2 font-medium text-foreground">
                  Component
                </th>
                <th className="text-right px-4 py-2 font-medium text-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-2 text-foreground">Basic Salary</td>
                <td className="px-4 py-2 text-right text-foreground">
                  {formatCurrency(item.basicSalary)}
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2 text-foreground">Housing Allowance</td>
                <td className="px-4 py-2 text-right text-foreground">
                  {formatCurrency(item.housingAllowance)}
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2 text-foreground">
                  Transport Allowance
                </td>
                <td className="px-4 py-2 text-right text-foreground">
                  {formatCurrency(item.transportAllowance)}
                </td>
              </tr>
              {item.overtime > 0n && (
                <tr className="border-t border-border">
                  <td className="px-4 py-2 text-foreground">Overtime</td>
                  <td className="px-4 py-2 text-right text-chart-3">
                    {formatCurrency(item.overtime)}
                  </td>
                </tr>
              )}
              {item.deductions > 0n && (
                <tr className="border-t border-border">
                  <td className="px-4 py-2 text-foreground">Deductions</td>
                  <td className="px-4 py-2 text-right text-destructive">
                    -{formatCurrency(item.deductions)}
                  </td>
                </tr>
              )}
              {item.advanceSalary > 0n && (
                <tr className="border-t border-border">
                  <td className="px-4 py-2 text-foreground">Advance Salary</td>
                  <td className="px-4 py-2 text-right text-destructive">
                    -{formatCurrency(item.advanceSalary)}
                  </td>
                </tr>
              )}
              {item.leaveDeduction > 0n && (
                <tr className="border-t border-border">
                  <td className="px-4 py-2 text-foreground">Leave Deduction</td>
                  <td className="px-4 py-2 text-right text-destructive">
                    -{formatCurrency(item.leaveDeduction)}
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border bg-muted/30">
                <td className="px-4 py-3 font-bold text-foreground">
                  Net Salary
                </td>
                <td className="px-4 py-3 text-right font-bold text-lg text-primary">
                  {formatCurrency(net < 0n ? 0n : net)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="text-xs text-muted-foreground">
          Generated: {formatDate(BigInt(Date.now()) * 1_000_000n)} · GulfHR
          Shield
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
            data-ocid="payslip.cancel_button"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="btn-primary flex-1"
            data-ocid="payslip.print_button"
          >
            Print Payslip
          </button>
        </div>
      </div>
    </Modal>
  );
}
