import { computed } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { postsKeys, profileKeys } from "@/queries/key-factory";
import {
  getMyProfile,
  getProfileByUsername,
  updateProfile,
} from "@/services/profile.service";
import type {
  GetProfileByUsernameParams,
  UpdateProfileRequest,
} from "@/types/dto/profile-request";

type GetProfileByUsernameQueryOptions = {
  enabled?: boolean;
  username: string;
};

export function useQueryGetMyProfile(options: { enabled?: boolean } = {}) {
  const query = useQuery({
    queryKey: profileKeys.me(),
    queryFn: () => getMyProfile(),
    enabled: options.enabled ?? true,
  });

  const profile = computed(() => query.data.value?.data ?? null);
  const account = computed(() => profile.value?.account ?? null);
  const followersCount = computed(() => profile.value?.followersCount ?? 0);
  const followingCount = computed(() => profile.value?.followingCount ?? 0);
  const isFollowing = computed(() => profile.value?.isFollowing ?? false);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    profile,
    account,
    followersCount,
    followingCount,
    isFollowing,
  };
}

export function useQueryGetProfileByUsername(
  options: GetProfileByUsernameQueryOptions,
) {
  const params: GetProfileByUsernameParams = {
    username: options.username,
  };
  const query = useQuery({
    queryKey: profileKeys.byUsername(options.username),
    queryFn: () => getProfileByUsername(params),
    enabled: options.enabled ?? true,
  });

  const profile = computed(() => query.data.value?.data ?? null);
  const account = computed(() => profile.value?.account ?? null);
  const followersCount = computed(() => profile.value?.followersCount ?? 0);
  const followingCount = computed(() => profile.value?.followingCount ?? 0);
  const isFollowing = computed(() => profile.value?.isFollowing ?? false);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    profile,
    account,
    followersCount,
    followingCount,
    isFollowing,
  };
}

export function useMutationUpdateProfile() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: UpdateProfileRequest) => updateProfile(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: profileKeys.root() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
      ]);
    },
  });

  return {
    data: mutation.data,
    pending: mutation.isPending,
    error: mutation.error,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    reset: mutation.reset,
  };
}
