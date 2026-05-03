import Debug "mo:core/Debug";
import List "mo:core/List";
import Map "mo:core/Map";
import TCommon "../types/common";
import TNotifications "../types/notifications";

module {
  public func getWhatsAppSettings(
    settingsList : List.List<TNotifications.WhatsAppSettings>,
    employeeId : TCommon.EmployeeId,
  ) : ?TNotifications.WhatsAppSettings {
    Debug.todo();
  };

  public func upsertWhatsAppSettings(
    settingsList : List.List<TNotifications.WhatsAppSettings>,
    settings : TNotifications.WhatsAppSettings,
  ) {
    Debug.todo();
  };

  public func listNotificationLogs(
    logs : List.List<TNotifications.NotificationLog>,
    limit : Nat,
  ) : [TNotifications.NotificationLog] {
    Debug.todo();
  };

  public func createNotificationLog(
    logs : List.List<TNotifications.NotificationLog>,
    entry : TNotifications.CreateNotificationEntry,
    companyId : TCommon.CompanyId,
    counters : { var notification : Nat },
  ) : TNotifications.NotificationLog {
    Debug.todo();
  };
};
