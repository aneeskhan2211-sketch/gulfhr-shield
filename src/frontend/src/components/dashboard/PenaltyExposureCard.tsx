import { useGetPenaltyExposure } from "@/api/compliance";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ChevronRight,
  FileWarning,
  Shield,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    route: string;
    icon: React.ReactNode;
    description: string;
  }
> = {
  VisaExpiry: {
    label: "Visa Penalties",
    route: "/visa-alerts?filter=expired",
    icon: <Shield className="w-4 h-4" />,
    description: "Expired visas × AED 3,000 fine",
  },
  PayrollDelay: {
    label: "Payroll / WPS Delay Risk",
    route: "/payroll",
    icon: <Wallet className="w-4 h-4" />,
    description: "Employees × AED 500 WPS delay fee",
  },
  MissingDocument: {
    label: "Missing Documents Risk",
    route: "/employees?filter=missing-docs",
    icon: <FileWarning className="w-4 h-4" />,
    description: "Missing files × AED 200 per gap",
  },
};

// Fallback map for legacy string keys from mock
const LEGACY_CATEGORY_MAP: Record<string, string> = {
  "Expired Visa Fines": "VisaExpiry",
  "WPS Delay Penalties": "PayrollDelay",
  "Missing Documents": "MissingDocument",
  "Labour Law Violations": "MissingDocument",
};

const CURRENCIES = ["AED", "SAR", "OMR", "QAR"] as const;
type CurrencyCode = (typeof CURRENCIES)[number];

// Approximate conversion rates relative to AED
const RATE: Record<CurrencyCode, number> = {
  AED: 1,
  SAR: 1.02,
  OMR: 0.1,
  QAR: 1.03,
};

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const start = prevRef.current;
    const diff = target - start;
    if (diff === 0) return;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(start + diff * eased));
      if (step >= steps) {
        clearInterval(timer);
        prevRef.current = target;
      }
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration]);

  return value;
}

