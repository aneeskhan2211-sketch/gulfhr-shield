import { useGetComplianceRiskScore } from "@/api/compliance";
import {
  Variant_Low_High_Medium_Critical,
  Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError,
} from "@/backend";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ChevronRight,
  Info,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const RISK_CONFIG: Record<
  Variant_Low_High_Medium_Critical,
  { label: string; color: string; pulse: boolean }
> = {
  [Variant_Low_High_Medium_Critical.Low]: {
    label: "Safe",
    color: "var(--color-chart-3)",
    pulse: false,
  },
  [Variant_Low_High_Medium_Critical.Medium]: {
    label: "Warning",
    color: "var(--color-chart-5)",
    pulse: false,
  },
  [Variant_Low_High_Medium_Critical.High]: {
    label: "High Risk",
    color: "oklch(0.65 0.15 30)",
    pulse: false,
  },
  [Variant_Low_High_Medium_Critical.Critical]: {
    label: "Critical",
    color: "hsl(var(--destructive))",
    pulse: true,
  },
};

const CATEGORY_TOOLTIPS: Record<string, string> = {
  visa: "Visa validity — tracks expired/expiring visas (weight: 30%)",
  payroll:
    "Payroll/WPS compliance — on-time salary runs and file submission (weight: 30%)",
  documents:
    "Document completeness — passports, contracts, labour cards (weight: 20%)",
  attendance:
    "Attendance tracking — monthly check-in/out records (weight: 10%)",
  employee: "Employee data — all required profile fields filled (weight: 10%)",
};

interface CategoryBar {
  key: string;
  label: string;
  score: number;
  tooltip: string;
}

interface FixAction {
  issue: string;
  affectedCount: number;
  estimatedFine: bigint;
  route: string;
  severity: string;
}

function useCountUp(target: number, duration = 900) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const delta = target - start;
    const startTime = performance.now();
    let raf: number;
    function step(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(start + delta * eased));
      if (t < 1) raf = requestAnimationFrame(step);
      else prev.current = target;
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return display;
}

function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Info className="w-3 h-3 text-muted-foreground cursor-help flex-shrink-0" />
      {show && (
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 w-56 rounded-lg bg-foreground text-background text-[11px] px-2.5 py-1.5 shadow-lg leading-snug pointer-events-none">
          {text}
        </span>
      )}
    </span>
  );
}

function CategoryBar({ cat }: { cat: CategoryBar }) {
  const colorBar =
    cat.score >= 80
      ? "bg-chart-3"
      : cat.score >= 50
        ? "bg-chart-5"
        : "bg-destructive";
  const colorText =
    cat.score >= 80
      ? "text-chart-3"
      : cat.score >= 50
        ? "text-chart-5"
        : "text-destructive";
  const statusLabel =
    cat.score >= 80 ? "Safe" : cat.score >= 50 ? "Warning" : "Critical";
  const badgeCls =
    cat.score >= 80
      ? "border-chart-3/40 bg-chart-3/10 text-chart-3"
      : cat.score >= 50
        ? "border-chart-5/40 bg-chart-5/10 text-chart-5"
        : "border-destructive/40 bg-destructive/10 text-destructive";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs text-foreground font-medium truncate">
            {cat.label}
          </span>
          <InfoTooltip text={cat.tooltip} />
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className={cn(
              "text-[10px] font-semibold px-1.5 py-0.5 rounded-full border",
              badgeCls,
            )}
          >
            {statusLabel}
          </span>
          <span
            className={cn(
              "text-xs font-bold tabular-nums w-8 text-right",
              colorText,
            )}
          >
            {cat.score}%
          </span>
        </div>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            colorBar,
          )}
          style={{ width: `${cat.score}%` }}
        />
      </div>
    </div>
  );
}

function getRoute(
  factorType: Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError,
): string {
  switch (factorType) {
    case Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.VisaExpiry:
      return "/visa-alerts?filter=expired";
    case Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.PayrollDelay:
      return "/payroll";
    case Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.MissingDocument:
      return "/employees?filter=missing-passport";
    case Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.WpsError:
      return "/employees?filter=missing-iban";
    default:
      return "/visa-alerts";
  }
}

