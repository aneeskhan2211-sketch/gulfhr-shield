import { useListAttendanceByMonth } from "@/api/attendance";
import { timestampToDate } from "@/api/backend";
import { useListEmployees } from "@/api/employees";
import type { AttendanceLog } from "@/backend";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import DataTable from "@/components/ui/DataTable";
import type { TableColumn } from "@/types";
import { useMemo, useState } from "react";

interface SummaryRow {
  employeeId: string;
  employeeName: string;
  presentDays: number;
  absentDays: number;
  lateCheckIns: number;
  earlyCheckOuts: number;
  totalWorkHours: string;
  avgHoursPerDay: string;
}

const WORK_DAYS_PER_MONTH = 22;
const LATE_THRESHOLD_HOUR = 9;
const LATE_THRESHOLD_MIN = 15;
const EARLY_CHECKOUT_HOUR = 17;

function isLate(log: AttendanceLog): boolean {
  const d = timestampToDate(log.checkInTime);
  return (
    d.getHours() > LATE_THRESHOLD_HOUR ||
    (d.getHours() === LATE_THRESHOLD_HOUR &&
      d.getMinutes() > LATE_THRESHOLD_MIN)
  );
}

function isEarlyCheckout(log: AttendanceLog): boolean {
  if (!log.checkOutTime) return false;
  const d = timestampToDate(log.checkOutTime);
  return d.getHours() < EARLY_CHECKOUT_HOUR;
}

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

export default function MonthlySummary() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const { data: logs = [], isLoading: logsLoading } = useListAttendanceByMonth(
    BigInt(month),
    BigInt(year),
  );
  const { data: employees = [], isLoading: empLoading } = useListEmployees();

  const rows: SummaryRow[] = useMemo(() => {
    const empMap = new Map(employees.map((e) => [String(e.id), e.fullName]));

    // Group logs by employeeId
    const grouped = new Map<string, AttendanceLog[]>();
    for (const log of logs) {
      const key = String(log.employeeId);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(log);
    }

    // Build row for each employee that has data, plus known employees with 0
    const result: SummaryRow[] = [];
    const seen = new Set<string>();

    for (const [empId, empLogs] of grouped) {
      seen.add(empId);
      const completed = empLogs.filter((l) => l.checkOutTime);
      const totalHrs = completed.reduce(
        (sum, l) => sum + (l.workHours ?? 0),
        0,
      );
      const present = new Set(
        empLogs.map((l) => timestampToDate(l.checkInTime).toDateString()),
      ).size;
      const absent = Math.max(0, WORK_DAYS_PER_MONTH - present);
      result.push({
        employeeId: empId,
        employeeName: empMap.get(empId) ?? `Employee #${empId}`,
        presentDays: present,
        absentDays: absent,
        lateCheckIns: empLogs.filter(isLate).length,
        earlyCheckOuts: completed.filter(isEarlyCheckout).length,
        totalWorkHours: `${totalHrs.toFixed(1)}h`,
        avgHoursPerDay:
          present > 0 ? `${(totalHrs / present).toFixed(1)}h` : "—",
      });
    }

    // Fill remaining employees with absent
    for (const emp of employees) {
      const key = String(emp.id);
      if (!seen.has(key)) {
        result.push({
          employeeId: key,
          employeeName: emp.fullName,
          presentDays: 0,
          absentDays: WORK_DAYS_PER_MONTH,
          lateCheckIns: 0,
          earlyCheckOuts: 0,
          totalWorkHours: "0h",
          avgHoursPerDay: "—",
        });
      }
    }

    return result.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  }, [logs, employees]);

  const columns: TableColumn<SummaryRow>[] = [
    { key: "employeeName", label: "Employee", sortable: true },
    { key: "presentDays", label: "Present", sortable: true, align: "right" },
    { key: "absentDays", label: "Absent", sortable: true, align: "right" },
    {
      key: "lateCheckIns",
      label: "Late Check-Ins",
      sortable: true,
      align: "right",
    },
    {
      key: "earlyCheckOuts",
      label: "Early Check-Outs",
      sortable: true,
      align: "right",
    },
    {
      key: "totalWorkHours",
      label: "Total Hours",
      sortable: false,
      align: "right",
    },
    {
      key: "avgHoursPerDay",
      label: "Avg/Day",
      sortable: false,
      align: "right",
    },
  ];

  const yearOptions = [year - 1, year, year + 1];

  return (
    <CardContainer data-ocid="attendance.monthly.panel">
      <CardHeader
        title="Monthly Attendance Summary"
        subtitle={`${MONTHS[month - 1]} ${year}`}
        action={
          <div className="flex items-center gap-2">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              data-ocid="attendance.monthly.month_select"
              className="text-sm bg-card border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              data-ocid="attendance.monthly.year_select"
              className="text-sm bg-card border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Employees", value: rows.length },
          {
            label: "Perfect Attendance",
            value: rows.filter(
              (r) => r.absentDays === 0 && r.lateCheckIns === 0,
            ).length,
          },
          {
            label: "Avg Present Days",
            value:
              rows.length > 0
                ? `${(rows.reduce((s, r) => s + r.presentDays, 0) / rows.length).toFixed(1)}`
                : "—",
          },
          {
            label: "Late Check-Ins",
            value: rows.reduce((s, r) => s + r.lateCheckIns, 0),
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-muted/40 rounded-lg p-3 flex flex-col gap-0.5"
          >
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <span className="text-lg font-bold text-foreground">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={rows}
        loading={logsLoading || empLoading}
        emptyMessage={`No attendance data for ${MONTHS[month - 1]} ${year}.`}
        getRowId={(r) => r.employeeId}
        data-ocid="attendance.monthly.table"
      />
    </CardContainer>
  );
}
