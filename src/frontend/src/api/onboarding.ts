import { createActor } from "@/backend";
import type { OnboardingProgress } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useGetOnboardingProgress() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<OnboardingProgress | null>({
    queryKey: ["onboardingProgress"],
    queryFn: async () => {
      if (!actor) return null;
      return unwrapResult(await actor.getOnboardingProgress());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useUpdateOnboardingProgress() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (step: bigint) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateOnboardingProgress(step));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["onboardingProgress"] }),
  });
}
