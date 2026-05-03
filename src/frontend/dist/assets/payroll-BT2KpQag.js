import { u as useActor, z as useQuery, d as useQueryClient, e as useMutation, f as unwrapResult, g as createActor } from "./index-DqipwkTD.js";
function useListPayrollRuns() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["payrollRuns"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listPayrollRuns());
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useGetPayrollRun(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["payrollRun", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return unwrapResult(await actor.getPayrollRun(id));
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 6e4
  });
}
function useListPayrollItems(runId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["payrollItems", runId == null ? void 0 : runId.toString()],
    queryFn: async () => {
      if (!actor || !runId) return [];
      return unwrapResult(await actor.listPayrollItems(runId));
    },
    enabled: !!actor && !isFetching && !!runId,
    staleTime: 6e4
  });
}
function useCreatePayrollRun() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.createPayrollRun(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["payrollRuns"] })
  });
}
function useApprovePayrollRun() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.approvePayrollRun(id, status));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payrollRuns"] });
    }
  });
}
function useUpsertPayrollItem() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      runId,
      input
    }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.upsertPayrollItem(runId, input));
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["payrollItems", vars.runId.toString()]
      });
    }
  });
}
export {
  useCreatePayrollRun as a,
  useApprovePayrollRun as b,
  useUpsertPayrollItem as c,
  useGetPayrollRun as d,
  useListPayrollItems as e,
  useListPayrollRuns as u
};
