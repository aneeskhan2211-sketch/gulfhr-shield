import Debug "mo:core/Debug";
import List "mo:core/List";
import TCommon "../types/common";
import TRoi "../types/roi";
import TPayroll "../types/payroll";
import TCompliance "../types/compliance";

module {
  public func getROIMetrics(
    payrollRuns : List.List<TPayroll.PayrollRun>,
    companyId : TCommon.CompanyId,
    currency : Text,
  ) : TRoi.ROIMetrics {
    Debug.todo();
  };
};
