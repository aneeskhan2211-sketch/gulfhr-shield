import { createActor } from "@/backend";
import type { ROIMetrics } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useGetROIMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ROIMetrics | null>({
    queryKey: ["roiMetrics"],
    queryFn: async () => {
      if (!actor) return null;
      return unwrapResult(await actor.getROIMetrics());
    },
    enabled: !!actor && !isFetching,
    staleTime: 300_000,
  });
}
