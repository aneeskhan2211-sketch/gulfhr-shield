import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import TCommon "../types/common";
import TCompliance "../types/compliance";
import TEmployee "../types/employee";
import TVisa "../types/visa";
import TPayroll "../types/payroll";
import TDocument "../types/document";
import TUser "../types/user";
import TCompany "../types/company";
import UserLib "../lib/user";
import ComplianceLib "../lib/compliance";

mixin (
  accessControlState : AccessControl.AccessControlState,
  employees : List.List<TEmployee.Employee>,
  visaRecords : List.List<TVisa.VisaRecord>,
  payrollRuns : List.List<TPayroll.PayrollRun>,
  payrollItems : List.List<TPayroll.PayrollItem>,
  documents : List.List<TDocument.EmployeeDocument>,
  users : List.List<TUser.User>,
  companies : List.List<TCompany.Company>,
) {
  // Resolve currency from the caller's company country
  private func resolveCurrency(companyId : TCommon.CompanyId) : Text {
    switch (companies.find(func(c) { c.id == companyId })) {
      case (?c) {
        switch (c.country) {
          case ("Oman") { "OMR" };
          case ("Saudi") { "SAR" };
          case ("Qatar") { "QAR" };
          case ("Bahrain") { "BHD" };
          case ("Kuwait") { "KWD" };
          case (_) { "AED" }; // UAE default
        };
      };
      case null { "AED" };
    };
  };

  // Filter state slices to the caller's company
  private func companyEmployees(companyId : TCommon.CompanyId) : List.List<TEmployee.Employee> {
    employees.filter(func(e) { e.companyId == companyId });
  };
  private func companyVisaRecords(companyId : TCommon.CompanyId) : List.List<TVisa.VisaRecord> {
    visaRecords.filter(func(v) { v.companyId == companyId });
  };
  private func companyPayrollRuns(companyId : TCommon.CompanyId) : List.List<TPayroll.PayrollRun> {
    payrollRuns.filter(func(p) { p.companyId == companyId });
  };
  private func companyDocuments(companyId : TCommon.CompanyId) : List.List<TDocument.EmployeeDocument> {
    documents.filter(func(d) { d.companyId == companyId });
  };

  public query ({ caller }) func getComplianceRiskScore() : async TCommon.Result<TCompliance.ComplianceRiskScore> {
    let user = UserLib.requireUser(users, caller);
    let currency = resolveCurrency(user.companyId);
    let score = ComplianceLib.calculateRiskScore(
      companyEmployees(user.companyId),
      companyVisaRecords(user.companyId),
      companyPayrollRuns(user.companyId),
      companyDocuments(user.companyId),
      currency,
    );
    #ok(score);
  };

  public query ({ caller }) func getPenaltyExposure() : async TCommon.Result<TCompliance.PenaltyExposure> {
    let user = UserLib.requireUser(users, caller);
    let currency = resolveCurrency(user.companyId);
    let exposure = ComplianceLib.getPenaltyExposure(
      companyEmployees(user.companyId),
      companyVisaRecords(user.companyId),
      companyPayrollRuns(user.companyId),
      companyDocuments(user.companyId),
      currency,
    );
    #ok(exposure);
  };
};
