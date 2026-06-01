import type { Profile } from "@/types/users";
import type { BaseResponse } from "@/types/dto/base-response";

export type MyProfileResponse = BaseResponse<Profile>;

export type UpdateProfileResponse = BaseResponse<Profile[]>;

export type ProfileByUsernameResponse = BaseResponse<Profile>;
