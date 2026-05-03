import Common "common";
module {
  public type PayrollStatus = {
    #Draft;
    #HRApproved;
    #AccountantReviewed;
    #OwnerApproved;
    #Exported;
    #Paid;
  };

  public type PayrollRun = {
    id : Common.PayrollRunId;
    companyId : Common.CompanyId;
    payPeriodMonth : Nat; // 1-12
    payPeriodYear : Nat;
    status : PayrollStatus;
    employeeIds : [Common.EmployeeId];
    createdBy : Common.UserId;
    hrApprovedBy : ?Common.UserId;
    hrApprovedAt : ?Common.Timestamp;
    accountantReviewedBy : ?Common.UserId;
    accountantReviewedAt : ?Common.Timestamp;
    ownerApprovedBy : ?Common.UserId;
    ownerApprovedAt : ?Common.Timestamp;
    exportedAt : ?Common.Timestamp;
    totalNetSalary : Nat;
    notes : Text;
    createdAt : Common.Timestamp;
  };

  public type PayrollRunInput = {
    payPeriodMonth : Nat;
    payPeriodYear : Nat;
    employeeIds : [Common.EmployeeId];
    notes : Text;
  };

  public type PayrollItem = {
    id : Common.PayrollItemId;
    payrollRunId : Common.PayrollRunId;
    employeeId : Common.EmployeeId;
    basicSalary : Nat;
    housingAllowance : Nat;
    transportAllowance : Nat;
    overtime : Nat;
    deductions : Nat;
    advanceSalary : Nat;
    leaveDeduction : Nat;
    netSalary : Nat; // auto-calculated: basic + housing + transport + overtime - deductions - advanceSalary - leaveDeduction
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type PayrollItemInput = {
    employeeId : Common.EmployeeId;
    basicSalary : Nat;
    housingAllowance : Nat;
    transportAllowance : Nat;
    overtime : Nat;
    deductions : Nat;
    advanceSalary : Nat;
    leaveDeduction : Nat;
  };
};
