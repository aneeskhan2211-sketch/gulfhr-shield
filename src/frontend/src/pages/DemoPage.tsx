import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Shield,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Demo Data ─────────────────────────────────────────────────────────────

interface DemoEmployee {
  id: number;
  name: string;
  nationality: string;
  department: string;
  visaExpiry: string;
  daysOverdue: number;
  hasPassport: boolean;
  hasIban: boolean;
  visaFixed: boolean;
}

const INITIAL_EMPLOYEES: DemoEmployee[] = [
  {
    id: 1,
    name: "Mohammed Al Rashidi",
    nationality: "Pakistani",
    department: "Operations",
    visaExpiry: "2024-11-12",
    daysOverdue: 142,
    hasPassport: false,
    hasIban: true,
    visaFixed: false,
  },
  {
    id: 2,
    name: "Ravi Shankar",
    nationality: "Indian",
    department: "Logistics",
    visaExpiry: "2024-12-01",
    daysOverdue: 123,
    hasPassport: true,
    hasIban: false,
    visaFixed: false,
  },
  {
    id: 3,
    name: "Fatima Al Zaabi",
    nationality: "Egyptian",
    department: "Admin",
    visaExpiry: "2025-01-15",
    daysOverdue: 78,
    hasPassport: false,
    hasIban: true,
    visaFixed: false,
  },
  {
    id: 4,
    name: "Arjun Patel",
    nationality: "Indian",
    department: "IT",
    visaExpiry: "2025-02-03",
    daysOverdue: 59,
    hasPassport: true,
    hasIban: false,
    visaFixed: false,
  },
  {
    id: 5,
    name: "Khalid Mansoor",
    nationality: "Bangladeshi",
    department: "Security",
    visaExpiry: "2025-02-20",
    daysOverdue: 42,
    hasPassport: true,
    hasIban: true,
    visaFixed: false,
  },
];

const RISK_ALERTS = [
  {
    id: 1,
    level: "critical" as const,
    icon: "🛂",
    title: "5 Expired Visas",
    desc: "Employees working with expired residence visas",
    risk: "AED 15,000",
  },
  {
    id: 2,
    level: "critical" as const,
    icon: "💸",
    title: "Payroll Not Run",
    desc: "April payroll has not been processed — WPS deadline in 3 days",
    risk: "AED 25,000",
  },
  {
    id: 3,
    level: "warning" as const,
    icon: "📄",
    title: "3 Missing Passports",
    desc: "Employee passport copies not uploaded to document vault",
    risk: "AED 9,000",
  },
  {
    id: 4,
    level: "warning" as const,
    icon: "🏦",
    title: "2 Missing IBANs",
    desc: "Bank account details missing — salary transfer will fail",
    risk: "AED 4,000",
  },
  {
    id: 5,
    level: "warning" as const,
    icon: "📋",
    title: "4 Missing Contracts",
    desc: "Employment contracts not uploaded",
    risk: "AED 18,000",
  },
];

const SCORE_CATEGORIES = [
  {
    label: "Visa Validity",
    weight: 30,
    score: 12,
    max: 30,
    color: "bg-destructive",
  },
  {
    label: "Payroll / WPS",
    weight: 30,
    score: 8,
    max: 30,
    color: "bg-destructive",
  },
  {
    label: "Document Completeness",
    weight: 20,
    score: 12,
    max: 20,
    color: "bg-chart-5",
  },
  {
    label: "Attendance Tracking",
    weight: 10,
    score: 6,
    max: 10,
    color: "bg-chart-5",
  },
  {
    label: "Employee Data",
    weight: 10,
    score: 4,
    max: 10,
    color: "bg-chart-5",
  },
];

const STEP_TITLES = [
  "Your Compliance Risk Score",
  "Open Compliance Violations",
  "Employees With Expired Visas",
  "Fix an Expired Visa",
  "Watch Your Score Improve",
];

