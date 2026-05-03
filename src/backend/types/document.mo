import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";
module {
  public type DocumentType = {
    #PassportCopy;
    #Visa;
    #ID;
    #Contract;
    #Insurance;
    #Medical;
    #BankDocuments;
  };

  public type EmployeeDocument = {
    id : Common.DocumentId;
    employeeId : Common.EmployeeId;
    companyId : Common.CompanyId;
    documentType : DocumentType;
    fileName : Text;
    fileSize : Nat;
    mimeType : Text;
    blob : Storage.ExternalBlob;
    expiryDate : ?Common.Timestamp;
    uploadedBy : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type DocumentInput = {
    employeeId : Common.EmployeeId;
    documentType : DocumentType;
    fileName : Text;
    fileSize : Nat;
    mimeType : Text;
    blob : Storage.ExternalBlob;
    expiryDate : ?Common.Timestamp;
  };
};
