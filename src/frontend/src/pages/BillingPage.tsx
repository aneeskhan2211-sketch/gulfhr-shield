import { useGetSubscription } from "@/api/company";
import PlanComparison from "@/components/billing/PlanComparison";
import AppShell from "@/components/layout/AppShell";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import Modal from "@/components/ui/Modal";
import {
  SmartUpsellModal,
  type UpsellTrigger,
} from "@/components/ui/SmartUpsellModal";
import StatusBadge from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Building2,
  Calendar,
  Clock,
  CreditCard,
  ShieldCheck,
  TrendingDown,
  Users,
} from "lucide-react";
import { useState } from "react";

const BILLING_HISTORY = [
  {
    id: "INV-2026-04",
    date: "01 Apr 2026",
    amount: "Contact Sales",
    status: "paid",
    plan: "Growing Businesses",
  },
  {
    id: "INV-2026-03",
    date: "01 Mar 2026",
    amount: "Contact Sales",
    status: "paid",
    plan: "Growing Businesses",
  },
  {
    id: "INV-2026-02",
    date: "01 Feb 2026",
    amount: "Contact Sales",
    status: "paid",
    plan: "For Small Teams",
  },
  {
    id: "INV-2026-01",
    date: "01 Jan 2026",
    amount: "Contact Sales",
    status: "paid",
    plan: "For Small Teams",
  },
];

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    title: "Avoid Fines",
    desc: "Stay ahead of WPS deadlines, visa renewals, and payroll compliance",
  },
  {
    icon: Clock,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    title: "Save HR Time",
    desc: "Automate document tracking, payroll runs, and compliance alerts",
  },
  {
    icon: TrendingDown,
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
    title: "Stay Compliant",
    desc: "Real-time compliance scoring across UAE, Saudi, Oman & Qatar",
  },
];

