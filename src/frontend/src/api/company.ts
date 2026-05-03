import { createActor } from "@/backend";
import type {
  CompanyId,
  CompanyInput,
  SubscriptionTier,
  UserId,
  UserInput,
  UserRole,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResult } from "./backend";

export function useGetMyCompany() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      if (!actor) return null;
      return unwrapResult(await actor.getMyCompany());
    },
    enabled: !!actor && !isFetching,
    staleTime: 120_000,
  });
}

export function useGetMyProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return unwrapResult(await actor.getMyProfile());
    },
    enabled: !!actor && !isFetching,
    staleTime: 120_000,
  });
}

export function useListUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listUsers());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetSubscription() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!actor) return null;
      return unwrapResult(await actor.getSubscription());
    },
    enabled: !!actor && !isFetching,
    staleTime: 120_000,
  });
}

export function useGetCompanyStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["companyStats"],
    queryFn: async () => {
      if (!actor) return null;
      return unwrapResult(await actor.getCompanyStats());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useUpdateCompanyProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CompanyInput) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateCompanyProfile(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["company"] }),
  });
}

export function useRegisterCompany() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CompanyInput) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.registerCompany(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["company"] }),
  });
}

export function useInviteUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UserInput) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.inviteUser(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useRegisterUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      companyId,
      input,
    }: { companyId: CompanyId; input: UserInput }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.registerUser(companyId, input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUserRole() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      role,
    }: { userId: UserId; role: UserRole }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateUserRole(userId, role));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useDeactivateUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: UserId) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.deactivateUser(userId));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpgradeSubscription() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (tier: SubscriptionTier) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.upgradeSubscription(tier));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscription"] }),
  });
}

export function useUpdateAlertThresholds() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (thresholds: bigint[]) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.updateAlertThresholds(thresholds));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["company"] }),
  });
}

export function useGenerateWpsExport() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      payrollRunId: bigint;
      countryFormat: import("@/backend").WpsCountryFormat;
    }) => {
      if (!actor) throw new Error("Not connected");
      return unwrapResult(await actor.generateWpsExport(input));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wpsExports"] }),
  });
}

export function useListWpsExports() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["wpsExports"],
    queryFn: async () => {
      if (!actor) return [];
      return unwrapResult(await actor.listWpsExports());
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useValidateWpsData(payrollRunId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["wpsValidate", payrollRunId?.toString()],
    queryFn: async () => {
      if (!actor || !payrollRunId) return [];
      return unwrapResult(await actor.validateWpsData(payrollRunId));
    },
    enabled: !!actor && !isFetching && !!payrollRunId,
  });
}
