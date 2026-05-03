import { u as useActor, z as useQuery, d as useQueryClient, e as useMutation, f as unwrapResult, g as createActor } from "./index-DqipwkTD.js";
function useListAllDocuments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listAllDocuments());
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useListDocuments(employeeId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["documents", employeeId == null ? void 0 : employeeId.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return [];
      return unwrapResult(await actor.listDocuments(employeeId));
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 6e4
  });
}
function useGetDocument(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["document", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return unwrapResult(await actor.getDocument(id));
    },
    enabled: !!actor && !isFetching && !!id
  });
}
function useUploadDocument() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.uploadDocument(input));
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["documents"] });
      qc.invalidateQueries({
        queryKey: ["documents", vars.employeeId.toString()]
      });
    }
  });
}
function useDeleteDocument() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.deleteDocument(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["documents"] })
  });
}
export {
  useDeleteDocument as a,
  useGetDocument as b,
  useUploadDocument as c,
  useListAllDocuments as d,
  useListDocuments as u
};
