import { formatDate } from "@/api/backend";
import { unwrapResult } from "@/api/backend";
import { useGetDocument } from "@/api/documents";
import { createActor } from "@/backend";
import type { DocumentId } from "@/backend";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import { DocumentType } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { Download, ExternalLink, FileText } from "lucide-react";
import { useEffect, useState } from "react";

const DOC_TYPE_LABELS: Record<string, string> = {
  PassportCopy: "Passport Copy",
  Visa: "Visa",
  ID: "Emirates / National ID",
  Contract: "Contract",
  Insurance: "Insurance",
  Medical: "Medical Card",
  BankDocuments: "Bank Documents",
};

function getExpiryStatus(ts?: bigint): "valid" | "expiring" | "expired" {
  if (!ts) return "valid";
  const days = Math.floor((Number(ts / 1_000_000n) - Date.now()) / 86_400_000);
  if (days < 0) return "expired";
  if (days <= 60) return "expiring";
  return "valid";
}

function formatBytes(bytes: bigint): string {
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

interface DocumentPreviewModalProps {
  documentId: DocumentId | null;
  employeeName?: string;
  open: boolean;
  onClose: () => void;
}

export default function DocumentPreviewModal({
  documentId,
  employeeName,
  open,
  onClose,
}: DocumentPreviewModalProps) {
  const { data: doc, isLoading } = useGetDocument(
    open ? (documentId ?? undefined) : undefined,
  );
  const { actor } = useActor(createActor);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingBlob, setLoadingBlob] = useState(false);

  const logDownload = useMutation({
    mutationFn: async (id: DocumentId) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.logDocumentDownload(id));
    },
  });

  useEffect(() => {
    if (!doc || !open) {
      setPreviewUrl(null);
      return;
    }
    let revoked = false;
    const isImage = doc.mimeType.startsWith("image/");
    const isPdf = doc.mimeType === "application/pdf";
    if (!isImage && !isPdf) return;

    setLoadingBlob(true);
    doc.blob.getBytes().then((bytes) => {
      if (revoked) return;
      const blob = new Blob([bytes], { type: doc.mimeType });
      setPreviewUrl(URL.createObjectURL(blob));
      setLoadingBlob(false);
    });

    return () => {
      revoked = true;
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [doc, open]);

  async function handleDownload() {
    if (!doc || !documentId) return;
    await logDownload.mutateAsync(documentId);
    const bytes = await doc.blob.getBytes();
    const blob = new Blob([bytes], { type: doc.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  const expiryStatus = doc?.expiryDate ? getExpiryStatus(doc.expiryDate) : null;
  const canPreview =
    doc?.mimeType.startsWith("image/") || doc?.mimeType === "application/pdf";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Document Preview"
      description={employeeName ? `Employee: ${employeeName}` : undefined}
      size="xl"
      data-ocid="doc_preview"
    >
      {isLoading || !doc ? (
        <div
          className="flex items-center justify-center py-16"
          data-ocid="doc_preview.loading_state"
        >
          <LoadingSpinner size="lg" label="Loading document…" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* File metadata row */}
          <div className="flex flex-wrap items-start justify-between gap-3 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground text-sm truncate">
                  {doc.fileName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {DOC_TYPE_LABELS[doc.documentType] ?? doc.documentType} ·{" "}
                  {formatBytes(doc.fileSize)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {expiryStatus && (
                <StatusBadge
                  status={expiryStatus}
                  label={
                    expiryStatus === "valid"
                      ? "Valid"
                      : expiryStatus === "expiring"
                        ? "Expiring Soon"
                        : "Expired"
                  }
                />
              )}
              <button
                type="button"
                onClick={handleDownload}
                disabled={logDownload.isPending}
                data-ocid="doc_preview.download_button"
                className="btn-primary flex items-center gap-1.5 py-1.5"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Uploaded</p>
              <p className="font-medium text-foreground">
                {formatDate(doc.createdAt)}
              </p>
            </div>
            {doc.expiryDate && (
              <div>
                <p className="text-xs text-muted-foreground">Expires</p>
                <p className="font-medium text-foreground">
                  {formatDate(doc.expiryDate)}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">MIME type</p>
              <p className="font-medium text-foreground truncate">
                {doc.mimeType}
              </p>
            </div>
          </div>

          {/* Preview area */}
          {canPreview ? (
            <div
              className="rounded-xl border border-border bg-muted/20 overflow-hidden min-h-48 flex items-center justify-center"
              data-ocid="doc_preview.canvas_target"
            >
              {loadingBlob ? (
                <LoadingSpinner size="md" label="Loading preview…" />
              ) : previewUrl ? (
                doc.mimeType === "application/pdf" ? (
                  <iframe
                    src={previewUrl}
                    title={doc.fileName}
                    className="w-full h-96"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt={doc.fileName}
                    className="max-h-96 max-w-full object-contain"
                  />
                )
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8 text-center bg-muted/20 rounded-xl border border-border">
              <FileText className="w-10 h-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Preview not available for this file type.
              </p>
              <button
                type="button"
                onClick={handleDownload}
                data-ocid="doc_preview.open_modal_button"
                className="btn-secondary flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                Download to view
              </button>
            </div>
          )}

          {/* Security notice */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 border border-border rounded-lg px-3 py-2.5">
            <span>🔒</span>
            <span>
              All files are encrypted at rest on the Internet Computer and
              decrypted on-demand for authorized users.
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}
