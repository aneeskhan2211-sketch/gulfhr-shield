import { useListUnreadAlerts, useMarkAllAlertsRead } from "@/api/alerts";
import { useListAttendanceByMonth } from "@/api/attendance";
import { formatDate, timestampToDate } from "@/api/backend";
import {
  useGetCompanyStats,
  useGetMyCompany,
  useGetSubscription,
} from "@/api/company";
import { useGetPenaltyExposure } from "@/api/compliance";
import { useListEmployees } from "@/api/employees";
import { useListPayrollRuns } from "@/api/payroll";
import { useListAllVisaRecords } from "@/api/visa";
import { AlertSeverity, PayrollStatus } from "@/backend";
import { ComplianceRiskWidget } from "@/components/dashboard/ComplianceRiskWidget";
import { HRAssistantWidget } from "@/components/dashboard/HRAssistantWidget";
import { PenaltyExposureCard } from "@/components/dashboard/PenaltyExposureCard";
import { TrustLayerWidget } from "@/components/dashboard/TrustLayerWidget";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import ChartContainer from "@/components/ui/ChartContainer";
import KPICard from "@/components/ui/KPICard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { SkeletonKPI } from "@/components/ui/SkeletonLoader";
import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import type { Alert, Employee } from "@/types";
import {
  AlertTriangle,
  Award,
  Bell,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  FileText,
  Info,
  Play,
  Shield,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Static demo / fallback chart data ──────────────────────────────────────
const NATIONALITY_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-1)",
];

const PAYROLL_TREND_DATA = [
  { month: "Jan", amount: 285000 },
  { month: "Feb", amount: 294500 },
  { month: "Mar", amount: 278000 },
  { month: "Apr", amount: 312000 },
  { month: "May", amount: 326500 },
  { month: "Jun", amount: 341200 },
];

const VISA_STATUS_COLORS = {
  Valid: "var(--color-chart-3)",
  ExpiringSoon: "var(--color-chart-5)",
  Expired: "var(--color-destructive)",
};

// ── Alert severity sort order ───────────────────────────────────────────────
const SEVERITY_ORDER: Record<string, number> = {
  [AlertSeverity.High]: 0,
  [AlertSeverity.Medium]: 1,
  [AlertSeverity.Low]: 2,
};

function severityClass(severity: AlertSeverity): string {
  if (severity === AlertSeverity.High) return "expired";
  if (severity === AlertSeverity.Medium) return "expiring";
  return "info";
}

function AlertIcon({ severity }: { severity: AlertSeverity }) {
  if (severity === AlertSeverity.High)
    return (
      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-destructive" />
    );
  if (severity === AlertSeverity.Medium)
    return <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-chart-5" />;
  return <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-chart-1" />;
}

