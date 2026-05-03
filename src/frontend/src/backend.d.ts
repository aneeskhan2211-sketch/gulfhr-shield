import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Result_32 = {
    __kind__: "ok";
    ok: AttendanceLog;
} | {
    __kind__: "err";
    err: ApiError;
};
export type WpsExportId = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: EmployeeDocument;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface CreateNotificationEntry {
    notificationType: Variant_Salary_VisaAlert_PayrollApproval;
    employeeId?: EmployeeId;
    message: string;
}
export interface PayrollItemInput {
    overtime: bigint;
    deductions: bigint;
    transportAllowance: bigint;
    employeeId: EmployeeId;
    leaveDeduction: bigint;
    basicSalary: bigint;
    advanceSalary: bigint;
    housingAllowance: bigint;
}
export interface PayrollItem {
    id: PayrollItemId;
    createdAt: Timestamp;
    overtime: bigint;
    deductions: bigint;
    netSalary: bigint;
    payrollRunId: PayrollRunId;
    updatedAt: Timestamp;
    transportAllowance: bigint;
    employeeId: EmployeeId;
    leaveDeduction: bigint;
    basicSalary: bigint;
    advanceSalary: bigint;
    housingAllowance: bigint;
}
export type Result_5 = {
    __kind__: "ok";
    ok: VisaRecord;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface NotificationLog {
    id: bigint;
    status: Variant_Failed_Sent_Pending;
    notificationType: Variant_Salary_VisaAlert_PayrollApproval;
    createdAt: Timestamp;
    employeeId?: EmployeeId;
    message: string;
    companyId: CompanyId;
}
export type VisaRecordId = bigint;
export type SubscriptionId = bigint;
export interface Subscription {
    id: SubscriptionId;
    paidStartDate?: Timestamp;
    status: SubscriptionStatus;
    trialEndDate?: Timestamp;
    isTrialActive: boolean;
    createdAt: Timestamp;
    tier: SubscriptionTier;
    employeeLimit: bigint;
    trialStartDate?: Timestamp;
    renewalDate?: Timestamp;
    companyId: CompanyId;
}
export type Result_4 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: ApiError;
};
export type EmployeeId = bigint;
export type Result_31 = {
    __kind__: "ok";
    ok: NotificationLog;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_7 = {
    __kind__: "ok";
    ok: OnboardingProgress;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface OnboardingProgress {
    completedAt?: Timestamp;
    currentStep: bigint;
    stepsCompleted: Array<boolean>;
    companyId: CompanyId;
}
export interface PenaltyExposure {
    total: bigint;
    breakdown: Array<PenaltyBreakdown>;
    currency: string;
}
export type Result_28 = {
    __kind__: "ok";
    ok: {
        totalEmployees: bigint;
        expiredVisaCount: bigint;
        unreadAlertCount: bigint;
        complianceScore: bigint;
        pendingPayrollCount: bigint;
        expiringDocumentCount: bigint;
    };
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_6 = {
    __kind__: "ok";
    ok: User;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface PayrollRun {
    id: PayrollRunId;
    status: PayrollStatus;
    totalNetSalary: bigint;
    createdAt: Timestamp;
    createdBy: UserId;
    hrApprovedAt?: Timestamp;
    hrApprovedBy?: UserId;
    payPeriodYear: bigint;
    accountantReviewedAt?: Timestamp;
    accountantReviewedBy?: UserId;
    exportedAt?: Timestamp;
    notes: string;
    ownerApprovedAt?: Timestamp;
    ownerApprovedBy?: UserId;
    payPeriodMonth: bigint;
    employeeIds: Array<EmployeeId>;
    companyId: CompanyId;
}
export type Result_12 = {
    __kind__: "ok";
    ok: Array<{
        status: ExpiryStatus;
        record: VisaRecord;
    }>;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_9 = {
    __kind__: "ok";
    ok: Company;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_26 = {
    __kind__: "ok";
    ok: PayrollRun;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface PayrollRunInput {
    payPeriodYear: bigint;
    notes: string;
    payPeriodMonth: bigint;
    employeeIds: Array<EmployeeId>;
}
export interface EmployeeImportRow {
    employeeCode: string;
    fullName: string;
    nationality: string;
    jobTitle: string;
    department: string;
    basicSalary: bigint;
    workLocation: string;
}
export type UserId = bigint;
export interface VisaRecord {
    id: VisaRecordId;
    expiryDate: Timestamp;
    createdAt: Timestamp;
    recordType: VisaRecordType;
    updatedAt: Timestamp;
    employeeId: EmployeeId;
    notes: string;
    companyId: CompanyId;
}
export type Result_10 = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result = {
    __kind__: "ok";
    ok: Array<string>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface CheckInInput {
    employeeId: EmployeeId;
    selfieBlob?: ExternalBlob;
    consentGiven: boolean;
    checkInLocation?: GeoLocation;
}
export type Result_8 = {
    __kind__: "ok";
    ok: Employee;
} | {
    __kind__: "err";
    err: ApiError;
};
export type ExpiryStatus = {
    __kind__: "Valid";
    Valid: null;
} | {
    __kind__: "ExpiringSoon";
    ExpiringSoon: bigint;
} | {
    __kind__: "Expired";
    Expired: null;
};
export type Result_30 = {
    __kind__: "ok";
    ok: {
        fileContent: string;
        export: WpsExport;
    };
} | {
    __kind__: "err";
    err: ApiError;
};
export interface CompanyInput {
    country: string;
    name: string;
    registrationNumber: string;
    vatNumber: string;
    address: string;
    billingEmail: string;
    phone: string;
}
export type ApiError = {
    __kind__: "forbidden";
    forbidden: string;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: string;
} | {
    __kind__: "limitExceeded";
    limitExceeded: string;
} | {
    __kind__: "unauthorized";
    unauthorized: string;
};
export type PayrollRunId = bigint;
export type AttendanceLogId = bigint;
export interface GeoLocation {
    latitude: number;
    longitude: number;
}
export type Timestamp = bigint;
export interface ROIMetrics {
    payrollTotalAmount: bigint;
    timeSavedHours: number;
    complianceScoreImprovement: number;
    payrollProcessedCount: bigint;
    currency: string;
    estimatedPenaltiesAvoided: bigint;
}
export interface WhatsAppSettings {
    payrollApprovalEnabled: boolean;
    employeeId: EmployeeId;
    salaryEnabled: boolean;
    phoneNumber: string;
    visaAlertEnabled: boolean;
}
export type Result_25 = {
    __kind__: "ok";
    ok: PenaltyExposure;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_17 = {
    __kind__: "ok";
    ok: Array<PayrollItem>;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_13 = {
    __kind__: "ok";
    ok: Array<VisaRecord>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface ImportResult {
    imported: bigint;
    errors: Array<ImportError>;
}
export type Result_16 = {
    __kind__: "ok";
    ok: Array<PayrollRun>;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_1 = {
    __kind__: "ok";
    ok: PayrollItem;
} | {
    __kind__: "err";
    err: ApiError;
};
export type AuditLogId = bigint;
export type Result_22 = {
    __kind__: "ok";
    ok: Array<AttendanceLog>;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_27 = {
    __kind__: "ok";
    ok: ComplianceRiskScore;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_11 = {
    __kind__: "ok";
    ok: Array<WpsExport>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface DocumentInput {
    documentType: DocumentType;
    expiryDate?: Timestamp;
    blob: ExternalBlob;
    mimeType: string;
    fileName: string;
    fileSize: bigint;
    employeeId: EmployeeId;
}
export interface AttendanceLog {
    id: AttendanceLogId;
    createdAt: Timestamp;
    checkInTime: Timestamp;
    employeeId: EmployeeId;
    selfieBlob?: ExternalBlob;
    consentGiven: boolean;
    checkInLocation?: GeoLocation;
    checkOutTime?: Timestamp;
    checkOutLocation?: GeoLocation;
    workHours?: number;
    companyId: CompanyId;
}
export type Result_19 = {
    __kind__: "ok";
    ok: Array<Employee>;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_29 = {
    __kind__: "ok";
    ok: AttendanceLog | null;
} | {
    __kind__: "err";
    err: ApiError;
};
export type DocumentId = bigint;
export type Result_24 = {
    __kind__: "ok";
    ok: ROIMetrics;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface UserInput {
    role: UserRole;
    fullName: string;
    email: string;
}
export type Result_14 = {
    __kind__: "ok";
    ok: Array<User>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface Employee {
    id: EmployeeId;
    status: EmployeeStatus;
    employeeCode: string;
    iban: string;
    createdAt: Timestamp;
    joiningDate: Timestamp;
    fullName: string;
    nationality: string;
    visaNumber: string;
    bankName: string;
    contractEndDate?: Timestamp;
    emiratesId: string;
    updatedAt: Timestamp;
    jobTitle: string;
    passportNumber: string;
    department: string;
    contractStartDate: Timestamp;
    basicSalary: bigint;
    workLocation: WorkLocation;
    companyId: CompanyId;
}
export interface ComplianceRiskScore {
    riskFactors: Array<RiskFactor>;
    score: bigint;
    currency: string;
    riskLevel: Variant_Low_High_Medium_Critical;
    penaltyExposure: bigint;
}
export interface AuditLog {
    id: AuditLogId;
    status: AuditStatus;
    oldValue?: string;
    userId: UserId;
    createdAt: Timestamp;
    newValue?: string;
    actionType: AuditActionType;
    affectedResourceId: string;
    affectedResourceName: string;
    affectedResourceType: string;
    companyId: CompanyId;
}
export interface Alert {
    id: AlertId;
    alertType: AlertType;
    resourceId?: string;
    createdAt: Timestamp;
    isRead: boolean;
    employeeId?: EmployeeId;
    message: string;
    severity: AlertSeverity;
    readAt?: Timestamp;
    readBy?: UserId;
    companyId: CompanyId;
}
export type Result_33 = {
    __kind__: "ok";
    ok: ImportResult;
} | {
    __kind__: "err";
    err: ApiError;
};
export type AlertId = bigint;
export interface WpsExport {
    id: WpsExportId;
    status: WpsExportStatus;
    employeeCount: bigint;
    createdAt: Timestamp;
    fileName: string;
    exportedBy: UserId;
    payrollRunId: PayrollRunId;
    countryFormat: WpsCountryFormat;
    companyId: CompanyId;
}
export interface User {
    id: UserId;
    status: UserStatus;
    principal: Principal;
    createdAt: Timestamp;
    role: UserRole;
    fullName: string;
    email: string;
    lastLogin?: Timestamp;
    companyId: CompanyId;
}
export interface WpsExportInput {
    payrollRunId: PayrollRunId;
    countryFormat: WpsCountryFormat;
}
export type Result_21 = {
    __kind__: "ok";
    ok: Array<AuditLog>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface ImportError {
    row: bigint;
    reason: string;
}
export interface VisaRecordInput {
    expiryDate: Timestamp;
    recordType: VisaRecordType;
    employeeId: EmployeeId;
    notes: string;
}
export type PayrollItemId = bigint;
export interface RiskFactor {
    employeeCount: bigint;
    description: string;
    severity: string;
    factorType: Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError;
    estimatedFine: bigint;
}
export type Result_18 = {
    __kind__: "ok";
    ok: Array<NotificationLog>;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Subscription;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface EmployeeDocument {
    id: DocumentId;
    documentType: DocumentType;
    expiryDate?: Timestamp;
    blob: ExternalBlob;
    createdAt: Timestamp;
    mimeType: string;
    fileName: string;
    fileSize: bigint;
    employeeId: EmployeeId;
    uploadedBy: UserId;
    companyId: CompanyId;
}
export type CompanyId = bigint;
export type Result_23 = {
    __kind__: "ok";
    ok: WhatsAppSettings;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_15 = {
    __kind__: "ok";
    ok: Array<Alert>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface Company {
    id: CompanyId;
    trialEndDate?: Timestamp;
    country: string;
    alertThresholdDays: Array<bigint>;
    name: string;
    createdAt: Timestamp;
    subscriptionTier: SubscriptionTier;
    registrationNumber: string;
    vatNumber: string;
    address: string;
    billingEmail: string;
    phone: string;
}
export interface CheckOutInput {
    logId: AttendanceLogId;
    checkOutLocation?: GeoLocation;
}
export interface PenaltyBreakdown {
    count: bigint;
    category: string;
    amount: bigint;
}
export type Result_20 = {
    __kind__: "ok";
    ok: Array<EmployeeDocument>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface EmployeeInput {
    employeeCode: string;
    iban: string;
    joiningDate: Timestamp;
    fullName: string;
    nationality: string;
    visaNumber: string;
    bankName: string;
    contractEndDate?: Timestamp;
    emiratesId: string;
    jobTitle: string;
    passportNumber: string;
    department: string;
    contractStartDate: Timestamp;
    basicSalary: bigint;
    workLocation: WorkLocation;
}
export enum AlertSeverity {
    Low = "Low",
    High = "High",
    Medium = "Medium"
}
export enum AlertType {
    DocumentExpiring = "DocumentExpiring",
    PayrollPending = "PayrollPending",
    VisaExpiring = "VisaExpiring",
    ComplianceRisk = "ComplianceRisk"
}
export enum AuditActionType {
    DocumentDeleted = "DocumentDeleted",
    WPSExported = "WPSExported",
    DocumentDownloaded = "DocumentDownloaded",
    DocumentUploaded = "DocumentUploaded",
    EmployeeAdded = "EmployeeAdded",
    SalaryChanged = "SalaryChanged",
    AlertThresholdChanged = "AlertThresholdChanged",
    EmployeeDeleted = "EmployeeDeleted",
    UserLogin = "UserLogin",
    RoleChanged = "RoleChanged",
    CompanyProfileUpdated = "CompanyProfileUpdated",
    PayrollApproved = "PayrollApproved"
}
export enum AuditStatus {
    Success = "Success",
    Failure = "Failure"
}
export enum DocumentType {
    ID = "ID",
    Contract = "Contract",
    Insurance = "Insurance",
    PassportCopy = "PassportCopy",
    Visa = "Visa",
    BankDocuments = "BankDocuments",
    Medical = "Medical"
}
export enum EmployeeStatus {
    Active = "Active",
    Separated = "Separated",
    OnLeave = "OnLeave"
}
export enum PayrollStatus {
    HRApproved = "HRApproved",
    Paid = "Paid",
    AccountantReviewed = "AccountantReviewed",
    Draft = "Draft",
    OwnerApproved = "OwnerApproved",
    Exported = "Exported"
}
export enum SubscriptionStatus {
    Active = "Active",
    Cancelled = "Cancelled",
    Expired = "Expired"
}
export enum SubscriptionTier {
    Starter = "Starter",
    Enterprise = "Enterprise",
    Growth = "Growth",
    Business = "Business"
}
export enum UserRole {
    Employee = "Employee",
    BranchManager = "BranchManager",
    SuperAdmin = "SuperAdmin",
    HRManager = "HRManager",
    CompanyOwner = "CompanyOwner",
    Accountant = "Accountant"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserStatus {
    Inactive = "Inactive",
    Active = "Active",
    Suspended = "Suspended"
}
export enum Variant_Failed_Sent_Pending {
    Failed = "Failed",
    Sent = "Sent",
    Pending = "Pending"
}
export enum Variant_Low_High_Medium_Critical {
    Low = "Low",
    High = "High",
    Medium = "Medium",
    Critical = "Critical"
}
export enum Variant_PayrollDelay_MissingDocument_VisaExpiry_WpsError {
    PayrollDelay = "PayrollDelay",
    MissingDocument = "MissingDocument",
    VisaExpiry = "VisaExpiry",
    WpsError = "WpsError"
}
export enum Variant_Salary_VisaAlert_PayrollApproval {
    Salary = "Salary",
    VisaAlert = "VisaAlert",
    PayrollApproval = "PayrollApproval"
}
export enum VisaRecordType {
    Contract = "Contract",
    Insurance = "Insurance",
    Passport = "Passport",
    Visa = "Visa",
    LabourCard = "LabourCard",
    MedicalCard = "MedicalCard"
}
export enum WorkLocation {
    UAE = "UAE",
    Saudi = "Saudi",
    Oman = "Oman",
    Kuwait = "Kuwait",
    Bahrain = "Bahrain",
    Qatar = "Qatar"
}
export enum WpsCountryFormat {
    OmanMOL = "OmanMOL",
    SaudiTemplate = "SaudiTemplate",
    UAESIF = "UAESIF",
    QatarTemplate = "QatarTemplate"
}
export enum WpsExportStatus {
    Failed = "Failed",
    Generated = "Generated",
    Submitted = "Submitted"
}
export interface backendInterface {
    addEmployee(input: EmployeeInput): Promise<Result_8>;
    addVisaRecord(input: VisaRecordInput): Promise<Result_5>;
    approvePayrollRun(id: PayrollRunId, newStatus: PayrollStatus): Promise<Result_26>;
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    bulkImportEmployees(rows: Array<EmployeeImportRow>): Promise<Result_33>;
    checkIn(input: CheckInInput): Promise<Result_32>;
    checkOut(input: CheckOutInput): Promise<Result_32>;
    createNotificationLog(entry: CreateNotificationEntry): Promise<Result_31>;
    createPayrollRun(input: PayrollRunInput): Promise<Result_26>;
    deactivateUser(userId: UserId): Promise<Result_6>;
    deleteDocument(id: DocumentId): Promise<Result_10>;
    generateWpsExport(input: WpsExportInput): Promise<Result_30>;
    getActiveCheckIn(employeeId: EmployeeId): Promise<Result_29>;
    getCallerUserRole(): Promise<UserRole__1>;
    getCompanyStats(): Promise<Result_28>;
    getComplianceRiskScore(): Promise<Result_27>;
    getDocument(id: DocumentId): Promise<Result_2>;
    getEmployee(id: EmployeeId): Promise<Result_8>;
    getExpiringRecords(thresholdDays: bigint): Promise<Result_13>;
    getMyCompany(): Promise<Result_9>;
    getMyProfile(): Promise<Result_6>;
    getOnboardingProgress(): Promise<Result_7>;
    getPayrollRun(id: PayrollRunId): Promise<Result_26>;
    getPenaltyExposure(): Promise<Result_25>;
    getROIMetrics(): Promise<Result_24>;
    getSubscription(): Promise<Result_3>;
    getWhatsAppSettings(employeeId: EmployeeId): Promise<Result_23>;
    initSeedData(): Promise<boolean>;
    inviteUser(input: UserInput): Promise<Result_6>;
    isCallerAdmin(): Promise<boolean>;
    isSeedDataLoaded(): Promise<boolean>;
    listAlerts(): Promise<Result_15>;
    listAllAttendanceLogs(): Promise<Result_22>;
    listAllDocuments(): Promise<Result_20>;
    listAllVisaRecords(): Promise<Result_13>;
    listAttendanceByMonth(month: bigint, year: bigint): Promise<Result_22>;
    listAttendanceLogs(employeeId: EmployeeId): Promise<Result_22>;
    listAuditLogs(): Promise<Result_21>;
    listAuditLogsByAction(actionType: AuditActionType): Promise<Result_21>;
    listAuditLogsByDateRange(fromNanos: Timestamp, toNanos: Timestamp): Promise<Result_21>;
    listAuditLogsByUser(userId: UserId): Promise<Result_21>;
    listDocuments(employeeId: EmployeeId): Promise<Result_20>;
    listEmployees(): Promise<Result_19>;
    listNotificationLogs(limit: bigint): Promise<Result_18>;
    listPayrollItems(runId: PayrollRunId): Promise<Result_17>;
    listPayrollRuns(): Promise<Result_16>;
    listUnreadAlerts(): Promise<Result_15>;
    listUsers(): Promise<Result_14>;
    listVisaRecords(employeeId: EmployeeId): Promise<Result_13>;
    listVisaRecordsWithStatus(): Promise<Result_12>;
    listWpsExports(): Promise<Result_11>;
    logDocumentDownload(id: DocumentId): Promise<Result_10>;
    markAlertRead(id: AlertId): Promise<Result_10>;
    markAllAlertsRead(): Promise<Result_10>;
    recordMyLogin(): Promise<Result_6>;
    registerCompany(input: CompanyInput): Promise<Result_9>;
    registerUser(companyId: CompanyId, input: UserInput): Promise<Result_6>;
    removeEmployee(id: EmployeeId): Promise<Result_10>;
    removeVisaRecord(id: VisaRecordId): Promise<Result_10>;
    updateAlertThresholds(thresholds: Array<bigint>): Promise<Result_9>;
    updateCompanyProfile(input: CompanyInput): Promise<Result_9>;
    updateEmployee(id: EmployeeId, input: EmployeeInput): Promise<Result_8>;
    updateOnboardingProgress(step: bigint): Promise<Result_7>;
    updateUserRole(userId: UserId, role: UserRole): Promise<Result_6>;
    updateVisaRecord(id: VisaRecordId, input: VisaRecordInput): Promise<Result_5>;
    updateWhatsAppSettings(settings: WhatsAppSettings): Promise<Result_4>;
    upgradeSubscription(tier: SubscriptionTier): Promise<Result_3>;
    uploadDocument(input: DocumentInput): Promise<Result_2>;
    upsertPayrollItem(runId: PayrollRunId, input: PayrollItemInput): Promise<Result_1>;
    validateWpsData(payrollRunId: PayrollRunId): Promise<Result>;
}
