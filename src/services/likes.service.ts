import { apiClient } from "@/configs/axios.client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  LikeCommentParams,
  LikePostParams,
} from "@/types/dto/likes-request";
import type {
  LikeCommentResponse,
  LikePostResponse,
} from "@/types/dto/likes-response";

export async function likePost(
  params: LikePostParams,
): Promise<LikePostResponse> {
  const { data } = await apiClient.post<LikePostResponse>(
    `${API_ENDPOINTS.likes}/post/${params.postId}`,
  );

  return data;
}

export async function likeComment(
  params: LikeCommentParams,
): Promise<LikeCommentResponse> {
  const { data } = await apiClient.post<LikeCommentResponse>(
    `${API_ENDPOINTS.likes}/comment/${params.commentId}`,
  );

  return data;
}
