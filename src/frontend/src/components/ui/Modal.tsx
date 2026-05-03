import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  "data-ocid"?: string;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  "data-ocid": ocid,
}: ModalProps) {
  const panelRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      panelRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby={title ? `${ocid}-title` : undefined}
      data-ocid={ocid}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onClose()}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      />

      {/* Panel */}
      <dialog
        ref={panelRef}
        open
        className={cn(
          "relative w-full bg-card border border-border rounded-xl shadow-xl outline-none",
          "animate-in fade-in zoom-in-95 duration-200",
          sizeClasses[size],
        )}
        data-ocid={ocid ? `${ocid}.dialog` : undefined}
      >
        {/* Header */}
        {(title || !!onClose) && (
          <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
            <div>
              {title && (
                <h2
                  id={ocid ? `${ocid}-title` : undefined}
                  className="text-lg font-display font-semibold text-foreground"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              data-ocid={ocid ? `${ocid}.close_button` : "modal.close_button"}
              className="ml-4 text-muted-foreground hover:text-foreground transition-colors rounded-md p-1 hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 pt-4">{children}</div>
      </dialog>
    </div>
  );
}
