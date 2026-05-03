module {
  public type ROIMetrics = {
    timeSavedHours : Float;
    payrollProcessedCount : Nat;
    payrollTotalAmount : Nat; // in fils
    complianceScoreImprovement : Float;
    estimatedPenaltiesAvoided : Nat; // in fils
    currency : Text; // AED, SAR, OMR, QAR
  };
};
