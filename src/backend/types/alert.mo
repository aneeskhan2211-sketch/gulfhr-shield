import Common "common";
module {
  public type AlertType = {
    #VisaExpiring;
    #DocumentExpiring;
    #PayrollPending;
    #ComplianceRisk;
  };

  public type AlertSeverity = {
    #High;
    #Medium;
    #Low;
  };

  public type Alert = {
    id : Common.AlertId;
    companyId : Common.CompanyId;
    employeeId : ?Common.EmployeeId;
    alertType : AlertType;
    severity : AlertSeverity;
    message : Text;
    resourceId : ?Text;
    isRead : Bool;
    readAt : ?Common.Timestamp;
    readBy : ?Common.UserId;
    createdAt : Common.Timestamp;
  };
};
