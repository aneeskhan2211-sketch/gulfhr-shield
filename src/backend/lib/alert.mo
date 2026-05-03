import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/alert";

module {
  public func create(
    alerts : List.List<T.Alert>,
    counter : Nat,
    companyId : Common.CompanyId,
    employeeId : ?Common.EmployeeId,
    alertType : T.AlertType,
    severity : T.AlertSeverity,
    message : Text,
    resourceId : ?Text,
  ) : T.Alert {
    let alert : T.Alert = {
      id = counter;
      companyId;
      employeeId;
      alertType;
      severity;
      message;
      resourceId;
      isRead = false;
      readAt = null;
      readBy = null;
      createdAt = Time.now();
    };
    alerts.add(alert);
    alert;
  };

  public func getByCompany(
    alerts : List.List<T.Alert>,
    companyId : Common.CompanyId,
  ) : [T.Alert] {
    alerts.filter(func(a) { a.companyId == companyId }).toArray();
  };

  public func getUnread(
    alerts : List.List<T.Alert>,
    companyId : Common.CompanyId,
  ) : [T.Alert] {
    alerts.filter(func(a) { a.companyId == companyId and not a.isRead }).toArray();
  };

  public func markRead(
    alerts : List.List<T.Alert>,
    id : Common.AlertId,
    companyId : Common.CompanyId,
    readBy : Common.UserId,
    nowNanos : Common.Timestamp,
  ) : Bool {
    var found = false;
    alerts.mapInPlace(
      func(a) {
        if (a.id == id and a.companyId == companyId) {
          found := true;
          { a with isRead = true; readAt = ?nowNanos; readBy = ?readBy };
        } else { a };
      }
    );
    found;
  };

  public func markAllRead(
    alerts : List.List<T.Alert>,
    companyId : Common.CompanyId,
    readBy : Common.UserId,
    nowNanos : Common.Timestamp,
  ) : () {
    alerts.mapInPlace(
      func(a) {
        if (a.companyId == companyId and not a.isRead) {
          { a with isRead = true; readAt = ?nowNanos; readBy = ?readBy };
        } else { a };
      }
    );
  };
};
