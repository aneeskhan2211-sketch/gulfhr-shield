import { u as useActor, z as useQuery, d as useQueryClient, e as useMutation, f as unwrapResult, g as createActor } from "./index-DqipwkTD.js";
function useListAllVisaRecords() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visaRecords"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listAllVisaRecords());
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useListVisaRecords(employeeId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visaRecords", employeeId == null ? void 0 : employeeId.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return [];
      return unwrapResult(await actor.listVisaRecords(employeeId));
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 6e4
  });
}
function useAddVisaRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.addVisaRecord(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visaRecords"] })
  });
}
function useUpdateVisaRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateVisaRecord(id, input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visaRecords"] })
  });
}
function useRemoveVisaRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.removeVisaRecord(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visaRecords"] })
  });
}
export {
  useListAllVisaRecords as a,
  useAddVisaRecord as b,
  useUpdateVisaRecord as c,
  useRemoveVisaRecord as d,
  useListVisaRecords as u
};
