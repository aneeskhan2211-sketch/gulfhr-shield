import type { CreateNotificationEntry } from "@/backend";
import { createActor } from "@/backend";
import type { EmployeeId } from "@/backend";
import type { NotificationLog, WhatsAppSettings } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useGetWhatsAppSettings(employeeId: EmployeeId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WhatsAppSettings | null>({
    queryKey: ["whatsappSettings", employeeId?.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return null;
      return unwrapResult(await actor.getWhatsAppSettings(employeeId));
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 60_000,
  });
}

export function useUpdateWhatsAppSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings: WhatsAppSettings) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateWhatsAppSettings(settings));
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["whatsappSettings", vars.employeeId.toString()],
      });
    },
  });
}

export function useListNotificationLogs(limit = 50) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NotificationLog[]>({
    queryKey: ["notificationLogs", limit],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listNotificationLogs(BigInt(limit)));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useCreateNotificationLog() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: CreateNotificationEntry) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.createNotificationLog(entry));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notificationLogs"] }),
  });
}
