import List "mo:core/List";
import Common "../types/common";
import T "../types/audit";

module {
  public func log(
    auditLogs : List.List<T.AuditLog>,
    counter : Nat,
    companyId : Common.CompanyId,
    userId : Common.UserId,
    input : T.AuditLogInput,
    nowNanos : Common.Timestamp,
  ) : T.AuditLog {
    let entry : T.AuditLog = {
      id = counter;
      companyId;
      userId;
      actionType = input.actionType;
      affectedResourceType = input.affectedResourceType;
      affectedResourceId = input.affectedResourceId;
      affectedResourceName = input.affectedResourceName;
      oldValue = input.oldValue;
      newValue = input.newValue;
      status = input.status;
      createdAt = nowNanos;
    };
    auditLogs.add(entry);
    entry;
  };

  public func getByCompany(
    auditLogs : List.List<T.AuditLog>,
    companyId : Common.CompanyId,
  ) : [T.AuditLog] {
    auditLogs.filter(func(a) { a.companyId == companyId }).toArray();
  };

  public func getByUser(
    auditLogs : List.List<T.AuditLog>,
    companyId : Common.CompanyId,
    userId : Common.UserId,
  ) : [T.AuditLog] {
    auditLogs.filter(func(a) { a.companyId == companyId and a.userId == userId }).toArray();
  };

  public func getByAction(
    auditLogs : List.List<T.AuditLog>,
    companyId : Common.CompanyId,
    actionType : T.AuditActionType,
  ) : [T.AuditLog] {
    auditLogs.filter(
      func(a) { a.companyId == companyId and a.actionType == actionType }
    ).toArray();
  };

  public func getByDateRange(
    auditLogs : List.List<T.AuditLog>,
    companyId : Common.CompanyId,
    fromNanos : Common.Timestamp,
    toNanos : Common.Timestamp,
  ) : [T.AuditLog] {
    auditLogs.filter(
      func(a) {
        a.companyId == companyId and a.createdAt >= fromNanos and a.createdAt <= toNanos;
      }
    ).toArray();
  };
};
