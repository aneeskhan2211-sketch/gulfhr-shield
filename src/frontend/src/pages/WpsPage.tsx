import { formatDate } from "@/api/backend";
import { useGenerateWpsExport, useListWpsExports } from "@/api/company";
import { useListEmployees } from "@/api/employees";
import { useListPayrollRuns } from "@/api/payroll";
import AppShell from "@/components/layout/AppShell";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StatusBadge from "@/components/ui/StatusBadge";
import WpsValidationTable from "@/components/wps/WpsValidationTable";
import type { Employee, PayrollRun } from "@/types";
import { WpsCountryFormat } from "@/types";
import { AlertTriangle, Download, FileText, History } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const COUNTRY_FORMATS = [
  {
    value: WpsCountryFormat.UAESIF,
    label: "UAE SIF",
    flag: "\u{1F1E6}\u{1F1EA}",
    description:
      "UAE Salary Information File required by UAE WPS. Columns: EID, Bank Code, Account, Routing, Salary, Start Date, Days Worked.",
  },
  {
    value: WpsCountryFormat.OmanMOL,
    label: "Oman MOL",
    flag: "\u{1F1F4}\u{1F1F2}",
    description:
      "Oman Ministry of Labour format. Columns: Company ID, Employee ID, Net Salary, Bank, IBAN, Pay Month.",
  },
  {
    value: WpsCountryFormat.QatarTemplate,
    label: "Qatar Template",
    flag: "\u{1F1F6}\u{1F1E6}",
    description:
      "Qatar WPS configurable template. Columns: QID, IBAN, Salary, Allowances, Pay Date.",
  },
  {
    value: WpsCountryFormat.SaudiTemplate,
    label: "Saudi Template",
    flag: "\u{1F1F8}\u{1F1E6}",
    description:
      "Saudi Arabia Mudad/GOSI-compatible template. Columns: IQAMA/ID, IBAN, Basic, Allowances, Net Pay.",
  },
];

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

function payPeriodLabel(run: PayrollRun): string {
  return `${MONTH_NAMES[Number(run.payPeriodMonth)] ?? run.payPeriodMonth} ${run.payPeriodYear}`;
}

