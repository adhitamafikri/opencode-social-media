import { computed, type ComputedRef } from "vue";
import { authTokenState } from "@/utils/cookies";

type UseAuthReturn = {
  accessToken: ComputedRef<string | null>;
  isLoggedIn: ComputedRef<boolean>;
  refreshToken: ComputedRef<string | null>;
};

export function useAuth(): UseAuthReturn {
  const accessToken = computed<string | null>(() => authTokenState.value.accessToken);
  const refreshToken = computed<string | null>(
    () => authTokenState.value.refreshToken,
  );
  const isLoggedIn = computed<boolean>(() => !!accessToken.value);

  return {
    accessToken,
    isLoggedIn,
    refreshToken,
  };
}
