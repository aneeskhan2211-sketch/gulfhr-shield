import { createActor } from "@/backend";
import type { AlertId } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useListAlerts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listAlerts());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useListUnreadAlerts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["alerts", "unread"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listUnreadAlerts());
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useMarkAlertRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: AlertId) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.markAlertRead(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });
}

export function useMarkAllAlertsRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.markAllAlertsRead());
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });
}
