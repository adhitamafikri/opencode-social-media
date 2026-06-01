import type { PaginatedRequest } from "@/types/dto/base-request";

export type GetCommentsByPostParams = PaginatedRequest & {
  postId: string;
};

export type CreateCommentParams = {
  postId: string;
};

export type CreateCommentRequest = {
  content: string;
};

export type UpdateCommentParams = {
  commentId: string;
};

export type UpdateCommentRequest = {
  content: string;
};

export type DeleteCommentParams = {
  commentId: string;
};
