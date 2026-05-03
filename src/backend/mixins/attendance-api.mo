import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/attendance";
import TUser "../types/user";
import TAudit "../types/audit";
import AttendanceLib "../lib/attendance";
import UserLib "../lib/user";
import AuditLib "../lib/audit";

mixin (
  accessControlState : AccessControl.AccessControlState,
  attendanceLogs : List.List<T.AttendanceLog>,
  users : List.List<TUser.User>,
  auditLogs : List.List<TAudit.AuditLog>,
  counters : Common.Counters,
) {
  public shared ({ caller }) func checkIn(input : T.CheckInInput) : async Common.Result<T.AttendanceLog> {
    let user = UserLib.requireUser(users, caller);
    // Check for already-open check-in
    switch (AttendanceLib.getActiveCheckIn(attendanceLogs, input.employeeId, user.companyId)) {
      case (?_) { return #err(#invalidInput("Employee already has an active check-in")) };
      case null {};
    };
    counters.attendanceLog += 1;
    let log = AttendanceLib.checkIn(attendanceLogs, counters.attendanceLog, user.companyId, input, Time.now());
    #ok(log);
  };

  public shared ({ caller }) func checkOut(input : T.CheckOutInput) : async Common.Result<T.AttendanceLog> {
    let user = UserLib.requireUser(users, caller);
    switch (AttendanceLib.checkOut(attendanceLogs, input, user.companyId, Time.now())) {
      case null { #err(#notFound("Active check-in not found or already checked out")) };
      case (?log) { #ok(log) };
    };
  };

  public query ({ caller }) func listAttendanceLogs(employeeId : Common.EmployeeId) : async Common.Result<[T.AttendanceLog]> {
    let user = UserLib.requireUser(users, caller);
    #ok(AttendanceLib.getByEmployee(attendanceLogs, employeeId, user.companyId));
  };

  public query ({ caller }) func listAttendanceByMonth(month : Nat, year : Nat) : async Common.Result<[T.AttendanceLog]> {
    let user = UserLib.requireUser(users, caller);
    #ok(AttendanceLib.getByMonth(attendanceLogs, user.companyId, month, year));
  };

  public query ({ caller }) func getActiveCheckIn(employeeId : Common.EmployeeId) : async Common.Result<?T.AttendanceLog> {
    let user = UserLib.requireUser(users, caller);
    #ok(AttendanceLib.getActiveCheckIn(attendanceLogs, employeeId, user.companyId));
  };

  public query ({ caller }) func listAllAttendanceLogs() : async Common.Result<[T.AttendanceLog]> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    #ok(AttendanceLib.getByCompany(attendanceLogs, user.companyId));
  };
};
