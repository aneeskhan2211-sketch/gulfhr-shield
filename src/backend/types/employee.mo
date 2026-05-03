import Common "common";
module {
  public type EmployeeStatus = {
    #Active;
    #OnLeave;
    #Separated;
  };

  public type WorkLocation = {
    #UAE;
    #Oman;
    #Saudi;
    #Qatar;
    #Bahrain;
    #Kuwait;
  };

  public type Employee = {
    id : Common.EmployeeId;
    companyId : Common.CompanyId;
    fullName : Text;
    employeeCode : Text;
    nationality : Text;
    passportNumber : Text;
    visaNumber : Text;
    emiratesId : Text;
    jobTitle : Text;
    department : Text;
    joiningDate : Common.Timestamp;
    basicSalary : Nat; // in fils/halalas (smallest currency unit)
    bankName : Text;
    iban : Text;
    workLocation : WorkLocation;
    contractStartDate : Common.Timestamp;
    contractEndDate : ?Common.Timestamp;
    status : EmployeeStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type EmployeeInput = {
    fullName : Text;
    employeeCode : Text;
    nationality : Text;
    passportNumber : Text;
    visaNumber : Text;
    emiratesId : Text;
    jobTitle : Text;
    department : Text;
    joiningDate : Common.Timestamp;
    basicSalary : Nat;
    bankName : Text;
    iban : Text;
    workLocation : WorkLocation;
    contractStartDate : Common.Timestamp;
    contractEndDate : ?Common.Timestamp;
  };
};
