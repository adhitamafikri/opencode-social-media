import { apiClient, createRefreshTokenRequestConfig } from "@/configs/axios.client";
import { API_ENDPOINTS } from "@/configs/api";
import type { LoginRequest, RegisterRequest } from "@/types/dto/auth-request";
import type {
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterResponse,
} from "@/types/dto/auth-response";

export async function register(
  payload: RegisterRequest,
): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>(
    `${API_ENDPOINTS.users}/register`,
    payload,
  );

  return data;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    `${API_ENDPOINTS.users}/login`,
    payload,
  );

  return data;
}

export async function logout(): Promise<LogoutResponse> {
  const { data } = await apiClient.post<LogoutResponse>(
    `${API_ENDPOINTS.users}/logout`,
  );

  return data;
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
  const { data } = await apiClient.post<RefreshTokenResponse>(
    `${API_ENDPOINTS.users}/refresh-token`,
    undefined,
    createRefreshTokenRequestConfig(),
  );

  return data;
}
