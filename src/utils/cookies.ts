import Cookies from "js-cookie";
import { ref } from "vue";

const ACCESS_TOKEN_COOKIE_KEY = "access_token";
const REFRESH_TOKEN_COOKIE_KEY = "refresh_token";
const TOKEN_COOKIE_OPTIONS = { expires: 1 };

type TokenKey = typeof ACCESS_TOKEN_COOKIE_KEY | typeof REFRESH_TOKEN_COOKIE_KEY;

type AuthTokenState = {
  accessToken: string | null;
  refreshToken: string | null;
};

export const authTokenState = ref<AuthTokenState>({
  accessToken: Cookies.get(ACCESS_TOKEN_COOKIE_KEY) ?? null,
  refreshToken: Cookies.get(REFRESH_TOKEN_COOKIE_KEY) ?? null,
});

function setTokenCookie(key: TokenKey, token: string): void {
  Cookies.set(key, token, TOKEN_COOKIE_OPTIONS);
}

function getTokenCookie(key: TokenKey): string | undefined {
  return Cookies.get(key);
}

function removeTokenCookie(key: TokenKey): void {
  Cookies.remove(key);
}

export function syncAuthTokenState(): void {
  authTokenState.value = {
    accessToken: getAccessToken() ?? null,
    refreshToken: getRefreshToken() ?? null,
  };
}

export function setAccessToken(token: string): void {
  setTokenCookie(ACCESS_TOKEN_COOKIE_KEY, token);
  syncAuthTokenState();
}

export function getAccessToken(): string | undefined {
  return getTokenCookie(ACCESS_TOKEN_COOKIE_KEY);
}

export function removeAccessToken(): void {
  removeTokenCookie(ACCESS_TOKEN_COOKIE_KEY);
  syncAuthTokenState();
}

export function setRefreshToken(token: string): void {
  setTokenCookie(REFRESH_TOKEN_COOKIE_KEY, token);
  syncAuthTokenState();
}

export function getRefreshToken(): string | undefined {
  return getTokenCookie(REFRESH_TOKEN_COOKIE_KEY);
}

export function removeRefreshToken(): void {
  removeTokenCookie(REFRESH_TOKEN_COOKIE_KEY);
  syncAuthTokenState();
}

export function setAuthTokens(accessToken: string, refreshToken: string): void {
  Cookies.set(ACCESS_TOKEN_COOKIE_KEY, accessToken, TOKEN_COOKIE_OPTIONS);
  Cookies.set(REFRESH_TOKEN_COOKIE_KEY, refreshToken, TOKEN_COOKIE_OPTIONS);
  syncAuthTokenState();
}

export function clearAuthTokens(): void {
  Cookies.remove(ACCESS_TOKEN_COOKIE_KEY);
  Cookies.remove(REFRESH_TOKEN_COOKIE_KEY);
  syncAuthTokenState();
}