export default function BillingPage() {
  const { data: subscription } = useGetSubscription();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [upsellTrigger, setUpsellTrigger] =
    useState<UpsellTrigger>("employeeLimit");

  const tier = subscription?.tier ?? "Growth";
  const employeeLimit = subscription?.employeeLimit
    ? Number(subscription.employeeLimit)
    : 25;
  const currentEmployees = 20;
  const employeeUsagePct = Math.round((currentEmployees / employeeLimit) * 100);
  const isNearLimit = employeeUsagePct >= 80;

  const isTrialActive = subscription?.isTrialActive ?? true;
  const trialEndDate = subscription?.trialEndDate
    ? new Date(Number(subscription.trialEndDate / 1_000_000n))
    : new Date(Date.now() + 18 * 24 * 60 * 60 * 1000);
  const trialDaysLeft = Math.max(
    0,
    Math.ceil((trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );
  const trialPct = Math.round(((30 - trialDaysLeft) / 30) * 100);

  function openUpsell(trigger: UpsellTrigger) {
    setUpsellTrigger(trigger);
    setUpsellOpen(true);
  }

  function handleUpgrade(_planId: string) {
    setUpgradeSuccess(true);
    setUpgradeModalOpen(false);
    setTimeout(() => setUpgradeSuccess(false), 5000);
  }

  const benefitLabel: Record<string, string> = {
    starter: "For Small Teams",
    growth: "Growing Businesses",
    business: "Compliance-First",
    enterprise: "Full Protection",
  };
  const currentLabel = benefitLabel[String(tier).toLowerCase()] ?? String(tier);

  return (
    <AppShell pageTitle="Subscription & Billing">
      <div className="space-y-6">
        {upgradeSuccess && (
          <div
            className="p-4 rounded-xl border border-chart-3/30 bg-chart-3/10 text-chart-3 font-medium"
            data-ocid="billing.upgrade.success_state"
          >
            ✓ Upgrade request sent. Our team will contact you shortly.
          </div>
        )}

        {/* Hero value props */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6">
          <h2 className="text-2xl font-display font-bold text-foreground mb-1">
            Stop Paying Compliance Fines — Start Today
          </h2>
          <p className="text-muted-foreground text-sm mb-5">
            GulfHR Shield protects your business from costly penalties and keeps
            your team compliant across all Gulf countries.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {VALUE_PROPS.map((vp) => (
              <div
                key={vp.title}
                className={`flex items-start gap-3 rounded-xl border p-4 ${vp.bg}`}
              >
                <div className={`mt-0.5 shrink-0 ${vp.color}`}>
                  <vp.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-semibold text-sm ${vp.color}`}>
                    {vp.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {vp.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Plan */}
          <CardContainer data-ocid="billing.current_plan.card">
            <CardHeader
              title="Current Plan"
              action={
                <StatusBadge
                  status={isTrialActive ? "pending" : "active"}
                  label={isTrialActive ? "Trial" : "Active"}
                />
              }
            />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold text-xl font-display text-foreground">
                  {currentLabel}
                </div>
                <div className="text-xs text-muted-foreground">
                  Contact Sales for pricing
                </div>
              </div>
            </div>

            {/* Usage with urgency */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {currentEmployees} / {employeeLimit} employees
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold ${
                    isNearLimit ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {employeeUsagePct}% used
                </span>
              </div>
              <Progress
                value={employeeUsagePct}
                className={`h-2.5 ${
                  isNearLimit ? "[&>div]:bg-destructive" : "[&>div]:bg-chart-3"
                }`}
              />
              {isNearLimit && (
                <div
                  className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 mt-1"
                  data-ocid="billing.usage.error_state"
                >
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Almost at your employee limit. Upgrade to avoid compliance
                    gaps.
                  </span>
                  <button
                    type="button"
                    className="ml-auto underline font-semibold whitespace-nowrap"
                    onClick={() => openUpsell("employeeLimit")}
                    data-ocid="billing.usage.open_modal_button"
                  >
                    Upgrade now
                  </button>
                </div>
              )}
            </div>
          </CardContainer>

          {/* Trial card */}
          {isTrialActive && (
            <CardContainer data-ocid="billing.trial.card">
              <CardHeader
                title="Free Trial"
                action={
                  <StatusBadge
                    status="pending"
                    label={`${trialDaysLeft} days left`}
                  />
                }
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    Trial ends{" "}
                    {trialEndDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Upgrade before trial ends to keep your data
                  </div>
                </div>
              </div>
              <Progress value={trialPct} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1.5">
                {30 - trialDaysLeft} of 30 trial days used
              </div>
              <Button
                className="mt-4 w-full"
                onClick={() => setUpgradeModalOpen(true)}
                data-ocid="billing.upgrade.open_modal_button"
              >
                Upgrade Now — Avoid Fines
              </Button>
            </CardContainer>
          )}
        </div>

        {/* Plan Comparison with upsell triggers */}
        <CardContainer data-ocid="billing.plans.section">
          <CardHeader
            title="Plan Comparison"
            subtitle="Choose the plan that best protects your business"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUpgradeModalOpen(true)}
                data-ocid="billing.request_upgrade.button"
              >
                Request Upgrade
              </Button>
            }
          />
          <PlanComparison
            currentTier={String(tier).toLowerCase()}
            onRequestUpgrade={handleUpgrade}
            onWpsExportClick={() => openUpsell("wpsExport")}
            onAdvancedReportsClick={() => openUpsell("advancedReports")}
          />
        </CardContainer>

        {/* Payment */}
        <CardContainer data-ocid="billing.payment_method.card">
          <CardHeader
            title="Payment Method"
            action={<CreditCard className="w-5 h-5 text-muted-foreground" />}
          />
          <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/30">
            <AlertTriangle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-sm text-foreground">
                Stripe Integration Ready
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Payment gateway to be configured. Contact your administrator to
                set up Stripe in the admin panel.
              </div>
            </div>
          </div>
        </CardContainer>

        {/* Billing history */}
        <CardContainer data-ocid="billing.history.section">
          <CardHeader
            title="Billing History"
            subtitle="Past invoices and payments"
          />
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {BILLING_HISTORY.map((inv, i) => (
                  <tr key={inv.id} data-ocid={`billing.history.item.${i + 1}`}>
                    <td className="font-mono text-xs">{inv.id}</td>
                    <td className="text-sm">{inv.date}</td>
                    <td>
                      <StatusBadge status="active" label={inv.plan} size="sm" />
                    </td>
                    <td className="text-sm text-muted-foreground">
                      {inv.amount}
                    </td>
                    <td>
                      <StatusBadge status={inv.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContainer>
      </div>

      {/* Upgrade modal */}
      <Modal
        open={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        title="Request Plan Upgrade"
        description="Our sales team will reach out within 1 business day to discuss pricing and migration."
        size="md"
        data-ocid="billing.upgrade.dialog"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border text-sm text-muted-foreground">
            <strong className="text-foreground">Current plan:</strong>{" "}
            {currentLabel} ({currentEmployees}/{employeeLimit} employees)
          </div>
          <p className="text-sm text-foreground">
            By clicking confirm, we will notify our sales team of your upgrade
            request. There is no immediate charge — our team will contact you to
            finalize the plan.
          </p>
          <div className="flex gap-3 justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setUpgradeModalOpen(false)}
              data-ocid="billing.upgrade.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleUpgrade(String(tier))}
              data-ocid="billing.upgrade.confirm_button"
            >
              Confirm Request
            </Button>
          </div>
        </div>
      </Modal>

      {/* Smart Upsell Modal */}
      <SmartUpsellModal
        open={upsellOpen}
        trigger={upsellTrigger}
        onClose={() => setUpsellOpen(false)}
        onUpgrade={(plan) => {
          setUpsellOpen(false);
          handleUpgrade(plan);
        }}
      />
    </AppShell>
  );
}