const STEP_TOOLTIPS = [
  "This is your compliance score. Higher is safer. Your current score is dangerously low.",
  "These are your open compliance violations. Each one increases your penalty risk.",
  "These employees have expired visas. Each one adds AED 3,000 to your monthly risk.",
  "In the real platform, updating a visa record immediately recalculates your score.",
  "Every issue you fix improves your score and reduces your financial risk instantly.",
];

// ─── Animated Score Ring ────────────────────────────────────────────────────

function ScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const r = size / 2 - 12;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  const color =
    score >= 70
      ? "#22c55e"
      : score >= 50
        ? "#f59e0b"
        : score >= 30
          ? "#f97316"
          : "#ef4444";

  return (
    <svg
      role="img"
      aria-label="Compliance score gauge"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        className="text-muted"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{
          transition: "stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </svg>
  );
}

// ─── Count-up Hook ──────────────────────────────────────────────────────────

function useCountUp(
  target: number,
  duration = 1500,
  start = true,
  fromValue?: number,
) {
  const [value, setValue] = useState(fromValue ?? target);
  useEffect(() => {
    if (!start) return;
    const begin = Date.now();
    const from = fromValue ?? target;
    setValue(from);
    const raf = () => {
      const elapsed = Date.now() - begin;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(from + (target - from) * progress));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, start, duration, fromValue]);
  return value;
}

// ─── Tooltip Bubble ─────────────────────────────────────────────────────────

function TooltipBubble({ text }: { text: string }) {
  return (
    <div className="relative bg-sidebar text-sidebar-foreground text-sm rounded-xl px-4 py-3 shadow-xl max-w-sm border border-sidebar-border">
      <div className="absolute -top-2 left-6 w-4 h-4 bg-sidebar rotate-45 border-l border-t border-sidebar-border" />
      <span className="font-medium">💡 {text}</span>
    </div>
  );
}

// ─── Step Progress ──────────────────────────────────────────────────────────

function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2" data-ocid="demo.step_progress">
      {Array.from({ length: total }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: stable fixed-length step array
          key={i}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            i < current
              ? "bg-primary flex-1"
              : i === current
                ? "bg-accent flex-[2]"
                : "bg-muted flex-1",
          )}
        />
      ))}
    </div>
  );
}

// ─── Step 1 ─────────────────────────────────────────────────────────────────

