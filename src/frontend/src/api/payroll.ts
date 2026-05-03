import { createActor } from "@/backend";
import type {
  PayrollItemInput,
  PayrollRunId,
  PayrollRunInput,
  PayrollStatus,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useListPayrollRuns() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["payrollRuns"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listPayrollRuns());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetPayrollRun(id: PayrollRunId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["payrollRun", id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return unwrapResult(await actor.getPayrollRun(id));
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 60_000,
  });
}

export function useListPayrollItems(runId: PayrollRunId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["payrollItems", runId?.toString()],
    queryFn: async () => {
      if (!actor || !runId) return [];
      return unwrapResult(await actor.listPayrollItems(runId));
    },
    enabled: !!actor && !isFetching && !!runId,
    staleTime: 60_000,
  });
}

export function useCreatePayrollRun() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: PayrollRunInput) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.createPayrollRun(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["payrollRuns"] }),
  });
}

export function useApprovePayrollRun() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: PayrollRunId; status: PayrollStatus }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.approvePayrollRun(id, status));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payrollRuns"] });
    },
  });
}

export function useUpsertPayrollItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      runId,
      input,
    }: { runId: PayrollRunId; input: PayrollItemInput }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.upsertPayrollItem(runId, input));
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["payrollItems", vars.runId.toString()],
      });
    },
  });
}
