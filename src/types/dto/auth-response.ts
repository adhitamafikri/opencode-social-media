import type { AuthTokens, AuthUser } from "@/types/users";
import type { BaseResponse } from "@/types/dto/base-response";

export type RegisterResponse = BaseResponse<{
  user: AuthUser;
}>;

export type LoginResponse = BaseResponse<
  AuthTokens & {
    user: AuthUser;
  }
>;

export type LogoutResponse = BaseResponse<Record<string, never>>;

export type RefreshTokenResponse = BaseResponse<AuthTokens>;
