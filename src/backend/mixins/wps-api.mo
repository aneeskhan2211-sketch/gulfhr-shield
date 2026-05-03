import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/wps";
import TUser "../types/user";
import TEmployee "../types/employee";
import TPayroll "../types/payroll";
import TAudit "../types/audit";
import WpsLib "../lib/wps";
import UserLib "../lib/user";
import AuditLib "../lib/audit";
import PayrollLib "../lib/payroll";

mixin (
  accessControlState : AccessControl.AccessControlState,
  wpsExports : List.List<T.WpsExport>,
  employees : List.List<TEmployee.Employee>,
  payrollRuns : List.List<TPayroll.PayrollRun>,
  payrollItems : List.List<TPayroll.PayrollItem>,
  users : List.List<TUser.User>,
  auditLogs : List.List<TAudit.AuditLog>,
  counters : Common.Counters,
) {
  public query ({ caller }) func listWpsExports() : async Common.Result<[T.WpsExport]> {
    let user = UserLib.requireUser(users, caller);
    #ok(WpsLib.getByCompany(wpsExports, user.companyId));
  };

  public shared ({ caller }) func generateWpsExport(input : T.WpsExportInput) : async Common.Result<{ export_ : T.WpsExport; fileContent : Text }> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #Accountant)) {
      return #err(#forbidden("Accountant or above required"));
    };
    // Get the payroll run and verify company
    let run = switch (PayrollLib.getRunById(payrollRuns, input.payrollRunId)) {
      case null { return #err(#notFound("Payroll run not found")) };
      case (?r) {
        if (r.companyId != user.companyId) { return #err(#forbidden("Access denied")) };
        r;
      };
    };
    // Validate
    let errors = WpsLib.validateForExport(employees, payrollItems, input.payrollRunId);
    if (errors.size() > 0) {
      return #err(#invalidInput("Validation failed: " # debug_show(errors)));
    };
    // Generate file content
    let fileContent = WpsLib.generateFileContent(input.countryFormat, employees, payrollItems, run);
    let fileName = "wps_" # debug_show(run.payPeriodYear) # "_" # debug_show(run.payPeriodMonth) # ".csv";
    let employeeCount = payrollItems.filter(func(i) { i.payrollRunId == input.payrollRunId }).size();
    counters.wpsExport += 1;
    let export_ = WpsLib.createExport(wpsExports, counters.wpsExport, user.companyId,
      user.id, input, employeeCount, fileName);
    counters.auditLog += 1;
    ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
      { actionType = #WPSExported; affectedResourceType = "WpsExport";
        affectedResourceId = debug_show(export_.id); affectedResourceName = fileName;
        oldValue = null; newValue = ?(debug_show(input.countryFormat)); status = #Success }, Time.now());
    #ok({ export_; fileContent });
  };

  public query ({ caller }) func validateWpsData(payrollRunId : Common.PayrollRunId) : async Common.Result<[Text]> {
    let user = UserLib.requireUser(users, caller);
    switch (PayrollLib.getRunById(payrollRuns, payrollRunId)) {
      case null { return #err(#notFound("Payroll run not found")) };
      case (?run) {
        if (run.companyId != user.companyId) { return #err(#forbidden("Access denied")) };
      };
    };
    #ok(WpsLib.validateForExport(employees, payrollItems, payrollRunId));
  };
};
