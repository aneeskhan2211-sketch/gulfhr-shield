import { dateToTimestamp } from "@/api/backend";
import { useUploadDocument } from "@/api/documents";
import { useListEmployees } from "@/api/employees";
import { ExternalBlob } from "@/backend";
import FileUploadZone from "@/components/ui/FileUploadZone";
import Modal from "@/components/ui/Modal";
import { DocumentType } from "@/types";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
}

const DOC_TYPE_LABELS: Record<DocumentType, string> = {
  [DocumentType.PassportCopy]: "Passport Copy",
  [DocumentType.Visa]: "Visa",
  [DocumentType.ID]: "Emirates / National ID",
  [DocumentType.Contract]: "Contract",
  [DocumentType.Insurance]: "Insurance",
  [DocumentType.Medical]: "Medical Card",
  [DocumentType.BankDocuments]: "Bank Documents",
};

export default function DocumentUploadModal({
  open,
  onClose,
}: DocumentUploadModalProps) {
  const { data: employees = [] } = useListEmployees();
  const upload = useUploadDocument();

  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<DocumentType>(
    DocumentType.PassportCopy,
  );
  const [employeeId, setEmployeeId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [progress, setProgress] = useState(0);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredEmployees = employees.filter((e) =>
    e.fullName.toLowerCase().includes(employeeSearch.toLowerCase()),
  );

  function reset() {
    setFile(null);
    setDocType(DocumentType.PassportCopy);
    setEmployeeId("");
    setExpiryDate("");
    setEmployeeSearch("");
    setProgress(0);
    setSucceeded(false);
    setError(null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !employeeId) return;
    setError(null);
    setProgress(0);

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setProgress(pct),
      );

      await upload.mutateAsync({
        blob,
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        fileSize: BigInt(file.size),
        documentType: docType,
        employeeId: BigInt(employeeId),
        expiryDate: expiryDate
          ? dateToTimestamp(new Date(expiryDate))
          : undefined,
      });

      setSucceeded(true);
      setTimeout(() => {
        handleClose();
      }, 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Upload Document"
      description="Add a document to an employee's secure vault."
      size="lg"
      data-ocid="upload_doc"
    >
      {succeeded ? (
        <div
          className="flex flex-col items-center gap-3 py-8"
          data-ocid="upload_doc.success_state"
        >
          <div className="w-14 h-14 rounded-full bg-chart-3/20 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-chart-3" />
          </div>
          <p className="font-display font-semibold text-foreground">
            Document uploaded successfully
          </p>
          <p className="text-sm text-muted-foreground">
            The file has been encrypted and stored securely.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* File drop zone */}
          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-foreground mb-2"
            >
              File <span className="text-destructive">*</span>
            </label>
            <FileUploadZone
              onFileSelect={setFile}
              accept="image/*,.pdf,.doc,.docx"
              maxSizeMB={20}
              label="Drag & drop or click to upload (PDF, image, doc)"
              data-ocid="upload_doc.dropzone"
            />
          </div>

          {/* Progress bar */}
          {upload.isPending && (
            <div data-ocid="upload_doc.loading_state">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Uploading…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Document type */}
          <div>
            <label
              htmlFor="doc-type"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Document Type <span className="text-destructive">*</span>
            </label>
            <select
              id="doc-type"
              value={docType}
              onChange={(e) => setDocType(e.target.value as DocumentType)}
              required
              data-ocid="upload_doc.select"
              className="w-full border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {(
                Object.entries(DOC_TYPE_LABELS) as [DocumentType, string][]
              ).map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Employee search */}
          <div>
            <label
              htmlFor="employee-search"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Employee <span className="text-destructive">*</span>
            </label>
            <input
              id="employee-search"
              type="text"
              placeholder="Search by name…"
              value={employeeSearch}
              onChange={(e) => setEmployeeSearch(e.target.value)}
              data-ocid="upload_doc.input"
              className="w-full border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring mb-1.5"
            />
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              size={Math.min(4, filteredEmployees.length + 1)}
              data-ocid="upload_doc.employee_select"
              className="w-full border border-input bg-background text-foreground rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="">-- select employee --</option>
              {filteredEmployees.map((emp) => (
                <option key={emp.id.toString()} value={emp.id.toString()}>
                  {emp.fullName} · {emp.employeeCode}
                </option>
              ))}
            </select>
          </div>

          {/* Expiry date */}
          <div>
            <label
              htmlFor="expiry-date"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Expiry Date{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </label>
            <input
              id="expiry-date"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              data-ocid="upload_doc.expiry_input"
              className="w-full border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Security notice */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 border border-border rounded-lg px-3 py-2.5">
            <span className="mt-0.5">🔒</span>
            <span>
              All files are encrypted at rest on the Internet Computer and
              decrypted on-demand for authorized users.
            </span>
          </div>

          {error && (
            <p
              className="text-sm text-destructive"
              role="alert"
              data-ocid="upload_doc.error_state"
            >
              {error}
            </p>
          )}

          <div className="flex gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={handleClose}
              data-ocid="upload_doc.cancel_button"
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || !employeeId || upload.isPending}
              data-ocid="upload_doc.submit_button"
              className="btn-primary disabled:opacity-50"
            >
              {upload.isPending ? "Uploading…" : "Upload Document"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
