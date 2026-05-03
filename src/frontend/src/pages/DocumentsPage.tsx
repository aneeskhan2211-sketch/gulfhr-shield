import { useListAuditLogs } from "@/api/audit";
import { formatDate, getVisaStatus } from "@/api/backend";
import { useDeleteDocument, useListAllDocuments } from "@/api/documents";
import { useListEmployees } from "@/api/employees";
import DocumentPreviewModal from "@/components/documents/DocumentPreviewModal";
import DocumentUploadModal from "@/components/documents/DocumentUploadModal";
import AppShell from "@/components/layout/AppShell";
import ActionMenu from "@/components/ui/ActionMenu";
import CardContainer, { CardHeader } from "@/components/ui/CardContainer";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuthStore } from "@/stores/authStore";
import type { AuditLog, DocumentId, EmployeeDocument } from "@/types";
import { AuditActionType, DocumentType, UserRole } from "@/types";
import {
  Download,
  Eye,
  FileCheck,
  FileText,
  History,
  Info,
  Lock,
  Shield,
  Trash2,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";

// ── helpers ──────────────────────────────────────────────────────────────────

const DOC_TYPE_LABELS: Record<string, string> = {
  PassportCopy: "Passport Copy",
  Visa: "Visa",
  ID: "Emirates / National ID",
  Contract: "Contract",
  Insurance: "Insurance",
  Medical: "Medical Card",
  BankDocuments: "Bank Documents",
};

const DOC_TYPE_OPTIONS = Object.entries(DOC_TYPE_LABELS);

function formatBytes(bytes: bigint): string {
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function docExpiryStatus(
  doc: EmployeeDocument,
): "valid" | "expiring" | "expired" {
  if (!doc.expiryDate) return "valid";
  return getVisaStatus(doc.expiryDate);
}

function auditActionLabel(action: AuditActionType): string {
  switch (action) {
    case AuditActionType.DocumentUploaded:
      return "Uploaded";
    case AuditActionType.DocumentDownloaded:
      return "Downloaded";
    case AuditActionType.DocumentDeleted:
      return "Deleted";
    default:
      return action;
  }
}

const DOC_AUDIT_ACTIONS = new Set([
  AuditActionType.DocumentUploaded,
  AuditActionType.DocumentDownloaded,
  AuditActionType.DocumentDeleted,
]);

// ── component ─────────────────────────────────────────────────────────────────

export default function DocumentsPage() {
  const { currentUser } = useAuthStore();
  const { data: documents = [], isLoading: docsLoading } =
    useListAllDocuments();
  const { data: employees = [] } = useListEmployees();
  const { data: auditLogs = [] } = useListAuditLogs();
  const deleteDoc = useDeleteDocument();

  // filter state
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // modal state
  const [uploadOpen, setUploadOpen] = useState(false);
  const [previewDocId, setPreviewDocId] = useState<DocumentId | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DocumentId | null>(null);

  // employee lookup map
  const employeeMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const e of employees) m.set(e.id.toString(), e.fullName);
    return m;
  }, [employees]);

  // filtered docs
  const filtered = useMemo(() => {
    return documents.filter((d) => {
      if (filterEmployee && d.employeeId.toString() !== filterEmployee)
        return false;
      if (filterType && d.documentType !== filterType) return false;
      if (filterStatus) {
        const s = docExpiryStatus(d);
        if (s !== filterStatus) return false;
      }
      return true;
    });
  }, [documents, filterEmployee, filterType, filterStatus]);

  // recent doc audit entries (last 10)
  const recentAudit = useMemo(() => {
    return [...auditLogs]
      .filter((l: AuditLog) => DOC_AUDIT_ACTIONS.has(l.actionType))
      .sort((a, b) => Number(b.createdAt - a.createdAt))
      .slice(0, 10);
  }, [auditLogs]);

  // preview: find employee name from previewDocId
  const previewDoc = documents.find((d) => d.id === previewDocId);
  const previewEmployeeName = previewDoc
    ? (employeeMap.get(previewDoc.employeeId.toString()) ?? "")
    : "";

  // delete handler
  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteDoc.mutateAsync(deleteTarget);
    setDeleteTarget(null);
  }

  const canManageAll =
    currentUser?.role === UserRole.HRManager ||
    currentUser?.role === UserRole.SuperAdmin ||
    currentUser?.role === UserRole.CompanyOwner;

  return (
    <AppShell pageTitle="Document Vault" breadcrumbs={[{ label: "Documents" }]}>
      {/* ── Role-based access notice ── */}
      <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-primary/8 border border-primary/20 text-sm text-foreground mb-4">
        <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <div>
          <span className="font-medium">Access policy: </span>
          Employees can only view their own documents. HR Managers and above can
          view all documents.
        </div>
      </div>

      {/* ── Page header with Upload CTA ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Document Vault
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {documents.length} document{documents.length !== 1 ? "s" : ""}{" "}
            stored securely
          </p>
        </div>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          data-ocid="documents.upload_button"
          className="btn-primary flex items-center gap-2 self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* ── Filters ── */}
      <CardContainer padding="sm" className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            data-ocid="documents.filter.tab"
            className="flex-1 border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">All Employees</option>
            {employees.map((e) => (
              <option key={e.id.toString()} value={e.id.toString()}>
                {e.fullName}
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            data-ocid="documents.type_filter"
            className="flex-1 border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">All Types</option>
            {DOC_TYPE_OPTIONS.map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            data-ocid="documents.status_filter"
            className="flex-1 border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">All Statuses</option>
            <option value="valid">Valid</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </CardContainer>

      {/* ── Documents table ── */}
      <CardContainer
        padding="none"
        className="mb-6"
        data-ocid="documents.table"
      >
        {docsLoading ? (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="documents.loading_state"
          >
            <LoadingSpinner size="lg" label="Loading documents…" />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-6 h-6" />}
            title="No documents found"
            description={
              documents.length === 0
                ? "Upload the first document to get started."
                : "No documents match your current filters."
            }
            action={
              documents.length === 0 ? (
                <button
                  type="button"
                  onClick={() => setUploadOpen(true)}
                  className="btn-primary flex items-center gap-2"
                  data-ocid="documents.empty_state"
                >
                  <Upload className="w-4 h-4" />
                  Upload First Document
                </button>
              ) : undefined
            }
            data-ocid="documents.empty_state"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Employee</th>
                  <th className="hidden md:table-cell">Upload Date</th>
                  <th className="hidden lg:table-cell">Size</th>
                  <th className="hidden lg:table-cell">Expiry</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc, idx) => {
                  const empName =
                    employeeMap.get(doc.employeeId.toString()) ?? "—";
                  const status = docExpiryStatus(doc);
                  return (
                    <tr
                      key={doc.id.toString()}
                      data-ocid={`documents.item.${idx + 1}`}
                    >
                      <td>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <span className="truncate text-sm font-medium text-foreground max-w-40">
                            {doc.fileName}
                          </span>
                        </div>
                      </td>
                      <td>
                        <StatusBadge
                          status="info"
                          label={
                            DOC_TYPE_LABELS[doc.documentType] ??
                            doc.documentType
                          }
                          size="sm"
                        />
                      </td>
                      <td className="text-sm text-foreground">{empName}</td>
                      <td className="hidden md:table-cell text-sm text-muted-foreground">
                        {formatDate(doc.createdAt)}
                      </td>
                      <td className="hidden lg:table-cell text-sm text-muted-foreground">
                        {formatBytes(doc.fileSize)}
                      </td>
                      <td className="hidden lg:table-cell text-sm text-muted-foreground">
                        {doc.expiryDate ? formatDate(doc.expiryDate) : "—"}
                      </td>
                      <td>
                        <StatusBadge
                          status={status}
                          label={
                            status === "valid"
                              ? "Valid"
                              : status === "expiring"
                                ? "Expiring Soon"
                                : "Expired"
                          }
                          size="sm"
                        />
                      </td>
                      <td className="text-right">
                        <ActionMenu
                          data-ocid={`documents.item.${idx + 1}`}
                          items={[
                            {
                              label: "Preview",
                              icon: <Eye className="w-4 h-4" />,
                              onClick: () => setPreviewDocId(doc.id),
                            },
                            {
                              label: "Download",
                              icon: <Download className="w-4 h-4" />,
                              onClick: async () => {
                                const bytes = await doc.blob.getBytes();
                                const blob = new Blob([bytes], {
                                  type: doc.mimeType,
                                });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = doc.fileName;
                                a.click();
                                URL.revokeObjectURL(url);
                              },
                            },
                            ...(canManageAll
                              ? [
                                  {
                                    label: "Delete",
                                    icon: <Trash2 className="w-4 h-4" />,
                                    onClick: () => setDeleteTarget(doc.id),
                                    destructive: true,
                                  },
                                ]
                              : []),
                          ]}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContainer>

      {/* ── Security notice ── */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-muted/40 border border-border text-sm text-muted-foreground mb-6">
        <Lock className="w-4 h-4 text-chart-3 shrink-0" />
        <span>
          <span className="font-medium text-foreground">Security: </span>
          All files are encrypted at rest on the Internet Computer and decrypted
          on-demand for authorized users.
        </span>
      </div>

      {/* ── Recent document activity timeline ── */}
      <CardContainer data-ocid="documents.audit_panel">
        <CardHeader
          title="Recent Document Activity"
          subtitle="Last 10 document events"
          action={<History className="w-4 h-4 text-muted-foreground" />}
        />
        {recentAudit.length === 0 ? (
          <div
            className="flex flex-col items-center gap-2 py-8 text-center"
            data-ocid="documents.audit.empty_state"
          >
            <FileCheck className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No document activity recorded yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {recentAudit.map((entry: AuditLog, idx) => {
              const isUpload =
                entry.actionType === AuditActionType.DocumentUploaded;
              const isDelete =
                entry.actionType === AuditActionType.DocumentDeleted;
              return (
                <div
                  key={entry.id.toString()}
                  data-ocid={`documents.audit.item.${idx + 1}`}
                  className="flex items-start gap-3 py-3 border-b border-border last:border-0"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isDelete
                        ? "bg-destructive/10"
                        : isUpload
                          ? "bg-chart-3/10"
                          : "bg-primary/10"
                    }`}
                  >
                    {isDelete ? (
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    ) : isUpload ? (
                      <Upload className="w-3.5 h-3.5 text-chart-3" />
                    ) : (
                      <Download className="w-3.5 h-3.5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-foreground">
                        {auditActionLabel(entry.actionType)}
                      </span>
                      <StatusBadge
                        status={entry.status.toLowerCase()}
                        label={entry.status}
                        size="sm"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {entry.affectedResourceName}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContainer>

      {/* ── Modals ── */}
      <DocumentUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />

      <DocumentPreviewModal
        open={previewDocId !== null}
        documentId={previewDocId}
        employeeName={previewEmployeeName}
        onClose={() => setPreviewDocId(null)}
      />

      <ConfirmationDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Document"
        description="This document will be permanently deleted from the vault and cannot be recovered. This action will be logged."
        confirmLabel="Delete Document"
        cancelLabel="Cancel"
        destructive
        loading={deleteDoc.isPending}
        data-ocid="documents.delete_dialog"
      />
    </AppShell>
  );
}
