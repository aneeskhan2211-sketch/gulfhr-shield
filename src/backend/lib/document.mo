import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/document";

module {
  public func create(
    documents : List.List<T.EmployeeDocument>,
    counter : Nat,
    companyId : Common.CompanyId,
    uploadedBy : Common.UserId,
    input : T.DocumentInput,
  ) : T.EmployeeDocument {
    let doc : T.EmployeeDocument = {
      id = counter;
      employeeId = input.employeeId;
      companyId;
      documentType = input.documentType;
      fileName = input.fileName;
      fileSize = input.fileSize;
      mimeType = input.mimeType;
      blob = input.blob;
      expiryDate = input.expiryDate;
      uploadedBy;
      createdAt = Time.now();
    };
    documents.add(doc);
    doc;
  };

  public func getById(
    documents : List.List<T.EmployeeDocument>,
    id : Common.DocumentId,
  ) : ?T.EmployeeDocument {
    documents.find(func(d) { d.id == id });
  };

  public func getByEmployee(
    documents : List.List<T.EmployeeDocument>,
    employeeId : Common.EmployeeId,
    companyId : Common.CompanyId,
  ) : [T.EmployeeDocument] {
    documents.filter(func(d) { d.employeeId == employeeId and d.companyId == companyId }).toArray();
  };

  public func getByCompany(
    documents : List.List<T.EmployeeDocument>,
    companyId : Common.CompanyId,
  ) : [T.EmployeeDocument] {
    documents.filter(func(d) { d.companyId == companyId }).toArray();
  };

  public func remove(
    documents : List.List<T.EmployeeDocument>,
    id : Common.DocumentId,
    companyId : Common.CompanyId,
  ) : ?T.EmployeeDocument {
    var removed : ?T.EmployeeDocument = null;
    let remaining = documents.filter(
      func(d) {
        if (d.id == id and d.companyId == companyId) {
          removed := ?d;
          false;
        } else { true };
      }
    );
    documents.clear();
    documents.append(remaining);
    removed;
  };

  // Returns count of documents by type uploaded per employee
  public func countByType(
    documents : List.List<T.EmployeeDocument>,
    companyId : Common.CompanyId,
  ) : Nat {
    documents.filter(func(d) { d.companyId == companyId }).size();
  };
};
