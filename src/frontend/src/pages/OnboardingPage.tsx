import {
  useGetOnboardingProgress,
  useUpdateOnboardingProgress,
} from "@/api/onboarding";
import AppShell from "@/components/layout/AppShell";
import { SkeletonCard, SkeletonKPI } from "@/components/ui/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileText,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    label: "Create Company",
    description:
      "Set up your company profile, country, and currency for Gulf compliance.",
    icon: Building2,
    path: "/settings",
    cta: "Set Up Company",
    ctaSecondary: "Go to Settings",
    hint: "Add your company name, region, and billing info to activate compliance tracking.",
  },
  {
    label: "Add Employees",
    description:
      "Import via CSV or add employees one by one. Supports bulk upload.",
    icon: Users,
    path: "/employees",
    cta: "Add Employees",
    ctaSecondary: "Manage Employees",
    hint: "Add at least one employee to enable payroll processing and visa expiry tracking.",
  },
  {
    label: "Upload Documents",
    description:
      "Upload visa copies, passports, and employment contracts securely.",
    icon: FileText,
    path: "/documents",
    cta: "Upload Documents",
    ctaSecondary: "Manage Documents",
    hint: "Upload required documents to avoid compliance fines. Encrypted & secure.",
  },
  {
    label: "Run First Payroll",
    description: "Process salaries, generate WPS files, and stay compliant.",
    icon: CreditCard,
    path: "/payroll",
    cta: "Run Payroll",
    ctaSecondary: "Go to Payroll",
    hint: "Run your first payroll to activate WPS compliance reporting and penalty prevention.",
  },
];

