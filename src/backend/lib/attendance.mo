import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/attendance";
import Int "mo:core/Int";

module {
  // 1 hour in nanoseconds
  let HOUR_NS : Int = 3_600_000_000_000;

  public func checkIn(
    logs : List.List<T.AttendanceLog>,
    counter : Nat,
    companyId : Common.CompanyId,
    input : T.CheckInInput,
    nowNanos : Common.Timestamp,
  ) : T.AttendanceLog {
    let log : T.AttendanceLog = {
      id = counter;
      employeeId = input.employeeId;
      companyId;
      checkInTime = nowNanos;
      checkOutTime = null;
      workHours = null;
      checkInLocation = input.checkInLocation;
      checkOutLocation = null;
      selfieBlob = input.selfieBlob;
      consentGiven = input.consentGiven;
      createdAt = nowNanos;
    };
    logs.add(log);
    log;
  };

  public func checkOut(
    logs : List.List<T.AttendanceLog>,
    input : T.CheckOutInput,
    companyId : Common.CompanyId,
    nowNanos : Common.Timestamp,
  ) : ?T.AttendanceLog {
    var result : ?T.AttendanceLog = null;
    logs.mapInPlace(
      func(l) {
        if (l.id == input.logId and l.companyId == companyId and l.checkOutTime == null) {
          let workedNs : Int = nowNanos - l.checkInTime;
          let workedHours : Float = if (workedNs > 0) {
            workedNs.toFloat() / HOUR_NS.toFloat();
          } else { 0.0 };
          let updated = { l with
            checkOutTime = ?nowNanos;
            workHours = ?workedHours;
            checkOutLocation = input.checkOutLocation;
          };
          result := ?updated;
          updated;
        } else { l };
      }
    );
    result;
  };

  public func getByEmployee(
    logs : List.List<T.AttendanceLog>,
    employeeId : Common.EmployeeId,
    companyId : Common.CompanyId,
  ) : [T.AttendanceLog] {
    logs.filter(func(l) { l.employeeId == employeeId and l.companyId == companyId }).toArray();
  };

  public func getByCompany(
    logs : List.List<T.AttendanceLog>,
    companyId : Common.CompanyId,
  ) : [T.AttendanceLog] {
    logs.filter(func(l) { l.companyId == companyId }).toArray();
  };

  // Nanoseconds in a month approximation using year/month boundaries
  public func getByMonth(
    logs : List.List<T.AttendanceLog>,
    companyId : Common.CompanyId,
    month : Nat,
    year : Nat,
  ) : [T.AttendanceLog] {
    // Each month day range in nanoseconds - approximate using fixed 31-day months
    // We filter by comparing month tag stored in the log timestamp
    // Using approximate: start of month = epoch + accumulated days * DAY_NS
    let DAY_NS : Int = 86_400_000_000_000;
    let daysPerMonth : [Nat] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Compute days since epoch (1970-01-01) to start of given year
    let yearsFrom1970 : Nat = if (year >= 1970) { year - 1970 } else { 0 };
    var daysToYearStart = 0;
    var y = 0;
    while (y < yearsFrom1970) {
      let yr = 1970 + y;
      let isLeap = (yr % 4 == 0 and yr % 100 != 0) or (yr % 400 == 0);
      daysToYearStart += if (isLeap) { 366 } else { 365 };
      y += 1;
    };
    var daysToMonthStart = daysToYearStart;
    let isLeapYear = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0);
    var m = 0;
    let safeMonth : Nat = if (month >= 1) { month - 1 } else { 0 };
    while (m < safeMonth) {
      let days = if (m == 1 and isLeapYear) { 29 } else { daysPerMonth[m] };
      daysToMonthStart += days;
      m += 1;
    };
    let monthDays = if (safeMonth == 1 and isLeapYear) { 29 } else { daysPerMonth[safeMonth] };
    let startNs : Int = (daysToMonthStart : Int) * DAY_NS;
    let endNs : Int = ((daysToMonthStart + monthDays) : Int) * DAY_NS;
    logs.filter(
      func(l) {
        l.companyId == companyId and l.checkInTime >= startNs and l.checkInTime < endNs;
      }
    ).toArray();
  };

  public func getActiveCheckIn(
    logs : List.List<T.AttendanceLog>,
    employeeId : Common.EmployeeId,
    companyId : Common.CompanyId,
  ) : ?T.AttendanceLog {
    logs.find(
      func(l) {
        l.employeeId == employeeId and l.companyId == companyId and l.checkOutTime == null;
      }
    );
  };
};
