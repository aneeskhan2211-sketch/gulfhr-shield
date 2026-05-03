import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted/60", className)} />
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 space-y-3 shadow-sm",
        className,
      )}
      data-ocid="skeleton.card"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-3 w-48" />
    </div>
  );
}

export function SkeletonKPI({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 space-y-2 shadow-sm",
        className,
      )}
      data-ocid="skeleton.kpi"
    >
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-10 w-28" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

interface SkeletonTableProps {
  rows?: number;
  cols?: number;
  className?: string;
}

export function SkeletonTable({
  rows = 5,
  cols = 4,
  className,
}: SkeletonTableProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card overflow-hidden",
        className,
      )}
      data-ocid="skeleton.table"
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/30">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton
            // biome-ignore lint/suspicious/noArrayIndexKey: stable skeleton
            key={i}
            className="h-3 flex-1"
          />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: stable skeleton
          key={rowIdx}
          className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0"
        >
          {Array.from({ length: cols }).map((_, colIdx) => (
            <Skeleton
              // biome-ignore lint/suspicious/noArrayIndexKey: stable skeleton
              key={colIdx}
              className={cn(
                "h-4 flex-1",
                colIdx === 0 && "max-w-[40px] rounded-full",
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
