import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  bookmarksKeys,
  commentsKeys,
  followKeys,
  postsKeys,
  profileKeys,
  usersKeys,
} from "@/queries/key-factory";
import {
  composeMutationHandlers,
  type MutationHookHandlers,
} from "@/queries/mutation-handlers";
import { login, logout, refreshToken, register } from "@/services/auth.service";
import type {
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterResponse,
} from "@/types/dto/auth-response";
import type { LoginRequest, RegisterRequest } from "@/types/dto/auth-request";
import { clearAuthTokens, setAuthTokens } from "@/utils/cookies";

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

function persistAuthTokens(response: LoginResponse | RefreshTokenResponse): void {
  const { accessToken, refreshToken } = response.data;

  if (!accessToken || !refreshToken) {
    throw new Error("Authentication response is missing tokens.");
  }

  setAuthTokens(accessToken, refreshToken);
}

export function useMutationRegister(
  handlers?: MutationHookHandlers<RegisterResponse, RegisterRequest>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async () => {
      await invalidateSessionScopedQueries(queryClient);
    },
  });
  const mutation = useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
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

export function useMutationLogin(
  handlers?: MutationHookHandlers<LoginResponse, LoginRequest>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async (response: LoginResponse) => {
      persistAuthTokens(response);
      await invalidateSessionScopedQueries(queryClient);
    },
  });
  const mutation = useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
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

export function useMutationLogout(
  handlers?: MutationHookHandlers<LogoutResponse, void>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async () => {
      clearAuthTokens();
      await invalidateSessionScopedQueries(queryClient);
    },
  });
  const mutation = useMutation({
    mutationFn: () => logout(),
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

export function useMutationRefreshToken(
  handlers?: MutationHookHandlers<RefreshTokenResponse, void>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async (response: RefreshTokenResponse) => {
      persistAuthTokens(response);
      await invalidateSessionScopedQueries(queryClient);
    },
  });
  const mutation = useMutation({
    mutationFn: () => refreshToken(),
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
