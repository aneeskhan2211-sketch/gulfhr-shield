import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/wps";
import TEmployee "../types/employee";
import TPayroll "../types/payroll";

module {
  public func createExport(
    exports : List.List<T.WpsExport>,
    counter : Nat,
    companyId : Common.CompanyId,
    exportedBy : Common.UserId,
    input : T.WpsExportInput,
    employeeCount : Nat,
    fileName : Text,
  ) : T.WpsExport {
    let exp : T.WpsExport = {
      id = counter;
      companyId;
      countryFormat = input.countryFormat;
      payrollRunId = input.payrollRunId;
      fileName;
      employeeCount;
      exportedBy;
      createdAt = Time.now();
      status = #Generated;
    };
    exports.add(exp);
    exp;
  };

  public func getByCompany(
    exports : List.List<T.WpsExport>,
    companyId : Common.CompanyId,
  ) : [T.WpsExport] {
    exports.filter(func(e) { e.companyId == companyId }).toArray();
  };

  public func validateForExport(
    employees : List.List<TEmployee.Employee>,
    items : List.List<TPayroll.PayrollItem>,
    runId : Common.PayrollRunId,
  ) : [Text] {
    let runItems = items.filter(func(i) { i.payrollRunId == runId }).toArray();
    var errors : [Text] = [];
    for (item in runItems.values()) {
      switch (employees.find(func(e) { e.id == item.employeeId })) {
        case null {
          errors := errors.concat(["Employee ID " # debug_show(item.employeeId) # " not found"]);
        };
        case (?emp) {
          if (emp.bankName == "") {
            errors := errors.concat([emp.fullName # ": bank name is missing"]);
          };
          if (emp.iban == "") {
            errors := errors.concat([emp.fullName # ": IBAN is missing"]);
          };
          if (emp.employeeCode == "") {
            errors := errors.concat([emp.fullName # ": employee code is missing"]);
          };
          if (item.netSalary == 0) {
            errors := errors.concat([emp.fullName # ": net salary is zero"]);
          };
        };
      };
    };
    if (runItems.size() == 0) {
      errors := errors.concat(["No payroll items found for this run"]);
    };
    errors;
  };

  public func generateFileContent(
    format : T.WpsCountryFormat,
    employees : List.List<TEmployee.Employee>,
    items : List.List<TPayroll.PayrollItem>,
    run : TPayroll.PayrollRun,
  ) : Text {
    let runItems = items.filter(func(i) { i.payrollRunId == run.id }).toArray();
    let header = switch (format) {
      case (#UAESIF) { "EmpID,Name,Bank,IBAN,Amount,Currency\n" };
      case (#OmanMOL) { "EmpID,Name,IBAN,Amount\n" };
      case (#QatarTemplate) { "EmpID,Name,IBAN,Amount,Currency\n" };
      case (#SaudiTemplate) { "EmpID,Name,IBAN,Amount,Currency\n" };
    };
    let rows = runItems.foldLeft(
      "",
      func(acc : Text, item : TPayroll.PayrollItem) : Text {
        switch (employees.find(func(e) { e.id == item.employeeId })) {
          case null { acc };
          case (?emp) {
            let amountText = debug_show(item.netSalary);
            let row = switch (format) {
              case (#UAESIF) {
                emp.employeeCode # "," # emp.fullName # "," # emp.bankName # "," # emp.iban # "," # amountText # ",AED\n";
              };
              case (#OmanMOL) {
                emp.employeeCode # "," # emp.fullName # "," # emp.iban # "," # amountText # "\n";
              };
              case (#QatarTemplate) {
                emp.employeeCode # "," # emp.fullName # "," # emp.iban # "," # amountText # ",QAR\n";
              };
              case (#SaudiTemplate) {
                emp.employeeCode # "," # emp.fullName # "," # emp.iban # "," # amountText # ",SAR\n";
              };
            };
            acc # row;
          };
        };
      }
    );
    header # rows;
  };
};
