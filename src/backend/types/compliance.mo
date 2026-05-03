import TCommon "common";

module {
  public type RiskFactor = {
    factorType : { #VisaExpiry; #MissingDocument; #PayrollDelay; #WpsError };
    description : Text;
    severity : Text;
    employeeCount : Nat;
    estimatedFine : Nat; // in fils/lowest currency unit
  };

  public type ComplianceRiskScore = {
    score : Nat; // 0-100
    riskLevel : { #Low; #Medium; #High; #Critical };
    penaltyExposure : Nat; // in fils/lowest currency unit
    currency : Text; // AED, SAR, OMR, QAR
    riskFactors : [RiskFactor];
  };

  public type PenaltyBreakdown = {
    category : Text;
    amount : Nat;
    count : Nat;
  };

  public type PenaltyExposure = {
    total : Nat;
    currency : Text;
    breakdown : [PenaltyBreakdown];
  };

  public type EmployeeImportRow = {
    fullName : Text;
    employeeCode : Text;
    nationality : Text;
    jobTitle : Text;
    department : Text;
    basicSalary : Nat; // in fils
    workLocation : Text;
  };

  public type ImportError = {
    row : Nat;
    reason : Text;
  };

  public type ImportResult = {
    imported : Nat;
    errors : [ImportError];
  };
};
