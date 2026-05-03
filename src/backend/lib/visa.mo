import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/visa";

module {
  // 1 day in nanoseconds
  let DAY_NS : Int = 86_400_000_000_000;

  public func create(
    records : List.List<T.VisaRecord>,
    counter : Nat,
    companyId : Common.CompanyId,
    input : T.VisaRecordInput,
  ) : T.VisaRecord {
    let now = Time.now();
    let r : T.VisaRecord = {
      id = counter;
      employeeId = input.employeeId;
      companyId;
      recordType = input.recordType;
      expiryDate = input.expiryDate;
      notes = input.notes;
      createdAt = now;
      updatedAt = now;
    };
    records.add(r);
    r;
  };

  public func getById(
    records : List.List<T.VisaRecord>,
    id : Common.VisaRecordId,
  ) : ?T.VisaRecord {
    records.find(func(r) { r.id == id });
  };

  public func getByEmployee(
    records : List.List<T.VisaRecord>,
    employeeId : Common.EmployeeId,
    companyId : Common.CompanyId,
  ) : [T.VisaRecord] {
    records.filter(func(r) { r.employeeId == employeeId and r.companyId == companyId }).toArray();
  };

  public func getByCompany(
    records : List.List<T.VisaRecord>,
    companyId : Common.CompanyId,
  ) : [T.VisaRecord] {
    records.filter(func(r) { r.companyId == companyId }).toArray();
  };

  public func update(
    records : List.List<T.VisaRecord>,
    id : Common.VisaRecordId,
    companyId : Common.CompanyId,
    input : T.VisaRecordInput,
  ) : ?T.VisaRecord {
    var result : ?T.VisaRecord = null;
    records.mapInPlace(
      func(r) {
        if (r.id == id and r.companyId == companyId) {
          let updated = { r with
            recordType = input.recordType;
            expiryDate = input.expiryDate;
            notes = input.notes;
            updatedAt = Time.now();
          };
          result := ?updated;
          updated;
        } else { r };
      }
    );
    result;
  };

  public func remove(
    records : List.List<T.VisaRecord>,
    id : Common.VisaRecordId,
    companyId : Common.CompanyId,
  ) : Bool {
    var found = false;
    let remaining = records.filter(
      func(r) {
        if (r.id == id and r.companyId == companyId) {
          found := true;
          false;
        } else { true };
      }
    );
    records.clear();
    records.append(remaining);
    found;
  };

  public func getExpiring(
    records : List.List<T.VisaRecord>,
    companyId : Common.CompanyId,
    thresholdDays : Nat,
    nowNanos : Common.Timestamp,
  ) : [T.VisaRecord] {
    let cutoff = nowNanos + DAY_NS * (thresholdDays : Int);
    records.filter(
      func(r) {
        r.companyId == companyId and r.expiryDate >= nowNanos and r.expiryDate <= cutoff;
      }
    ).toArray();
  };

  public func getExpiryStatus(
    record : T.VisaRecord,
    thresholds : [Nat],
    nowNanos : Common.Timestamp,
  ) : T.ExpiryStatus {
    if (record.expiryDate < nowNanos) {
      return #Expired;
    };
    let daysRemainingInt = (record.expiryDate - nowNanos) / DAY_NS;
    let daysRemaining : Nat = daysRemainingInt.toNat();
    // find smallest threshold >= daysRemaining (i.e. record is expiring within that threshold)
    let minThreshold = thresholds.foldLeft(
      100_001,
      func(acc : Nat, t : Nat) : Nat {
        if (t >= daysRemaining and t < acc) { t } else { acc };
      }
    );
    if (minThreshold == 100_001) {
      #Valid;
    } else {
      #ExpiringSoon(daysRemaining);
    };
  };
};
