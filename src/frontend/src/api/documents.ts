import { createActor } from "@/backend";
import type { DocumentId, DocumentInput, EmployeeId } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useListAllDocuments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listAllDocuments());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useListDocuments(employeeId: EmployeeId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["documents", employeeId?.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return [];
      return unwrapResult(await actor.listDocuments(employeeId));
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 60_000,
  });
}

export function useGetDocument(id: DocumentId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["document", id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return unwrapResult(await actor.getDocument(id));
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useUploadDocument() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: DocumentInput) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.uploadDocument(input));
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["documents"] });
      qc.invalidateQueries({
        queryKey: ["documents", vars.employeeId.toString()],
      });
    },
  });
}

export function useDeleteDocument() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: DocumentId) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.deleteDocument(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["documents"] }),
  });
}
