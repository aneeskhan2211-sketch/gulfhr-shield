import { dateToTimestamp, timestampToDate } from "@/api/backend";
import type { Employee, EmployeeInput } from "@/backend";
import { EmployeeStatus, WorkLocation } from "@/backend";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DEPARTMENTS, NATIONALITIES } from "./EmployeeFilters";

interface FormValues {
  fullName: string;
  employeeCode: string;
  nationality: string;
  passportNumber: string;
  visaNumber: string;
  emiratesId: string;
  jobTitle: string;
  department: string;
  joiningDate: string;
  basicSalary: string;
  bankName: string;
  iban: string;
  workLocation: WorkLocation;
  contractStartDate: string;
  contractEndDate: string;
  status: EmployeeStatus;
}

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (input: EmployeeInput) => void;
  onCancel: () => void;
  loading?: boolean;
}

function toDateInput(ts: bigint | undefined): string {
  if (!ts) return "";
  const d = timestampToDate(ts);
  return d.toISOString().slice(0, 10);
}

function parseDate(val: string): bigint {
  return dateToTimestamp(new Date(val));
}

export default function EmployeeForm({
  employee,
  onSubmit,
  onCancel,
  loading,
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      employeeCode: "",
      nationality: "UAE",
      passportNumber: "",
      visaNumber: "",
      emiratesId: "",
      jobTitle: "",
      department: "",
      joiningDate: "",
      basicSalary: "",
      bankName: "",
      iban: "",
      workLocation: WorkLocation.UAE,
      contractStartDate: "",
      contractEndDate: "",
      status: EmployeeStatus.Active,
    },
  });

  useEffect(() => {
    if (employee) {
      reset({
        fullName: employee.fullName,
        employeeCode: employee.employeeCode,
        nationality: employee.nationality,
        passportNumber: employee.passportNumber,
        visaNumber: employee.visaNumber,
        emiratesId: employee.emiratesId,
        jobTitle: employee.jobTitle,
        department: employee.department,
        joiningDate: toDateInput(employee.joiningDate),
        basicSalary: String(Number(employee.basicSalary) / 100),
        bankName: employee.bankName,
        iban: employee.iban,
        workLocation: employee.workLocation,
        contractStartDate: toDateInput(employee.contractStartDate),
        contractEndDate: toDateInput(employee.contractEndDate),
        status: employee.status,
      });
    }
  }, [employee, reset]);

  function handleFormSubmit(values: FormValues) {
    const input: EmployeeInput = {
      fullName: values.fullName,
      employeeCode: values.employeeCode,
      nationality: values.nationality,
      passportNumber: values.passportNumber,
      visaNumber: values.visaNumber,
      emiratesId: values.emiratesId,
      jobTitle: values.jobTitle,
      department: values.department,
      joiningDate: values.joiningDate
        ? parseDate(values.joiningDate)
        : BigInt(Date.now()) * 1_000_000n,
      basicSalary: BigInt(Math.round(Number(values.basicSalary || 0) * 100)),
      bankName: values.bankName,
      iban: values.iban,
      workLocation: values.workLocation,
      contractStartDate: values.contractStartDate
        ? parseDate(values.contractStartDate)
        : BigInt(Date.now()) * 1_000_000n,
      contractEndDate: values.contractEndDate
        ? parseDate(values.contractEndDate)
        : undefined,
    };
    onSubmit(input);
  }

  const watchNationality = watch("nationality");
  const watchWorkLocation = watch("workLocation");
  const watchStatus = watch("status");

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Personal Info */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Personal Information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="ef-fullName">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ef-fullName"
              placeholder="Ahmed Al-Rashidi"
              {...register("fullName", { required: "Full name is required" })}
              data-ocid="employee_form.full_name.input"
            />
            {errors.fullName && (
              <p
                className="text-xs text-destructive"
                data-ocid="employee_form.full_name.field_error"
              >
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-employeeCode">
              Employee Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ef-employeeCode"
              placeholder="EMP-0001"
              {...register("employeeCode", {
                required: "Employee code is required",
              })}
              data-ocid="employee_form.employee_code.input"
            />
            {errors.employeeCode && (
              <p
                className="text-xs text-destructive"
                data-ocid="employee_form.employee_code.field_error"
              >
                {errors.employeeCode.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-nationality">
              Nationality <span className="text-destructive">*</span>
            </Label>
            <Select
              value={watchNationality}
              onValueChange={(v) => setValue("nationality", v)}
            >
              <SelectTrigger
                id="ef-nationality"
                data-ocid="employee_form.nationality.select"
              >
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                {NATIONALITIES.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-passportNumber">Passport Number</Label>
            <Input
              id="ef-passportNumber"
              placeholder="A12345678"
              {...register("passportNumber")}
              data-ocid="employee_form.passport_number.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-visaNumber">Visa Number</Label>
            <Input
              id="ef-visaNumber"
              placeholder="UAE-VISA-001"
              {...register("visaNumber")}
              data-ocid="employee_form.visa_number.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-emiratesId">Emirates / National ID</Label>
            <Input
              id="ef-emiratesId"
              placeholder="784-XXXX-XXXXXXX-X"
              {...register("emiratesId")}
              data-ocid="employee_form.emirates_id.input"
            />
          </div>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Employment Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="ef-jobTitle">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ef-jobTitle"
              placeholder="Senior Engineer"
              {...register("jobTitle", { required: "Job title is required" })}
              data-ocid="employee_form.job_title.input"
            />
            {errors.jobTitle && (
              <p
                className="text-xs text-destructive"
                data-ocid="employee_form.job_title.field_error"
              >
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-department">
              Department <span className="text-destructive">*</span>
            </Label>
            <Select
              value={watch("department")}
              onValueChange={(v) => setValue("department", v)}
            >
              <SelectTrigger
                id="ef-department"
                data-ocid="employee_form.department.select"
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && (
              <p
                className="text-xs text-destructive"
                data-ocid="employee_form.department.field_error"
              >
                {errors.department.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-workLocation">Work Location</Label>
            <Select
              value={watchWorkLocation}
              onValueChange={(v) => setValue("workLocation", v as WorkLocation)}
            >
              <SelectTrigger
                id="ef-workLocation"
                data-ocid="employee_form.work_location.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(WorkLocation).map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-status">Status</Label>
            <Select
              value={watchStatus}
              onValueChange={(v) => setValue("status", v as EmployeeStatus)}
            >
              <SelectTrigger
                id="ef-status"
                data-ocid="employee_form.status.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EmployeeStatus.Active}>Active</SelectItem>
                <SelectItem value={EmployeeStatus.OnLeave}>On Leave</SelectItem>
                <SelectItem value={EmployeeStatus.Separated}>
                  Separated
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-joiningDate">Joining Date</Label>
            <Input
              id="ef-joiningDate"
              type="date"
              {...register("joiningDate")}
              data-ocid="employee_form.joining_date.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-basicSalary">Basic Salary (AED)</Label>
            <Input
              id="ef-basicSalary"
              type="number"
              min="0"
              step="0.01"
              placeholder="5000.00"
              {...register("basicSalary")}
              data-ocid="employee_form.basic_salary.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-contractStartDate">Contract Start Date</Label>
            <Input
              id="ef-contractStartDate"
              type="date"
              {...register("contractStartDate")}
              data-ocid="employee_form.contract_start.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-contractEndDate">Contract End Date</Label>
            <Input
              id="ef-contractEndDate"
              type="date"
              {...register("contractEndDate")}
              data-ocid="employee_form.contract_end.input"
            />
          </div>
        </div>
      </div>

      {/* Banking */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Banking Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="ef-bankName">Bank Name</Label>
            <Input
              id="ef-bankName"
              placeholder="Emirates NBD"
              {...register("bankName")}
              data-ocid="employee_form.bank_name.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ef-iban">IBAN / Account Number</Label>
            <Input
              id="ef-iban"
              placeholder="AE070331234567890123456"
              {...register("iban")}
              data-ocid="employee_form.iban.input"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          data-ocid="employee_form.cancel_button"
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          data-ocid="employee_form.submit_button"
          className="btn-primary flex-1"
        >
          {loading ? "Saving…" : employee ? "Save Changes" : "Add Employee"}
        </button>
      </div>
    </form>
  );
}
