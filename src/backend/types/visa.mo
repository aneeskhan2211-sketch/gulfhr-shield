import Common "common";
module {
  public type VisaRecordType = {
    #Passport;
    #Visa;
    #LabourCard;
    #Insurance;
    #MedicalCard;
    #Contract;
  };

  public type VisaRecord = {
    id : Common.VisaRecordId;
    employeeId : Common.EmployeeId;
    companyId : Common.CompanyId;
    recordType : VisaRecordType;
    expiryDate : Common.Timestamp;
    notes : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type VisaRecordInput = {
    employeeId : Common.EmployeeId;
    recordType : VisaRecordType;
    expiryDate : Common.Timestamp;
    notes : Text;
  };

  public type ExpiryStatus = {
    #Valid;
    #ExpiringSoon : Nat; // days remaining
    #Expired;
  };
};
