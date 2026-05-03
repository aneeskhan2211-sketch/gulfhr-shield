import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";
module {
  public type GeoLocation = {
    latitude : Float;
    longitude : Float;
  };

  public type AttendanceLog = {
    id : Common.AttendanceLogId;
    employeeId : Common.EmployeeId;
    companyId : Common.CompanyId;
    checkInTime : Common.Timestamp;
    checkOutTime : ?Common.Timestamp;
    workHours : ?Float; // hours worked, calculated on checkout
    checkInLocation : ?GeoLocation;
    checkOutLocation : ?GeoLocation;
    selfieBlob : ?Storage.ExternalBlob;
    consentGiven : Bool;
    createdAt : Common.Timestamp;
  };

  public type CheckInInput = {
    employeeId : Common.EmployeeId;
    checkInLocation : ?GeoLocation;
    selfieBlob : ?Storage.ExternalBlob;
    consentGiven : Bool;
  };

  public type CheckOutInput = {
    logId : Common.AttendanceLogId;
    checkOutLocation : ?GeoLocation;
  };
};
