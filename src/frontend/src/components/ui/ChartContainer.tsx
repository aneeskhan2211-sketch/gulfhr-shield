import { cn } from "@/lib/utils";
import type React from "react";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  height?: number;
  className?: string;
  "data-ocid"?: string;
}

export default function ChartContainer({
  title,
  subtitle,
  action,
  children,
  height = 280,
  className,
  "data-ocid": ocid,
}: ChartContainerProps) {
  return (
    <div
      className={cn("bg-card border border-border rounded-xl p-5", className)}
      data-ocid={ocid}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-foreground text-sm">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div style={{ height }}>{children}</div>
    </div>
  );
}
