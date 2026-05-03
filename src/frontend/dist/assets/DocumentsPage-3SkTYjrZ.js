import { c as createLucideIcon, u as useActor, r as reactExports, e as useMutation, j as jsxRuntimeExports, L as LoadingSpinner, m as formatDate, f as unwrapResult, g as createActor, D as DocumentType, h as CircleCheck, s as ExternalBlob, q as dateToTimestamp, v as useAuthStore, w as UserRole, x as Lock, y as AuditActionType, p as getVisaStatus } from "./index-DqipwkTD.js";
import { u as useListAuditLogs } from "./audit-C2N5k9eD.js";
import { b as useGetDocument, c as useUploadDocument, d as useListAllDocuments, a as useDeleteDocument } from "./documents-U4kNqjfr.js";
import { u as useListEmployees } from "./employees-CUvviRBY.js";
import { M as Modal } from "./Modal-Bl4Y2ID-.js";
import { S as StatusBadge } from "./StatusBadge-BbDJ5iJT.js";
import { F as FileText, A as AppShell } from "./AppShell-CUGPoZlf.js";
import { D as Download } from "./download-BXuxgTcz.js";
import { F as FileUploadZone } from "./FileUploadZone-1uxJvMUp.js";
import { A as ActionMenu } from "./ActionMenu-D6bdbVm_.js";
import { C as CardContainer, a as CardHeader } from "./CardContainer-BlAWtbPm.js";
import { C as ConfirmationDialog } from "./ConfirmationDialog-Dmt7flo8.js";
import { E as EmptyState } from "./EmptyState-ZgiE4Oiw.js";
import { I as Info } from "./info-zGkwlnOj.js";
import { U as Upload } from "./upload-BuidvJhM.js";
import { E as Eye } from "./eye-D-bmwEpS.js";
import { T as Trash2 } from "./trash-2-zR8XdvHL.js";
import { H as History } from "./history-DTN-zlv1.js";
import { F as FileCheck } from "./file-check-8IyGltKi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const DOC_TYPE_LABELS$2 = {
  PassportCopy: "Passport Copy",
  Visa: "Visa",
  ID: "Emirates / National ID",
  Contract: "Contract",
  Insurance: "Insurance",
  Medical: "Medical Card",
  BankDocuments: "Bank Documents"
};
function getExpiryStatus(ts) {
  if (!ts) return "valid";
  const days = Math.floor((Number(ts / 1000000n) - Date.now()) / 864e5);
  if (days < 0) return "expired";
  if (days <= 60) return "expiring";
  return "valid";
}
function formatBytes$1(bytes) {
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
function DocumentPreviewModal({
  documentId,
  employeeName,
  open,
  onClose
}) {
  const { data: doc, isLoading } = useGetDocument(
    open ? documentId ?? void 0 : void 0
  );
  const { actor } = useActor(createActor);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [loadingBlob, setLoadingBlob] = reactExports.useState(false);
  const logDownload = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.logDocumentDownload(id));
    }
  });
  reactExports.useEffect(() => {
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
  const expiryStatus = (doc == null ? void 0 : doc.expiryDate) ? getExpiryStatus(doc.expiryDate) : null;
  const canPreview = (doc == null ? void 0 : doc.mimeType.startsWith("image/")) || (doc == null ? void 0 : doc.mimeType) === "application/pdf";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Document Preview",
      description: employeeName ? `Employee: ${employeeName}` : void 0,
      size: "xl",
      "data-ocid": "doc_preview",
      children: isLoading || !doc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center py-16",
          "data-ocid": "doc_preview.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading document…" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3 p-4 bg-muted/30 rounded-lg border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: doc.fileName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                DOC_TYPE_LABELS$2[doc.documentType] ?? doc.documentType,
                " ·",
                " ",
                formatBytes$1(doc.fileSize)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            expiryStatus && /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatusBadge,
              {
                status: expiryStatus,
                label: expiryStatus === "valid" ? "Valid" : expiryStatus === "expiring" ? "Expiring Soon" : "Expired"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleDownload,
                disabled: logDownload.isPending,
                "data-ocid": "doc_preview.download_button",
                className: "btn-primary flex items-center gap-1.5 py-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  "Download"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Uploaded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatDate(doc.createdAt) })
          ] }),
          doc.expiryDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Expires" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatDate(doc.expiryDate) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "MIME type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: doc.mimeType })
          ] })
        ] }),
        canPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl border border-border bg-muted/20 overflow-hidden min-h-48 flex items-center justify-center",
            "data-ocid": "doc_preview.canvas_target",
            children: loadingBlob ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading preview…" }) : previewUrl ? doc.mimeType === "application/pdf" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "iframe",
              {
                src: previewUrl,
                title: doc.fileName,
                className: "w-full h-96"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: previewUrl,
                alt: doc.fileName,
                className: "max-h-96 max-w-full object-contain"
              }
            ) : null
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-8 text-center bg-muted/20 rounded-xl border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Preview not available for this file type." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleDownload,
              "data-ocid": "doc_preview.open_modal_button",
              className: "btn-secondary flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                "Download to view"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 border border-border rounded-lg px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All files are encrypted at rest on the Internet Computer and decrypted on-demand for authorized users." })
        ] })
      ] })
    }
  );
}
const DOC_TYPE_LABELS$1 = {
  [DocumentType.PassportCopy]: "Passport Copy",
  [DocumentType.Visa]: "Visa",
  [DocumentType.ID]: "Emirates / National ID",
  [DocumentType.Contract]: "Contract",
  [DocumentType.Insurance]: "Insurance",
  [DocumentType.Medical]: "Medical Card",
  [DocumentType.BankDocuments]: "Bank Documents"
};
function DocumentUploadModal({
  open,
  onClose
}) {
  const { data: employees = [] } = useListEmployees();
  const upload = useUploadDocument();
  const [file, setFile] = reactExports.useState(null);
  const [docType, setDocType] = reactExports.useState(
    DocumentType.PassportCopy
  );
  const [employeeId, setEmployeeId] = reactExports.useState("");
  const [expiryDate, setExpiryDate] = reactExports.useState("");
  const [employeeSearch, setEmployeeSearch] = reactExports.useState("");
  const [progress, setProgress] = reactExports.useState(0);
  const [succeeded, setSucceeded] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const filteredEmployees = employees.filter(
    (e) => e.fullName.toLowerCase().includes(employeeSearch.toLowerCase())
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
  async function handleSubmit(e) {
    e.preventDefault();
    if (!file || !employeeId) return;
    setError(null);
    setProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setProgress(pct)
      );
      await upload.mutateAsync({
        blob,
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        fileSize: BigInt(file.size),
        documentType: docType,
        employeeId: BigInt(employeeId),
        expiryDate: expiryDate ? dateToTimestamp(new Date(expiryDate)) : void 0
      });
      setSucceeded(true);
      setTimeout(() => {
        handleClose();
      }, 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose: handleClose,
      title: "Upload Document",
      description: "Add a document to an employee's secure vault.",
      size: "lg",
      "data-ocid": "upload_doc",
      children: succeeded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-3 py-8",
          "data-ocid": "upload_doc.success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-chart-3/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-chart-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Document uploaded successfully" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "The file has been encrypted and stored securely." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "file-upload",
              className: "block text-sm font-medium text-foreground mb-2",
              children: [
                "File ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileUploadZone,
            {
              onFileSelect: setFile,
              accept: "image/*,.pdf,.doc,.docx",
              maxSizeMB: 20,
              label: "Drag & drop or click to upload (PDF, image, doc)",
              "data-ocid": "upload_doc.dropzone"
            }
          )
        ] }),
        upload.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "upload_doc.loading_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all duration-300",
              style: { width: `${progress}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "doc-type",
              className: "block text-sm font-medium text-foreground mb-1.5",
              children: [
                "Document Type ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "doc-type",
              value: docType,
              onChange: (e) => setDocType(e.target.value),
              required: true,
              "data-ocid": "upload_doc.select",
              className: "w-full border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
              children: Object.entries(DOC_TYPE_LABELS$1).map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: val, children: label }, val))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "employee-search",
              className: "block text-sm font-medium text-foreground mb-1.5",
              children: [
                "Employee ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "employee-search",
              type: "text",
              placeholder: "Search by name…",
              value: employeeSearch,
              onChange: (e) => setEmployeeSearch(e.target.value),
              "data-ocid": "upload_doc.input",
              className: "w-full border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring mb-1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: employeeId,
              onChange: (e) => setEmployeeId(e.target.value),
              required: true,
              size: Math.min(4, filteredEmployees.length + 1),
              "data-ocid": "upload_doc.employee_select",
              className: "w-full border border-input bg-background text-foreground rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- select employee --" }),
                filteredEmployees.map((emp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: emp.id.toString(), children: [
                  emp.fullName,
                  " · ",
                  emp.employeeCode
                ] }, emp.id.toString()))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "expiry-date",
              className: "block text-sm font-medium text-foreground mb-1.5",
              children: [
                "Expiry Date",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "expiry-date",
              type: "date",
              value: expiryDate,
              onChange: (e) => setExpiryDate(e.target.value),
              "data-ocid": "upload_doc.expiry_input",
              className: "w-full border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 border border-border rounded-lg px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5", children: "🔒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All files are encrypted at rest on the Internet Computer and decrypted on-demand for authorized users." })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-destructive",
            role: "alert",
            "data-ocid": "upload_doc.error_state",
            children: error
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleClose,
              "data-ocid": "upload_doc.cancel_button",
              className: "btn-secondary",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: !file || !employeeId || upload.isPending,
              "data-ocid": "upload_doc.submit_button",
              className: "btn-primary disabled:opacity-50",
              children: upload.isPending ? "Uploading…" : "Upload Document"
            }
          )
        ] })
      ] })
    }
  );
}
const DOC_TYPE_LABELS = {
  PassportCopy: "Passport Copy",
  Visa: "Visa",
  ID: "Emirates / National ID",
  Contract: "Contract",
  Insurance: "Insurance",
  Medical: "Medical Card",
  BankDocuments: "Bank Documents"
};
const DOC_TYPE_OPTIONS = Object.entries(DOC_TYPE_LABELS);
function formatBytes(bytes) {
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
function docExpiryStatus(doc) {
  if (!doc.expiryDate) return "valid";
  return getVisaStatus(doc.expiryDate);
}
function auditActionLabel(action) {
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
const DOC_AUDIT_ACTIONS = /* @__PURE__ */ new Set([
  AuditActionType.DocumentUploaded,
  AuditActionType.DocumentDownloaded,
  AuditActionType.DocumentDeleted
]);
function DocumentsPage() {
  const { currentUser } = useAuthStore();
  const { data: documents = [], isLoading: docsLoading } = useListAllDocuments();
  const { data: employees = [] } = useListEmployees();
  const { data: auditLogs = [] } = useListAuditLogs();
  const deleteDoc = useDeleteDocument();
  const [filterEmployee, setFilterEmployee] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("");
  const [filterStatus, setFilterStatus] = reactExports.useState("");
  const [uploadOpen, setUploadOpen] = reactExports.useState(false);
  const [previewDocId, setPreviewDocId] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const employeeMap = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const e of employees) m.set(e.id.toString(), e.fullName);
    return m;
  }, [employees]);
  const filtered = reactExports.useMemo(() => {
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
  const recentAudit = reactExports.useMemo(() => {
    return [...auditLogs].filter((l) => DOC_AUDIT_ACTIONS.has(l.actionType)).sort((a, b) => Number(b.createdAt - a.createdAt)).slice(0, 10);
  }, [auditLogs]);
  const previewDoc = documents.find((d) => d.id === previewDocId);
  const previewEmployeeName = previewDoc ? employeeMap.get(previewDoc.employeeId.toString()) ?? "" : "";
  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteDoc.mutateAsync(deleteTarget);
    setDeleteTarget(null);
  }
  const canManageAll = (currentUser == null ? void 0 : currentUser.role) === UserRole.HRManager || (currentUser == null ? void 0 : currentUser.role) === UserRole.SuperAdmin || (currentUser == null ? void 0 : currentUser.role) === UserRole.CompanyOwner;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { pageTitle: "Document Vault", breadcrumbs: [{ label: "Documents" }], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 px-4 py-3 rounded-xl bg-primary/8 border border-primary/20 text-sm text-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Access policy: " }),
        "Employees can only view their own documents. HR Managers and above can view all documents."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Document Vault" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          documents.length,
          " document",
          documents.length !== 1 ? "s" : "",
          " ",
          "stored securely"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setUploadOpen(true),
          "data-ocid": "documents.upload_button",
          className: "btn-primary flex items-center gap-2 self-start sm:self-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
            "Upload Document"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContainer, { padding: "sm", className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterEmployee,
          onChange: (e) => setFilterEmployee(e.target.value),
          "data-ocid": "documents.filter.tab",
          className: "flex-1 border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Employees" }),
            employees.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: e.id.toString(), children: e.fullName }, e.id.toString()))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterType,
          onChange: (e) => setFilterType(e.target.value),
          "data-ocid": "documents.type_filter",
          className: "flex-1 border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Types" }),
            DOC_TYPE_OPTIONS.map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: val, children: label }, val))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          "data-ocid": "documents.status_filter",
          className: "flex-1 border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Statuses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "valid", children: "Valid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "expiring", children: "Expiring Soon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "expired", children: "Expired" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardContainer,
      {
        padding: "none",
        className: "mb-6",
        "data-ocid": "documents.table",
        children: docsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center justify-center py-16",
            "data-ocid": "documents.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading documents…" })
          }
        ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6" }),
            title: "No documents found",
            description: documents.length === 0 ? "Upload the first document to get started." : "No documents match your current filters.",
            action: documents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setUploadOpen(true),
                className: "btn-primary flex items-center gap-2",
                "data-ocid": "documents.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  "Upload First Document"
                ]
              }
            ) : void 0,
            "data-ocid": "documents.empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data-table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "File Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Employee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden md:table-cell", children: "Upload Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden lg:table-cell", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden lg:table-cell", children: "Expiry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((doc, idx) => {
            const empName = employeeMap.get(doc.employeeId.toString()) ?? "—";
            const status = docExpiryStatus(doc);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `documents.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-medium text-foreground max-w-40", children: doc.fileName })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatusBadge,
                    {
                      status: "info",
                      label: DOC_TYPE_LABELS[doc.documentType] ?? doc.documentType,
                      size: "sm"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm text-foreground", children: empName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden md:table-cell text-sm text-muted-foreground", children: formatDate(doc.createdAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden lg:table-cell text-sm text-muted-foreground", children: formatBytes(doc.fileSize) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden lg:table-cell text-sm text-muted-foreground", children: doc.expiryDate ? formatDate(doc.expiryDate) : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatusBadge,
                    {
                      status,
                      label: status === "valid" ? "Valid" : status === "expiring" ? "Expiring Soon" : "Expired",
                      size: "sm"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ActionMenu,
                    {
                      "data-ocid": `documents.item.${idx + 1}`,
                      items: [
                        {
                          label: "Preview",
                          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
                          onClick: () => setPreviewDocId(doc.id)
                        },
                        {
                          label: "Download",
                          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                          onClick: async () => {
                            const bytes = await doc.blob.getBytes();
                            const blob = new Blob([bytes], {
                              type: doc.mimeType
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = doc.fileName;
                            a.click();
                            URL.revokeObjectURL(url);
                          }
                        },
                        ...canManageAll ? [
                          {
                            label: "Delete",
                            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                            onClick: () => setDeleteTarget(doc.id),
                            destructive: true
                          }
                        ] : []
                      ]
                    }
                  ) })
                ]
              },
              doc.id.toString()
            );
          }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-4 py-3 rounded-xl bg-muted/40 border border-border text-sm text-muted-foreground mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-chart-3 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Security: " }),
        "All files are encrypted at rest on the Internet Computer and decrypted on-demand for authorized users."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContainer, { "data-ocid": "documents.audit_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CardHeader,
        {
          title: "Recent Document Activity",
          subtitle: "Last 10 document events",
          action: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4 text-muted-foreground" })
        }
      ),
      recentAudit.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-2 py-8 text-center",
          "data-ocid": "documents.audit.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "w-8 h-8 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No document activity recorded yet." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0.5", children: recentAudit.map((entry, idx) => {
        const isUpload = entry.actionType === AuditActionType.DocumentUploaded;
        const isDelete = entry.actionType === AuditActionType.DocumentDeleted;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `documents.audit.item.${idx + 1}`,
            className: "flex items-start gap-3 py-3 border-b border-border last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isDelete ? "bg-destructive/10" : isUpload ? "bg-chart-3/10" : "bg-primary/10"}`,
                  children: isDelete ? /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-destructive" }) : isUpload ? /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5 text-chart-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 text-primary" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: auditActionLabel(entry.actionType) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatusBadge,
                    {
                      status: entry.status.toLowerCase(),
                      label: entry.status,
                      size: "sm"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: entry.affectedResourceName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatDate(entry.createdAt) })
            ]
          },
          entry.id.toString()
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DocumentUploadModal,
      {
        open: uploadOpen,
        onClose: () => setUploadOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DocumentPreviewModal,
      {
        open: previewDocId !== null,
        documentId: previewDocId,
        employeeName: previewEmployeeName,
        onClose: () => setPreviewDocId(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmationDialog,
      {
        open: deleteTarget !== null,
        onClose: () => setDeleteTarget(null),
        onConfirm: handleDelete,
        title: "Delete Document",
        description: "This document will be permanently deleted from the vault and cannot be recovered. This action will be logged.",
        confirmLabel: "Delete Document",
        cancelLabel: "Cancel",
        destructive: true,
        loading: deleteDoc.isPending,
        "data-ocid": "documents.delete_dialog"
      }
    )
  ] });
}
export {
  DocumentsPage as default
};
