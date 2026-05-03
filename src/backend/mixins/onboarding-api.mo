import Debug "mo:core/Debug";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import TCommon "../types/common";
import TOnboarding "../types/onboarding";
import TUser "../types/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  onboardingProgressList : List.List<TOnboarding.OnboardingProgress>,
  users : List.List<TUser.User>,
) {
  public shared ({ caller }) func getOnboardingProgress() : async TCommon.Result<TOnboarding.OnboardingProgress> {
    Debug.todo();
  };

  public shared ({ caller }) func updateOnboardingProgress(step : Nat) : async TCommon.Result<TOnboarding.OnboardingProgress> {
    Debug.todo();
  };
};
