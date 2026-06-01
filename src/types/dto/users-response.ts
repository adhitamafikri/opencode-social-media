import type { AvatarUpdateUser, AuthUser } from "@/types/users";
import type { BaseResponse } from "@/types/dto/base-response";

export type CurrentUserResponse = BaseResponse<AuthUser>;

export type UpdateAvatarResponse = BaseResponse<AvatarUpdateUser>;
