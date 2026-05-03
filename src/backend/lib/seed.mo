import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import TCompany "../types/company";
import TUser "../types/user";
import TEmployee "../types/employee";
import TVisa "../types/visa";
import TPayroll "../types/payroll";
import TAttendance "../types/attendance";
import TAudit "../types/audit";
import TAlert "../types/alert";
import CompanyLib "../lib/company";
import UserLib "../lib/user";
import EmployeeLib "../lib/employee";
import VisaLib "../lib/visa";
import PayrollLib "../lib/payroll";
import AttendanceLib "../lib/attendance";
import AuditLib "../lib/audit";
import AlertLib "../lib/alert";
import Principal "mo:core/Principal";

module {
  // Seeds demo data. Returns true if seed ran, false if already seeded.
  public func seedDemoData(
    companies : List.List<TCompany.Company>,
    subscriptions : List.List<TCompany.Subscription>,
    users : List.List<TUser.User>,
    employees : List.List<TEmployee.Employee>,
    visaRecords : List.List<TVisa.VisaRecord>,
    payrollRuns : List.List<TPayroll.PayrollRun>,
    payrollItems : List.List<TPayroll.PayrollItem>,
    attendanceLogs : List.List<TAttendance.AttendanceLog>,
    auditLogs : List.List<TAudit.AuditLog>,
    alerts : List.List<TAlert.Alert>,
    counters : Common.Counters,
  ) : Bool {
    if (not companies.isEmpty()) { return false };

    let now = Time.now();
    let DAY : Int = 86_400_000_000_000;

    // ── Company ──────────────────────────────────────────────────────────────
    counters.company += 1;
    let company = CompanyLib.create(
      companies,
      counters.company,
      {
        name = "Gulf Solutions Contracting LLC";
        registrationNumber = "UAE-2019-4471221";
        vatNumber = "100234567890003";
        address = "Office 405, Business Bay Tower, Dubai, UAE";
        country = "UAE";
        phone = "+971 4 555 1234";
        billingEmail = "billing@gulfsolutions.ae";
      },
    );

    // ── Subscription ─────────────────────────────────────────────────────────
    counters.subscription += 1;
    let _sub = CompanyLib.createSubscription(
      subscriptions,
      counters.subscription,
      company.id,
      #Growth,
    );

    // ── Users ─────────────────────────────────────────────────────────────────
    let demoOwnerPrincipal = "2vxsx-fae"; // anonymous principal for demo owner
    counters.user += 1;
    let owner = UserLib.create(
      users, counters.user, company.id,
      Principal.fromText(demoOwnerPrincipal),
      { email = "owner@gulfsolutions.ae"; fullName = "Khalid Al Mansouri"; role = #CompanyOwner },
    );

    counters.user += 1;
    let hrManager = UserLib.create(
      users, counters.user, company.id,
      Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
      { email = "hr@gulfsolutions.ae"; fullName = "Fatima Al Zaabi"; role = #HRManager },
    );

    counters.user += 1;
    let accountant = UserLib.create(
      users, counters.user, company.id,
      Principal.fromText("r7inp-6aaaa-aaaaa-aaabq-cai"),
      { email = "accounts@gulfsolutions.ae"; fullName = "Ahmed Hassan"; role = #Accountant },
    );

    counters.user += 1;
    let _branchMgr = UserLib.create(
      users, counters.user, company.id,
      Principal.fromText("rno6d-5aaaa-aaaaa-aaaco-cai"),
      { email = "branch@gulfsolutions.ae"; fullName = "Mohammed Al Rashidi"; role = #BranchManager },
    );

    counters.user += 1;
    let _empUser = UserLib.create(
      users, counters.user, company.id,
      Principal.fromText("rwlgt-iiaaa-aaaaa-aaaaa-cai"),
      { email = "emp001@gulfsolutions.ae"; fullName = "Carlos Mendoza"; role = #Employee },
    );

    // ── Employees (20 total: 10 UAE, 5 Oman, 3 Saudi, 2 Qatar) ───────────────
    let empData : [(Text, Text, Text, TEmployee.WorkLocation, Text, Nat, Text)] = [
      // (fullName, nationality, jobTitle, location, iban, salary, department)
      // Note: empty iban ("") marks missing bank details
      ("Mohammed Al Hashimi", "Emirati", "Project Manager", #UAE, "AE070331234567890123456", 18_000, "Operations"),
      ("Sara Al Nuaimi", "Emirati", "HR Specialist", #UAE, "", 12_000, "Human Resources"),
      ("Ravi Shankar", "Indian", "Site Engineer", #UAE, "AE070331234567890123458", 8_500, "Engineering"),
      ("Priya Nair", "Indian", "Accountant", #UAE, "", 7_200, "Finance"),
      ("Ali Hassan", "Pakistani", "Driver", #UAE, "", 3_500, "Operations"),
      ("Fatima Begum", "Bangladeshi", "Cleaner", #UAE, "AE070331234567890123461", 2_800, "Facilities"),
      ("John Smith", "British", "Technical Lead", #UAE, "AE070331234567890123462", 22_000, "Engineering"),
      ("Anjali Patel", "Indian", "Admin Executive", #UAE, "AE070331234567890123463", 5_500, "Administration"),
      ("Khalid Al Wadi", "Emirati", "Compliance Officer", #UAE, "AE070331234567890123464", 15_000, "Legal"),
      ("Carlos Mendoza", "Filipino", "Electrician", #UAE, "AE070331234567890123465", 4_200, "Engineering"),
      ("Ahmed Al Balushi", "Omani", "Civil Engineer", #Oman, "OM590010000000000987654321", 9_000, "Engineering"),
      ("Laila Al Harthi", "Omani", "Finance Manager", #Oman, "OM590010000000000987654322", 11_000, "Finance"),
      ("Salim Al Farsi", "Omani", "Site Foreman", #Oman, "OM590010000000000987654323", 5_500, "Operations"),
      ("Nasser Al Mawali", "Omani", "Security Guard", #Oman, "OM590010000000000987654324", 3_000, "Security"),
      ("Mariam Al Lawati", "Omani", "Receptionist", #Oman, "OM590010000000000987654325", 4_000, "Administration"),
      ("Tariq Al Ghamdi", "Saudi", "Operations Director", #Saudi, "SA4420000001234567891234", 25_000, "Operations"),
      ("Hanan Al Qahtani", "Saudi", "HR Manager", #Saudi, "SA4420000001234567891235", 13_000, "Human Resources"),
      ("Fawaz Al Otaibi", "Saudi", "Warehouse Supervisor", #Saudi, "SA4420000001234567891236", 7_500, "Logistics"),
      ("Yousef Al Sulaiti", "Qatari", "Legal Advisor", #Qatar, "QA58QNBA0000000000693123456", 20_000, "Legal"),
      ("Noura Al Thani", "Qatari", "Marketing Executive", #Qatar, "QA58QNBA0000000000693123457", 10_000, "Marketing"),
    ];

    var empIds : [Common.EmployeeId] = [];
    var i = 0;
    for ((fullName, nationality, jobTitle, loc, iban, salary, dept) in empData.values()) {
      i += 1;
      counters.employee += 1;
      let emp = EmployeeLib.create(
        employees, counters.employee, company.id,
        {
          fullName;
          employeeCode = "EMP" # (if (i < 10) { "0" } else { "" }) # debug_show(i);
          nationality;
          passportNumber = "P" # debug_show(1000000 + i);
          visaNumber = "V" # debug_show(2000000 + i);
          emiratesId = debug_show(784) # "-" # debug_show(1990 + i) # "-" # debug_show(1000000 + i) # "-" # debug_show(i);
          jobTitle;
          department = dept;
          joiningDate = now - (DAY * 365 * 2) - (DAY * i * 30);
          basicSalary = salary;
          bankName = switch (loc) {
            case (#UAE) { "Emirates NBD" };
            case (#Oman) { "Bank Muscat" };
            case (#Saudi) { "Al Rajhi Bank" };
            case (#Qatar) { "QNB" };
            case (#Bahrain) { "BBK" };
            case (#Kuwait) { "NBK" };
          };
          iban;
          workLocation = loc;
          contractStartDate = now - (DAY * 365 * 2) - (DAY * i * 30);
          contractEndDate = ?(now + DAY * 365);
        },
      );
      empIds := empIds.concat([emp.id]);
    };

    // ── Visa Records: 8 expired (40% workforce), 4 expiring <7 days, 8 expiring <30 days ──
    let visaTypes : [TVisa.VisaRecordType] = [#Passport, #Visa, #LabourCard];
    // 8 expired employees (spread across first 8 employees)
    let expiredOffsets : [Int] = [-10, -30, -5, -60, -15, -20, -45, -3];
    var vi = 0;
    for (offset in expiredOffsets.values()) {
      counters.visaRecord += 1;
      let _vr = VisaLib.create(
        visaRecords, counters.visaRecord, company.id,
        {
          employeeId = empIds[vi % empIds.size()];
          recordType = visaTypes[vi % 3];
          expiryDate = now + (DAY * offset);
          notes = "Expired - renewal required";
        },
      );
      vi += 1;
    };
    // 4 expiring within 7 days
    let expiringUrgentOffsets : [Int] = [3, 5, 1, 6];
    for (offset in expiringUrgentOffsets.values()) {
      counters.visaRecord += 1;
      let _vr = VisaLib.create(
        visaRecords, counters.visaRecord, company.id,
        {
          employeeId = empIds[vi % empIds.size()];
          recordType = visaTypes[vi % 3];
          expiryDate = now + (DAY * offset);
          notes = "Expiring urgently";
        },
      );
      vi += 1;
    };
    // 8 expiring within 30 days
    let expiringSoonOffsets : [Int] = [14, 21, 10, 25, 20, 16, 22, 28];
    for (offset in expiringSoonOffsets.values()) {
      counters.visaRecord += 1;
      let _vr = VisaLib.create(
        visaRecords, counters.visaRecord, company.id,
        {
          employeeId = empIds[vi % empIds.size()];
          recordType = visaTypes[vi % 3];
          expiryDate = now + (DAY * offset);
          notes = "Expiring soon";
        },
      );
      vi += 1;
    };
    // Remaining employees: valid records 6+ months
    let validOffsets : [Int] = [180, 210, 240, 365, 270, 300, 330, 200, 250, 320];
    for (offset in validOffsets.values()) {
      counters.visaRecord += 1;
      let _vr = VisaLib.create(
        visaRecords, counters.visaRecord, company.id,
        {
          employeeId = empIds[vi % empIds.size()];
          recordType = visaTypes[vi % 3];
          expiryDate = now + (DAY * offset);
          notes = "Valid";
        },
      );
      vi += 1;
    };

    // ── Payroll Runs: 2 Paid, 1 Draft ─────────────────────────────────────────
    let allEmpIds = empIds;

    counters.payrollRun += 1;
    let run1 = PayrollLib.createRun(
      payrollRuns, counters.payrollRun, company.id, owner.id,
      { payPeriodMonth = 1; payPeriodYear = 2026; employeeIds = allEmpIds; notes = "January 2026" },
    );
    // Create items for run1
    for (empId in allEmpIds.values()) {
      counters.payrollItem += 1;
      let _item = PayrollLib.createItem(
        payrollItems, counters.payrollItem, run1.id,
        { employeeId = empId; basicSalary = 8000; housingAllowance = 2000; transportAllowance = 500;
          overtime = 0; deductions = 0; advanceSalary = 0; leaveDeduction = 0 },
      );
    };
    PayrollLib.recalculateTotals(payrollRuns, payrollItems, run1.id);
    // Advance to Paid
    ignore PayrollLib.advanceStatus(payrollRuns, run1.id, company.id, hrManager.id, #HRApproved, now - DAY * 60);
    ignore PayrollLib.advanceStatus(payrollRuns, run1.id, company.id, accountant.id, #AccountantReviewed, now - DAY * 55);
    ignore PayrollLib.advanceStatus(payrollRuns, run1.id, company.id, owner.id, #OwnerApproved, now - DAY * 50);
    ignore PayrollLib.advanceStatus(payrollRuns, run1.id, company.id, owner.id, #Exported, now - DAY * 48);
    ignore PayrollLib.advanceStatus(payrollRuns, run1.id, company.id, owner.id, #Paid, now - DAY * 45);

    counters.payrollRun += 1;
    let run2 = PayrollLib.createRun(
      payrollRuns, counters.payrollRun, company.id, owner.id,
      { payPeriodMonth = 2; payPeriodYear = 2026; employeeIds = allEmpIds; notes = "February 2026" },
    );
    // Feb payroll: advance only to HRApproved — no Paid in last 30 days to trigger payroll penalty
    for (empId in allEmpIds.values()) {
      counters.payrollItem += 1;
      let _item2 = PayrollLib.createItem(
        payrollItems, counters.payrollItem, run2.id,
        { employeeId = empId; basicSalary = 8000; housingAllowance = 2000; transportAllowance = 500;
          overtime = 200; deductions = 0; advanceSalary = 0; leaveDeduction = 0 },
      );
    };
    PayrollLib.recalculateTotals(payrollRuns, payrollItems, run2.id);
    ignore PayrollLib.advanceStatus(payrollRuns, run2.id, company.id, hrManager.id, #HRApproved, now - DAY * 25);

    counters.payrollRun += 1;
    let run3 = PayrollLib.createRun(
      payrollRuns, counters.payrollRun, company.id, owner.id,
      { payPeriodMonth = 3; payPeriodYear = 2026; employeeIds = allEmpIds; notes = "March 2026 (in progress)" },
    );
    for (empId in allEmpIds.values()) {
      counters.payrollItem += 1;
      let _item3 = PayrollLib.createItem(
        payrollItems, counters.payrollItem, run3.id,
        { employeeId = empId; basicSalary = 8000; housingAllowance = 2000; transportAllowance = 500;
          overtime = 0; deductions = 100; advanceSalary = 0; leaveDeduction = 0 },
      );
    };
    PayrollLib.recalculateTotals(payrollRuns, payrollItems, run3.id);

    // ── WPS Export history: included in audit, not a separate call since WpsLib not imported yet ──
    // (wpsExports list not passed here; handled in mixin on demand)

    // ── Attendance Logs (30 entries for last 2 months) ─────────────────────────
    var ai = 0;
    for (empId in allEmpIds.values()) {
      if (ai < 15) {
        counters.attendanceLog += 1;
        let checkInTime = now - DAY * (ai + 1);
        let log = AttendanceLib.checkIn(
          attendanceLogs, counters.attendanceLog, company.id,
          { employeeId = empId; checkInLocation = null; selfieBlob = null; consentGiven = true },
          checkInTime,
        );
        ignore AttendanceLib.checkOut(
          attendanceLogs,
          { logId = log.id; checkOutLocation = null },
          company.id,
          checkInTime + 8 * 3_600_000_000_000,
        );
      };
      ai += 1;
    };

    // ── Audit Logs (50 entries) ────────────────────────────────────────────────
    let auditActions : [TAudit.AuditActionType] = [
      #EmployeeAdded, #SalaryChanged, #DocumentUploaded, #PayrollApproved,
      #WPSExported, #UserLogin, #DocumentDownloaded, #RoleChanged,
    ];
    var idx = 0;
    while (idx < 50) {
      counters.auditLog += 1;
      let action = auditActions[idx % 8];
      let userId = if (idx % 3 == 0) { owner.id } else if (idx % 3 == 1) { hrManager.id } else { accountant.id };
      ignore AuditLib.log(
        auditLogs, counters.auditLog, company.id, userId,
        {
          actionType = action;
          affectedResourceType = debug_show(action);
          affectedResourceId = debug_show(idx + 1);
          affectedResourceName = "Demo resource " # debug_show(idx);
          oldValue = null;
          newValue = null;
          status = #Success;
        },
        now - DAY * (50 - idx),
      );
      idx += 1;
    };

    // ── Alerts ────────────────────────────────────────────────────────────────
    counters.alert += 1;
    ignore AlertLib.create(
      alerts, counters.alert, company.id, ?(empIds[0]),
      #VisaExpiring, #High,
      "Mohammed Al Hashimi - Passport expires in 7 days",
      ?debug_show(empIds[0]),
    );
    counters.alert += 1;
    ignore AlertLib.create(
      alerts, counters.alert, company.id, ?(empIds[1]),
      #VisaExpiring, #Medium,
      "Sara Al Nuaimi - Visa expires in 21 days",
      ?debug_show(empIds[1]),
    );
    counters.alert += 1;
    ignore AlertLib.create(
      alerts, counters.alert, company.id, null,
      #PayrollPending, #Medium,
      "March 2026 payroll is pending HR approval",
      ?debug_show(run3.id),
    );
    counters.alert += 1;
    ignore AlertLib.create(
      alerts, counters.alert, company.id, null,
      #ComplianceRisk, #High,
      "5 employees have expired visa/document records",
      null,
    );

    true;
  };
};
