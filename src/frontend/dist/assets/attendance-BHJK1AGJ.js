import { u as useActor, z as useQuery, d as useQueryClient, e as useMutation, f as unwrapResult, g as createActor } from "./index-DqipwkTD.js";
function useListAttendanceLogs(employeeId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["attendance", employeeId == null ? void 0 : employeeId.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return [];
      return unwrapResult(await actor.listAttendanceLogs(employeeId));
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 3e4
  });
}
function useListAttendanceByMonth(month, year) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["attendance", "month", month.toString(), year.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listAttendanceByMonth(month, year));
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useGetActiveCheckIn(employeeId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["activeCheckIn", employeeId == null ? void 0 : employeeId.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return null;
      return unwrapResult(await actor.getActiveCheckIn(employeeId));
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 3e4
  });
}
function useCheckIn() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.checkIn(input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attendance"] });
      qc.invalidateQueries({ queryKey: ["activeCheckIn"] });
    }
  });
}
function useCheckOut() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.checkOut(input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attendance"] });
      qc.invalidateQueries({ queryKey: ["activeCheckIn"] });
    }
  });
}
export {
  useGetActiveCheckIn as a,
  useCheckIn as b,
  useCheckOut as c,
  useListAttendanceByMonth as d,
  useListAttendanceLogs as u
};
