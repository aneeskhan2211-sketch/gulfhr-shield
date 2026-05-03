import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/audit";
import TUser "../types/user";
import AuditLib "../lib/audit";
import UserLib "../lib/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  auditLogs : List.List<T.AuditLog>,
  users : List.List<TUser.User>,
  counters : Common.Counters,
) {
  public query ({ caller }) func listAuditLogs() : async Common.Result<[T.AuditLog]> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    #ok(AuditLib.getByCompany(auditLogs, user.companyId));
  };

  public query ({ caller }) func listAuditLogsByAction(actionType : T.AuditActionType) : async Common.Result<[T.AuditLog]> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    #ok(AuditLib.getByAction(auditLogs, user.companyId, actionType));
  };

  public query ({ caller }) func listAuditLogsByUser(userId : Common.UserId) : async Common.Result<[T.AuditLog]> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    #ok(AuditLib.getByUser(auditLogs, user.companyId, userId));
  };

  public query ({ caller }) func listAuditLogsByDateRange(fromNanos : Common.Timestamp, toNanos : Common.Timestamp) : async Common.Result<[T.AuditLog]> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    #ok(AuditLib.getByDateRange(auditLogs, user.companyId, fromNanos, toNanos));
  };
};
