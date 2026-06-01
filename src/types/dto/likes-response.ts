import type { LikeToggle } from "@/types/likes";
import type { BaseResponse } from "@/types/dto/base-response";

export type LikePostResponse = BaseResponse<LikeToggle>;

export type LikeCommentResponse = BaseResponse<LikeToggle>;
