import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/payroll";

module {
  public func calcNetSalary(input : T.PayrollItemInput) : Nat {
    let gross = input.basicSalary + input.housingAllowance + input.transportAllowance + input.overtime;
    let deductions = input.deductions + input.advanceSalary + input.leaveDeduction;
    if (gross >= deductions) { gross - deductions } else { 0 };
  };

  public func createRun(
    runs : List.List<T.PayrollRun>,
    counter : Nat,
    companyId : Common.CompanyId,
    createdBy : Common.UserId,
    input : T.PayrollRunInput,
  ) : T.PayrollRun {
    let run : T.PayrollRun = {
      id = counter;
      companyId;
      payPeriodMonth = input.payPeriodMonth;
      payPeriodYear = input.payPeriodYear;
      status = #Draft;
      employeeIds = input.employeeIds;
      createdBy;
      hrApprovedBy = null;
      hrApprovedAt = null;
      accountantReviewedBy = null;
      accountantReviewedAt = null;
      ownerApprovedBy = null;
      ownerApprovedAt = null;
      exportedAt = null;
      totalNetSalary = 0;
      notes = input.notes;
      createdAt = Time.now();
    };
    runs.add(run);
    run;
  };

  public func getRunById(
    runs : List.List<T.PayrollRun>,
    id : Common.PayrollRunId,
  ) : ?T.PayrollRun {
    runs.find(func(r) { r.id == id });
  };

  public func getRunsByCompany(
    runs : List.List<T.PayrollRun>,
    companyId : Common.CompanyId,
  ) : [T.PayrollRun] {
    runs.filter(func(r) { r.companyId == companyId }).toArray();
  };

  public func advanceStatus(
    runs : List.List<T.PayrollRun>,
    id : Common.PayrollRunId,
    companyId : Common.CompanyId,
    approvedBy : Common.UserId,
    newStatus : T.PayrollStatus,
    nowNanos : Common.Timestamp,
  ) : ?T.PayrollRun {
    var result : ?T.PayrollRun = null;
    runs.mapInPlace(
      func(r) {
        if (r.id == id and r.companyId == companyId) {
          let updated = switch (newStatus) {
            case (#HRApproved) {
              { r with status = #HRApproved; hrApprovedBy = ?approvedBy; hrApprovedAt = ?nowNanos };
            };
            case (#AccountantReviewed) {
              { r with status = #AccountantReviewed; accountantReviewedBy = ?approvedBy; accountantReviewedAt = ?nowNanos };
            };
            case (#OwnerApproved) {
              { r with status = #OwnerApproved; ownerApprovedBy = ?approvedBy; ownerApprovedAt = ?nowNanos };
            };
            case (#Exported) {
              { r with status = #Exported; exportedAt = ?nowNanos };
            };
            case (#Paid) {
              { r with status = #Paid };
            };
            case (_) { r };
          };
          result := ?updated;
          updated;
        } else { r };
      }
    );
    result;
  };

  public func createItem(
    items : List.List<T.PayrollItem>,
    counter : Nat,
    payrollRunId : Common.PayrollRunId,
    input : T.PayrollItemInput,
  ) : T.PayrollItem {
    let now = Time.now();
    let item : T.PayrollItem = {
      id = counter;
      payrollRunId;
      employeeId = input.employeeId;
      basicSalary = input.basicSalary;
      housingAllowance = input.housingAllowance;
      transportAllowance = input.transportAllowance;
      overtime = input.overtime;
      deductions = input.deductions;
      advanceSalary = input.advanceSalary;
      leaveDeduction = input.leaveDeduction;
      netSalary = calcNetSalary(input);
      createdAt = now;
      updatedAt = now;
    };
    items.add(item);
    item;
  };

  public func getItemsByRun(
    items : List.List<T.PayrollItem>,
    payrollRunId : Common.PayrollRunId,
  ) : [T.PayrollItem] {
    items.filter(func(i) { i.payrollRunId == payrollRunId }).toArray();
  };

  public func updateItem(
    items : List.List<T.PayrollItem>,
    id : Common.PayrollItemId,
    payrollRunId : Common.PayrollRunId,
    input : T.PayrollItemInput,
    nowNanos : Common.Timestamp,
  ) : ?T.PayrollItem {
    var result : ?T.PayrollItem = null;
    items.mapInPlace(
      func(i) {
        if (i.id == id and i.payrollRunId == payrollRunId) {
          let updated = { i with
            basicSalary = input.basicSalary;
            housingAllowance = input.housingAllowance;
            transportAllowance = input.transportAllowance;
            overtime = input.overtime;
            deductions = input.deductions;
            advanceSalary = input.advanceSalary;
            leaveDeduction = input.leaveDeduction;
            netSalary = calcNetSalary(input);
            updatedAt = nowNanos;
          };
          result := ?updated;
          updated;
        } else { i };
      }
    );
    result;
  };

  public func recalculateTotals(
    runs : List.List<T.PayrollRun>,
    items : List.List<T.PayrollItem>,
    runId : Common.PayrollRunId,
  ) : () {
    let runItems = getItemsByRun(items, runId);
    let total = runItems.foldLeft(0, func(acc : Nat, i : T.PayrollItem) : Nat { acc + i.netSalary });
    runs.mapInPlace(
      func(r) {
        if (r.id == runId) { { r with totalNetSalary = total } } else { r };
      }
    );
  };
};
