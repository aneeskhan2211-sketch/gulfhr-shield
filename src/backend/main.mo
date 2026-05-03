import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

import TCommon "types/common";
import TCompany "types/company";
import TUser "types/user";
import TEmployee "types/employee";
import TDocument "types/document";
import TVisa "types/visa";
import TPayroll "types/payroll";
import TWps "types/wps";
import TAttendance "types/attendance";
import TAlert "types/alert";
import TAudit "types/audit";

import CompanyApi "mixins/company-api";
import UserApi "mixins/user-api";
import EmployeeApi "mixins/employee-api";
import DocumentApi "mixins/document-api";
import VisaApi "mixins/visa-api";
import PayrollApi "mixins/payroll-api";
import WpsApi "mixins/wps-api";
import AttendanceApi "mixins/attendance-api";
import AlertApi "mixins/alert-api";
import AuditApi "mixins/audit-api";
import SeedApi "mixins/seed-api";
import TCompliance "types/compliance";
import TNotifications "types/notifications";
import TRoi "types/roi";
import TOnboarding "types/onboarding";
import ComplianceApi "mixins/compliance-api";
import NotificationApi "mixins/notification-api";
import RoiApi "mixins/roi-api";
import OnboardingApi "mixins/onboarding-api";
import ImportApi "mixins/import-api";

actor {
  // ── Authorization ──────────────────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Object Storage ───────────────────────────────────────────────────────────
  include MixinObjectStorage();

  // ── ID Counters ──────────────────────────────────────────────────────────────
  let counters : TCommon.Counters = {
    var company = 0;
    var subscription = 0;
    var user = 0;
    var employee = 0;
    var document = 0;
    var visaRecord = 0;
    var payrollRun = 0;
    var payrollItem = 0;
    var wpsExport = 0;
    var attendanceLog = 0;
    var alert = 0;
    var auditLog = 0;
  };

  // Separate counter for notification IDs
  let notificationCounters : { var notification : Nat } = { var notification = 0 };

  // ── State ────────────────────────────────────────────────────────────────────
  let companies = List.empty<TCompany.Company>();
  let subscriptions = List.empty<TCompany.Subscription>();
  let users = List.empty<TUser.User>();
  let employees = List.empty<TEmployee.Employee>();
  let documents = List.empty<TDocument.EmployeeDocument>();
  let visaRecords = List.empty<TVisa.VisaRecord>();
  let payrollRuns = List.empty<TPayroll.PayrollRun>();
  let payrollItems = List.empty<TPayroll.PayrollItem>();
  let wpsExports = List.empty<TWps.WpsExport>();
  let attendanceLogs = List.empty<TAttendance.AttendanceLog>();
  let alerts = List.empty<TAlert.Alert>();
  let auditLogs = List.empty<TAudit.AuditLog>();
  let whatsAppSettingsList = List.empty<TNotifications.WhatsAppSettings>();
  let notificationLogs = List.empty<TNotifications.NotificationLog>();
  let onboardingProgressList = List.empty<TOnboarding.OnboardingProgress>();

  // ── Domain Mixins ─────────────────────────────────────────────────────────────
  include CompanyApi(
    accessControlState,
    companies,
    subscriptions,
    users,
    auditLogs,
    counters,
  );

  include UserApi(
    accessControlState,
    companies,
    users,
    auditLogs,
    counters,
  );

  include EmployeeApi(
    accessControlState,
    employees,
    users,
    auditLogs,
    counters,
  );

  include DocumentApi(
    accessControlState,
    documents,
    users,
    auditLogs,
    counters,
  );

  include VisaApi(
    accessControlState,
    visaRecords,
    users,
    companies,
    auditLogs,
    counters,
  );

  include PayrollApi(
    accessControlState,
    payrollRuns,
    payrollItems,
    users,
    auditLogs,
    counters,
  );

  include WpsApi(
    accessControlState,
    wpsExports,
    employees,
    payrollRuns,
    payrollItems,
    users,
    auditLogs,
    counters,
  );

  include AttendanceApi(
    accessControlState,
    attendanceLogs,
    users,
    auditLogs,
    counters,
  );

  include AlertApi(
    accessControlState,
    alerts,
    users,
    counters,
  );

  include AuditApi(
    accessControlState,
    auditLogs,
    users,
    counters,
  );

  include ComplianceApi(
    accessControlState,
    employees,
    visaRecords,
    payrollRuns,
    payrollItems,
    documents,
    users,
    companies,
  );

  include NotificationApi(
    accessControlState,
    whatsAppSettingsList,
    notificationLogs,
    users,
    notificationCounters,
  );

  include RoiApi(
    accessControlState,
    payrollRuns,
    users,
  );

  include OnboardingApi(
    accessControlState,
    onboardingProgressList,
    users,
  );

  include ImportApi(
    accessControlState,
    employees,
    users,
    counters,
  );

  include SeedApi(
    accessControlState,
    companies,
    subscriptions,
    users,
    employees,
    visaRecords,
    payrollRuns,
    payrollItems,
    attendanceLogs,
    auditLogs,
    alerts,
    counters,
  );
};
