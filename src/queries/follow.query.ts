import { computed } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { followKeys, postsKeys, profileKeys } from "@/queries/key-factory";
import {
  composeMutationHandlers,
  type MutationHookHandlers,
} from "@/queries/mutation-handlers";
import { followUser, listFollowers, listFollowing } from "@/services/follow.service";
import type { PaginatedRequest } from "@/types/dto/base-request";
import type {
  FollowersListParams,
  FollowingListParams,
  FollowUserParams,
} from "@/types/dto/follow-request";
import type { FollowUserResponse } from "@/types/dto/follow-response";

type GetFollowersQueryOptions = {
  enabled?: boolean;
  params?: PaginatedRequest;
  username: string;
};

type GetFollowingQueryOptions = {
  enabled?: boolean;
  params?: PaginatedRequest;
  username: string;
};

export function useQueryGetFollowers(options: GetFollowersQueryOptions) {
  const params: FollowersListParams = {
    username: options.username,
    ...(options.params ?? {}),
  };
  const query = useQuery({
    queryKey: followKeys.followers(options.username, options.params),
    queryFn: () => listFollowers(params),
    enabled: options.enabled ?? true,
  });

  const followers = computed(() => query.data.value?.data.followers ?? []);
  const totalFollowers = computed(() => query.data.value?.data.totalFollowers ?? 0);
  const user = computed(() => query.data.value?.data.user ?? null);
  const page = computed(() => query.data.value?.data.page ?? 1);
  const totalPages = computed(() => query.data.value?.data.totalPages ?? 0);
  const hasNextPage = computed(() => query.data.value?.data.hasNextPage ?? false);
  const hasPrevPage = computed(() => query.data.value?.data.hasPrevPage ?? false);
  const nextPage = computed(() => query.data.value?.data.nextPage ?? null);
  const prevPage = computed(() => query.data.value?.data.prevPage ?? null);
  const isEmpty = computed(() => followers.value.length === 0);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    followers,
    totalFollowers,
    user,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    isEmpty,
  };
}

export function useQueryGetFollowing(options: GetFollowingQueryOptions) {
  const params: FollowingListParams = {
    username: options.username,
    ...(options.params ?? {}),
  };
  const query = useQuery({
    queryKey: followKeys.following(options.username, options.params),
    queryFn: () => listFollowing(params),
    enabled: options.enabled ?? true,
  });

  const following = computed(() => query.data.value?.data.following ?? []);
  const totalFollowing = computed(() => query.data.value?.data.totalFollowing ?? 0);
  const user = computed(() => query.data.value?.data.user ?? null);
  const page = computed(() => query.data.value?.data.page ?? 1);
  const totalPages = computed(() => query.data.value?.data.totalPages ?? 0);
  const hasNextPage = computed(() => query.data.value?.data.hasNextPage ?? false);
  const hasPrevPage = computed(() => query.data.value?.data.hasPrevPage ?? false);
  const nextPage = computed(() => query.data.value?.data.nextPage ?? null);
  const prevPage = computed(() => query.data.value?.data.prevPage ?? null);
  const isEmpty = computed(() => following.value.length === 0);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    following,
    totalFollowing,
    user,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    isEmpty,
  };
}

export function useMutationFollowUser(
  handlers?: MutationHookHandlers<FollowUserResponse, FollowUserParams>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: followKeys.root() }),
        queryClient.invalidateQueries({ queryKey: profileKeys.root() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
      ]);
    },
  });
  const mutation = useMutation({
    mutationFn: (params: FollowUserParams) => followUser(params),
    onSuccess,
    onError,
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
