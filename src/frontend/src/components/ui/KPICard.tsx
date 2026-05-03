import { cn } from "@/lib/utils";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type React from "react";

interface KPICardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  accent?: "primary" | "accent" | "destructive" | "success" | "warning";
  className?: string;
  "data-ocid"?: string;
}

const accentClasses = {
  primary: "border-l-4 border-l-primary",
  accent: "border-l-4 border-l-chart-2",
  destructive: "border-l-4 border-l-destructive",
  success: "border-l-4 border-l-chart-3",
  warning: "border-l-4 border-l-chart-5",
};

export default function KPICard({
  label,
  value,
  change,
  changeType = "neutral",
  icon,
  accent = "primary",
  className,
  "data-ocid": ocid,
}: KPICardProps) {
  const ChangeIcon =
    changeType === "positive"
      ? TrendingUp
      : changeType === "negative"
        ? TrendingDown
        : Minus;

  const changeColor =
    changeType === "positive"
      ? "text-chart-3"
      : changeType === "negative"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <div
      className={cn("kpi-card", accentClasses[accent], className)}
      data-ocid={ocid}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            {label}
          </p>
          <p className="text-3xl font-display font-bold text-foreground leading-none">
            {value}
          </p>
          {change && (
            <p
              className={cn(
                "flex items-center gap-1 text-xs mt-2",
                changeColor,
              )}
            >
              <ChangeIcon className="w-3 h-3" />
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
