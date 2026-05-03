import { useGetComplianceRiskScore } from "@/api/compliance";
import { useGetROIMetrics } from "@/api/roi";
import AppShell from "@/components/layout/AppShell";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowUpRight,
  Clock,
  CreditCard,
  DollarSign,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Mock trend data ───────────────────────────────────────────────────────────
const COMPLIANCE_TREND = [
  { month: "Nov", score: 52 },
  { month: "Dec", score: 58 },
  { month: "Jan", score: 63 },
  { month: "Feb", score: 69 },
  { month: "Mar", score: 74 },
  { month: "Apr", score: 81 },
];

const PAYROLL_TREND = [
  { month: "Nov", volume: 820000 },
  { month: "Dec", volume: 910000 },
  { month: "Jan", volume: 950000 },
  { month: "Feb", volume: 1020000 },
  { month: "Mar", volume: 1180000 },
  { month: "Apr", volume: 1400000 },
];

// ─── ROI KPI Card ──────────────────────────────────────────────────────────────
interface ROICardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: "emerald" | "gold" | "primary" | "destructive";
  badge?: string;
  ocid: string;
}

function ROICard({
  icon,
  label,
  value,
  sub,
  accent = "primary",
  badge,
  ocid,
}: ROICardProps) {
  const accentMap = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    gold: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    primary: "text-primary bg-primary/10 border-primary/20",
    destructive: "text-destructive bg-destructive/10 border-destructive/20",
  };

  return (
    <div
      className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 shadow-sm"
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-lg border flex items-center justify-center shrink-0",
              accentMap[accent],
            )}
          >
            {icon}
          </div>
          <p className="text-sm text-muted-foreground font-medium leading-tight">
            {label}
          </p>
        </div>
        {badge && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            {badge}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

// ─── Business Value Banner ─────────────────────────────────────────────────────
function ValueBanner({
  currency,
  penalties,
}: { currency: string; penalties: number }) {
  return (
    <div
      className="flex items-start gap-4 rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-4"
      data-ocid="roi.value_banner"
    >
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-foreground">
          Without GulfHR Shield, you could have paid{" "}
          <span className="text-amber-600 dark:text-amber-400">
            {currency} {penalties.toLocaleString()}
          </span>{" "}
          in compliance fines this year.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Calculated based on visa expiry risks, payroll delays, and missing
          documents resolved through the platform.
        </p>
      </div>
    </div>
  );
}

// ─── Custom Chart Tooltip ──────────────────────────────────────────────────────
function ChartTooltip({
  active,
  payload,
  label,
  prefix = "",
  suffix = "",
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  prefix?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg text-sm">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-bold text-foreground">
        {prefix}
        {Number(payload[0].value).toLocaleString()}
        {suffix}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ROIDashboardPage() {
  const { data: metrics, isLoading: loadingMetrics } = useGetROIMetrics();
  const { data: riskScore, isLoading: loadingRisk } =
    useGetComplianceRiskScore();

  const isLoading = loadingMetrics || loadingRisk;

  const timeSaved = metrics ? Number(metrics.timeSavedHours) : 120;
  const payrollCount = metrics ? Number(metrics.payrollProcessedCount) : 14;
  const payrollTotal = metrics
    ? Number(metrics.payrollTotalAmount) / 100
    : 1_400_000;
  const complianceImprovement = metrics
    ? Number(metrics.complianceScoreImprovement)
    : 18;
  const penaltiesAvoided = metrics
    ? Number(metrics.estimatedPenaltiesAvoided) / 100
    : 112_000;
  const currency = metrics?.currency ?? "AED";
  const score = riskScore ? Number(riskScore.score) : 81;
  const overallROI = penaltiesAvoided + timeSaved * 150;

  if (isLoading) {
    return (
      <AppShell pageTitle="ROI Dashboard">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5 h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell pageTitle="ROI Dashboard">
      <div className="p-4 sm:p-6 space-y-6" data-ocid="roi.page">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Your Compliance ROI This Month
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real business value delivered by GulfHR Shield — time, cost, and
              compliance.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              Compliance Score: {score}/100
            </span>
          </div>
        </div>

        {/* Business Value Banner */}
        <ValueBanner currency={currency} penalties={penaltiesAvoided} />

        {/* KPI Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="roi.metrics_section"
        >
          <ROICard
            icon={<Clock className="w-5 h-5" />}
            label="Time Saved Per Month"
            value={`${timeSaved} hrs`}
            sub="vs. manual HR processing"
            badge="+12%"
            accent="primary"
            ocid="roi.time_saved.card"
          />
          <ROICard
            icon={<CreditCard className="w-5 h-5" />}
            label="Payroll Runs Processed"
            value={String(payrollCount)}
            sub={`${currency} ${payrollTotal.toLocaleString()} total disbursed`}
            badge="YTD"
            accent="emerald"
            ocid="roi.payroll_count.card"
          />
          <ROICard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Compliance Score Improvement"
            value={`+${complianceImprovement} pts`}
            sub="Since joining GulfHR Shield"
            badge="vs. baseline"
            accent="emerald"
            ocid="roi.compliance_improvement.card"
          />
          <ROICard
            icon={<DollarSign className="w-5 h-5" />}
            label="Estimated Penalties Avoided"
            value={`${currency} ${penaltiesAvoided.toLocaleString()}`}
            sub="Based on alerts resolved"
            badge="YTD"
            accent="destructive"
            ocid="roi.penalties_avoided.card"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Compliance Score Trend */}
          <div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            data-ocid="roi.compliance_chart"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                Compliance Score Trend
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Last 6 months — target: 90+
              </p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={COMPLIANCE_TREND}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  domain={[40, 100]}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <Tooltip content={<ChartTooltip suffix=" pts" />} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-chart-3)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "var(--color-chart-3)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Payroll Volume Trend */}
          <div
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
            data-ocid="roi.payroll_chart"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                Payroll Volume Processed
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Last 6 months — {currency} cumulative
              </p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={PAYROLL_TREND}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="payrollGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<ChartTooltip prefix={`${currency} `} />} />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="var(--color-primary)"
                  strokeWidth={2.5}
                  fill="url(#payrollGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overall ROI Summary */}
        <div
          className="rounded-xl border border-primary/30 bg-primary/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          data-ocid="roi.summary.card"
        >
          <div>
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">
              Annual ROI Estimate
            </p>
            <p className="text-4xl font-bold text-foreground tracking-tight">
              {currency} {overallROI.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Total equivalent business value from time saved, penalties
              avoided, and compliance improvements.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {timeSaved}
              </p>
              <p className="text-xs text-muted-foreground">Hours Saved</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">
                {currency} {penaltiesAvoided.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Fines Avoided</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                +{complianceImprovement}
              </p>
              <p className="text-xs text-muted-foreground">Score Gain</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
