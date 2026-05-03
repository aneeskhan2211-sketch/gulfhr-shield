import Debug "mo:core/Debug";
import List "mo:core/List";
import TCommon "../types/common";
import TOnboarding "../types/onboarding";

module {
  public func getProgress(
    progressList : List.List<TOnboarding.OnboardingProgress>,
    companyId : TCommon.CompanyId,
  ) : ?TOnboarding.OnboardingProgress {
    Debug.todo();
  };

  public func updateStep(
    progressList : List.List<TOnboarding.OnboardingProgress>,
    companyId : TCommon.CompanyId,
    step : Nat,
  ) : TOnboarding.OnboardingProgress {
    Debug.todo();
  };
};
