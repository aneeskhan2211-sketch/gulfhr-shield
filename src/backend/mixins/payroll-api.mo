import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/payroll";
import TUser "../types/user";
import TAudit "../types/audit";
import PayrollLib "../lib/payroll";
import UserLib "../lib/user";
import AuditLib "../lib/audit";

mixin (
  accessControlState : AccessControl.AccessControlState,
  payrollRuns : List.List<T.PayrollRun>,
  payrollItems : List.List<T.PayrollItem>,
  users : List.List<TUser.User>,
  auditLogs : List.List<TAudit.AuditLog>,
  counters : Common.Counters,
) {
  public query ({ caller }) func listPayrollRuns() : async Common.Result<[T.PayrollRun]> {
    let user = UserLib.requireUser(users, caller);
    #ok(PayrollLib.getRunsByCompany(payrollRuns, user.companyId));
  };

  public query ({ caller }) func getPayrollRun(id : Common.PayrollRunId) : async Common.Result<T.PayrollRun> {
    let user = UserLib.requireUser(users, caller);
    switch (PayrollLib.getRunById(payrollRuns, id)) {
      case null { #err(#notFound("Payroll run not found")) };
      case (?run) {
        if (run.companyId != user.companyId) { return #err(#forbidden("Access denied")) };
        #ok(run);
      };
    };
  };

  public shared ({ caller }) func createPayrollRun(input : T.PayrollRunInput) : async Common.Result<T.PayrollRun> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    counters.payrollRun += 1;
    let run = PayrollLib.createRun(payrollRuns, counters.payrollRun, user.companyId, user.id, input);
    counters.auditLog += 1;
    ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
      { actionType = #PayrollApproved; affectedResourceType = "PayrollRun";
        affectedResourceId = debug_show(run.id); affectedResourceName = debug_show(input.payPeriodMonth) # "/" # debug_show(input.payPeriodYear);
        oldValue = null; newValue = ?("Draft"); status = #Success }, Time.now());
    #ok(run);
  };

  public shared ({ caller }) func approvePayrollRun(id : Common.PayrollRunId, newStatus : T.PayrollStatus) : async Common.Result<T.PayrollRun> {
    let user = UserLib.requireUser(users, caller);
    // Role-based approval gates
    let requiredRole : TUser.UserRole = switch (newStatus) {
      case (#HRApproved) { #HRManager };
      case (#AccountantReviewed) { #Accountant };
      case (#OwnerApproved) { #CompanyOwner };
      case (#Exported) { #Accountant };
      case (#Paid) { #CompanyOwner };
      case (_) { #HRManager };
    };
    if (not UserLib.hasRole(user, requiredRole)) {
      return #err(#forbidden("Insufficient role for this payroll status transition"));
    };
    switch (PayrollLib.advanceStatus(payrollRuns, id, user.companyId, user.id, newStatus, Time.now())) {
      case null { #err(#notFound("Payroll run not found")) };
      case (?run) {
        counters.auditLog += 1;
        ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
          { actionType = #PayrollApproved; affectedResourceType = "PayrollRun";
            affectedResourceId = debug_show(id); affectedResourceName = debug_show(id);
            oldValue = null; newValue = ?(debug_show(newStatus)); status = #Success }, Time.now());
        #ok(run);
      };
    };
  };

  public query ({ caller }) func listPayrollItems(runId : Common.PayrollRunId) : async Common.Result<[T.PayrollItem]> {
    let user = UserLib.requireUser(users, caller);
    // Verify run belongs to user's company
    switch (PayrollLib.getRunById(payrollRuns, runId)) {
      case null { return #err(#notFound("Payroll run not found")) };
      case (?run) {
        if (run.companyId != user.companyId) { return #err(#forbidden("Access denied")) };
      };
    };
    #ok(PayrollLib.getItemsByRun(payrollItems, runId));
  };

  public shared ({ caller }) func upsertPayrollItem(runId : Common.PayrollRunId, input : T.PayrollItemInput) : async Common.Result<T.PayrollItem> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    switch (PayrollLib.getRunById(payrollRuns, runId)) {
      case null { return #err(#notFound("Payroll run not found")) };
      case (?run) {
        if (run.companyId != user.companyId) { return #err(#forbidden("Access denied")) };
      };
    };
    // Check if item already exists for this employee in this run
    let existing = payrollItems.find(func(i) { i.payrollRunId == runId and i.employeeId == input.employeeId });
    let now = Time.now();
    let item = switch (existing) {
      case (?i) {
        switch (PayrollLib.updateItem(payrollItems, i.id, runId, input, now)) {
          case (?updated) { updated };
          case null { Runtime.trap("Failed to update payroll item") };
        };
      };
      case null {
        counters.payrollItem += 1;
        PayrollLib.createItem(payrollItems, counters.payrollItem, runId, input);
      };
    };
    PayrollLib.recalculateTotals(payrollRuns, payrollItems, runId);
    #ok(item);
  };
};
