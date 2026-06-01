import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  bookmarksKeys,
  commentsKeys,
  followKeys,
  postsKeys,
  profileKeys,
  usersKeys,
} from "@/queries/key-factory";
import { login, logout, refreshToken, register } from "@/services/auth.service";
import type { LoginRequest, RegisterRequest } from "@/types/dto/auth-request";

async function invalidateSessionScopedQueries(
  queryClient: ReturnType<typeof useQueryClient>,
): Promise<void> {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: usersKeys.root() }),
    queryClient.invalidateQueries({ queryKey: profileKeys.root() }),
    queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
    queryClient.invalidateQueries({ queryKey: commentsKeys.root() }),
    queryClient.invalidateQueries({ queryKey: bookmarksKeys.root() }),
    queryClient.invalidateQueries({ queryKey: followKeys.root() }),
  ]);
}

export function useMutationRegister() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
    onSuccess: async () => {
      await invalidateSessionScopedQueries(queryClient);
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

export function useMutationLogin() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: async () => {
      await invalidateSessionScopedQueries(queryClient);
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

export function useMutationLogout() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      await invalidateSessionScopedQueries(queryClient);
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

export function useMutationRefreshToken() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => refreshToken(),
    onSuccess: async () => {
      await invalidateSessionScopedQueries(queryClient);
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
