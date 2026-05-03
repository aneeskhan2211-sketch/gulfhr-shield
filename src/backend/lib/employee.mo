import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/employee";

module {
  public func create(
    employees : List.List<T.Employee>,
    counter : Nat,
    companyId : Common.CompanyId,
    input : T.EmployeeInput,
  ) : T.Employee {
    let now = Time.now();
    let emp : T.Employee = {
      id = counter;
      companyId;
      fullName = input.fullName;
      employeeCode = input.employeeCode;
      nationality = input.nationality;
      passportNumber = input.passportNumber;
      visaNumber = input.visaNumber;
      emiratesId = input.emiratesId;
      jobTitle = input.jobTitle;
      department = input.department;
      joiningDate = input.joiningDate;
      basicSalary = input.basicSalary;
      bankName = input.bankName;
      iban = input.iban;
      workLocation = input.workLocation;
      contractStartDate = input.contractStartDate;
      contractEndDate = input.contractEndDate;
      status = #Active;
      createdAt = now;
      updatedAt = now;
    };
    employees.add(emp);
    emp;
  };

  public func getById(
    employees : List.List<T.Employee>,
    id : Common.EmployeeId,
  ) : ?T.Employee {
    employees.find(func(e) { e.id == id });
  };

  public func getByCompany(
    employees : List.List<T.Employee>,
    companyId : Common.CompanyId,
  ) : [T.Employee] {
    employees.filter(func(e) { e.companyId == companyId }).toArray();
  };

  public func update(
    employees : List.List<T.Employee>,
    id : Common.EmployeeId,
    companyId : Common.CompanyId,
    input : T.EmployeeInput,
  ) : ?T.Employee {
    var result : ?T.Employee = null;
    employees.mapInPlace(
      func(e) {
        if (e.id == id and e.companyId == companyId) {
          let updated = { e with
            fullName = input.fullName;
            employeeCode = input.employeeCode;
            nationality = input.nationality;
            passportNumber = input.passportNumber;
            visaNumber = input.visaNumber;
            emiratesId = input.emiratesId;
            jobTitle = input.jobTitle;
            department = input.department;
            joiningDate = input.joiningDate;
            basicSalary = input.basicSalary;
            bankName = input.bankName;
            iban = input.iban;
            workLocation = input.workLocation;
            contractStartDate = input.contractStartDate;
            contractEndDate = input.contractEndDate;
            updatedAt = Time.now();
          };
          result := ?updated;
          updated;
        } else { e };
      }
    );
    result;
  };

  public func deactivate(
    employees : List.List<T.Employee>,
    id : Common.EmployeeId,
    companyId : Common.CompanyId,
  ) : Bool {
    var found = false;
    employees.mapInPlace(
      func(e) {
        if (e.id == id and e.companyId == companyId) {
          found := true;
          { e with status = #Separated; updatedAt = Time.now() };
        } else { e };
      }
    );
    found;
  };

  public func countActive(
    employees : List.List<T.Employee>,
    companyId : Common.CompanyId,
  ) : Nat {
    employees.filter(func(e) { e.companyId == companyId and e.status == #Active }).size();
  };
};
