import { dateToTimestamp, timestampToDate } from "@/api/backend";
import { useListEmployees } from "@/api/employees";
import type { Employee, VisaRecordInput } from "@/backend";
import { VisaRecordType } from "@/backend";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type React from "react";
import { useState } from "react";

const RECORD_TYPE_LABELS: Record<VisaRecordType, string> = {
  [VisaRecordType.Passport]: "Passport",
  [VisaRecordType.Visa]: "Visa",
  [VisaRecordType.LabourCard]: "Labour Card",
  [VisaRecordType.Insurance]: "Insurance",
  [VisaRecordType.MedicalCard]: "Medical Card",
  [VisaRecordType.Contract]: "Contract",
};

export interface VisaRecordFormValues {
  employeeId: bigint | "";
  recordType: VisaRecordType | "";
  expiryDate: string;
  notes: string;
}

interface VisaRecordFormProps {
  initialValues?: Partial<VisaRecordFormValues>;
  lockedEmployeeId?: bigint;
  onSubmit: (input: VisaRecordInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export default function VisaRecordForm({
  initialValues,
  lockedEmployeeId,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Save Record",
}: VisaRecordFormProps) {
  const { data: employees = [] } = useListEmployees();

  const [values, setValues] = useState<VisaRecordFormValues>({
    employeeId: lockedEmployeeId ?? initialValues?.employeeId ?? "",
    recordType: initialValues?.recordType ?? "",
    expiryDate: initialValues?.expiryDate ?? "",
    notes: initialValues?.notes ?? "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof VisaRecordFormValues, string>>
  >({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof VisaRecordFormValues, string>> = {};
    if (!values.employeeId) newErrors.employeeId = "Employee is required";
    if (!values.recordType) newErrors.recordType = "Record type is required";
    if (!values.expiryDate) newErrors.expiryDate = "Expiry date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      employeeId: BigInt(values.employeeId as bigint),
      recordType: values.recordType as VisaRecordType,
      expiryDate: dateToTimestamp(new Date(values.expiryDate)),
      notes: values.notes.trim(),
    });
  }

  function set(field: keyof VisaRecordFormValues, value: string | bigint) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Employee */}
      {!lockedEmployeeId && (
        <div className="space-y-1.5">
          <Label htmlFor="vrf-employee">Employee</Label>
          <select
            id="vrf-employee"
            value={String(values.employeeId)}
            onChange={(e) => {
              const v = e.target.value;
              set("employeeId", v ? BigInt(v) : "");
            }}
            data-ocid="visa-record-form.employee.select"
            className="w-full py-2 px-3 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label="Select employee"
          >
            <option value="">Select employee…</option>
            {employees.map((emp: Employee) => (
              <option key={emp.employeeCode} value={String(emp.id)}>
                {emp.fullName} ({emp.employeeCode})
              </option>
            ))}
          </select>
          {errors.employeeId && (
            <p
              className="text-xs text-destructive"
              data-ocid="visa-record-form.employee.field_error"
            >
              {errors.employeeId}
            </p>
          )}
        </div>
      )}

      {/* Record Type */}
      <div className="space-y-1.5">
        <Label htmlFor="vrf-type">Record Type</Label>
        <select
          id="vrf-type"
          value={values.recordType}
          onChange={(e) => set("recordType", e.target.value)}
          data-ocid="visa-record-form.record_type.select"
          className="w-full py-2 px-3 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          aria-label="Select record type"
        >
          <option value="">Select type…</option>
          {Object.values(VisaRecordType).map((t) => (
            <option key={t} value={t}>
              {RECORD_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        {errors.recordType && (
          <p
            className="text-xs text-destructive"
            data-ocid="visa-record-form.record_type.field_error"
          >
            {errors.recordType}
          </p>
        )}
      </div>

      {/* Expiry Date */}
      <div className="space-y-1.5">
        <Label htmlFor="vrf-expiry">Expiry Date</Label>
        <input
          id="vrf-expiry"
          type="date"
          value={values.expiryDate}
          onChange={(e) => set("expiryDate", e.target.value)}
          data-ocid="visa-record-form.expiry_date.input"
          className="w-full py-2 px-3 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {errors.expiryDate && (
          <p
            className="text-xs text-destructive"
            data-ocid="visa-record-form.expiry_date.field_error"
          >
            {errors.expiryDate}
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="vrf-notes">Notes (optional)</Label>
        <textarea
          id="vrf-notes"
          value={values.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={2}
          placeholder="Additional notes…"
          data-ocid="visa-record-form.notes.textarea"
          className="w-full py-2 px-3 text-sm bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          data-ocid="visa-record-form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          data-ocid="visa-record-form.submit_button"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export function formatDateInputValue(ts: bigint): string {
  return timestampToDate(ts).toISOString().substring(0, 10);
}
