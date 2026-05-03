import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/employee";
import TUser "../types/user";
import TAudit "../types/audit";
import EmployeeLib "../lib/employee";
import UserLib "../lib/user";
import AuditLib "../lib/audit";

mixin (
  accessControlState : AccessControl.AccessControlState,
  employees : List.List<T.Employee>,
  users : List.List<TUser.User>,
  auditLogs : List.List<TAudit.AuditLog>,
  counters : Common.Counters,
) {
  public query ({ caller }) func listEmployees() : async Common.Result<[T.Employee]> {
    let user = UserLib.requireUser(users, caller);
    #ok(EmployeeLib.getByCompany(employees, user.companyId));
  };

  public query ({ caller }) func getEmployee(id : Common.EmployeeId) : async Common.Result<T.Employee> {
    let user = UserLib.requireUser(users, caller);
    switch (EmployeeLib.getById(employees, id)) {
      case null { #err(#notFound("Employee not found")) };
      case (?emp) {
        if (emp.companyId != user.companyId) { return #err(#forbidden("Access denied")) };
        #ok(emp);
      };
    };
  };

  public shared ({ caller }) func addEmployee(input : T.EmployeeInput) : async Common.Result<T.Employee> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    counters.employee += 1;
    let emp = EmployeeLib.create(employees, counters.employee, user.companyId, input);
    counters.auditLog += 1;
    ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
      { actionType = #EmployeeAdded; affectedResourceType = "Employee";
        affectedResourceId = debug_show(emp.id); affectedResourceName = emp.fullName;
        oldValue = null; newValue = null; status = #Success }, Time.now());
    #ok(emp);
  };

  public shared ({ caller }) func updateEmployee(id : Common.EmployeeId, input : T.EmployeeInput) : async Common.Result<T.Employee> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    switch (EmployeeLib.update(employees, id, user.companyId, input)) {
      case null { #err(#notFound("Employee not found")) };
      case (?emp) {
        // Log salary change if basic salary changed
        counters.auditLog += 1;
        ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
          { actionType = #SalaryChanged; affectedResourceType = "Employee";
            affectedResourceId = debug_show(emp.id); affectedResourceName = emp.fullName;
            oldValue = null; newValue = ?(debug_show(input.basicSalary)); status = #Success }, Time.now());
        #ok(emp);
      };
    };
  };

  public shared ({ caller }) func removeEmployee(id : Common.EmployeeId) : async Common.Result<Bool> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    switch (EmployeeLib.getById(employees, id)) {
      case null { return #err(#notFound("Employee not found")) };
      case (?emp) {
        if (emp.companyId != user.companyId) { return #err(#forbidden("Access denied")) };
      };
    };
    let ok = EmployeeLib.deactivate(employees, id, user.companyId);
    counters.auditLog += 1;
    ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
      { actionType = #EmployeeDeleted; affectedResourceType = "Employee";
        affectedResourceId = debug_show(id); affectedResourceName = debug_show(id);
        oldValue = null; newValue = null; status = if (ok) { #Success } else { #Failure } }, Time.now());
    #ok(ok);
  };
};
