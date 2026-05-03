import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Minus,
  Quote,
  Star,
} from "lucide-react";
import { useState } from "react";

const PLANS = [
  {
    id: "starter",
    name: "For Small Teams",
    internalName: "Starter",
    limit: "Up to 25 employees",
    description: "Perfect for SMEs just getting started",
    priceAED: 99,
    penaltySaving: "Avoid up to AED 15,000 in fines per year",
  },
  {
    id: "growth",
    name: "Growing Businesses",
    internalName: "Growth",
    limit: "Up to 100 employees",
    description: "WPS, payroll & compliance all-in-one",
    priceAED: 249,
    penaltySaving: "Avoid up to AED 50,000 in fines per year",
    recommended: true,
  },
  {
    id: "business",
    name: "Compliance-First",
    internalName: "Business",
    limit: "Up to 500 employees",
    description: "Advanced compliance for mid-size teams",
    priceAED: 599,
    penaltySaving: "Avoid up to AED 150,000 in fines per year",
  },
  {
    id: "enterprise",
    name: "Full Protection",
    internalName: "Enterprise",
    limit: "Unlimited employees",
    description: "Maximum compliance coverage",
    priceAED: 0,
    penaltySaving: "Unlimited penalty protection — custom quote",
  },
];

const FEATURES: {
  label: string;
  starter: boolean;
  growth: boolean;
  business: boolean;
  enterprise: boolean;
}[] = [
  {
    label: "Employee management",
    starter: true,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    label: "Visa & expiry alerts",
    starter: true,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    label: "Document vault",
    starter: true,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    label: "Run Payroll",
    starter: true,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    label: "Download WPS File",
    starter: true,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    label: "Attendance tracking",
    starter: false,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    label: "Fix Compliance Issues (reports)",
    starter: false,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    label: "Multi-branch support",
    starter: false,
    growth: false,
    business: true,
    enterprise: true,
  },
  {
    label: "Custom WPS templates",
    starter: false,
    growth: false,
    business: true,
    enterprise: true,
  },
  {
    label: "API access",
    starter: false,
    growth: false,
    business: false,
    enterprise: true,
  },
  {
    label: "Dedicated account manager",
    starter: false,
    growth: false,
    business: false,
    enterprise: true,
  },
  {
    label: "SLA guarantee",
    starter: false,
    growth: false,
    business: false,
    enterprise: true,
  },
];

const FAQS = [
  {
    q: "What is WPS and why is compliance critical in the UAE?",
    a: "The Wages Protection System (WPS) is mandated by the UAE Ministry of Human Resources. Employers must submit salary files within deadlines or face fines up to AED 50,000 per payroll cycle, plus the risk of a business freeze. GulfHR Shield automates WPS file generation in the correct SIF format.",
  },
  {
    q: "How does visa tracking help avoid government penalties?",
    a: "Gulf labour authorities can issue fines of AED 500–AED 50,000 per expired visa if employees continue working. Our system alerts you 90, 60, and 30 days before any passport or visa expiry — giving you time to renew without penalties.",
  },
  {
    q: "What are the payroll deadline rules in Saudi Arabia?",
    a: "Saudi Arabia's Musaned/WPS system requires salary payments within the 7th of each month. Violations can result in a Nitaqat compliance downgrade, restricting your ability to issue new visas and sponsor workers — a business-critical risk for any Gulf SME.",
  },
  {
    q: "Does GulfHR Shield support Oman and Qatar labour law?",
    a: "Yes. We generate MOL-compliant payroll files for Oman and support Qatar's WPS format. Country-specific fine structures are built into the Penalty Calculator so you always see your real exposure per region.",
  },
  {
    q: "Can I import my existing employees from Excel or CSV?",
    a: "Absolutely. Use our 1-Click Employee Import to upload your Excel or CSV file, auto-map columns (name, salary, visa, passport, nationality), preview records, and bulk-create employees in seconds — no manual data entry required.",
  },
];

const TESTIMONIALS = [
  {
    name: "Fatima Al Rashidi",
    title: "HR Manager, Dubai Construction Co.",
    country: "🇦🇪 UAE",
    text: "We avoided over AED 120,000 in WPS fines in our first year. The visa expiry alerts alone saved us three visa renewals we had completely missed.",
    stars: 5,
  },
  {
    name: "Omar Khalid",
    title: "CFO, Riyadh Logistics Group",
    country: "🇸🇦 Saudi Arabia",
    text: "Payroll used to take us 3 days. Now it takes 20 minutes. The compliance score gives our board real confidence that we're operating within Saudi labour law.",
    stars: 5,
  },
  {
    name: "Aisha Al Balushi",
    title: "Operations Director, Muscat Retail Group",
    country: "🇴🇲 Oman",
    text: "The MOL-compliant payroll export is exactly what we needed. We were previously using a spreadsheet and risking fines every month. Not anymore.",
    stars: 5,
  },
];

interface PlanComparisonProps {
  currentTier?: string;
  onRequestUpgrade: (planId: string) => void;
  onWpsExportClick?: () => void;
  onAdvancedReportsClick?: () => void;
}

