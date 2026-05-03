import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import TCommon "../types/common";
import TCompliance "../types/compliance";
import TEmployee "../types/employee";
import TUser "../types/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  employees : List.List<TEmployee.Employee>,
  users : List.List<TUser.User>,
  counters : TCommon.Counters,
) {
  public shared ({ caller }) func bulkImportEmployees(
    rows : [TCompliance.EmployeeImportRow]
  ) : async TCommon.Result<TCompliance.ImportResult> {
    Debug.todo();
  };
};
