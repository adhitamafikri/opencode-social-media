import { apiClient } from "@/configs/axios.client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  CreateCommentParams,
  CreateCommentRequest,
  DeleteCommentParams,
  GetCommentsByPostParams,
  UpdateCommentParams,
  UpdateCommentRequest,
} from "@/types/dto/comments-request";
import type {
  CommentsByPostResponse,
  CreateCommentResponse,
  DeleteCommentResponse,
  UpdateCommentResponse,
} from "@/types/dto/comments-response";

export async function getCommentsByPost(
  params: GetCommentsByPostParams,
): Promise<CommentsByPostResponse> {
  const { postId, ...query } = params;
  const { data } = await apiClient.get<CommentsByPostResponse>(
    `${API_ENDPOINTS.comments}/post/${postId}`,
    {
      params: query,
    },
  );

  return data;
}

export async function createComment(
  params: CreateCommentParams,
  payload: CreateCommentRequest,
): Promise<CreateCommentResponse> {
  const { data } = await apiClient.post<CreateCommentResponse>(
    `${API_ENDPOINTS.comments}/post/${params.postId}`,
    payload,
  );

  return data;
}

export async function updateComment(
  params: UpdateCommentParams,
  payload: UpdateCommentRequest,
): Promise<UpdateCommentResponse> {
  const { data } = await apiClient.patch<UpdateCommentResponse>(
    `${API_ENDPOINTS.comments}/${params.commentId}`,
    payload,
  );

  return data;
}

export async function deleteComment(
  params: DeleteCommentParams,
): Promise<DeleteCommentResponse> {
  const { data } = await apiClient.delete<DeleteCommentResponse>(
    `${API_ENDPOINTS.comments}/${params.commentId}`,
  );

  return data;
}
