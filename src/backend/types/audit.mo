import Common "common";
module {
  public type AuditActionType = {
    #SalaryChanged;
    #DocumentDownloaded;
    #DocumentUploaded;
    #DocumentDeleted;
    #PayrollApproved;
    #WPSExported;
    #UserLogin;
    #EmployeeAdded;
    #EmployeeDeleted;
    #RoleChanged;
    #CompanyProfileUpdated;
    #AlertThresholdChanged;
  };

  public type AuditStatus = {
    #Success;
    #Failure;
  };

  public type AuditLog = {
    id : Common.AuditLogId;
    companyId : Common.CompanyId;
    userId : Common.UserId;
    actionType : AuditActionType;
    affectedResourceType : Text;
    affectedResourceId : Text;
    affectedResourceName : Text;
    oldValue : ?Text;
    newValue : ?Text;
    status : AuditStatus;
    createdAt : Common.Timestamp;
  };

  public type AuditLogInput = {
    actionType : AuditActionType;
    affectedResourceType : Text;
    affectedResourceId : Text;
    affectedResourceName : Text;
    oldValue : ?Text;
    newValue : ?Text;
    status : AuditStatus;
  };
};
