import { formatDate } from "@/api/backend";
import { useGetMyProfile } from "@/api/company";
import { useApprovePayrollRun } from "@/api/payroll";
import StatusBadge from "@/components/ui/StatusBadge";
import { PayrollStatus, UserRole } from "@/types";
import type { PayrollRun } from "@/types";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STAGES: {
  status: PayrollStatus;
  label: string;
  role: UserRole;
  next: PayrollStatus;
}[] = [
  {
    status: PayrollStatus.Draft,
    label: "Draft",
    role: UserRole.HRManager,
    next: PayrollStatus.HRApproved,
  },
  {
    status: PayrollStatus.HRApproved,
    label: "HR Approved",
    role: UserRole.Accountant,
    next: PayrollStatus.AccountantReviewed,
  },
  {
    status: PayrollStatus.AccountantReviewed,
    label: "Accountant Reviewed",
    role: UserRole.CompanyOwner,
    next: PayrollStatus.OwnerApproved,
  },
  {
    status: PayrollStatus.OwnerApproved,
    label: "Owner Approved",
    role: UserRole.CompanyOwner,
    next: PayrollStatus.Exported,
  },
  {
    status: PayrollStatus.Exported,
    label: "Exported",
    role: UserRole.CompanyOwner,
    next: PayrollStatus.Paid,
  },
  {
    status: PayrollStatus.Paid,
    label: "Paid",
    role: UserRole.CompanyOwner,
    next: PayrollStatus.Paid,
  },
];

const STATUS_ORDER: Record<string, number> = {
  [PayrollStatus.Draft]: 0,
  [PayrollStatus.HRApproved]: 1,
  [PayrollStatus.AccountantReviewed]: 2,
  [PayrollStatus.OwnerApproved]: 3,
  [PayrollStatus.Exported]: 4,
  [PayrollStatus.Paid]: 5,
};

function getApproverInfo(run: PayrollRun, stage: (typeof STAGES)[number]) {
  if (stage.status === PayrollStatus.HRApproved) {
    return { by: run.hrApprovedBy, at: run.hrApprovedAt };
  }
  if (stage.status === PayrollStatus.AccountantReviewed) {
    return { by: run.accountantReviewedBy, at: run.accountantReviewedAt };
  }
  if (stage.status === PayrollStatus.OwnerApproved) {
    return { by: run.ownerApprovedBy, at: run.ownerApprovedAt };
  }
  return { by: undefined, at: undefined };
}

interface ApprovalChainProps {
  run: PayrollRun;
}

export default function ApprovalChain({ run }: ApprovalChainProps) {
  const { data: profile } = useGetMyProfile();
  const approve = useApprovePayrollRun();
  const [comment, setComment] = useState("");

  const currentOrder = STATUS_ORDER[run.status] ?? 0;

  // Determine next stage this user can approve
  const nextStage = STAGES.find(
    (s) => STATUS_ORDER[s.status] === currentOrder + 1,
  );
  const canApprove =
    nextStage !== undefined &&
    profile !== null &&
    (profile?.role === nextStage.role ||
      profile?.role === UserRole.SuperAdmin ||
      (nextStage.role === UserRole.CompanyOwner &&
        profile?.role === UserRole.CompanyOwner)) &&
    run.status !== PayrollStatus.Paid;

  async function handleApprove() {
    if (!nextStage) return;
    try {
      await approve.mutateAsync({ id: run.id, status: nextStage.next });
      toast.success(`Payroll advanced to ${nextStage.label}`);
      setComment("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Approval failed");
    }
  }

  return (
    <div className="space-y-4">
      {/* Horizontal stepper */}
      <div className="flex items-center gap-0 overflow-x-auto pb-1">
        {STAGES.map((stage, i) => {
          const order = STATUS_ORDER[stage.status];
          const done = currentOrder > order;
          const active = currentOrder === order;
          return (
            <div key={stage.status} className="flex items-center">
              <div className="flex flex-col items-center gap-1 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    done
                      ? "bg-chart-3 border-chart-3 text-white"
                      : active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : active ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium text-center whitespace-nowrap ${
                    done
                      ? "text-chart-3"
                      : active
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {i < STAGES.length - 1 && (
                <div
                  className={`h-0.5 w-8 md:w-12 shrink-0 mx-1 ${
                    currentOrder > order ? "bg-chart-3" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Approval records */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {STAGES.filter((s) =>
          [
            PayrollStatus.HRApproved,
            PayrollStatus.AccountantReviewed,
            PayrollStatus.OwnerApproved,
          ].includes(s.status),
        ).map((stage) => {
          const info = getApproverInfo(run, stage);
          const done = STATUS_ORDER[run.status] > STATUS_ORDER[stage.status];
          const current = run.status === stage.status;
          return (
            <div
              key={stage.status}
              className={`rounded-lg border p-3 ${
                done
                  ? "border-chart-3/30 bg-chart-3/5"
                  : current
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-background"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {done ? (
                  <CheckCircle2 className="w-4 h-4 text-chart-3 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                <span className="text-sm font-medium text-foreground">
                  {stage.label}
                </span>
              </div>
              {done && info.at ? (
                <p className="text-xs text-muted-foreground">
                  {formatDate(info.at)}
                </p>
              ) : current ? (
                <StatusBadge status="pending" label="Awaiting" size="sm" />
              ) : (
                <StatusBadge status="draft" label="Not reached" size="sm" />
              )}
            </div>
          );
        })}
      </div>

      {/* Approval action */}
      {canApprove && nextStage && (
        <div className="border border-primary/20 bg-primary/5 rounded-lg p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">
            Advance to{" "}
            <strong>{nextStage.next.replace(/([A-Z])/g, " $1").trim()}</strong>
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Optional approval notes…"
            rows={2}
            className="form-input w-full resize-none text-sm"
            data-ocid="approval.notes.textarea"
          />
          <button
            type="button"
            onClick={handleApprove}
            disabled={approve.isPending}
            className="btn-primary text-sm"
            data-ocid="approval.approve_button"
          >
            {approve.isPending
              ? "Processing…"
              : `Approve — Advance to ${nextStage.next.replace(/([A-Z])/g, " $1").trim()}`}
          </button>
        </div>
      )}
    </div>
  );
}
