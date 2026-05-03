import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import TCommon "../types/common";
import TNotifications "../types/notifications";
import TUser "../types/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  whatsAppSettingsList : List.List<TNotifications.WhatsAppSettings>,
  notificationLogs : List.List<TNotifications.NotificationLog>,
  users : List.List<TUser.User>,
  notificationCounters : { var notification : Nat },
) {
  public shared ({ caller }) func getWhatsAppSettings(employeeId : TCommon.EmployeeId) : async TCommon.Result<TNotifications.WhatsAppSettings> {
    Debug.todo();
  };

  public shared ({ caller }) func updateWhatsAppSettings(settings : TNotifications.WhatsAppSettings) : async TCommon.Result<()> {
    Debug.todo();
  };

  public shared ({ caller }) func listNotificationLogs(limit : Nat) : async TCommon.Result<[TNotifications.NotificationLog]> {
    Debug.todo();
  };

  public shared ({ caller }) func createNotificationLog(
    entry : TNotifications.CreateNotificationEntry
  ) : async TCommon.Result<TNotifications.NotificationLog> {
    Debug.todo();
  };
};