export default function PlanComparison({
  currentTier = "starter",
  onRequestUpgrade,
  onWpsExportClick,
  onAdvancedReportsClick,
}: PlanComparisonProps) {
  const [annual, setAnnual] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleUpgrade(planId: string) {
    onRequestUpgrade(planId);
    setUpgradeSuccess(planId);
    setTimeout(() => setUpgradeSuccess(null), 4000);
  }

  function effectivePrice(priceAED: number) {
    if (priceAED === 0) return null;
    const p = annual ? Math.round(priceAED * 0.8) : priceAED;
    const usd = Math.round(p / 3.67);
    return { aed: p, usd };
  }

  return (
    <div data-ocid="billing.plan_comparison.section">
      {upgradeSuccess && (
        <div
          className="mb-4 p-4 rounded-lg border border-chart-3/30 bg-chart-3/10 text-chart-3 text-sm font-medium"
          data-ocid="billing.upgrade.success_state"
        >
          ✓ Upgrade request sent. Our team will contact you shortly.
        </div>
      )}

      {/* Annual toggle */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span
          className={cn(
            "text-sm",
            !annual ? "font-semibold text-foreground" : "text-muted-foreground",
          )}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          onClick={() => setAnnual(!annual)}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            annual ? "bg-primary border-primary" : "bg-muted border-border",
          )}
          data-ocid="billing.annual_toggle.switch"
        >
          <span
            className={cn(
              "inline-block h-4 w-4 rounded-full bg-background shadow transition-transform",
              annual ? "translate-x-5" : "translate-x-1",
            )}
          />
        </button>
        <span
          className={cn(
            "text-sm flex items-center gap-1.5",
            annual ? "font-semibold text-foreground" : "text-muted-foreground",
          )}
        >
          Annual
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">
            Save 20%
          </span>
        </span>
      </div>

      {/* Plan table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left px-4 py-4 text-muted-foreground font-medium w-52">
                Features
              </th>
              {PLANS.map((plan) => (
                <th key={plan.id} className="px-3 py-4 text-center min-w-36">
                  <div
                    className={cn(
                      "rounded-xl p-3 border relative",
                      plan.id === currentTier
                        ? "border-primary/40 bg-primary/5"
                        : plan.recommended
                          ? "border-accent/40 bg-accent/5"
                          : "border-border bg-muted/30",
                    )}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-accent text-accent-foreground text-xs font-bold px-3 py-0.5 shadow-sm">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    {plan.id === currentTier && (
                      <div className="text-xs font-semibold text-primary mb-1">
                        CURRENT
                      </div>
                    )}
                    <div className="font-bold text-foreground font-display text-sm leading-tight">
                      {plan.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 font-medium">
                      {plan.internalName}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {plan.limit}
                    </div>

                    {/* Pricing */}
                    {(() => {
                      const p = effectivePrice(plan.priceAED);
                      return p ? (
                        <div className="mt-2">
                          <div className="font-bold text-foreground">
                            AED {p.aed}
                            <span className="text-xs font-normal text-muted-foreground">
                              /mo
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ~${p.usd} USD
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 text-xs font-semibold text-muted-foreground">
                          Contact Sales
                        </div>
                      );
                    })()}

                    {/* Penalty saving */}
                    <div className="mt-2 text-xs text-emerald-400 font-medium leading-tight">
                      {plan.penaltySaving}
                    </div>

                    {plan.id !== currentTier && (
                      <Button
                        size="sm"
                        variant={plan.recommended ? "default" : "outline"}
                        className="mt-3 w-full text-xs h-7"
                        onClick={() => handleUpgrade(plan.id)}
                        data-ocid={`billing.upgrade_${plan.id}.button`}
                      >
                        {plan.priceAED === 0 ? "Contact Sales" : "Upgrade"}
                      </Button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((feature, i) => (
              <tr
                key={feature.label}
                className={cn(
                  "border-t border-border",
                  i % 2 === 0 ? "bg-muted/20" : "bg-background",
                )}
              >
                <td className="px-4 py-3 text-foreground">{feature.label}</td>
                {PLANS.map((plan) => (
                  <td key={plan.id} className="px-4 py-3 text-center">
                    {feature[plan.id as keyof typeof feature] ? (
                      feature.label === "Download WPS File" ? (
                        <button
                          type="button"
                          className="mx-auto flex items-center justify-center"
                          onClick={onWpsExportClick}
                          aria-label="Download WPS File"
                        >
                          <Check className="w-4 h-4 text-chart-3" />
                        </button>
                      ) : feature.label ===
                        "Fix Compliance Issues (reports)" ? (
                        <button
                          type="button"
                          className="mx-auto flex items-center justify-center"
                          onClick={onAdvancedReportsClick}
                          aria-label="Advanced Reports"
                        >
                          <Check className="w-4 h-4 text-chart-3" />
                        </button>
                      ) : (
                        <Check className="w-4 h-4 text-chart-3 mx-auto" />
                      )
                    ) : (
                      <Minus className="w-4 h-4 text-border mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Testimonials */}
      <div className="mt-10">
        <h3 className="text-lg font-display font-bold text-foreground mb-1">
          Trusted by Gulf Businesses
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Real results from companies just like yours
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
            >
              <Quote className="w-5 h-5 text-primary/40" />
              <p className="text-sm text-foreground leading-relaxed flex-1">
                {t.text}
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    // biome-ignore lint/suspicious/noArrayIndexKey: decorative stars - order never changes
                    key={i}
                    className="w-3.5 h-3.5 fill-accent text-accent"
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">
                  {t.name}
                </div>
                <div className="text-xs text-muted-foreground">{t.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {t.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-10">
        <h3 className="text-lg font-display font-bold text-foreground mb-1">
          Compliance FAQs
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Everything you need to know about Gulf HR compliance
        </p>
        <div
          className="divide-y divide-border border border-border rounded-xl overflow-hidden"
          data-ocid="billing.faq.section"
        >
          {FAQS.map((faq, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: FAQ items are static and never reordered
            <div key={i}>
              <button
                type="button"
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                data-ocid={`billing.faq.item.${i + 1}`}
                aria-expanded={openFaq === i}
              >
                <span className="font-medium text-sm text-foreground">
                  {faq.q}
                </span>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
