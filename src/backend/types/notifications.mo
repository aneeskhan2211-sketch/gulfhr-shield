import TCommon "common";

module {
  public type WhatsAppSettings = {
    employeeId : TCommon.EmployeeId;
    salaryEnabled : Bool;
    visaAlertEnabled : Bool;
    payrollApprovalEnabled : Bool;
    phoneNumber : Text;
  };

  public type NotificationLog = {
    id : Nat;
    companyId : TCommon.CompanyId;
    employeeId : ?TCommon.EmployeeId;
    notificationType : { #Salary; #VisaAlert; #PayrollApproval };
    message : Text;
    status : { #Sent; #Pending; #Failed };
    createdAt : TCommon.Timestamp;
  };

  public type CreateNotificationEntry = {
    employeeId : ?TCommon.EmployeeId;
    notificationType : { #Salary; #VisaAlert; #PayrollApproval };
    message : Text;
  };
};
