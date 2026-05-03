import { cn } from "@/lib/utils";

type StatusVariant =
  | "valid"
  | "expiring"
  | "expired"
  | "active"
  | "draft"
  | "hr-approved"
  | "accountant-reviewed"
  | "owner-approved"
  | "exported"
  | "paid"
  | "pending"
  | "inactive"
  | "suspended"
  | "on-leave"
  | "info";

interface StatusBadgeProps {
  status: StatusVariant | string;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

const variantMap: Record<string, string> = {
  valid: "bg-chart-3/20 text-chart-3 border border-chart-3/30",
  expiring: "bg-chart-5/20 text-chart-5 border border-chart-5/30",
  "expiring soon": "bg-chart-5/20 text-chart-5 border border-chart-5/30",
  expired: "bg-destructive/20 text-destructive border border-destructive/30",
  active: "bg-chart-1/20 text-chart-1 border border-chart-1/30",
  draft: "bg-muted text-muted-foreground border border-border",
  "hr-approved": "bg-chart-1/20 text-chart-1 border border-chart-1/30",
  hrapproved: "bg-chart-1/20 text-chart-1 border border-chart-1/30",
  "accountant-reviewed": "bg-chart-4/20 text-chart-4 border border-chart-4/30",
  accountantreviewed: "bg-chart-4/20 text-chart-4 border border-chart-4/30",
  "owner-approved": "bg-chart-2/20 text-chart-2 border border-chart-2/30",
  ownerapproved: "bg-chart-2/20 text-chart-2 border border-chart-2/30",
  exported: "bg-chart-3/20 text-chart-3 border border-chart-3/30",
  paid: "bg-chart-3/20 text-chart-3 border border-chart-3/30",
  pending: "bg-chart-2/20 text-chart-2 border border-chart-2/30",
  inactive: "bg-muted text-muted-foreground border border-border",
  suspended: "bg-destructive/20 text-destructive border border-destructive/30",
  "on-leave": "bg-chart-4/20 text-chart-4 border border-chart-4/30",
  onleave: "bg-chart-4/20 text-chart-4 border border-chart-4/30",
  info: "bg-chart-1/20 text-chart-1 border border-chart-1/30",
  generated: "bg-chart-3/20 text-chart-3 border border-chart-3/30",
  submitted: "bg-chart-4/20 text-chart-4 border border-chart-4/30",
  failed: "bg-destructive/20 text-destructive border border-destructive/30",
  success: "bg-chart-3/20 text-chart-3 border border-chart-3/30",
  failure: "bg-destructive/20 text-destructive border border-destructive/30",
};

const defaultVariant = "bg-muted text-muted-foreground border border-border";

export default function StatusBadge({
  status,
  label,
  size = "md",
  className,
}: StatusBadgeProps) {
  const key = status.toLowerCase().replace(/\s/g, "");
  const classes =
    variantMap[key] ?? variantMap[status.toLowerCase()] ?? defaultVariant;
  const displayLabel = label ?? status;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        classes,
        className,
      )}
    >
      {displayLabel}
    </span>
  );
}