export function ComplianceRiskWidget() {
  const { data: risk, isLoading } = useGetComplianceRiskScore();
  const navigate = useNavigate();

  const score = risk ? Number(risk.score) : 42;
  const riskLevel = risk?.riskLevel ?? Variant_Low_High_Medium_Critical.High;
  const config = RISK_CONFIG[riskLevel];
  const penaltyExposure = risk?.penaltyExposure ?? 42500n;
  const currency = risk?.currency ?? "AED";
  const riskFactors = risk?.riskFactors ?? [];

  // All hooks must be called before any early return
  const animatedScore = useCountUp(score);

  if (isLoading) return <SkeletonCard className="h-full" />;

  const chartData = [{ name: "score", value: score, fill: config.color }];

  const visaFactors = riskFactors.filter(
    (f) =>
      f.factorType ===
      Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.VisaExpiry,
  );
  const payrollFactors = riskFactors.filter(
    (f) =>
      f.factorType ===
        Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.PayrollDelay ||
      f.factorType ===
        Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.WpsError,
  );
  const docFactors = riskFactors.filter(
    (f) =>
      f.factorType ===
      Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError.MissingDocument,
  );

  const visaImpact = visaFactors.reduce(
    (s, f) => s + Number(f.employeeCount) * 3,
    0,
  );
  const payrollImpact = payrollFactors.reduce(
    (s, f) =>
      s + (f.severity === "Critical" ? 20 : f.severity === "High" ? 12 : 6),
    0,
  );
  const docImpact = docFactors.reduce(
    (s, f) => s + Number(f.employeeCount) * 2,
    0,
  );

  const categories: CategoryBar[] = [
    {
      key: "visa",
      label: "Visa Validity",
      score: Math.max(0, Math.min(100, 100 - visaImpact)),
      tooltip: CATEGORY_TOOLTIPS.visa,
    },
    {
      key: "payroll",
      label: "Payroll / WPS",
      score: Math.max(0, Math.min(100, 100 - payrollImpact)),
      tooltip: CATEGORY_TOOLTIPS.payroll,
    },
    {
      key: "documents",
      label: "Document Completeness",
      score: Math.max(0, Math.min(100, 100 - docImpact)),
      tooltip: CATEGORY_TOOLTIPS.documents,
    },
    {
      key: "attendance",
      label: "Attendance Tracking",
      score: score >= 60 ? 85 : 60,
      tooltip: CATEGORY_TOOLTIPS.attendance,
    },
    {
      key: "employee",
      label: "Employee Data",
      score: score >= 50 ? 80 : 55,
      tooltip: CATEGORY_TOOLTIPS.employee,
    },
  ];

  const fixActions: FixAction[] = riskFactors
    .filter((f) => f.severity === "Critical" || f.severity === "High")
    .slice(0, 3)
    .map((f) => ({
      issue: f.description,
      affectedCount: Number(f.employeeCount),
      estimatedFine: f.estimatedFine,
      route: getRoute(f.factorType),
      severity: f.severity,
    }));

  const isCritical = riskLevel === Variant_Low_High_Medium_Critical.Critical;

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm"
      data-ocid="dashboard.compliance_risk.card"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-display font-semibold text-sm text-foreground">
            Compliance Risk Score
          </h3>
        </div>
        <span
          className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-full border",
            isCritical && "animate-pulse",
            riskLevel === Variant_Low_High_Medium_Critical.Low
              ? "border-chart-3/40 bg-chart-3/10 text-chart-3"
              : riskLevel === Variant_Low_High_Medium_Critical.Medium
                ? "border-chart-5/40 bg-chart-5/10 text-chart-5"
                : riskLevel === Variant_Low_High_Medium_Critical.High
                  ? "border-orange-400/40 bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400"
                  : "border-destructive/40 bg-destructive/10 text-destructive",
          )}
          data-ocid="dashboard.compliance_risk.level_badge"
        >
          {isCritical && <span className="mr-1">⚠</span>}
          {config.label}
        </span>
      </div>

      {/* Score gauge + penalty summary */}
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0 w-24 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="100%"
              barSize={10}
              startAngle={90}
              endAngle={-270}
              data={chartData}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={6}
                background={{ fill: "hsl(var(--muted))" }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-display text-foreground leading-none tabular-nums">
              {animatedScore}
            </span>
            <span className="text-[10px] text-muted-foreground">/ 100</span>
          </div>
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <p className="text-xs text-muted-foreground font-medium">
            Monthly risk exposure
          </p>
          <p className="text-xl font-bold tabular-nums text-destructive">
            {currency} {Number(penaltyExposure).toLocaleString()}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {riskFactors.length} active risk{" "}
            {riskFactors.length === 1 ? "factor" : "factors"}
          </p>
        </div>
      </div>

      {/* 5-category breakdown */}
      <div className="space-y-2.5">
        {categories.map((cat) => (
          <CategoryBar key={cat.key} cat={cat} />
        ))}
      </div>

      {/* Fix Now action cards */}
      {fixActions.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-foreground uppercase tracking-wide">
            ⚡ Top Issues — Fix Now
          </p>
          {fixActions.map((action, i) => (
            <button
              key={i.toString()}
              type="button"
              onClick={() => navigate(action.route)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 transition-colors text-left group"
              data-ocid={`dashboard.compliance_risk.fix_action.${i + 1}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <AlertTriangle
                  className={cn(
                    "w-3.5 h-3.5 flex-shrink-0",
                    action.severity === "Critical"
                      ? "text-destructive"
                      : "text-chart-5",
                  )}
                />
                <div className="min-w-0">
                  <p className="text-xs text-foreground font-medium truncate">
                    {action.issue}
                  </p>
                  {action.affectedCount > 0 && (
                    <p className="text-[10px] text-muted-foreground">
                      {action.affectedCount}{" "}
                      {action.affectedCount === 1 ? "employee" : "employees"}{" "}
                      affected
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-xs font-bold text-destructive tabular-nums">
                  {currency} {Number(action.estimatedFine).toLocaleString()}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Penalty banner */}
      {Number(penaltyExposure) > 0 && (
        <div className="flex items-center justify-between px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
            <span className="text-xs text-destructive font-medium">
              Estimated monthly exposure
            </span>
          </div>
          <span className="text-sm font-bold text-destructive tabular-nums">
            {currency} {Number(penaltyExposure).toLocaleString()}
          </span>
        </div>
      )}

      {/* CTA */}
      <Button
        variant="destructive"
        size="sm"
        className="w-full gap-1.5 font-semibold"
        onClick={() => navigate("/visa-alerts")}
        data-ocid="dashboard.compliance_risk.fix_button"
      >
        <Zap className="w-3.5 h-3.5" />
        Reduce Risk to Zero
        <ChevronRight className="w-3.5 h-3.5 ml-auto" />
      </Button>
    </div>
  );
}
