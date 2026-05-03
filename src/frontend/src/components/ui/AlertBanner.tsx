import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import type React from "react";

type AlertVariant = "info" | "warning" | "error" | "success";

interface AlertBannerProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
  "data-ocid"?: string;
}

const variantConfig: Record<
  AlertVariant,
  { icon: React.ElementType; classes: string }
> = {
  info: { icon: Info, classes: "bg-chart-1/10 border-chart-1/30 text-chart-1" },
  warning: {
    icon: AlertTriangle,
    classes: "bg-chart-2/10 border-chart-2/30 text-chart-2",
  },
  error: {
    icon: AlertTriangle,
    classes: "bg-destructive/10 border-destructive/30 text-destructive",
  },
  success: {
    icon: CheckCircle2,
    classes: "bg-chart-3/10 border-chart-3/30 text-chart-3",
  },
};

export default function AlertBanner({
  variant = "info",
  title,
  message,
  onDismiss,
  className,
  "data-ocid": ocid,
}: AlertBannerProps) {
  const { icon: Icon, classes } = variantConfig[variant];
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border text-sm",
        classes,
        className,
      )}
      data-ocid={ocid}
    >
      <Icon className="w-4 h-4 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        <p className="opacity-90">{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
