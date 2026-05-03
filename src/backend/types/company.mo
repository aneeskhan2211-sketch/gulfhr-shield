import Common "common";
module {
  public type SubscriptionTier = {
    #Starter;
    #Growth;
    #Business;
    #Enterprise;
  };

  public type Company = {
    id : Common.CompanyId;
    name : Text;
    registrationNumber : Text;
    vatNumber : Text;
    address : Text;
    country : Text;
    phone : Text;
    billingEmail : Text;
    subscriptionTier : SubscriptionTier;
    trialEndDate : ?Common.Timestamp;
    createdAt : Common.Timestamp;
    alertThresholdDays : [Nat]; // e.g. [7, 30, 60]
  };

  public type CompanyInput = {
    name : Text;
    registrationNumber : Text;
    vatNumber : Text;
    address : Text;
    country : Text;
    phone : Text;
    billingEmail : Text;
  };

  public type Subscription = {
    id : Common.SubscriptionId;
    companyId : Common.CompanyId;
    tier : SubscriptionTier;
    employeeLimit : Nat;
    isTrialActive : Bool;
    trialStartDate : ?Common.Timestamp;
    trialEndDate : ?Common.Timestamp;
    paidStartDate : ?Common.Timestamp;
    renewalDate : ?Common.Timestamp;
    status : SubscriptionStatus;
    createdAt : Common.Timestamp;
  };

  public type SubscriptionStatus = {
    #Active;
    #Expired;
    #Cancelled;
  };
};
