import { cn } from "@/lib/utils";
import type React from "react";

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
  hover?: boolean;
  "data-ocid"?: string;
}

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-4 md:p-5",
  lg: "p-6 md:p-8",
};

export default function CardContainer({
  children,
  className,
  padding = "md",
  hover = false,
  "data-ocid": ocid,
}: CardContainerProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl",
        paddingClasses[padding],
        hover && "transition-smooth hover:shadow-md",
        className,
      )}
      data-ocid={ocid}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: CardHeaderProps) {
  return (
    <div
      className={cn("flex items-start justify-between gap-4 mb-4", className)}
    >
      <div>
        <h3 className="font-display font-semibold text-foreground text-base">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
