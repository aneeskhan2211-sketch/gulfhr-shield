import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/alert";
import TUser "../types/user";
import AlertLib "../lib/alert";
import UserLib "../lib/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  alerts : List.List<T.Alert>,
  users : List.List<TUser.User>,
  counters : Common.Counters,
) {
  public query ({ caller }) func listAlerts() : async Common.Result<[T.Alert]> {
    let user = UserLib.requireUser(users, caller);
    #ok(AlertLib.getByCompany(alerts, user.companyId));
  };

  public query ({ caller }) func listUnreadAlerts() : async Common.Result<[T.Alert]> {
    let user = UserLib.requireUser(users, caller);
    #ok(AlertLib.getUnread(alerts, user.companyId));
  };

  public shared ({ caller }) func markAlertRead(id : Common.AlertId) : async Common.Result<Bool> {
    let user = UserLib.requireUser(users, caller);
    let ok = AlertLib.markRead(alerts, id, user.companyId, user.id, Time.now());
    if (ok) { #ok(true) } else { #err(#notFound("Alert not found")) };
  };

  public shared ({ caller }) func markAllAlertsRead() : async Common.Result<Bool> {
    let user = UserLib.requireUser(users, caller);
    AlertLib.markAllRead(alerts, user.companyId, user.id, Time.now());
    #ok(true);
  };
};