// ── Category row ──────────────────────────────────────────────────────────────
function CategoryRow({
  label,
  route,
  icon,
  description,
  amount,
  count,
  currency,
  pct,
  index,
}: {
  label: string;
  route: string;
  icon: React.ReactNode;
  description: string;
  amount: number;
  count: number;
  currency: string;
  pct: number;
  index: number;
}) {
  const navigate = useNavigate();
  const animatedAmount = useCountUp(amount);

  return (
    <div
      className="rounded-lg border border-border bg-card p-3 space-y-2"
      data-ocid={`dashboard.penalty_exposure.item.${index}`}
    >
      <div className="flex items-start gap-2.5 justify-between">
        <div className="flex items-start gap-2 min-w-0 flex-1">
          <div className="shrink-0 w-7 h-7 rounded-md bg-destructive/10 text-destructive flex items-center justify-center mt-0.5">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground leading-tight">
              {label}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {description} &middot; {count} affected
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-sm font-bold tabular-nums text-destructive"
            data-ocid={`dashboard.penalty_exposure.amount.${index}`}
          >
            {currency} {animatedAmount.toLocaleString()}
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-6 px-2 text-[10px] font-semibold border-destructive/40 text-destructive hover:bg-destructive/10 gap-1"
            onClick={() => navigate(route)}
            data-ocid={`dashboard.penalty_exposure.fix_button.${index}`}
          >
            Fix Now
            <ChevronRight className="w-2.5 h-2.5" />
          </Button>
        </div>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background:
              pct > 60
                ? "hsl(var(--destructive) / 0.85)"
                : pct > 30
                  ? "hsl(var(--chart-5) / 0.85)"
                  : "hsl(var(--chart-4) / 0.85)",
          }}
        />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function PenaltyExposureCard({
  cardRef,
}: { cardRef?: React.RefObject<HTMLDivElement | null> }) {
  const { data: exposure, isLoading } = useGetPenaltyExposure();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<CurrencyCode>("AED");

  const baseCurrency = (exposure?.currency ?? "AED") as CurrencyCode;
  const baseTotal = exposure ? Number(exposure.total) : 71000;
  const convRate = (RATE[currency] ?? 1) / (RATE[baseCurrency] ?? 1);
  const total = Math.round(baseTotal * convRate);

  // All hooks must be called before any early return
  const animatedTotal = useCountUp(total);

  if (isLoading) return <SkeletonCard className="h-full" />;

  const rawBreakdown = exposure?.breakdown ?? [
    { category: "VisaExpiry", amount: BigInt(60000), count: BigInt(20) },
    { category: "PayrollDelay", amount: BigInt(10000), count: BigInt(20) },
    { category: "MissingDocument", amount: BigInt(1000), count: BigInt(5) },
  ];

  const hasExposure = total > 0;

  // Resolve canonical key for each breakdown row
  const merged: Record<string, { amount: number; count: number }> = {};
  for (const item of rawBreakdown) {
    const key = CATEGORY_CONFIG[item.category]
      ? item.category
      : (LEGACY_CATEGORY_MAP[item.category] ?? item.category);
    if (CATEGORY_CONFIG[key]) {
      merged[key] = {
        amount:
          (merged[key]?.amount ?? 0) +
          Math.round(Number(item.amount) * convRate),
        count: (merged[key]?.count ?? 0) + Number(item.count),
      };
    }
  }

  const CANONICAL_ORDER = ["VisaExpiry", "PayrollDelay", "MissingDocument"];
  const finalRows = CANONICAL_ORDER.map((key) => ({
    key,
    config: CATEGORY_CONFIG[key],
    amount: merged[key]?.amount ?? 0,
    count: merged[key]?.count ?? 0,
  })).filter((r) => r.config);

  return (
    <div
      ref={cardRef}
      className="penalty-card flex flex-col gap-4"
      data-ocid="dashboard.penalty_exposure.card"
      id="penalty-exposure-card"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <h3 className="font-display font-semibold text-sm text-foreground">
              Penalty Exposure
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Potential fines this month
          </p>
        </div>
        <select
          className="h-7 px-2 text-xs rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          aria-label="Currency"
          data-ocid="dashboard.penalty_exposure.currency_select"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Total block */}
      {hasExposure ? (
        <div
          className="rounded-xl bg-destructive/8 border border-destructive/20 p-4 text-center"
          data-ocid="dashboard.penalty_exposure.total_banner"
        >
          <p className="text-[10px] uppercase tracking-widest font-semibold text-destructive/70 mb-1">
            Total Monthly Loss Risk
          </p>
          <p
            className="penalty-amount text-3xl"
            data-ocid="dashboard.penalty_exposure.total_amount"
          >
            {currency}{" "}
            <span className="tabular-nums">
              {animatedTotal.toLocaleString()}
            </span>
          </p>
          <p className="text-[10px] text-destructive/60 mt-1">
            Estimated fines if issues remain unresolved
          </p>
        </div>
      ) : (
        <div
          className="rounded-xl border p-4 text-center"
          style={{
            background: "hsl(var(--chart-3) / 0.06)",
            borderColor: "hsl(var(--chart-3) / 0.25)",
          }}
          data-ocid="dashboard.penalty_exposure.safe_banner"
        >
          <CheckCircle
            className="w-8 h-8 mx-auto mb-2"
            style={{ color: "hsl(var(--chart-3))" }}
          />
          <p className="text-sm font-semibold text-foreground">
            Zero Penalty Exposure
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            All compliance areas are in good standing
          </p>
        </div>
      )}

      {/* Category rows */}
      {hasExposure && (
        <div className="space-y-2">
          {finalRows.map((r, i) => (
            <CategoryRow
              key={r.key}
              index={i + 1}
              label={r.config.label}
              route={r.config.route}
              icon={r.config.icon}
              description={r.config.description}
              amount={r.amount}
              count={r.count}
              currency={currency}
              pct={total > 0 ? Math.round((r.amount / total) * 100) : 0}
            />
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-destructive/40 text-destructive hover:bg-destructive/10 gap-1.5"
        onClick={() => navigate("/reports")}
        data-ocid="dashboard.penalty_exposure.view_report_button"
      >
        View Full Compliance Report
        <ChevronRight className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
