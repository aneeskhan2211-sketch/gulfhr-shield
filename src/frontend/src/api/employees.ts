import { createActor } from "@/backend";
import type { EmployeeId, EmployeeInput } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useListEmployees() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listEmployees());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetEmployee(id: EmployeeId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["employee", id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return unwrapResult(await actor.getEmployee(id));
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 60_000,
  });
}

export function useAddEmployee() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: EmployeeInput) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.addEmployee(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
}

export function useUpdateEmployee() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: EmployeeId; input: EmployeeInput }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateEmployee(id, input));
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["employee", vars.id.toString()] });
    },
  });
}

export function useRemoveEmployee() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: EmployeeId) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.removeEmployee(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
}
