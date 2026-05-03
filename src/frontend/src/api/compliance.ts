import { createActor } from "@/backend";
import type { ComplianceRiskScore, PenaltyExposure } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useGetComplianceRiskScore() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ComplianceRiskScore | null>({
    queryKey: ["complianceRiskScore"],
    queryFn: async () => {
      if (!actor) return null;
      return unwrapResult(await actor.getComplianceRiskScore());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}

export function useGetPenaltyExposure() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PenaltyExposure | null>({
    queryKey: ["penaltyExposure"],
    queryFn: async () => {
      if (!actor) return null;
      return unwrapResult(await actor.getPenaltyExposure());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}
