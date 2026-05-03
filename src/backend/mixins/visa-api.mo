import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/visa";
import TUser "../types/user";
import TAudit "../types/audit";
import TCompany "../types/company";
import VisaLib "../lib/visa";
import UserLib "../lib/user";
import AuditLib "../lib/audit";
import CompanyLib "../lib/company";

mixin (
  accessControlState : AccessControl.AccessControlState,
  visaRecords : List.List<T.VisaRecord>,
  users : List.List<TUser.User>,
  companies : List.List<TCompany.Company>,
  auditLogs : List.List<TAudit.AuditLog>,
  counters : Common.Counters,
) {
  public query ({ caller }) func listVisaRecords(employeeId : Common.EmployeeId) : async Common.Result<[T.VisaRecord]> {
    let user = UserLib.requireUser(users, caller);
    #ok(VisaLib.getByEmployee(visaRecords, employeeId, user.companyId));
  };

  public query ({ caller }) func listAllVisaRecords() : async Common.Result<[T.VisaRecord]> {
    let user = UserLib.requireUser(users, caller);
    #ok(VisaLib.getByCompany(visaRecords, user.companyId));
  };

  public shared ({ caller }) func addVisaRecord(input : T.VisaRecordInput) : async Common.Result<T.VisaRecord> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    counters.visaRecord += 1;
    let record = VisaLib.create(visaRecords, counters.visaRecord, user.companyId, input);
    #ok(record);
  };

  public shared ({ caller }) func updateVisaRecord(id : Common.VisaRecordId, input : T.VisaRecordInput) : async Common.Result<T.VisaRecord> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    switch (VisaLib.update(visaRecords, id, user.companyId, input)) {
      case null { #err(#notFound("Visa record not found")) };
      case (?r) { #ok(r) };
    };
  };

  public shared ({ caller }) func removeVisaRecord(id : Common.VisaRecordId) : async Common.Result<Bool> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #HRManager)) {
      return #err(#forbidden("HR Manager or above required"));
    };
    #ok(VisaLib.remove(visaRecords, id, user.companyId));
  };

  public query ({ caller }) func getExpiringRecords(thresholdDays : Nat) : async Common.Result<[T.VisaRecord]> {
    let user = UserLib.requireUser(users, caller);
    #ok(VisaLib.getExpiring(visaRecords, user.companyId, thresholdDays, Time.now()));
  };

  public query ({ caller }) func listVisaRecordsWithStatus() : async Common.Result<[{ record : T.VisaRecord; status : T.ExpiryStatus }]> {
    let user = UserLib.requireUser(users, caller);
    let thresholds = switch (CompanyLib.getById(companies, user.companyId)) {
      case (?c) { c.alertThresholdDays };
      case null { [7, 30, 60] };
    };
    let now = Time.now();
    let records = VisaLib.getByCompany(visaRecords, user.companyId);
    let withStatus = records.map(
      func(r : T.VisaRecord) : { record : T.VisaRecord; status : T.ExpiryStatus } { { record = r; status = VisaLib.getExpiryStatus(r, thresholds, now) } }
    );
    #ok(withStatus);
  };
};
