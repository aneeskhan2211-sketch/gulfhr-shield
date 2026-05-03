import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import TCompany "../types/company";
import TUser "../types/user";
import TEmployee "../types/employee";
import TVisa "../types/visa";
import TPayroll "../types/payroll";
import TAttendance "../types/attendance";
import TAudit "../types/audit";
import TAlert "../types/alert";
import Seed "../lib/seed";
import UserLib "../lib/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  companies : List.List<TCompany.Company>,
  subscriptions : List.List<TCompany.Subscription>,
  users : List.List<TUser.User>,
  employees : List.List<TEmployee.Employee>,
  visaRecords : List.List<TVisa.VisaRecord>,
  payrollRuns : List.List<TPayroll.PayrollRun>,
  payrollItems : List.List<TPayroll.PayrollItem>,
  attendanceLogs : List.List<TAttendance.AttendanceLog>,
  auditLogs : List.List<TAudit.AuditLog>,
  alerts : List.List<TAlert.Alert>,
  counters : Common.Counters,
) {
  // Initializes demo data on first boot. Idempotent — safe to call multiple times.
  public shared func initSeedData() : async Bool {
    Seed.seedDemoData(
      companies, subscriptions, users, employees, visaRecords,
      payrollRuns, payrollItems, attendanceLogs, auditLogs, alerts, counters,
    );
  };

  public query func isSeedDataLoaded() : async Bool {
    not companies.isEmpty();
  };
};
