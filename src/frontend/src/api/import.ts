import { createActor } from "@/backend";
import type { EmployeeImportRow, ImportResult } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useBulkImportEmployees() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<ImportResult, Error, EmployeeImportRow[]>({
    mutationFn: async (rows: EmployeeImportRow[]) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.bulkImportEmployees(rows));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
}
