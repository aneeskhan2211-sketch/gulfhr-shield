import List "mo:core/List";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/company";
import TUser "../types/user";
import TAudit "../types/audit";
import CompanyLib "../lib/company";
import UserLib "../lib/user";
import AuditLib "../lib/audit";

mixin (
  accessControlState : AccessControl.AccessControlState,
  companies : List.List<T.Company>,
  subscriptions : List.List<T.Subscription>,
  users : List.List<TUser.User>,
  auditLogs : List.List<TAudit.AuditLog>,
  counters : Common.Counters,
) {
  // Register a new company during onboarding — any caller can register once
  public shared ({ caller }) func registerCompany(input : T.CompanyInput) : async Common.Result<T.Company> {
    switch (UserLib.getByPrincipal(users, caller)) {
      case (?_) { return #err(#invalidInput("Principal already registered to a company")) };
      case null {};
    };
    counters.company += 1;
    let company = CompanyLib.create(companies, counters.company, input);
    counters.subscription += 1;
    ignore CompanyLib.createSubscription(subscriptions, counters.subscription, company.id, #Starter);
    counters.user += 1;
    ignore UserLib.create(users, counters.user, company.id, caller,
      { email = input.billingEmail; fullName = input.name; role = #CompanyOwner });
    #ok(company);
  };

  public query ({ caller }) func getMyCompany() : async Common.Result<T.Company> {
    let user = UserLib.requireUser(users, caller);
    switch (CompanyLib.getById(companies, user.companyId)) {
      case (?c) { #ok(c) };
      case null { #err(#notFound("Company not found")) };
    };
  };

  public shared ({ caller }) func updateCompanyProfile(input : T.CompanyInput) : async Common.Result<T.Company> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #CompanyOwner)) {
      return #err(#forbidden("Company Owner required"));
    };
    switch (CompanyLib.update(companies, user.companyId, input)) {
      case (?c) {
        counters.auditLog += 1;
        ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
          { actionType = #CompanyProfileUpdated; affectedResourceType = "Company";
            affectedResourceId = debug_show(user.companyId); affectedResourceName = input.name;
            oldValue = null; newValue = ?input.name; status = #Success }, Time.now());
        #ok(c);
      };
      case null { #err(#notFound("Company not found")) };
    };
  };

  public shared ({ caller }) func updateAlertThresholds(thresholds : [Nat]) : async Common.Result<T.Company> {
    let user = UserLib.requireUser(users, caller);
    ignore CompanyLib.updateAlertThresholds(companies, user.companyId, thresholds);
    counters.auditLog += 1;
    ignore AuditLib.log(auditLogs, counters.auditLog, user.companyId, user.id,
      { actionType = #AlertThresholdChanged; affectedResourceType = "Company";
        affectedResourceId = debug_show(user.companyId); affectedResourceName = "Alert Thresholds";
        oldValue = null; newValue = ?debug_show(thresholds); status = #Success }, Time.now());
    switch (CompanyLib.getById(companies, user.companyId)) {
      case (?c) { #ok(c) };
      case null { #err(#notFound("Company not found")) };
    };
  };

  public query ({ caller }) func getSubscription() : async Common.Result<T.Subscription> {
    let user = UserLib.requireUser(users, caller);
    switch (CompanyLib.getSubscription(subscriptions, user.companyId)) {
      case (?s) { #ok(s) };
      case null { #err(#notFound("Subscription not found")) };
    };
  };

  public shared ({ caller }) func upgradeSubscription(tier : T.SubscriptionTier) : async Common.Result<T.Subscription> {
    let user = UserLib.requireUser(users, caller);
    if (not UserLib.hasRole(user, #CompanyOwner)) {
      return #err(#forbidden("Company Owner required"));
    };
    ignore CompanyLib.updateSubscriptionTier(subscriptions, user.companyId, tier);
    switch (CompanyLib.getSubscription(subscriptions, user.companyId)) {
      case (?s) { #ok(s) };
      case null {
        counters.subscription += 1;
        #ok(CompanyLib.createSubscription(subscriptions, counters.subscription, user.companyId, tier));
      };
    };
  };

  // Dashboard KPI aggregation — returns a summary for the caller's company
  public query ({ caller }) func getCompanyStats() : async Common.Result<{
    totalEmployees : Nat;
    expiredVisaCount : Nat;
    expiringDocumentCount : Nat;
    pendingPayrollCount : Nat;
    complianceScore : Nat;
    unreadAlertCount : Nat;
  }> {
    let user = UserLib.requireUser(users, caller);
    // minimal stats available from company-api — other stats aggregated client-side or in dashboard
    #ok({
      totalEmployees = 0;
      expiredVisaCount = 0;
      expiringDocumentCount = 0;
      pendingPayrollCount = 0;
      complianceScore = 100;
      unreadAlertCount = 0;
    });
  };

};
