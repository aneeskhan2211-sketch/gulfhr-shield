import { useBulkImportEmployees } from "@/api/import";
import FileUploadZone from "@/components/ui/FileUploadZone";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import type { EmployeeImportRow, ImportError } from "@/types";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

// ---------- column auto-detection ----------
const FIELD_KEYWORDS: Record<keyof EmployeeImportRow, string[]> = {
  fullName: ["name", "full name", "employee name", "staff name"],
  employeeCode: ["code", "emp code", "employee id", "id", "staff id", "number"],
  nationality: ["nationality", "national", "country"],
  jobTitle: ["job", "title", "position", "role", "designation"],
  department: ["department", "dept", "division", "team", "unit"],
  basicSalary: ["salary", "basic", "wage", "pay", "compensation", "ctc"],
  workLocation: [
    "location",
    "work location",
    "office",
    "site",
    "branch",
    "city",
  ],
};

function detectColumn(header: string): keyof EmployeeImportRow | null {
  const h = header.toLowerCase().trim();
  for (const [field, keywords] of Object.entries(FIELD_KEYWORDS)) {
    if (keywords.some((kw) => h.includes(kw))) {
      return field as keyof EmployeeImportRow;
    }
  }
  return null;
}

function buildMapping(
  headers: string[],
): Record<number, keyof EmployeeImportRow> {
  const map: Record<number, keyof EmployeeImportRow> = {};
  const used = new Set<keyof EmployeeImportRow>();
  headers.forEach((h, i) => {
    const field = detectColumn(h);
    if (field && !used.has(field)) {
      map[i] = field;
      used.add(field);
    }
  });
  return map;
}

// ---------- CSV parser (no dependencies) ----------
function parseCsv(text: string): { headers: string[]; rows: string[][] } {
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };
  const parse = (line: string): string[] => {
    const result: string[] = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuote = !inQuote;
        continue;
      }
      if (ch === "," && !inQuote) {
        result.push(cur.trim());
        cur = "";
        continue;
      }
      cur += ch;
    }
    result.push(cur.trim());
    return result;
  };
  return { headers: parse(lines[0]), rows: lines.slice(1).map(parse) };
}

function toImportRow(
  raw: string[],
  mapping: Record<number, keyof EmployeeImportRow>,
): EmployeeImportRow {
  const row: Partial<EmployeeImportRow> = {
    fullName: "",
    employeeCode: "",
    nationality: "",
    jobTitle: "",
    department: "",
    basicSalary: 0n,
    workLocation: "",
  };
  for (const [colIdx, field] of Object.entries(mapping)) {
    const val = raw[Number(colIdx)] ?? "";
    if (field === "basicSalary") {
      const num = Number(val.replace(/[^0-9.]/g, "")) || 0;
      row.basicSalary = BigInt(Math.round(num * 100));
    } else {
      (row as Record<string, unknown>)[field] = val;
    }
  }
  return row as EmployeeImportRow;
}

function validateRow(row: EmployeeImportRow, idx: number): string | null {
  if (!row.fullName.trim()) return `Row ${idx + 1}: Missing employee name`;
  if (row.basicSalary <= 0n)
    return `Row ${idx + 1}: Salary must be greater than 0`;
  return null;
}

// ---------- UI helpers ----------
const FIELD_LABELS: Record<keyof EmployeeImportRow, string> = {
  fullName: "Full Name *",
  employeeCode: "Code",
  nationality: "Nationality",
  jobTitle: "Job Title",
  department: "Department",
  basicSalary: "Basic Salary *",
  workLocation: "Work Location",
};

const PREVIEW_LIMIT = 5;

// ---------- types ----------
type Step = "upload" | "mapping" | "preview" | "result";

interface ParsedData {
  headers: string[];
  rows: string[][];
  mapping: Record<number, keyof EmployeeImportRow>;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onImported: () => void;
}