export default function OnboardingPage() {
  const { data: progress, isLoading } = useGetOnboardingProgress();
  const updateProgress = useUpdateOnboardingProgress();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(false);

  const currentStep = progress ? Number(progress.currentStep) : 0;
  const completedSteps = progress?.stepsCompleted ?? [
    false,
    false,
    false,
    false,
  ];
  const completedCount = completedSteps.filter(Boolean).length;
  const percentComplete = Math.round((completedCount / STEPS.length) * 100);
  const isAllDone = completedCount === STEPS.length;

  function handleAdvance(idx: number) {
    const nextStep = Math.min(idx + 1, STEPS.length - 1);
    updateProgress.mutate(BigInt(nextStep));
    setActiveStep(Math.min(activeStep + 1, STEPS.length - 1));
  }

  function handleNavigateToStep(path: string) {
    navigate(path);
  }

  if (isLoading) {
    return (
      <AppShell pageTitle="Setup Checklist">
        <div className="p-6 space-y-4">
          <SkeletonKPI />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  if (isAllDone) {
    return (
      <AppShell pageTitle="Setup Complete">
        <div
          className="min-h-[70vh] flex items-center justify-center p-6"
          data-ocid="onboarding.page"
        >
          <div className="text-center max-w-md space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-400/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                You're All Set!
              </h1>
              <p className="text-muted-foreground mt-2">
                Your compliance system is active. Start monitoring fines,
                managing payroll, and keeping your team compliant.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                type="button"
                className="font-semibold px-8"
                onClick={() => navigate("/dashboard")}
                data-ocid="onboarding.get_started_button"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/payroll")}
                data-ocid="onboarding.run_payroll_button"
              >
                Run Payroll Now
              </Button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell pageTitle="Setup Checklist">
      <div
        className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6"
        data-ocid="onboarding.page"
      >
        {/* Header with skip */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Get Started in 4 Steps
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Complete setup to activate Gulf compliance protection and avoid
              fines.
            </p>
          </div>
          {!skipped && (
            <button
              type="button"
              onClick={() => setSkipped(true)}
              data-ocid="onboarding.skip_button"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mt-1"
            >
              <X className="w-3 h-3" /> Skip for now
            </button>
          )}
          {skipped && (
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              data-ocid="onboarding.go_dashboard_button"
              className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
            >
              Back to Dashboard <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div
          className="rounded-xl border border-border bg-card p-5 space-y-4"
          data-ocid="onboarding.progress_bar"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Overall Progress
            </span>
            <span
              className={cn(
                "text-sm font-bold",
                percentComplete === 100 ? "text-emerald-400" : "text-primary",
              )}
            >
              {percentComplete}%
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                percentComplete === 100 ? "bg-emerald-400" : "bg-primary",
              )}
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          {/* Step labels */}
          <div className="flex justify-between">
            {STEPS.map((step, idx) => (
              <button
                type="button"
                key={step.label}
                onClick={() => setActiveStep(idx)}
                data-ocid={`onboarding.step_label.${idx + 1}`}
                className={cn(
                  "flex flex-col items-center gap-1 text-xs transition-colors cursor-pointer",
                  completedSteps[idx]
                    ? "text-emerald-400 font-semibold"
                    : idx === currentStep
                      ? "text-primary font-semibold"
                      : "text-muted-foreground",
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                    completedSteps[idx]
                      ? "bg-emerald-400 border-emerald-400 text-white"
                      : idx === currentStep
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-muted border-border text-muted-foreground",
                  )}
                >
                  {completedSteps[idx] ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className="hidden sm:block max-w-[80px] text-center leading-tight">
                  {step.label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {completedCount} of {STEPS.length} steps completed
          </p>
        </div>

        {/* Active Step Detail */}
        <div
          className="rounded-xl border border-primary/30 bg-primary/5 ring-1 ring-primary/20 p-6 space-y-4"
          data-ocid="onboarding.active_step"
        >
          {(() => {
            const step = STEPS[activeStep];
            const Icon = step.icon;
            const isDone = completedSteps[activeStep] ?? false;
            return (
              <>
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                      isDone
                        ? "bg-emerald-400/20 text-emerald-400"
                        : "bg-primary/20 text-primary",
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {activeStep + 1} of {STEPS.length}
                      </span>
                      {isDone && (
                        <span className="text-xs bg-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                          Completed
                        </span>
                      )}
                    </div>
                    <h2 className="font-display font-bold text-xl text-foreground">
                      {step.label}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-foreground">{step.description}</p>

                <div className="bg-card/60 border border-border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">
                    💡 {step.hint}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {!isDone && (
                    <Button
                      type="button"
                      className="font-semibold flex-1"
                      data-ocid={`onboarding.step.${activeStep + 1}.primary_button`}
                      onClick={() => {
                        handleAdvance(activeStep);
                        handleNavigateToStep(step.path);
                      }}
                    >
                      {step.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant={isDone ? "default" : "outline"}
                    className="flex-1"
                    data-ocid={`onboarding.step.${activeStep + 1}.secondary_button`}
                    onClick={() => handleNavigateToStep(step.path)}
                  >
                    {isDone ? step.ctaSecondary : "Preview"}{" "}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Next/Back navigation */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(activeStep - 1)}
                    data-ocid="onboarding.back_button"
                  >
                    ← Back
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {activeStep + 1} / {STEPS.length}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={activeStep === STEPS.length - 1}
                    onClick={() => setActiveStep(activeStep + 1)}
                    data-ocid="onboarding.next_button"
                  >
                    Next →
                  </Button>
                </div>
              </>
            );
          })()}
        </div>

        {/* All steps overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isDone = completedSteps[idx] ?? false;
            const isActive = idx === activeStep;

            return (
              <button
                key={step.label}
                type="button"
                data-ocid={`onboarding.step.${idx + 1}`}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "rounded-xl border p-4 flex items-center gap-3 transition-all text-left w-full",
                  isDone
                    ? "border-emerald-400/30 bg-emerald-400/5"
                    : isActive
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border bg-card hover:bg-muted/30",
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                    isDone
                      ? "bg-emerald-400/20 text-emerald-400"
                      : isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      isDone
                        ? "text-emerald-400"
                        : isActive
                          ? "text-primary"
                          : "text-foreground",
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {step.description}
                  </p>
                </div>
                {isDone && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
