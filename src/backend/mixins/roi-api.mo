import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import TCommon "../types/common";
import TRoi "../types/roi";
import TPayroll "../types/payroll";
import TUser "../types/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  payrollRuns : List.List<TPayroll.PayrollRun>,
  users : List.List<TUser.User>,
) {
  public shared ({ caller }) func getROIMetrics() : async TCommon.Result<TRoi.ROIMetrics> {
    Debug.todo();
  };
};