function timeAgo(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// ── Trial days remaining ────────────────────────────────────────────────────
function trialDaysRemaining(trialEndDate: bigint | undefined): number | null {
  if (!trialEndDate) return null;
  const end = timestampToDate(trialEndDate);
  const days = Math.ceil((end.getTime() - Date.now()) / 86_400_000);
  return days > 0 ? days : 0;
}

// ── Nationality breakdown from employees ───────────────────────────────────
function buildNationalityData(employees: Employee[]) {
  const counts: Record<string, number> = {};
  for (const e of employees) {
    counts[e.nationality] = (counts[e.nationality] ?? 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top5 = sorted.slice(0, 5);
  const othersCount = sorted.slice(5).reduce((s, [, v]) => s + v, 0);
  const result = top5.map(([name, value], i) => ({
    name,
    value,
    color: NATIONALITY_COLORS[i] ?? NATIONALITY_COLORS[0],
  }));
  if (othersCount > 0) {
    result.push({
      name: "Others",
      value: othersCount,
      color: NATIONALITY_COLORS[5],
    });
  }
  return result;
}

// ── Visa status donut data from visa records ────────────────────────────────
function buildVisaStatusData(
  validCount: number,
  expiringCount: number,
  expiredCount: number,
) {
  return [
    { name: "Valid", value: validCount, color: VISA_STATUS_COLORS.Valid },
    {
      name: "Expiring Soon",
      value: expiringCount,
      color: VISA_STATUS_COLORS.ExpiringSoon,
    },
    {
      name: "Expired",
      value: expiredCount,
      color: VISA_STATUS_COLORS.Expired,
    },
  ].filter((d) => d.value > 0);
}

// ── Compliance snapshot rows ────────────────────────────────────────────────
const DEMO_SNAPSHOT_ROWS = [
  {
    name: "Ahmed Al-Rashidi",
    nationality: "UAE",
    visaExpiry: "12/07/2026",
    department: "Operations",
    status: "expiring",
  },
  {
    name: "Sara Mohammed",
    nationality: "Egypt",
    visaExpiry: "19/02/2027",
    department: "HR",
    status: "valid",
  },
  {
    name: "Raj Kumar",
    nationality: "India",
    visaExpiry: "21/01/2026",
    department: "Finance",
    status: "expired",
  },
  {
    name: "Maria Santos",
    nationality: "Philippines",
    visaExpiry: "08/11/2026",
    department: "Admin",
    status: "valid",
  },
  {
    name: "Fatima Al-Zaabi",
    nationality: "UAE",
    visaExpiry: "03/06/2026",
    department: "Operations",
    status: "expiring",
  },
];

// ── Trial badge ──────────────────────────────────────────────────────────────
function TrialBadge({ days }: { days: number }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-xs font-semibold text-accent"
      data-ocid="dashboard.trial_badge"
    >
      <CreditCard className="w-3.5 h-3.5" />
      Trial ends in {days} day{days !== 1 ? "s" : ""}
    </div>
  );
}

// ── Tooltip style ────────────────────────────────────────────────────────────
const TOOLTIP_STYLE = {
  background: "hsl(var(--card) / 1)",
  border: "1px solid hsl(var(--border) / 1)",
  borderRadius: 8,
  fontSize: 12,
  color: "hsl(var(--foreground) / 1)",
};

// ═══════════════════════════════════════════════════════════════════════════
// Main component
// ═══════════════════════════════════════════════════════════════════════════
export default function DashboardContent() {
  const statsQuery = useGetCompanyStats();
  const companyQuery = useGetMyCompany();
  const subscriptionQuery = useGetSubscription();
  const alertsQuery = useListUnreadAlerts();
  const employeesQuery = useListEmployees();
  const payrollQuery = useListPayrollRuns();
  const _visaQuery = useListAllVisaRecords();

  const now = new Date();
  const { mutate: markAllRead, isPending: markingAllRead } =
    useMarkAllAlertsRead();

  const attendanceQuery = useListAttendanceByMonth(
    BigInt(now.getMonth() + 1),
    BigInt(now.getFullYear()),
  );

  // ── Derived data ──────────────────────────────────────────────────────────
  const stats = statsQuery.data;
  const company = companyQuery.data;
  const subscription = subscriptionQuery.data;

  const trialDays = useMemo(
    () => trialDaysRemaining(company?.trialEndDate),
    [company?.trialEndDate],
  );

  const sortedAlerts: Alert[] = useMemo(() => {
    const list = alertsQuery.data ?? [];
    return [...list].sort(
      (a, b) =>
        (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9),
    );
  }, [alertsQuery.data]);

  const nationalityData = useMemo(
    () => buildNationalityData(employeesQuery.data ?? []),
    [employeesQuery.data],
  );

  const visaStatusData = useMemo(() => {
    const expiredCount = Number(stats?.expiredVisaCount ?? 2n);
    const expiringCount = Number(stats?.expiringDocumentCount ?? 4n);
    const totalVisas = employeesQuery.data?.length ?? 20;
    const validCount = Math.max(0, totalVisas - expiredCount - expiringCount);
    return buildVisaStatusData(validCount, expiringCount, expiredCount);
  }, [stats, employeesQuery.data]);

  const visaDonutTotal = visaStatusData.reduce((s, d) => s + d.value, 0);

  const payrollTrendData = useMemo(() => {
    const runs = payrollQuery.data ?? [];
    if (runs.length < 3) return PAYROLL_TREND_DATA;
    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return runs.slice(-6).map((r) => ({
      month: MONTHS[Number(r.payPeriodMonth) - 1] ?? "?",
      amount: Number(r.totalNetSalary) / 100,
    }));
  }, [payrollQuery.data]);

  // Attendance % for last 30 days (employees who had at least 1 check-in)
  const attendancePct = useMemo(() => {
    const logs = attendanceQuery.data ?? [];
    const totalEmp = employeesQuery.data?.length ?? 20;
    if (totalEmp === 0) return 85;
    const uniqueEmpIds = new Set(logs.map((l) => l.employeeId.toString()));
    const pct = Math.round((uniqueEmpIds.size / totalEmp) * 100);
    return Math.min(100, pct || 85);
  }, [attendanceQuery.data, employeesQuery.data]);

  const pendingPayroll = useMemo(() => {
    if (stats?.pendingPayrollCount !== undefined)
      return Number(stats.pendingPayrollCount);
    return (payrollQuery.data ?? []).filter(
      (r) => r.status === PayrollStatus.Draft,
    ).length;
  }, [stats, payrollQuery.data]);

  const navigate = useNavigate();

  // ── Penalty exposure for banner + FAB ─────────────────────────────────────
  const { data: exposure } = useGetPenaltyExposure();
  const penaltyTotal = exposure ? Number(exposure.total) : 71000;
  const penaltyCurrency = exposure?.currency ?? "AED";
  const atRiskCount = exposure?.breakdown
    ? exposure.breakdown.filter((b) => Number(b.amount) > 0).length
    : 3;

  const [bannerDismissed, setBannerDismissed] = useState<boolean>(
    () => sessionStorage.getItem("penalty_banner_dismissed") === "1",
  );
  const dismissBanner = useCallback(() => {
    sessionStorage.setItem("penalty_banner_dismissed", "1");
    setBannerDismissed(true);
  }, []);

  const penaltyCardRef = useRef<HTMLDivElement>(null);
  const scrollToPenaltyCard = useCallback(() => {
    penaltyCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  // ── Loading state ─────────────────────────────────────────────────────────
  const isLoading = statsQuery.isLoading && employeesQuery.isLoading;

  // ── Rendered value helpers ─────────────────────────────────────────────────
  const totalEmployees = stats
    ? Number(stats.totalEmployees)
    : (employeesQuery.data?.length ?? 20);
  const expiredVisas = stats ? Number(stats.expiredVisaCount) : 2;
  const expiringDocs = stats ? Number(stats.expiringDocumentCount) : 4;
  const complianceScore = stats ? Number(stats.complianceScore) : 92;

  // Show FAB when score is low or exposure is present
  const showFab = complianceScore < 80 || penaltyTotal > 0;
  const openIssueCount = atRiskCount + (complianceScore < 80 ? 1 : 0);

  return (
    <div className="space-y-5" data-ocid="dashboard.section">
      {/* ── Penalty Risk Alert Banner ────────────────────────────────────── */}
      {penaltyTotal > 0 && !bannerDismissed && (
        <div
          className="relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-white shadow-lg"
          style={{ background: "hsl(var(--destructive))" }}
          role="alert"
          aria-live="assertive"
          data-ocid="dashboard.penalty_banner"
        >
          <AlertTriangle className="w-5 h-5 shrink-0 opacity-90" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-tight">
              ⚠️ {penaltyCurrency} {penaltyTotal.toLocaleString()} at risk —{" "}
              {atRiskCount} compliance area{atRiskCount !== 1 ? "s" : ""} need
              attention
            </p>
            <p className="text-xs opacity-80 mt-0.5">
              Resolve open issues now to avoid regulatory fines this month.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold border-2 border-white/70 hover:bg-white/20 transition-colors whitespace-nowrap"
            onClick={scrollToPenaltyCard}
            data-ocid="dashboard.penalty_banner.reduce_risk_button"
          >
            Reduce Risk to 0
          </button>
          <button
            type="button"
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
            onClick={dismissBanner}
            aria-label="Dismiss alert"
            data-ocid="dashboard.penalty_banner.dismiss_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page header + trial badge */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Compliance Dashboard
          </h1>
          {company && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {company.name} · {company.country}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {trialDays !== null && subscription?.isTrialActive && (
            <TrialBadge days={trialDays} />
          )}
          <Button
            size="sm"
            variant="default"
            className="gap-1.5"
            onClick={() => navigate("/payroll")}
            data-ocid="dashboard.header.run_payroll_button"
          >
            <Play className="w-3.5 h-3.5" />
            Run Payroll
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => navigate("/wps")}
            data-ocid="dashboard.header.wps_button"
          >
            <Download className="w-3.5 h-3.5" />
            Download WPS File
          </Button>
        </div>
      </div>

      {/* ── KPI Grid ─────────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        data-ocid="dashboard.kpi.section"
      >
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: stable skeleton
            <SkeletonKPI key={i} />
          ))
        ) : (
          <>
            <KPICard
              label="Total Employees"
              value={totalEmployees}
              change="+2 this month"
              changeType="positive"
              icon={<Users className="w-5 h-5" />}
              accent="primary"
              data-ocid="dashboard.kpi.employees"
            />
            <KPICard
              label="Expired Visas"
              value={expiredVisas}
              change={expiredVisas > 0 ? "Action Required" : "All Clear"}
              changeType={expiredVisas > 0 ? "negative" : "positive"}
              icon={<Shield className="w-5 h-5" />}
              accent={expiredVisas > 0 ? "destructive" : "success"}
              data-ocid="dashboard.kpi.expired_visas"
            />
            <KPICard
              label="Docs Expiring Soon"
              value={expiringDocs}
              change="Next 60 days"
              changeType={expiringDocs > 0 ? "negative" : "neutral"}
              icon={<FileText className="w-5 h-5" />}
              accent="warning"
              data-ocid="dashboard.kpi.expiring_docs"
            />
            <KPICard
              label="Payroll Pending"
              value={pendingPayroll}
              change={pendingPayroll > 0 ? "Run Payroll Now" : "All Approved"}
              changeType={pendingPayroll > 0 ? "negative" : "positive"}
              icon={<CreditCard className="w-5 h-5" />}
              accent="accent"
              data-ocid="dashboard.kpi.payroll"
            />
            <KPICard
              label="Attendance (30d)"
              value={`${attendancePct}%`}
              change={attendancePct >= 90 ? "↑ On Target" : "↓ Below Target"}
              changeType={attendancePct >= 90 ? "positive" : "negative"}
              icon={<Clock className="w-5 h-5" />}
              accent={attendancePct >= 90 ? "success" : "warning"}
              data-ocid="dashboard.kpi.attendance"
            />
            <KPICard
              label="Compliance Score"
              value={`${complianceScore}%`}
              change={complianceScore >= 80 ? "Good Standing" : "Needs Review"}
              changeType={complianceScore >= 80 ? "positive" : "negative"}
              icon={<Award className="w-5 h-5" />}
              accent={complianceScore >= 80 ? "success" : "warning"}
              data-ocid="dashboard.kpi.compliance"
            />
          </>
        )}
      </div>

      {/* ── Compliance Risk + Penalty + HR Assistant ──────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ComplianceRiskWidget />
        <PenaltyExposureCard cardRef={penaltyCardRef} />
        <HRAssistantWidget />
      </div>

      {/* ── Charts + Alert Timeline ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Charts — 3 columns on md+ */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Nationality Breakdown */}
          <ChartContainer
            title="Nationality Breakdown"
            subtitle="Employee distribution"
            height={240}
            data-ocid="dashboard.chart.nationality"
          >
            {nationalityData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                No data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={nationalityData}
                    dataKey="value"
                    nameKey="name"
                    cx="38%"
                    cy="50%"
                    outerRadius={68}
                    strokeWidth={2}
                    stroke="transparent"
                  >
                    {nationalityData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    iconSize={8}
                    formatter={(v) => (
                      <span style={{ fontSize: 11, color: "inherit" }}>
                        {v}
                      </span>
                    )}
                  />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartContainer>

          {/* Payroll Trends */}
          <ChartContainer
            title="Payroll Net Salary Trend"
            subtitle="Last 6 months (AED)"
            height={240}
            data-ocid="dashboard.chart.payroll"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={payrollTrendData}
                barSize={18}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)}k`}
                  width={36}
                />
                <Tooltip
                  formatter={(v: number) => [
                    `AED ${v.toLocaleString()}`,
                    "Net Salary",
                  ]}
                  contentStyle={TOOLTIP_STYLE}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--primary) / 1)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Visa Status Donut */}
          <ChartContainer
            title="Visa Status Overview"
            subtitle={`${visaDonutTotal} total records`}
            height={240}
            data-ocid="dashboard.chart.visa"
          >
            {visaStatusData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                No visa records
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={visaStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={78}
                    strokeWidth={2}
                    stroke="transparent"
                  >
                    {visaStatusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                    <Label
                      value={`${visaDonutTotal}`}
                      position="center"
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        fill: "hsl(var(--foreground) / 1)",
                      }}
                    />
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(v) => (
                      <span style={{ fontSize: 11, color: "inherit" }}>
                        {v}
                      </span>
                    )}
                  />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartContainer>
        </div>

        {/* ── Alert Timeline ───────────────────────────────────────────── */}
        <CardContainer
          className="lg:col-span-1"
          padding="none"
          data-ocid="dashboard.alert_timeline"
        >
          <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-2 border-b border-border">
            <div className="flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-display font-semibold text-foreground text-sm">
                Alert Timeline
              </h3>
              {sortedAlerts.length > 0 && (
                <span className="text-[10px] font-semibold bg-destructive/15 text-destructive rounded-full px-1.5 py-0.5">
                  {sortedAlerts.length}
                </span>
              )}
            </div>
            {sortedAlerts.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markAllRead()}
                disabled={markingAllRead}
                className="h-7 text-xs text-muted-foreground hover:text-foreground"
                data-ocid="dashboard.alert_timeline.mark_all_read"
              >
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                Mark all
              </Button>
            )}
          </div>

          {alertsQuery.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner size="sm" />
            </div>
          ) : sortedAlerts.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-2 py-8 text-center px-4"
              data-ocid="dashboard.alert_timeline.empty_state"
            >
              <CheckCircle className="w-8 h-8 text-chart-3" />
              <p className="text-sm font-medium text-foreground">All clear</p>
              <p className="text-xs text-muted-foreground">No unread alerts</p>
            </div>
          ) : (
            <div className="alert-timeline p-3 pr-2 space-y-2">
              {sortedAlerts.map((alert, i) => (
                <div
                  key={alert.id.toString()}
                  className={`alert-item ${severityClass(alert.severity)}`}
                  data-ocid={`dashboard.alert_timeline.item.${i + 1}`}
                >
                  <div className="flex items-start gap-2">
                    <AlertIcon severity={alert.severity} />
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground text-xs leading-relaxed">
                        {alert.message}
                      </p>
                      <p className="text-muted-foreground text-[10px] mt-0.5">
                        {timeAgo(alert.createdAt)}
                      </p>
                    </div>
                    <StatusBadge
                      status={
                        alert.severity === AlertSeverity.High
                          ? "expired"
                          : alert.severity === AlertSeverity.Medium
                            ? "expiring"
                            : "info"
                      }
                      label={
                        alert.severity === AlertSeverity.High
                          ? "High"
                          : alert.severity === AlertSeverity.Medium
                            ? "Med"
                            : "Low"
                      }
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContainer>
      </div>

      {/* ── Trust & Security ─────────────────────────────────────────────── */}
      <TrustLayerWidget />

      {/* ── Sticky Fix Issues FAB ────────────────────────────────────────── */}
      {showFab && (
        <button
          type="button"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full pl-4 pr-5 py-3 text-sm font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
          style={{ background: "hsl(var(--destructive))" }}
          onClick={scrollToPenaltyCard}
          aria-label={`Fix ${openIssueCount} open compliance issues`}
          data-ocid="dashboard.sticky_fix_button"
        >
          <Wrench className="w-4 h-4" />
          Fix Issues
          <span
            className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-extrabold"
            style={{ color: "hsl(var(--destructive))" }}
          >
            {openIssueCount}
          </span>
        </button>
      )}

      {/* ── Compliance Snapshot Table ─────────────────────────────────────── */}
      <CardContainer data-ocid="dashboard.employee_table">
        <CardHeader
          title="Compliance Snapshot"
          subtitle="Visa expiry and compliance status by employee"
        />
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="data-table min-w-[600px] w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Nationality</th>
                <th>Visa Expiry</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(employeesQuery.data && employeesQuery.data.length > 0
                ? employeesQuery.data.slice(0, 8).map((emp) => ({
                    name: emp.fullName,
                    nationality: emp.nationality,
                    visaExpiry: emp.contractEndDate
                      ? formatDate(emp.contractEndDate)
                      : "—",
                    department: emp.department,
                    status: "active",
                  }))
                : DEMO_SNAPSHOT_ROWS
              ).map((emp, i) => (
                <tr
                  key={emp.name}
                  data-ocid={`dashboard.employee_table.row.${i + 1}`}
                >
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                        {emp.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <span className="font-medium text-foreground truncate">
                        {emp.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{emp.nationality}</td>
                  <td className="text-muted-foreground tabular-nums">
                    {emp.visaExpiry}
                  </td>
                  <td className="text-muted-foreground">{emp.department}</td>
                  <td>
                    <StatusBadge
                      status={emp.status}
                      label={
                        emp.status === "valid"
                          ? "Valid"
                          : emp.status === "expiring"
                            ? "Expiring Soon"
                            : emp.status === "expired"
                              ? "Expired"
                              : "Active"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContainer>
    </div>
  );
}
