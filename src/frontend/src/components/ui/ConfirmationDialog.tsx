import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  "data-ocid"?: string;
}

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  "data-ocid": ocid,
}: ConfirmationDialogProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm" data-ocid={ocid}>
      <div className="flex flex-col items-center text-center gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            destructive ? "bg-destructive/10" : "bg-muted",
          )}
        >
          <AlertTriangle
            className={cn(
              "w-6 h-6",
              destructive ? "text-destructive" : "text-muted-foreground",
            )}
          />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground text-base">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            data-ocid={ocid ? `${ocid}.cancel_button` : "confirm.cancel_button"}
            className="btn-secondary flex-1"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            data-ocid={
              ocid ? `${ocid}.confirm_button` : "confirm.confirm_button"
            }
            className={cn(
              "flex-1 px-4 py-2 rounded-md font-medium transition-smooth",
              destructive
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "btn-primary",
            )}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
