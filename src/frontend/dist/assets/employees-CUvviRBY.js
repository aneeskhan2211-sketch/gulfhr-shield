import { u as useActor, z as useQuery, d as useQueryClient, e as useMutation, f as unwrapResult, g as createActor } from "./index-DqipwkTD.js";
function useListEmployees() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listEmployees());
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useGetEmployee(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["employee", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return unwrapResult(await actor.getEmployee(id));
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 6e4
  });
}
function useAddEmployee() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.addEmployee(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] })
  });
}
function useUpdateEmployee() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateEmployee(id, input));
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["employees"] });
      qc.invalidateQueries({ queryKey: ["employee", vars.id.toString()] });
    }
  });
}
function useRemoveEmployee() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.removeEmployee(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] })
  });
}
export {
  useAddEmployee as a,
  useUpdateEmployee as b,
  useRemoveEmployee as c,
  useGetEmployee as d,
  useListEmployees as u
};
