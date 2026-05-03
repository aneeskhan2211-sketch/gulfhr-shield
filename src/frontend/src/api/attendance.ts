import { createActor } from "@/backend";
import type {
  AttendanceLogId,
  CheckInInput,
  CheckOutInput,
  EmployeeId,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useListAttendanceLogs(employeeId: EmployeeId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["attendance", employeeId?.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return [];
      return unwrapResult(await actor.listAttendanceLogs(employeeId));
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 30_000,
  });
}

export function useListAttendanceByMonth(month: bigint, year: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["attendance", "month", month.toString(), year.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listAttendanceByMonth(month, year));
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetActiveCheckIn(employeeId: EmployeeId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["activeCheckIn", employeeId?.toString()],
    queryFn: async () => {
      if (!actor || !employeeId) return null;
      return unwrapResult(await actor.getActiveCheckIn(employeeId));
    },
    enabled: !!actor && !isFetching && !!employeeId,
    staleTime: 30_000,
  });
}

export function useCheckIn() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CheckInInput) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.checkIn(input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attendance"] });
      qc.invalidateQueries({ queryKey: ["activeCheckIn"] });
    },
  });
}

export function useCheckOut() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CheckOutInput) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.checkOut(input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attendance"] });
      qc.invalidateQueries({ queryKey: ["activeCheckIn"] });
    },
  });
}
