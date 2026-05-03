import { createActor } from "@/backend";
import type { ApiError } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";

// Re-export useActor with createActor for convenience
export function useBackendActor() {
  return useActor(createActor);
}

// Helper to unwrap Result types
export function unwrapResult<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: ApiError }
): T {
  if (result.__kind__ === "ok") return result.ok;
  const err = result.err;
  if (err.__kind__ === "forbidden") throw new Error(err.forbidden);
  if (err.__kind__ === "invalidInput") throw new Error(err.invalidInput);
  if (err.__kind__ === "notFound") throw new Error(err.notFound);
  if (err.__kind__ === "limitExceeded") throw new Error(err.limitExceeded);
  if (err.__kind__ === "unauthorized") throw new Error(err.unauthorized);
  throw new Error("Unknown error");
}

// Timestamp helpers
export function timestampToDate(ts: bigint): Date {
  return new Date(Number(ts / 1_000_000n));
}

export function dateToTimestamp(date: Date): bigint {
  return BigInt(date.getTime()) * 1_000_000n;
}

export function formatDate(ts: bigint): string {
  return timestampToDate(ts).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatCurrency(amount: bigint, currency = "AED"): string {
  const num = Number(amount) / 100;
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(num);
}

export function getDaysUntilExpiry(expiryTs: bigint): number {
  const expiry = timestampToDate(expiryTs);
  const now = new Date();
  return Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getVisaStatus(
  expiryTs: bigint,
  thresholds = [7, 30, 60]
): "valid" | "expiring" | "expired" {
  const days = getDaysUntilExpiry(expiryTs);
  if (days < 0) return "expired";
  const warnDays = Math.max(...thresholds);
  if (days <= warnDays) return "expiring";
  return "valid";
}