export default function WpsPage() {
  const { data: runs = [], isLoading: runsLoading } = useListPayrollRuns();
  const { data: employees = [], isLoading: empsLoading } = useListEmployees();
  const { data: exports = [], isLoading: exportsLoading } = useListWpsExports();
  const generateExport = useGenerateWpsExport();

  const [selectedFormat, setSelectedFormat] = useState<WpsCountryFormat>(
    WpsCountryFormat.UAESIF,
  );
  const [selectedRunId, setSelectedRunId] = useState<string>("");

  const selectedRun = runs.find(
    (r: PayrollRun) => String(r.id) === selectedRunId,
  );
  const runEmployees = selectedRun
    ? employees.filter((e: Employee) => selectedRun.employeeIds.includes(e.id))
    : employees;

  const missingCount = runEmployees.filter(
    (emp: Employee) =>
      !emp.bankName || !emp.iban || emp.basicSalary <= 0n || !emp.employeeCode,
  ).length;

  const canGenerate = !!selectedRun && missingCount === 0;

  async function handleGenerate() {
    if (!selectedRun) {
      toast.error("Please select a payroll run");
      return;
    }
    if (missingCount > 0) {
      toast.error(
        `${missingCount} employee(s) have missing required fields. Please fix before exporting.`,
      );
      return;
    }
    try {
      const result = await generateExport.mutateAsync({
        payrollRunId: selectedRun.id,
        countryFormat: selectedFormat,
      });
      const blob = new Blob([result.fileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        result.export.fileName || `wps-${selectedFormat}-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("WPS file generated and downloaded successfully");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate WPS file",
      );
    }
  }

  return (
    <AppShell pageTitle="WPS File Preparation" breadcrumbs={[{ label: "WPS" }]}>
      <div className="space-y-6" data-ocid="wps.page">
        {/* Disclaimer */}
        <div
          className="flex items-start gap-3 rounded-lg border-2 border-destructive/40 bg-destructive/10 p-4"
          data-ocid="wps.disclaimer"
        >
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-destructive mb-1">
              Important Disclaimer
            </p>
            <p className="text-sm text-foreground">
              Final file format must be verified with your bank or WPS provider
              before submission.{" "}
              <strong>
                This tool does not connect directly to any government or banking
                system.
              </strong>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Government and bank API integration is a Future Feature. Always
              validate the export file with your bank or WPS provider before
              submission.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: config form */}
          <div className="lg:col-span-1 space-y-5">
            {/* Country format */}
            <CardContainer data-ocid="wps.format_card">
              <CardHeader
                title="Country Format"
                subtitle="Select WPS template for your country"
              />
              <div className="space-y-2">
                {COUNTRY_FORMATS.map((fmt) => (
                  <label
                    key={fmt.value}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedFormat === fmt.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="wps-format"
                      value={fmt.value}
                      checked={selectedFormat === fmt.value}
                      onChange={() => setSelectedFormat(fmt.value)}
                      className="mt-0.5 shrink-0"
                      data-ocid={`wps.format.${fmt.label.toLowerCase().replace(/\s+/g, "-")}.radio`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {fmt.flag} {fmt.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {fmt.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </CardContainer>

            {/* Payroll run selector */}
            <CardContainer data-ocid="wps.run_card">
              <CardHeader title="Select Payroll Run" />
              {runsLoading ? (
                <LoadingSpinner size="sm" />
              ) : runs.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No payroll runs available.
                </p>
              ) : (
                <select
                  value={selectedRunId}
                  onChange={(e) => setSelectedRunId(e.target.value)}
                  className="form-input w-full"
                  data-ocid="wps.run.select"
                >
                  <option value="">Select a payroll run\u2026</option>
                  {runs.map((r: PayrollRun) => (
                    <option key={String(r.id)} value={String(r.id)}>
                      {payPeriodLabel(r)} \u2014{" "}
                      {r.status.replace(/([A-Z])/g, " $1").trim()} (
                      {r.employeeIds.length} employees)
                    </option>
                  ))}
                </select>
              )}
            </CardContainer>

            {/* Generate button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate || generateExport.isPending}
              className="btn-primary w-full flex items-center justify-center gap-2"
              data-ocid="wps.generate_button"
            >
              <Download className="w-4 h-4" />
              {generateExport.isPending
                ? "Generating\u2026"
                : "Generate WPS File"}
            </button>

            {!selectedRun && (
              <p className="text-xs text-muted-foreground text-center">
                Select a payroll run to proceed
              </p>
            )}
            {selectedRun && missingCount > 0 && (
              <p className="text-xs text-destructive text-center">
                Fix {missingCount} employee record{missingCount > 1 ? "s" : ""}{" "}
                before generating
              </p>
            )}
          </div>

          {/* Right: validation + history */}
          <div className="lg:col-span-2 space-y-5">
            <CardContainer data-ocid="wps.validation_card">
              <CardHeader
                title="Pre-Export Validation"
                subtitle={
                  selectedRun
                    ? `Employees in ${payPeriodLabel(selectedRun)}`
                    : "Select a payroll run to validate"
                }
              />
              {empsLoading ? (
                <LoadingSpinner label="Loading employee data\u2026" />
              ) : runEmployees.length === 0 ? (
                <EmptyState
                  icon={<FileText className="w-5 h-5" />}
                  title="No employees to validate"
                  description="Select a payroll run to see employee validation status."
                  data-ocid="wps.validation.empty_state"
                />
              ) : (
                <WpsValidationTable employees={runEmployees} />
              )}
            </CardContainer>

            {/* Export history */}
            <CardContainer data-ocid="wps.history_card">
              <CardHeader
                title="Export History"
                action={<History className="w-4 h-4 text-muted-foreground" />}
              />
              {exportsLoading ? (
                <LoadingSpinner size="sm" />
              ) : exports.length === 0 ? (
                <EmptyState
                  icon={<History className="w-5 h-5" />}
                  title="No exports yet"
                  description="Your WPS export history will appear here."
                  data-ocid="wps.history.empty_state"
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Export Date</th>
                        <th>Country</th>
                        <th className="text-center">Employees</th>
                        <th>Status</th>
                        <th>File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exports.map((exp, idx) => (
                        <tr
                          key={String(exp.id)}
                          data-ocid={`wps.history.item.${idx + 1}`}
                        >
                          <td className="text-sm text-muted-foreground">
                            {formatDate(exp.createdAt)}
                          </td>
                          <td className="text-sm">
                            {COUNTRY_FORMATS.find(
                              (f) => f.value === exp.countryFormat,
                            )?.flag ?? ""}{" "}
                            {exp.countryFormat
                              .replace(/([A-Z])/g, " $1")
                              .trim()}
                          </td>
                          <td className="text-center tabular-nums">
                            {String(exp.employeeCount)}
                          </td>
                          <td>
                            <StatusBadge
                              status={exp.status.toLowerCase()}
                              label={exp.status}
                              size="sm"
                            />
                          </td>
                          <td className="text-xs font-mono text-muted-foreground truncate max-w-32">
                            {exp.fileName}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContainer>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