function Step1RiskScore({ onNext }: { onNext: () => void }) {
  const score = 42;
  return (
    <div className="space-y-6">
      <TooltipBubble text={STEP_TOOLTIPS[0]} />

      {/* Score display */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Ring */}
          <div className="relative shrink-0">
            <ScoreRing score={score} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-display text-foreground">
                {score}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                / 100
              </span>
            </div>
          </div>

          {/* Labels */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="risk-badge risk-critical px-3 py-1 text-sm animate-pulse"
                data-ocid="demo.risk_badge"
              >
                🔴 CRITICAL RISK
              </span>
            </div>
            <h3 className="text-xl font-bold font-display text-foreground mt-2">
              Your compliance is at risk
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              A score of 42 means multiple violations are active and your
              company faces financial penalties.
            </p>

            {/* Penalty exposure */}
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Estimated Monthly Penalty Exposure
                </p>
                <p
                  className="text-xl font-bold text-destructive font-display"
                  data-ocid="demo.penalty_amount"
                >
                  AED 71,000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="mt-5 space-y-3">
          {SCORE_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{cat.label}</span>
                <span
                  className={
                    cat.score < cat.max * 0.5
                      ? "text-destructive font-semibold"
                      : "text-foreground"
                  }
                >
                  {cat.score}/{cat.max}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    cat.color,
                  )}
                  style={{ width: `${(cat.score / cat.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        data-ocid="demo.step1.cta_button"
        className="cta-primary-urgent w-full text-center justify-center"
      >
        See What Is Causing This Risk <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ─── Step 2 ─────────────────────────────────────────────────────────────────

function Step2Alerts({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <TooltipBubble text={STEP_TOOLTIPS[1]} />

      <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
        <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />5 Active
          Compliance Violations
        </h3>

        {RISK_ALERTS.map((alert, idx) => (
          <div
            key={alert.id}
            data-ocid={`demo.alert.item.${idx + 1}`}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border-l-4 transition-smooth",
              alert.level === "critical"
                ? "border-l-destructive bg-destructive/5 border border-destructive/20"
                : "border-l-chart-5 bg-chart-5/5 border border-chart-5/20",
            )}
          >
            <span className="text-xl shrink-0">{alert.icon}</span>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-semibold text-sm",
                  alert.level === "critical"
                    ? "text-destructive"
                    : "text-chart-5",
                )}
              >
                {alert.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {alert.desc}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">Monthly Risk</p>
              <p
                className={cn(
                  "text-sm font-bold",
                  alert.level === "critical"
                    ? "text-destructive"
                    : "text-chart-5",
                )}
              >
                {alert.risk}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        data-ocid="demo.step2.cta_button"
        className="cta-primary-urgent w-full justify-center"
      >
        Fix the Expired Visas <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ─── Step 3 ─────────────────────────────────────────────────────────────────

function Step3EmployeeList({
  employees,
  onFix,
  onNext,
}: {
  employees: DemoEmployee[];
  onFix: (id: number) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <TooltipBubble text={STEP_TOOLTIPS[2]} />

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border bg-destructive/5 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="font-semibold text-sm text-destructive">
            5 Employees — Visa Expired
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Visa Expiry</th>
                <th className="text-right">Days Overdue</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr
                  key={emp.id}
                  data-ocid={`demo.employee.item.${idx + 1}`}
                  className={emp.visaFixed ? "opacity-50" : ""}
                >
                  <td>
                    <div className="font-medium text-foreground">
                      {emp.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {emp.nationality} · {emp.department}
                    </div>
                  </td>
                  <td className="text-sm text-muted-foreground">
                    {emp.visaExpiry}
                  </td>
                  <td className="text-right">
                    <span
                      className={cn(
                        "text-sm font-bold",
                        emp.visaFixed ? "text-chart-3" : "text-destructive",
                      )}
                    >
                      {emp.visaFixed ? "✓ Fixed" : `${emp.daysOverdue}d`}
                    </span>
                  </td>
                  <td>
                    {emp.visaFixed ? (
                      <span className="badge-valid">✓ Updated</span>
                    ) : (
                      <span className="badge-expired">Expired</span>
                    )}
                  </td>
                  <td>
                    {!emp.visaFixed && (
                      <button
                        type="button"
                        onClick={() => onFix(emp.id)}
                        data-ocid={`demo.fix_visa.button.${idx + 1}`}
                        className="btn-primary text-xs px-3 py-1.5"
                      >
                        Fix Visa
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        data-ocid="demo.step3.cta_button"
        className="btn-secondary w-full justify-center flex items-center gap-2"
      >
        Resolve One Employee Visa <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ─── Step 4 ─────────────────────────────────────────────────────────────────

function Step4FixIssue({
  employee,
  onConfirm,
}: { employee: DemoEmployee; onConfirm: () => void }) {
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 2);
  const defaultDate = futureDate.toISOString().split("T")[0];
  const [newExpiry, setNewExpiry] = useState(defaultDate);
  const [confirmed, setConfirmed] = useState(false);

  function handleConfirm() {
    setConfirmed(true);
    setTimeout(onConfirm, 1800);
  }

  return (
    <div className="space-y-6">
      <TooltipBubble text={STEP_TOOLTIPS[3]} />

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-1">
          Update Visa Record
        </h3>
        <p className="text-sm text-muted-foreground mb-5">
          Updating{" "}
          <span className="font-semibold text-foreground">{employee.name}</span>
          's visa expiry date.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="block text-xs font-medium text-muted-foreground mb-1">
                Current Expiry
              </p>
              <div className="px-3 py-2 bg-destructive/10 border border-destructive/30 rounded-md text-sm text-destructive font-medium">
                {employee.visaExpiry} (Expired)
              </div>
            </div>
            <div>
              <label
                className="block text-xs font-medium text-foreground mb-1"
                htmlFor="new-expiry"
              >
                New Expiry Date *
              </label>
              <input
                id="new-expiry"
                type="date"
                value={newExpiry}
                onChange={(e) => setNewExpiry(e.target.value)}
                data-ocid="demo.visa_expiry.input"
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-chart-3/10 border border-chart-3/30 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-chart-3 mt-0.5 shrink-0" />
            <p className="text-xs text-foreground">
              This will reduce your penalty exposure by{" "}
              <span className="font-bold text-chart-3">AED 3,000</span> and
              recalculate your compliance score.
            </p>
          </div>

          {!confirmed ? (
            <button
              type="button"
              onClick={handleConfirm}
              data-ocid="demo.confirm_update.button"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              <Shield className="w-4 h-4" /> Confirm Update
            </button>
          ) : (
            <div
              className="flex items-center gap-3 p-4 bg-chart-3/10 border border-chart-3/30 rounded-xl animate-pulse"
              data-ocid="demo.step4.success_state"
            >
              <div className="w-8 h-8 rounded-full bg-chart-3/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="font-semibold text-chart-3 text-sm">
                  Visa updated — recalculating compliance score...
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Score update in progress
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Step 5 ─────────────────────────────────────────────────────────────────

function Step5ScoreImproves({
  score,
  onStartTrial,
  onExploreDashboard,
}: {
  score: number;
  onStartTrial: () => void;
  onExploreDashboard: () => void;
}) {
  const displayScore = useCountUp(score, 2000, true, 42);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBanner(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6">
      <TooltipBubble text={STEP_TOOLTIPS[4]} />

      {/* Score improved banner */}
      {showBanner && (
        <div
          className="flex items-center gap-3 p-4 bg-chart-3/15 border border-chart-3/40 rounded-xl"
          data-ocid="demo.improvement_banner"
          style={{ animation: "fadeIn 0.5s ease-out" }}
        >
          <TrendingUp className="w-6 h-6 text-chart-3 shrink-0" />
          <div>
            <p className="font-bold text-chart-3">
              Score improved by +13 — 1 issue resolved
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Penalty risk dropped from AED 71,000 → AED 68,000
            </p>
          </div>
        </div>
      )}

      {/* Score ring */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <ScoreRing score={displayScore} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-display text-foreground">
                {displayScore}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                / 100
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <span className="risk-badge risk-high px-3 py-1 text-sm">
              🟠 HIGH RISK
            </span>
            <h3 className="text-xl font-bold font-display text-foreground mt-2">
              Improving — keep fixing issues
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your score jumped from{" "}
              <span className="line-through text-destructive">42</span> to{" "}
              <span className="font-bold text-chart-3">{displayScore}</span> by
              resolving just one issue.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 bg-destructive/8 border border-destructive/20 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Before</p>
                <p className="text-lg font-bold text-destructive font-display">
                  AED 71,000
                </p>
              </div>
              <div className="p-3 bg-chart-3/10 border border-chart-3/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">After</p>
                <p className="text-lg font-bold text-chart-3 font-display">
                  AED 68,000
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-primary/8 border border-primary/20 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-primary">
              4 more issues remaining.
            </span>{" "}
            Fix all issues to reach a Safe score of 85+.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="grid sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onStartTrial}
          data-ocid="demo.start_trial.button"
          className="cta-primary w-full justify-center"
        >
          <Zap className="w-5 h-5" /> Start Free Trial
        </button>
        <button
          type="button"
          onClick={onExploreDashboard}
          data-ocid="demo.explore_dashboard.button"
          className="btn-secondary w-full flex items-center justify-center gap-2 py-3"
          title="Sign up to access the full dashboard"
        >
          <Shield className="w-4 h-4" /> Sign Up for Full Access
        </button>
      </div>
    </div>
  );
}

// ─── Main DemoPage ───────────────────────────────────────────────────────────

export default function DemoPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [employees, setEmployees] = useState<DemoEmployee[]>(INITIAL_EMPLOYEES);
  const [fixingId, setFixingId] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState(42);
  const contentRef = useRef<HTMLDivElement>(null);

  const TOTAL_STEPS = 5;

  function scrollTop() {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goNext() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    scrollTop();
  }

  function goPrev() {
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  }

  function handleFixVisa(id: number) {
    setFixingId(id);
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, visaFixed: true } : e)),
    );
    goNext();
  }

  function handleConfirmFix() {
    setFinalScore(55);
    goNext();
  }

  const fixingEmployee =
    employees.find((e) => e.id === fixingId) ?? employees[0];

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="demo.page"
    >
      {/* Top bar */}
      <header className="bg-card border-b border-border sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-sidebar flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-chart-2" />
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-foreground text-sm sm:text-base">
                GulfHR Shield
              </span>
              <span className="hidden sm:inline text-muted-foreground text-sm">
                {" "}
                — Interactive Demo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="text-xs text-muted-foreground hidden sm:block">
              Step {step + 1} of {TOTAL_STEPS}
            </span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              data-ocid="demo.exit_button"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-2.5 py-1.5"
            >
              <X className="w-3.5 h-3.5" /> Exit Demo
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          {/* Step header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                {step + 1}
              </span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Step {step + 1} of {TOTAL_STEPS}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {STEP_TITLES[step]}
            </h1>
            <div className="mt-3">
              <StepProgress current={step} total={TOTAL_STEPS} />
            </div>
          </div>

          {/* Step content */}
          <div data-ocid={`demo.step${step + 1}.panel`}>
            {step === 0 && <Step1RiskScore onNext={goNext} />}
            {step === 1 && <Step2Alerts onNext={goNext} />}
            {step === 2 && (
              <Step3EmployeeList
                employees={employees}
                onFix={handleFixVisa}
                onNext={goNext}
              />
            )}
            {step === 3 && (
              <Step4FixIssue
                employee={fixingEmployee}
                onConfirm={handleConfirmFix}
              />
            )}
            {step === 4 && (
              <Step5ScoreImproves
                score={finalScore}
                onStartTrial={() => navigate("/login")}
                onExploreDashboard={() => navigate("/login")}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={step === 0}
              data-ocid="demo.prev_button"
              className="flex items-center gap-2 btn-secondary disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable fixed-length step array
                  key={i}
                  type="button"
                  onClick={() => {
                    setStep(i);
                    scrollTop();
                  }}
                  data-ocid={`demo.step_dot.${i + 1}`}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-200",
                    i === step
                      ? "bg-accent scale-125"
                      : i < step
                        ? "bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {step < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={goNext}
                data-ocid="demo.next_button"
                className="flex items-center gap-2 btn-primary"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                data-ocid="demo.finish_button"
                className="flex items-center gap-2 btn-primary"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sticky CTA bar — visible before final step */}
      {step < 4 && (
        <div className="sticky bottom-0 bg-card/95 border-t border-border backdrop-blur-sm py-3 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
              <span className="text-xs text-muted-foreground truncate">
                <span className="font-semibold text-destructive">
                  AED 71,000
                </span>{" "}
                monthly risk active
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate("/login")}
              data-ocid="demo.sticky_cta.button"
              className="shrink-0 flex items-center gap-1.5 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-2 rounded-md hover:opacity-90 transition-smooth"
            >
              <Zap className="w-3.5 h-3.5" /> Fix Issues Now
            </button>
          </div>
        </div>
      )}

      {/* Branding footer */}
      <div className="py-4 px-4 text-center text-xs text-muted-foreground border-t border-border bg-muted/20">
        <span>© {new Date().getFullYear()}. Built with love using </span>
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
