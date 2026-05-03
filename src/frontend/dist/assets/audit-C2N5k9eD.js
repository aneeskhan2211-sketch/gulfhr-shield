import { u as useActor, z as useQuery, g as createActor, f as unwrapResult } from "./index-DqipwkTD.js";
function useListAuditLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listAuditLogs());
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
export {
  useListAuditLogs as u
};
