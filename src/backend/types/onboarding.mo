import TCommon "common";

module {
  // Steps: 0=CreateCompany, 1=AddEmployees, 2=UploadDocuments, 3=RunFirstPayroll
  public type OnboardingProgress = {
    companyId : TCommon.CompanyId;
    currentStep : Nat;
    stepsCompleted : [Bool]; // length 4
    completedAt : ?TCommon.Timestamp;
  };
};
