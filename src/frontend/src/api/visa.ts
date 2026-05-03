import { createActor } from "@/backend";
import type { EmployeeId, VisaRecordId, VisaRecordInput } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useListAllVisaRecords() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visaRecords"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listAllVisaRecords());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useListVisaRecords(employeeId: EmployeeId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visaRecords", employeeId?.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return [];
      return unwrapResult(await actor.listVisaRecords(employeeId));
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 60_000,
  });
}

export function useGetExpiringRecords(thresholdDays: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["expiringRecords", thresholdDays.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.getExpiringRecords(thresholdDays));
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useAddVisaRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: VisaRecordInput) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.addVisaRecord(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visaRecords"] }),
  });
}

export function useUpdateVisaRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: VisaRecordId; input: VisaRecordInput }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateVisaRecord(id, input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visaRecords"] }),
  });
}

export function useRemoveVisaRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: VisaRecordId) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.removeVisaRecord(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visaRecords"] }),
  });
}
