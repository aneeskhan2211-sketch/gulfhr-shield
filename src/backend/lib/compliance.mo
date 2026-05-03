import List "mo:core/List";
import TCommon "../types/common";
import TCompliance "../types/compliance";
import TEmployee "../types/employee";
import TVisa "../types/visa";
import TPayroll "../types/payroll";
import TDocument "../types/document";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

module {
  public func calculateRiskScore(
    employees : List.List<TEmployee.Employee>,
    visaRecords : List.List<TVisa.VisaRecord>,
    payrollRuns : List.List<TPayroll.PayrollRun>,
    documents : List.List<TDocument.EmployeeDocument>,
    currency : Text,
  ) : TCompliance.ComplianceRiskScore {
    let now = Time.now();
    let DAY : Int = 86_400_000_000_000;
    let THIRTY_DAYS : Int = DAY * 30;
    let SEVEN_DAYS : Int = DAY * 7;

    let totalEmployees = employees.size();

    // ── Visa Validity (30 pts) ────────────────────────────────────────────────
    // Classify each employee by worst visa status (one deduction per employee)
    var expiredCount = 0;
    var expiringSoon7Count = 0;
    var expiringSoon30Count = 0;
    if (totalEmployees > 0) {
      employees.forEach(func(emp) {
        let hasExpired = visaRecords.find(func(vr) {
          vr.employeeId == emp.id and (vr.expiryDate - now) < 0
        }) != null;
        let hasSoon7 = if (not hasExpired) {
          visaRecords.find(func(vr) {
            vr.employeeId == emp.id and (vr.expiryDate - now) >= 0 and (vr.expiryDate - now) < SEVEN_DAYS
          }) != null
        } else { false };
        let hasSoon30 = if (not hasExpired and not hasSoon7) {
          visaRecords.find(func(vr) {
            vr.employeeId == emp.id and (vr.expiryDate - now) >= SEVEN_DAYS and (vr.expiryDate - now) < THIRTY_DAYS
          }) != null
        } else { false };
        if (hasExpired) { expiredCount += 1 }
        else if (hasSoon7) { expiringSoon7Count += 1 }
        else if (hasSoon30) { expiringSoon30Count += 1 };
      });
    };
    // Proportional deduction: each "expired" employee contributes (1/total)*30 penalty weight
    // We apply the per-employee unit penalties but scale against the category max of 30
    // Formula: penalty = min(30, expired*15 + soon7*10 + soon30*5) scaled by 1/total*30 gives too complex
    // Instead: use percentage of employees affected to allocate penalty from each tier
    let visaScore = if (totalEmployees == 0) { 30 } else {
      let expiredPct = expiredCount * 100 / totalEmployees;  // 0–100
      let soon7Pct   = expiringSoon7Count * 100 / totalEmployees;
      let soon30Pct  = expiringSoon30Count * 100 / totalEmployees;
      // Deduct proportionally from the 30-pt visa budget
      let expiredDed = expiredPct * 18 / 100; // up to 18 pts for expired
      let soon7Ded   = soon7Pct  * 8  / 100; // up to 8 pts for <7 days
      let soon30Ded  = soon30Pct * 4  / 100; // up to 4 pts for <30 days
      let totalDed = expiredDed + soon7Ded + soon30Ded;
      if (totalDed > 30) { 0 } else { 30 - totalDed };
    };

    // ── Payroll / WPS (30 pts) ────────────────────────────────────────────────
    // Check if any payroll run reached Paid in last 30 days
    let recentPaid = payrollRuns.find(func(pr) {
      switch (pr.status) {
        case (#Paid) {
          switch (pr.exportedAt) {
            case (?t) { (now - t) < THIRTY_DAYS };
            case null { false };
          };
        };
        case (_) { false };
      };
    });
    var missingIbanCount = 0;
    employees.forEach(func(emp) {
      if (emp.iban == "") { missingIbanCount += 1 };
    });
    let payrollScore = if (totalEmployees == 0) { 30 } else {
      var ded = 0;
      if (recentPaid == null) { ded += 20 };
      // Missing IBAN: proportional deduction up to 10
      let ibanPct = missingIbanCount * 100 / totalEmployees;
      ded += ibanPct * 10 / 100;
      if (ded > 30) { 0 } else { 30 - ded };
    };

    // ── Document Completeness (20 pts) ────────────────────────────────────────
    // Proportional: deduct based on % of employees missing key docs
    var missingPassportCount = 0;
    var missingContractCount = 0;
    employees.forEach(func(emp) {
      if (documents.find(func(d) { d.employeeId == emp.id and d.documentType == #PassportCopy }) == null) {
        missingPassportCount += 1;
      };
      if (documents.find(func(d) { d.employeeId == emp.id and d.documentType == #Contract }) == null) {
        missingContractCount += 1;
      };
    });
    let docScore = if (totalEmployees == 0) { 20 } else {
      let passportPct = missingPassportCount * 100 / totalEmployees;
      let contractPct = missingContractCount * 100 / totalEmployees;
      let passportDed = passportPct * 12 / 100; // up to 12 pts
      let contractDed = contractPct * 8  / 100; // up to 8 pts
      let totalDed = passportDed + contractDed;
      if (totalDed > 20) { 0 } else { 20 - totalDed };
    };

    // ── Attendance Tracking (10 pts) ──────────────────────────────────────────
    // Full score — attendance data not passed to this function; scored by attendance module
    let attendanceScore = 10;

    // ── Employee Data Completeness (10 pts) ───────────────────────────────────
    let dataScore = if (totalEmployees == 0) { 10 } else {
      let ibanPct = missingIbanCount * 100 / totalEmployees;
      let ded = ibanPct * 10 / 100;
      if (ded > 10) { 0 } else { 10 - ded };
    };

    let totalScore = visaScore + payrollScore + docScore + attendanceScore + dataScore;

    // ── Risk Level ────────────────────────────────────────────────────────────
    let riskLevel = if (totalScore >= 80) { #Low }
      else if (totalScore >= 60) { #Medium }
      else if (totalScore >= 40) { #High }
      else { #Critical };

    // ── Risk Factors ──────────────────────────────────────────────────────────
    var factors : [TCompliance.RiskFactor] = [];
    if (expiredCount > 0) {
      factors := factors.concat([{
        factorType = #VisaExpiry;
        description = debug_show(expiredCount) # " employees have expired visa or document records";
        severity = "Critical";
        employeeCount = expiredCount;
        estimatedFine = expiredCount * 3000;
      }]);
    };
    if (expiringSoon7Count > 0) {
      factors := factors.concat([{
        factorType = #VisaExpiry;
        description = debug_show(expiringSoon7Count) # " employees have visa records expiring within 7 days";
        severity = "High";
        employeeCount = expiringSoon7Count;
        estimatedFine = expiringSoon7Count * 1500;
      }]);
    };
    if (expiringSoon30Count > 0) {
      factors := factors.concat([{
        factorType = #VisaExpiry;
        description = debug_show(expiringSoon30Count) # " employees have visa records expiring within 30 days";
        severity = "Medium";
        employeeCount = expiringSoon30Count;
        estimatedFine = expiringSoon30Count * 500;
      }]);
    };
    if (recentPaid == null) {
      factors := factors.concat([{
        factorType = #PayrollDelay;
        description = "No payroll run completed in the last 30 days — WPS violation risk";
        severity = "High";
        employeeCount = totalEmployees;
        estimatedFine = totalEmployees * 500;
      }]);
    };
    if (missingPassportCount > 0) {
      factors := factors.concat([{
        factorType = #MissingDocument;
        description = debug_show(missingPassportCount) # " employees missing passport copy document";
        severity = "High";
        employeeCount = missingPassportCount;
        estimatedFine = missingPassportCount * 200;
      }]);
    };
    if (missingContractCount > 0) {
      factors := factors.concat([{
        factorType = #MissingDocument;
        description = debug_show(missingContractCount) # " employees missing employment contract document";
        severity = "Medium";
        employeeCount = missingContractCount;
        estimatedFine = missingContractCount * 100;
      }]);
    };
    if (missingIbanCount > 0) {
      factors := factors.concat([{
        factorType = #PayrollDelay;
        description = debug_show(missingIbanCount) # " employees missing bank account (IBAN) for payroll";
        severity = "Medium";
        employeeCount = missingIbanCount;
        estimatedFine = 0;
      }]);
    };

    let totalPenalty = factors.foldLeft(0, func(acc, f) { acc + f.estimatedFine });

    {
      score = totalScore;
      riskLevel;
      penaltyExposure = totalPenalty;
      currency;
      riskFactors = factors;
    };
  };

  public func getPenaltyExposure(
    employees : List.List<TEmployee.Employee>,
    visaRecords : List.List<TVisa.VisaRecord>,
    payrollRuns : List.List<TPayroll.PayrollRun>,
    documents : List.List<TDocument.EmployeeDocument>,
    currency : Text,
  ) : TCompliance.PenaltyExposure {
    let now = Time.now();
    let DAY : Int = 86_400_000_000_000;
    let THIRTY_DAYS : Int = DAY * 30;
    let totalEmployees = employees.size();

    // Visa penalties: count expired visa records × 3000
    var expiredCount = 0;
    visaRecords.forEach(func(vr) {
      if (vr.expiryDate < now) { expiredCount += 1 };
    });
    let visaPenalty = expiredCount * 3000;

    // WPS delay: if no Paid payroll in last 30 days → employees × 500
    let recentPaid = payrollRuns.find(func(pr) {
      switch (pr.status) {
        case (#Paid) {
          switch (pr.exportedAt) {
            case (?t) { (now - t) < THIRTY_DAYS };
            case null { false };
          };
        };
        case (_) { false };
      };
    });
    let wpsPenalty = if (recentPaid == null) { totalEmployees * 500 } else { 0 };

    // Missing documents: count per type × flat rate
    var missingPassportCount = 0;
    var missingContractCount = 0;
    employees.forEach(func(emp) {
      if (documents.find(func(d) { d.employeeId == emp.id and d.documentType == #PassportCopy }) == null) {
        missingPassportCount += 1;
      };
      if (documents.find(func(d) { d.employeeId == emp.id and d.documentType == #Contract }) == null) {
        missingContractCount += 1;
      };
    });
    let docPenalty = (missingPassportCount + missingContractCount) * 200;

    let total = visaPenalty + wpsPenalty + docPenalty;

    var breakdown : [TCompliance.PenaltyBreakdown] = [];
    if (visaPenalty > 0) {
      breakdown := breakdown.concat([{
        category = "Expired Visa / Documents";
        amount = visaPenalty;
        count = expiredCount;
      }]);
    };
    if (wpsPenalty > 0) {
      breakdown := breakdown.concat([{
        category = "WPS / Payroll Delay";
        amount = wpsPenalty;
        count = totalEmployees;
      }]);
    };
    if (docPenalty > 0) {
      breakdown := breakdown.concat([{
        category = "Missing Employee Documents";
        amount = docPenalty;
        count = missingPassportCount + missingContractCount;
      }]);
    };

    { total; currency; breakdown };
  };

  public func importEmployees(
    rows : [TCompliance.EmployeeImportRow],
    employees : List.List<TEmployee.Employee>,
    counters : TCommon.Counters,
  ) : TCompliance.ImportResult {
    // Require at least one existing employee to infer companyId
    let companyId = switch (employees.first()) {
      case (?e) { e.companyId };
      case null { Runtime.trap("No company context available for import") };
    };
    var imported = 0;
    var errors : [TCompliance.ImportError] = [];
    var rowNum = 0;
    for (row in rows.values()) {
      rowNum += 1;
      if (row.fullName == "") {
        errors := errors.concat([{ row = rowNum; reason = "fullName is required" }]);
      } else {
        counters.employee += 1;
        let now = Time.now();
        let emp : TEmployee.Employee = {
          id = counters.employee;
          companyId;
          fullName = row.fullName;
          employeeCode = row.employeeCode;
          nationality = row.nationality;
          passportNumber = "";
          visaNumber = "";
          emiratesId = "";
          jobTitle = row.jobTitle;
          department = row.department;
          joiningDate = now;
          basicSalary = row.basicSalary;
          bankName = "";
          iban = "";
          workLocation = #UAE;
          contractStartDate = now;
          contractEndDate = null;
          status = #Active;
          createdAt = now;
          updatedAt = now;
        };
        employees.add(emp);
        imported += 1;
      };
    };
    { imported; errors };
  };
};
