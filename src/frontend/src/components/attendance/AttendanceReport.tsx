import { useListAttendanceLogs } from "@/api/attendance";
import { formatDate, timestampToDate } from "@/api/backend";
import { useListEmployees } from "@/api/employees";
import type { AttendanceLog } from "@/backend";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import type { TableColumn } from "@/types";
import { Download, Filter } from "lucide-react";
import { useMemo, useState } from "react";

interface ReportRow {
  key: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  status: string;
}

function formatTimeShort(ts: bigint): string {
  return timestampToDate(ts).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function deriveStatus(log: AttendanceLog): string {
  const checkInDate = timestampToDate(log.checkInTime);
  const lateThreshold = new Date(checkInDate);
  lateThreshold.setHours(9, 15, 0, 0);
  if (checkInDate > lateThreshold) return "Late";
  return "Present";
}

export default function AttendanceReport() {
  const { data: employees = [], isLoading: empLoading } = useListEmployees();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Fetch logs for selected employee or first available
  const targetId = selectedEmployeeId
    ? BigInt(selectedEmployeeId)
    : employees[0]?.id;
  const { data: logs = [], isLoading: logsLoading } =
    useListAttendanceLogs(targetId);

  const filtered = useMemo(() => {
    let result = [...logs];
    if (fromDate) {
      const from = new Date(fromDate).getTime();
      result = result.filter((l) => Number(l.checkInTime / 1_000_000n) >= from);
    }
    if (toDate) {
      const to = new Date(toDate).getTime() + 86_400_000;
      result = result.filter((l) => Number(l.checkInTime / 1_000_000n) <= to);
    }
    return result;
  }, [logs, fromDate, toDate]);

  const rows: ReportRow[] = useMemo(() => {
    const empMap = new Map(employees.map((e) => [String(e.id), e.fullName]));
    return filtered.map((log) => ({
      key: String(log.id),
      employeeName:
        empMap.get(String(log.employeeId)) ?? `Emp #${log.employeeId}`,
      date: formatDate(log.checkInTime),
      checkIn: formatTimeShort(log.checkInTime),
      checkOut: log.checkOutTime ? formatTimeShort(log.checkOutTime) : "—",
      workHours: log.workHours != null ? `${log.workHours.toFixed(1)}h` : "—",
      status: log.checkOutTime ? deriveStatus(log) : "Active",
    }));
  }, [filtered, employees]);

  const columns: TableColumn<ReportRow>[] = [
    { key: "employeeName", label: "Employee", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "checkIn", label: "Check In", sortable: false },
    { key: "checkOut", label: "Check Out", sortable: false },
    { key: "workHours", label: "Work Hours", sortable: false, align: "right" },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (val) => (
        <StatusBadge
          status={
            String(val) === "Late"
              ? "expiring"
              : String(val) === "Active"
                ? "active"
                : "valid"
          }
          label={String(val)}
        />
      ),
    },
  ];

  function exportCSV() {
    const header = "Employee,Date,Check In,Check Out,Work Hours,Status";
    const csvRows = rows.map(
      (r) =>
        `"${r.employeeName}","${r.date}","${r.checkIn}","${r.checkOut}","${r.workHours}","${r.status}"`,
    );
    const blob = new Blob([[header, ...csvRows].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <CardContainer data-ocid="attendance.report.panel">
      <CardHeader
        title="Attendance Report"
        subtitle="Filter by employee and date range"
        action={
          <Button
            size="sm"
            variant="outline"
            onClick={exportCSV}
            data-ocid="attendance.report.export_button"
            className="gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5 p-3 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-center gap-1.5 text-muted-foreground mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Filters</span>
        </div>
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          disabled={empLoading}
          data-ocid="attendance.report.employee_select"
          className="text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All Employees</option>
          {employees.map((e) => (
            <option key={String(e.id)} value={String(e.id)}>
              {e.fullName}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <label htmlFor="att-from" className="text-xs text-muted-foreground">
            From
          </label>
          <input
            id="att-from"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            data-ocid="attendance.report.from_input"
            className="text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="att-to" className="text-xs text-muted-foreground">
            To
          </label>
          <input
            id="att-to"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            data-ocid="attendance.report.to_input"
            className="text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {(fromDate || toDate || selectedEmployeeId) && (
          <Button
            size="sm"
            variant="ghost"
            data-ocid="attendance.report.clear_button"
            onClick={() => {
              setFromDate("");
              setToDate("");
              setSelectedEmployeeId("");
            }}
            className="text-xs"
          >
            Clear
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={rows}
        loading={logsLoading || empLoading}
        emptyMessage="No attendance records match the selected filters."
        getRowId={(r) => r.key}
        data-ocid="attendance.report.table"
      />
    </CardContainer>
  );
}
