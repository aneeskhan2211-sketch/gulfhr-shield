import { useListUnreadAlerts } from "@/api/alerts";
import { useListPayrollRuns } from "@/api/payroll";
import { AlertSeverity, AlertType, PayrollStatus } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CalendarClock,
  CreditCard,
  MessageSquare,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Suggestion {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  route: string;
  urgency: "critical" | "high" | "medium";
}

export function HRAssistantWidget() {
  const alertsQuery = useListUnreadAlerts();
  const payrollQuery = useListPayrollRuns();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const suggestions = useMemo<Suggestion[]>(() => {
    const list: Suggestion[] = [];

    // Check pending payroll
    const draftPayrolls = (payrollQuery.data ?? []).filter(
      (r) => r.status === PayrollStatus.Draft,
    );
    if (draftPayrolls.length > 0) {
      list.push({
        id: "payroll-pending",
        icon: <CreditCard className="w-4 h-4" />,
        title: "Run Payroll Now",
        description: `${draftPayrolls.length} payroll run${draftPayrolls.length > 1 ? "s" : ""} pending approval — employees are waiting.`,
        actionLabel: "Run Payroll",
        route: "/payroll",
        urgency: "critical",
      });
    }

    // Visa expiry alerts
    const visaAlerts = (alertsQuery.data ?? []).filter(
      (a) =>
        a.alertType === AlertType.VisaExpiring &&
        a.severity === AlertSeverity.High,
    );
    if (visaAlerts.length > 0) {
      list.push({
        id: "visa-expiry",
        icon: <CalendarClock className="w-4 h-4" />,
        title: `${visaAlerts.length} Visa${visaAlerts.length > 1 ? "s" : ""} Expiring This Week`,
        description:
          "Expired visas can result in government fines. Renew immediately.",
        actionLabel: "View Visas",
        route: "/visa-alerts",
        urgency: "critical",
      });
    }

    // Document alerts
    const docAlerts = (alertsQuery.data ?? []).filter(
      (a) => a.alertType === AlertType.DocumentExpiring,
    );
    if (docAlerts.length > 0) {
      list.push({
        id: "doc-expiry",
        icon: <Bell className="w-4 h-4" />,
        title: `${docAlerts.length} Documents Expiring Soon`,
        description: "Passports or labor cards need renewal before they lapse.",
        actionLabel: "Fix Documents",
        route: "/documents",
        urgency: "high",
      });
    }

    // Salary reminder — always show if no other suggestions
    list.push({
      id: "salary-reminders",
      icon: <MessageSquare className="w-4 h-4" />,
      title: "Send Salary Reminders",
      description:
        "Notify employees their salary has been processed via WhatsApp.",
      actionLabel: "Send Now",
      route: "/settings",
      urgency: "medium",
    });

    return list;
  }, [alertsQuery.data, payrollQuery.data]);

  const visible = suggestions.filter((s) => !dismissed.has(s.id));

  const urgencyStyles: Record<Suggestion["urgency"], string> = {
    critical: "border-destructive/30 bg-destructive/5",
    high: "border-chart-5/30 bg-chart-5/5",
    medium: "border-accent/20 bg-accent/5",
  };

  const urgencyIconStyles: Record<Suggestion["urgency"], string> = {
    critical: "bg-destructive/15 text-destructive",
    high: "bg-chart-5/15 text-chart-5",
    medium: "bg-accent/15 text-accent",
  };

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 space-y-3 shadow-sm"
      data-ocid="dashboard.hr_assistant.card"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
          <Bell className="w-3 h-3 text-accent" />
        </div>
        <h3 className="font-display font-semibold text-sm text-foreground">
          HR Assistant Suggestions
        </h3>
        {visible.length > 0 && (
          <span className="text-[10px] font-bold bg-accent/20 text-accent rounded-full px-1.5 py-0.5 ml-auto">
            {visible.length} action{visible.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {visible.length === 0 ? (
        <div
          className="text-center py-4 text-muted-foreground"
          data-ocid="dashboard.hr_assistant.empty_state"
        >
          <p className="text-xs">✅ All caught up! No urgent actions needed.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map((s, i) => (
            <div
              key={s.id}
              className={`suggestion-card relative border ${urgencyStyles[s.urgency]} p-3 rounded-lg`}
              data-ocid={`dashboard.hr_assistant.item.${i + 1}`}
            >
              <button
                type="button"
                className="absolute top-2.5 right-2.5 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setDismissed((prev) => new Set([...prev, s.id]))}
                aria-label="Dismiss suggestion"
                data-ocid={`dashboard.hr_assistant.dismiss.${i + 1}`}
              >
                <X className="w-3 h-3" />
              </button>
              <div className="flex items-start gap-2.5 pr-5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${urgencyIconStyles[s.urgency]}`}
                >
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground leading-snug">
                    {s.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {s.description}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 h-6 text-[11px] px-2.5 gap-1"
                    onClick={() => navigate(s.route)}
                    data-ocid={`dashboard.hr_assistant.action.${i + 1}`}
                  >
                    {s.actionLabel}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
