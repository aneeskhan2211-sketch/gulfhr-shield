import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import TCompany "../types/company";
import T "../types/user";
import TAudit "../types/audit";
import UserLib "../lib/user";
import CompanyLib "../lib/company";
import AuditLib "../lib/audit";
import Principal "mo:core/Principal";

mixin (
  accessControlState : AccessControl.AccessControlState,
  companies : List.List<TCompany.Company>,
  users : List.List<T.User>,
  auditLogs : List.List<TAudit.AuditLog>,
  counters : Common.Counters,
) {
  // Called on first login to register the user under a company
  public shared ({ caller }) func registerUser(companyId : Common.CompanyId, input : T.UserInput) : async Common.Result<T.User> {
    switch (UserLib.getByPrincipal(users, caller)) {
      case (?_) { return #err(#invalidInput("Principal already registered")) };
      case null {};
    };
    switch (CompanyLib.getById(companies, companyId)) {
      case null { return #err(#notFound("Company not found")) };
      case (?_) {};
    };
    counters.user += 1;
    let user = UserLib.create(users, counters.user, companyId, caller, input);
    counters.auditLog += 1;
    ignore AuditLib.log(auditLogs, counters.auditLog, companyId, user.id,
      { actionType = #UserLogin; affectedResourceType = "User";
        affectedResourceId = debug_show(user.id); affectedResourceName = user.fullName;
        oldValue = null; newValue = null; status = #Success }, Time.now());
    #ok(user);
  };

  public query ({ caller }) func getMyProfile() : async Common.Result<T.User> {
    switch (UserLib.getByPrincipal(users, caller)) {
      case (?u) { #ok(u) };
      case null { #err(#notFound("User not registered")) };
    };
  };

  public query ({ caller }) func listUsers() : async Common.Result<[T.User]> {
    let user = UserLib.requireUser(users, caller);
    #ok(UserLib.getByCompany(users, user.companyId));
  };

  public shared ({ caller }) func inviteUser(input : T.UserInput) : async Common.Result<T.User> {
    let adminUser = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(adminUser, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    counters.user += 1;
    // Create with anonymous principal — user will claim with their principal on first login
    let invited = UserLib.create(users, counters.user, adminUser.companyId,
      Principal.anonymous(), input);
    counters.auditLog += 1;
    ignore AuditLib.log(auditLogs, counters.auditLog, adminUser.companyId, adminUser.id,
      { actionType = #UserLogin; affectedResourceType = "User";
        affectedResourceId = debug_show(invited.id); affectedResourceName = invited.fullName;
        oldValue = null; newValue = ?(debug_show(input.role)); status = #Success }, Time.now());
    #ok(invited);
  };

  public shared ({ caller }) func updateUserRole(userId : Common.UserId, role : T.UserRole) : async Common.Result<T.User> {
    let adminUser = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(adminUser, #CompanyOwner)) {
      return #err(#forbidden("Company Owner required to change roles"));
    };
    switch (UserLib.getById(users, userId)) {
      case null { return #err(#notFound("User not found")) };
      case (?target) {
        if (target.companyId != adminUser.companyId) {
          return #err(#forbidden("Cannot modify user from another company"));
        };
      };
    };
    ignore UserLib.updateRole(users, userId, role);
    counters.auditLog += 1;
    ignore AuditLib.log(auditLogs, counters.auditLog, adminUser.companyId, adminUser.id,
      { actionType = #RoleChanged; affectedResourceType = "User";
        affectedResourceId = debug_show(userId); affectedResourceName = debug_show(userId);
        oldValue = null; newValue = ?(debug_show(role)); status = #Success }, Time.now());
    switch (UserLib.getById(users, userId)) {
      case (?u) { #ok(u) };
      case null { #err(#notFound("User not found after update")) };
    };
  };

  public shared ({ caller }) func deactivateUser(userId : Common.UserId) : async Common.Result<T.User> {
    let adminUser = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(adminUser, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    ignore UserLib.updateStatus(users, userId, #Inactive);
    switch (UserLib.getById(users, userId)) {
      case (?u) { #ok(u) };
      case null { #err(#notFound("User not found")) };
    };
  };

  // Record login for current user — called from frontend on each session start
  public shared ({ caller }) func recordMyLogin() : async Common.Result<T.User> {
    switch (UserLib.getByPrincipal(users, caller)) {
      case (?u) {
        UserLib.recordLogin(users, u.id, Time.now());
        #ok(u);
      };
      case null { #err(#notFound("User not registered")) };
    };
  };
};
