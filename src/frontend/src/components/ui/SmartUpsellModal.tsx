import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

export type UpsellTrigger = "employeeLimit" | "wpsExport" | "advancedReports";

interface Plan {
  name: string;
  price: string;
  currency: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "99",
    currency: "AED/mo",
    features: [
      "Up to 10 employees",
      "Basic payroll",
      "Visa alerts",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "249",
    currency: "AED/mo",
    features: [
      "Up to 50 employees",
      "Full payroll + WPS",
      "Compliance score",
      "Document vault",
      "Priority support",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "599",
    currency: "AED/mo",
    features: [
      "Unlimited employees",
      "Multi-branch",
      "Advanced reports",
      "API access",
      "Dedicated support",
    ],
    badge: "Best Value",
  },
];

const TRIGGER_CONFIG: Record<
  UpsellTrigger,
  {
    icon: React.ReactNode;
    headline: string;
    subheadline: string;
    urgency: string;
  }
> = {
  employeeLimit: {
    icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
    headline: "Employee Limit Reached",
    subheadline:
      "You've reached your plan limit. Upgrade now to add more employees and avoid compliance gaps.",
    urgency: "Adding employees without tracking is a compliance risk.",
  },
  wpsExport: {
    icon: <Zap className="w-6 h-6 text-primary" />,
    headline: "Unlock WPS File Export",
    subheadline:
      "WPS exports are required by Gulf labour laws. Upgrade to download compliant salary files for UAE, KSA, Oman & Qatar.",
    urgency: "Late WPS submission can result in fines up to AED 50,000.",
  },
  advancedReports: {
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    headline: "Advanced Reports Available on Higher Plans",
    subheadline:
      "Unlock ROI dashboards, compliance trend reports, and penalty exposure summaries.",
    urgency: "Companies using data-driven HR reduce compliance costs by 40%.",
  },
};

interface SmartUpsellModalProps {
  open: boolean;
  trigger: UpsellTrigger;
  onClose: () => void;
  onUpgrade?: (plan: string) => void;
}

export function SmartUpsellModal({
  open,
  trigger,
  onClose,
  onUpgrade,
}: SmartUpsellModalProps) {
  const config = TRIGGER_CONFIG[trigger];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-3xl p-0 overflow-hidden"
        data-ocid="upsell.dialog"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-card px-6 pt-6 pb-5 border-b border-border">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                {config.icon}
              </div>
              <div>
                <DialogTitle className="text-xl font-display font-bold text-foreground">
                  {config.headline}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {config.subheadline}
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="mt-3 flex items-center gap-2 text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-md px-3 py-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="text-xs font-medium">{config.urgency}</span>
          </div>
        </div>

        {/* Plan comparison */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">
              Choose the right plan for your business
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "rounded-xl border p-4 flex flex-col gap-3 transition-all",
                  plan.highlighted
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border bg-card",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground text-sm">
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        plan.highlighted &&
                          "bg-primary/20 text-primary border-primary/30",
                      )}
                    >
                      {plan.badge}
                    </Badge>
                  )}
                </div>
                <div>
                  <span className="text-2xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {plan.currency}
                  </span>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  size="sm"
                  variant={plan.highlighted ? "default" : "outline"}
                  className={cn(
                    "w-full mt-1 font-semibold",
                    plan.highlighted && "bg-primary hover:bg-primary/90",
                  )}
                  data-ocid={`upsell.${plan.name.toLowerCase()}.confirm_button`}
                  onClick={() => {
                    onUpgrade?.(plan.name);
                    onClose();
                  }}
                >
                  {plan.highlighted ? "Upgrade Now" : `Choose ${plan.name}`}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            All plans include 14-day free trial · No credit card required
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            data-ocid="upsell.cancel_button"
            onClick={onClose}
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
