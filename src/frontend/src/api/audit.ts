import { createActor } from "@/backend";
import type { AuditActionType, Timestamp, UserId } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useListAuditLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listAuditLogs());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useListAuditLogsByAction(actionType: AuditActionType | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["auditLogs", "action", actionType],
    queryFn: async () => {
      if (!actor || !actionType) return [];
      return unwrapResult(await actor.listAuditLogsByAction(actionType));
    },
    enabled: !!actor && !isFetching && !!actionType,
    staleTime: 60_000,
  });
}

export function useListAuditLogsByUser(userId: UserId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["auditLogs", "user", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return unwrapResult(await actor.listAuditLogsByUser(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
    staleTime: 60_000,
  });
}

export function useListAuditLogsByDateRange(
  from: Timestamp | null,
  to: Timestamp | null,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["auditLogs", "range", from?.toString(), to?.toString()],
    queryFn: async () => {
      if (!actor || !from || !to) return [];
      return unwrapResult(await actor.listAuditLogsByDateRange(from, to));
    },
    enabled: !!actor && !isFetching && !!from && !!to,
    staleTime: 60_000,
  });
}