export default function CSVImportModal({ open, onClose, onImported }: Props) {
  const [step, setStep] = useState<Step>("upload");
  const [parsed, setParsed] = useState<ParsedData | null>(null);
  const [mapping, setMapping] = useState<
    Record<number, keyof EmployeeImportRow>
  >({});
  const importMutation = useBulkImportEmployees();

  const allFields = Object.keys(FIELD_LABELS) as (keyof EmployeeImportRow)[];

  const reset = useCallback(() => {
    setStep("upload");
    setParsed(null);
    setMapping({});
    importMutation.reset();
  }, [importMutation]);

  const handleClose = () => {
    reset();
    onClose();
  };

  // ---- Step 1: File upload ----
  async function handleFile(file: File) {
    const text = await file.text();
    const { headers, rows } = parseCsv(text);
    if (headers.length === 0 || rows.length === 0) {
      toast.error("File appears to be empty or unreadable");
      return;
    }
    const detectedMapping = buildMapping(headers);
    setParsed({ headers, rows, mapping: detectedMapping });
    setMapping(detectedMapping);
    setStep("mapping");
  }

  // ---- Step 2: Mapping adjustments ----
  function handleMappingChange(colIdx: number, field: string) {
    setMapping((prev) => {
      const next = { ...prev };
      // Remove any previous assignment for this field
      for (const k of Object.keys(next) as unknown as number[]) {
        if (next[k] === field) delete next[k];
      }
      if (field === "__none__") {
        delete next[colIdx];
      } else {
        next[colIdx] = field as keyof EmployeeImportRow;
      }
      return next;
    });
  }

  // ---- Step 3: Preview ----
  const importRows = parsed
    ? parsed.rows.map((r) => toImportRow(r, mapping))
    : [];
  const validationErrors: string[] = importRows
    .map((r, i) => validateRow(r, i))
    .filter(Boolean) as string[];

  // ---- Step 4: Import ----
  async function handleImport() {
    if (!parsed) return;
    try {
      const result = await importMutation.mutateAsync(importRows);
      const importedCount = Number(result.imported);
      const errorCount = result.errors.length;
      setStep("result");
      if (importedCount > 0) {
        toast.success(
          `${importedCount} employee${importedCount !== 1 ? "s" : ""} imported successfully`,
        );
        onImported();
      }
      if (errorCount > 0) {
        toast.warning(
          `${errorCount} row${errorCount !== 1 ? "s" : ""} had errors`,
        );
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Import failed");
    }
  }

  const stepTitles: Record<Step, string> = {
    upload: "Import Employees — Upload File",
    mapping: "Map Columns",
    preview: "Preview & Validate",
    result: "Import Complete",
  };

  const stepDesc: Record<Step, string> = {
    upload: "Upload a CSV or Excel-exported CSV file to bulk-import employees.",
    mapping: "Verify or adjust how CSV columns map to employee fields.",
    preview: `${importRows.length} employees ready — review before importing.`,
    result: "Your import has been processed.",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={stepTitles[step]}
      description={stepDesc[step]}
      size="xl"
      data-ocid="csv_import"
    >
      <div className="max-h-[72vh] overflow-y-auto">
        {/* ---- STEP INDICATOR ---- */}
        <div className="flex items-center gap-2 mb-5">
          {(["upload", "mapping", "preview", "result"] as Step[]).map(
            (s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                    step === s
                      ? "bg-primary text-primary-foreground"
                      : ["upload", "mapping", "preview", "result"].indexOf(
                            step,
                          ) > i
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {i + 1}
                </div>
                {i < 3 && (
                  <div
                    className={cn(
                      "flex-1 h-px w-8",
                      ["upload", "mapping", "preview", "result"].indexOf(step) >
                        i
                        ? "bg-primary/40"
                        : "bg-border",
                    )}
                  />
                )}
              </div>
            ),
          )}
        </div>

        {/* ---- STEP: UPLOAD ---- */}
        {step === "upload" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4 flex gap-3 items-start">
              <FileSpreadsheet className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground">
                  Supported format: CSV
                </p>
                <p className="text-muted-foreground mt-0.5">
                  Required columns:{" "}
                  <span className="text-foreground font-medium">Full Name</span>
                  ,{" "}
                  <span className="text-foreground font-medium">
                    Basic Salary
                  </span>
                  . Optional: Code, Nationality, Job Title, Department, Work
                  Location. Export from Excel as CSV (UTF-8).
                </p>
              </div>
            </div>
            <FileUploadZone
              onFileSelect={handleFile}
              accept=".csv,.txt"
              maxSizeMB={5}
              label="Drop your CSV file here, or click to browse"
              data-ocid="csv_import.upload"
            />
          </div>
        )}

        {/* ---- STEP: MAPPING ---- */}
        {step === "mapping" && parsed && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">
                {parsed.rows.length}
              </span>{" "}
              rows detected. Columns marked{" "}
              <span className="text-destructive">*</span> are required.
            </p>
            <div className="grid gap-2">
              {parsed.headers.map((header, colIdx) => (
                <div
                  key={header || String(colIdx)}
                  className="grid grid-cols-2 gap-3 items-center p-2.5 rounded-lg bg-muted/20 border border-border"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {header}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      e.g. {parsed.rows[0]?.[colIdx] ?? "—"}
                    </p>
                  </div>
                  <select
                    value={mapping[colIdx] ?? "__none__"}
                    onChange={(e) =>
                      handleMappingChange(colIdx, e.target.value)
                    }
                    className="w-full rounded-md border border-input bg-background text-sm px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    data-ocid={`csv_import.mapping.col_${colIdx}.select`}
                  >
                    <option value="__none__">— Skip —</option>
                    {allFields.map((f) => (
                      <option key={f} value={f}>
                        {FIELD_LABELS[f]}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep("upload")}
                className="btn-secondary flex items-center gap-2"
                data-ocid="csv_import.mapping.back_button"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep("preview")}
                className="btn-primary flex items-center gap-2"
                data-ocid="csv_import.mapping.next_button"
              >
                Preview <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---- STEP: PREVIEW ---- */}
        {step === "preview" && parsed && (
          <div className="space-y-4">
            {/* Summary banner */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center">
                <p className="text-lg font-bold text-primary">
                  {importRows.length}
                </p>
                <p className="text-xs text-muted-foreground">Total Employees</p>
              </div>
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
                <p className="text-lg font-bold text-emerald-600">
                  {importRows.length - validationErrors.length}
                </p>
                <p className="text-xs text-muted-foreground">Ready to Import</p>
              </div>
              <div
                className={cn(
                  "rounded-lg p-3 text-center border",
                  validationErrors.length > 0
                    ? "bg-destructive/10 border-destructive/20"
                    : "bg-muted/30 border-border",
                )}
              >
                <p
                  className={cn(
                    "text-lg font-bold",
                    validationErrors.length > 0
                      ? "text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {validationErrors.length}
                </p>
                <p className="text-xs text-muted-foreground">
                  Validation Issues
                </p>
              </div>
            </div>

            {/* Validation errors */}
            {validationErrors.length > 0 && (
              <div
                className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 space-y-1"
                data-ocid="csv_import.preview.error_state"
              >
                <p className="text-sm font-medium text-destructive flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Validation Errors
                </p>
                <ul className="text-xs text-destructive/80 space-y-0.5 max-h-24 overflow-y-auto">
                  {validationErrors.map((e) => (
                    <li key={e}>• {e}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Preview table */}
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="px-3 py-2 text-left text-muted-foreground font-medium">
                      #
                    </th>
                    {Object.values(mapping).map((field) => (
                      <th
                        key={field}
                        className="px-3 py-2 text-left text-muted-foreground font-medium whitespace-nowrap"
                      >
                        {FIELD_LABELS[field]}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-left text-muted-foreground font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {importRows.slice(0, PREVIEW_LIMIT).map((row) => {
                    const rowKey = row.employeeCode || row.fullName;
                    const rowIdx = importRows.indexOf(row);
                    const err = validateRow(row, rowIdx);
                    return (
                      <tr
                        key={rowKey}
                        className={cn(
                          "border-b border-border last:border-0",
                          err ? "bg-destructive/5" : "hover:bg-muted/20",
                        )}
                        data-ocid={`csv_import.preview.item.${rowIdx + 1}`}
                      >
                        <td className="px-3 py-2 text-muted-foreground">
                          {rowIdx + 1}
                        </td>
                        {Object.keys(mapping).map((colIdx) => {
                          const field = mapping[Number(colIdx)];
                          const val =
                            field === "basicSalary"
                              ? `${Number(row.basicSalary) / 100}`
                              : String(
                                  (row as unknown as Record<string, unknown>)[
                                    field
                                  ] ?? "—",
                                );
                          return (
                            <td
                              key={colIdx}
                              className={cn(
                                "px-3 py-2 max-w-[140px] truncate",
                                err &&
                                  (field === "fullName" ||
                                    field === "basicSalary")
                                  ? "text-destructive font-medium"
                                  : "text-foreground",
                              )}
                            >
                              {val || (
                                <span className="text-muted-foreground italic">
                                  empty
                                </span>
                              )}
                            </td>
                          );
                        })}
                        <td className="px-3 py-2">
                          {err ? (
                            <span className="text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Error
                            </span>
                          ) : (
                            <span className="text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              OK
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {importRows.length > PREVIEW_LIMIT && (
                <p className="text-xs text-muted-foreground px-3 py-2 border-t border-border bg-muted/20">
                  … and {importRows.length - PREVIEW_LIMIT} more rows not shown
                </p>
              )}
            </div>

            <div className="flex justify-between pt-1">
              <button
                type="button"
                onClick={() => setStep("mapping")}
                className="btn-secondary flex items-center gap-2"
                data-ocid="csv_import.preview.back_button"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={importMutation.isPending || importRows.length === 0}
                className="btn-primary flex items-center gap-2 disabled:opacity-60"
                data-ocid="csv_import.preview.import_button"
              >
                {importMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Importing…
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" /> Import All{" "}
                    {importRows.length} Employees
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ---- STEP: RESULT ---- */}
        {step === "result" && importMutation.data && (
          <div className="space-y-4 py-2">
            <div className="flex flex-col items-center gap-3 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-xl font-display font-semibold text-foreground">
                  {Number(importMutation.data.imported)} Employees Imported
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your employee records have been added successfully.
                </p>
              </div>
            </div>

            {importMutation.data.errors.length > 0 && (
              <div
                className="rounded-lg border border-destructive/30 bg-destructive/5 p-4"
                data-ocid="csv_import.result.error_state"
              >
                <p className="text-sm font-medium text-destructive mb-2">
                  {importMutation.data.errors.length} rows could not be
                  imported:
                </p>
                <ul className="text-xs text-destructive/80 space-y-1 max-h-32 overflow-y-auto">
                  {importMutation.data.errors.map((e: ImportError) => (
                    <li key={`${Number(e.row)}-${e.reason}`}>
                      Row {Number(e.row)}: {e.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  reset();
                }}
                className="btn-secondary"
                data-ocid="csv_import.result.import_more_button"
              >
                Import More
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="btn-primary"
                data-ocid="csv_import.result.close_button"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
