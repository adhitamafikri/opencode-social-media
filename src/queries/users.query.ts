import { computed } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { postsKeys, profileKeys, usersKeys } from "@/queries/key-factory";
import { getCurrentUser, updateAvatar } from "@/services/users.service";
import type { UpdateAvatarRequest } from "@/types/dto/users-request";

type GetCurrentUserQueryOptions = {
  enabled?: boolean;
};

export function useQueryGetCurrentUser(options: GetCurrentUserQueryOptions = {}) {
  const query = useQuery({
    queryKey: usersKeys.currentUser(),
    queryFn: () => getCurrentUser(),
    enabled: options.enabled ?? true,
  });

  const user = computed(() => query.data.value?.data ?? null);
  const isAuthenticated = computed(() => user.value !== null);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    user,
    isAuthenticated,
  };
}

export function useMutationUpdateAvatar() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: UpdateAvatarRequest) => updateAvatar(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: usersKeys.root() }),
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
