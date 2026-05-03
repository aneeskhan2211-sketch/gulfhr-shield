// Cross-cutting types shared across all GulfHR Shield domains
module {
  public type Timestamp = Int; // nanoseconds from Time.now()
  public type CompanyId = Nat;
  public type UserId = Nat;
  public type EmployeeId = Nat;
  public type DocumentId = Nat;
  public type VisaRecordId = Nat;
  public type PayrollRunId = Nat;
  public type PayrollItemId = Nat;
  public type WpsExportId = Nat;
  public type AttendanceLogId = Nat;
  public type AlertId = Nat;
  public type AuditLogId = Nat;
  public type SubscriptionId = Nat;

  public type ApiError = {
    #unauthorized : Text;
    #notFound : Text;
    #invalidInput : Text;
    #forbidden : Text;
    #limitExceeded : Text;
  };

  public type Result<T> = { #ok : T; #err : ApiError };

  // Mutable counters object — passed into mixins so they can allocate IDs
  public type Counters = {
    var company : Nat;
    var subscription : Nat;
    var user : Nat;
    var employee : Nat;
    var document : Nat;
    var visaRecord : Nat;
    var payrollRun : Nat;
    var payrollItem : Nat;
    var wpsExport : Nat;
    var attendanceLog : Nat;
    var alert : Nat;
    var auditLog : Nat;
  };
};
