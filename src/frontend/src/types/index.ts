// Re-export all backend types for convenience
export type {
  Employee,
  EmployeeInput,
  EmployeeId,
  EmployeeDocument,
  DocumentInput,
  DocumentId,
  VisaRecord,
  VisaRecordInput,
  VisaRecordId,
  PayrollRun,
  PayrollRunInput,
  PayrollRunId,
  PayrollItem,
  PayrollItemInput,
  PayrollItemId,
  WpsExport,
  WpsExportInput,
  WpsExportId,
  AttendanceLog,
  AttendanceLogId,
  CheckInInput,
  CheckOutInput,
  Alert,
  AlertId,
  AuditLog,
  AuditLogId,
  Company,
  CompanyInput,
  CompanyId,
  User,
  UserInput,
  UserId,
  Subscription,
  SubscriptionId,
  GeoLocation,
  Timestamp,
  ApiError,
} from "@/backend";

export {
  AlertSeverity,
  AlertType,
  AuditActionType,
  AuditStatus,
  DocumentType,
  EmployeeStatus,
  PayrollStatus,
  SubscriptionStatus,
  SubscriptionTier,
  UserRole,
  UserStatus,
  VisaRecordType,
  WorkLocation,
  WpsCountryFormat,
  WpsExportStatus,
} from "@/backend";

// UI-specific types
export type VisaStatus = "valid" | "expiring" | "expired";
export type ThemeMode = "light" | "dark";

// Compliance Risk Engine
export type ComplianceRiskLevel = "Low" | "Medium" | "High" | "Critical";

export type { RiskFactor } from "@/backend";

export type { PenaltyBreakdown } from "@/backend";

export type { ComplianceRiskScore } from "@/backend";

export type { PenaltyExposure } from "@/backend";

export type { NotificationLog } from "@/backend";

// ROI Metrics
export type { ROIMetrics } from "@/backend";

// Onboarding
export type { OnboardingProgress } from "@/backend";

// Employee Import — re-export backend types
export type { WhatsAppSettings } from "@/backend";

export interface EmployeeImportRow {
  fullName: string;
  employeeCode: string;
  nationality: string;
  jobTitle: string;
  department: string;
  basicSalary: bigint;
  workLocation: string;
}

export interface ImportError {
  row: bigint;
  reason: string;
}

export interface ImportResult {
  imported: bigint;
  errors: ImportError[];
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: string[];
  badge?: number;
}

export interface KPIData {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
  color?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface PaginationState {
  page: number;
  perPage: number;
  total: number;
}

export interface DemoEmployee {
  id: number;
  fullName: string;
  employeeCode: string;
  nationality: string;
  jobTitle: string;
  department: string;
  workLocation: string;
  basicSalary: number;
  visaExpiry: string;
  status: string;
  passportExpiry: string;
  joinDate: string;
}
