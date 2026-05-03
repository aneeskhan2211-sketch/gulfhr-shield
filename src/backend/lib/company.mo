import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/company";

module {
  public func create(
    companies : List.List<T.Company>,
    counter : Nat,
    input : T.CompanyInput,
  ) : T.Company {
    let company : T.Company = {
      id = counter;
      name = input.name;
      registrationNumber = input.registrationNumber;
      vatNumber = input.vatNumber;
      address = input.address;
      country = input.country;
      phone = input.phone;
      billingEmail = input.billingEmail;
      subscriptionTier = #Starter;
      trialEndDate = ?(Time.now() + 30 * 24 * 3600 * 1_000_000_000);
      createdAt = Time.now();
      alertThresholdDays = [7, 30, 60];
    };
    companies.add(company);
    company;
  };

  public func getById(
    companies : List.List<T.Company>,
    id : Common.CompanyId,
  ) : ?T.Company {
    companies.find(func(c) { c.id == id });
  };

  public func update(
    companies : List.List<T.Company>,
    id : Common.CompanyId,
    input : T.CompanyInput,
  ) : ?T.Company {
    var result : ?T.Company = null;
    companies.mapInPlace(
      func(c) {
        if (c.id == id) {
          let updated = { c with
            name = input.name;
            registrationNumber = input.registrationNumber;
            vatNumber = input.vatNumber;
            address = input.address;
            country = input.country;
            phone = input.phone;
            billingEmail = input.billingEmail;
          };
          result := ?updated;
          updated;
        } else { c };
      }
    );
    result;
  };

  public func updateAlertThresholds(
    companies : List.List<T.Company>,
    id : Common.CompanyId,
    thresholds : [Nat],
  ) : Bool {
    var found = false;
    companies.mapInPlace(
      func(c) {
        if (c.id == id) {
          found := true;
          { c with alertThresholdDays = thresholds };
        } else { c };
      }
    );
    found;
  };

  public func getSubscription(
    subscriptions : List.List<T.Subscription>,
    companyId : Common.CompanyId,
  ) : ?T.Subscription {
    subscriptions.find(func(s) { s.companyId == companyId });
  };

  public func createSubscription(
    subscriptions : List.List<T.Subscription>,
    counter : Nat,
    companyId : Common.CompanyId,
    tier : T.SubscriptionTier,
  ) : T.Subscription {
    let now = Time.now();
    let sub : T.Subscription = {
      id = counter;
      companyId;
      tier;
      employeeLimit = getEmployeeLimit(tier);
      isTrialActive = true;
      trialStartDate = ?now;
      trialEndDate = ?(now + 30 * 24 * 3600 * 1_000_000_000);
      paidStartDate = null;
      renewalDate = null;
      status = #Active;
      createdAt = now;
    };
    subscriptions.add(sub);
    sub;
  };

  public func updateSubscriptionTier(
    subscriptions : List.List<T.Subscription>,
    companyId : Common.CompanyId,
    tier : T.SubscriptionTier,
  ) : Bool {
    var found = false;
    subscriptions.mapInPlace(
      func(s) {
        if (s.companyId == companyId) {
          found := true;
          { s with
            tier;
            employeeLimit = getEmployeeLimit(tier);
            isTrialActive = false;
            paidStartDate = ?Time.now();
          };
        } else { s };
      }
    );
    found;
  };

  public func getEmployeeLimit(tier : T.SubscriptionTier) : Nat {
    switch (tier) {
      case (#Starter) { 25 };
      case (#Growth) { 100 };
      case (#Business) { 500 };
      case (#Enterprise) { 100_000 };
    };
  };
};
