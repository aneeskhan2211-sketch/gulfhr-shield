import { cn } from "@/lib/utils";
import type React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  "data-ocid"?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  "data-ocid": ocid,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className,
      )}
      data-ocid={ocid}
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="font-display font-semibold text-foreground text-lg mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
