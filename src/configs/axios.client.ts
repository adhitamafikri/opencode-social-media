import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "@/configs/api";
import type { RefreshTokenResponse } from "@/types/dto/auth-response";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from "@/utils/cookies";

type AuthenticatedRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
  skipAuthorization?: boolean;
};

export type ApiClientRequestConfig = AxiosRequestConfig & {
  skipAuthRefresh?: boolean;
  skipAuthorization?: boolean;
};

let refreshTokenRequest: Promise<string> | null = null;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function setAuthorizationHeader(
  config: AxiosRequestConfig,
  token: string,
): AxiosRequestConfig {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}

export function createRefreshTokenRequestConfig(): ApiClientRequestConfig {
  const refreshToken = getRefreshToken();

  return {
    headers: refreshToken
      ? {
          Authorization: `Bearer ${refreshToken}`,
        }
      : undefined,
    skipAuthorization: true,
    skipAuthRefresh: true,
  };
}

async function refreshAccessToken(): Promise<string> {
  const currentRefreshToken = getRefreshToken();

  if (!currentRefreshToken) {
    clearAuthTokens();
    throw new Error("Missing refresh token");
  }

  if (!refreshTokenRequest) {
    refreshTokenRequest = axios
      .post<RefreshTokenResponse>(
        `${API_BASE_URL}/users/refresh-token`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${currentRefreshToken}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        const { accessToken, refreshToken } = response.data.data;
        setAuthTokens(accessToken, refreshToken);
        return accessToken;
      })
      .catch((error: unknown) => {
        clearAuthTokens();
        throw error;
      })
      .finally(() => {
        refreshTokenRequest = null;
      });
  }

  return refreshTokenRequest;
}

apiClient.interceptors.request.use(
  (config) => {
    const authenticatedConfig = config as AuthenticatedRequestConfig;
    const accessToken = getAccessToken();

    if (accessToken && !authenticatedConfig.skipAuthorization) {
      setAuthorizationHeader(authenticatedConfig, accessToken);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AuthenticatedRequestConfig | undefined;
    const shouldRefresh =
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh;

    if (!shouldRefresh || !originalRequest) {
      return Promise.reject(error);
    }

    try {
      originalRequest._retry = true;
      const nextAccessToken = await refreshAccessToken();
      setAuthorizationHeader(originalRequest, nextAccessToken);

      return apiClient(originalRequest);
    } catch (refreshError: unknown) {
      return Promise.reject(refreshError);
    }
  },
);

export { apiClient };
