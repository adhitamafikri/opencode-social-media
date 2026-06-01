import type {
  CommentListItem,
  CommentMutationItem,
} from "@/types/comments";
import type { BaseResponse, PaginatedResponse } from "@/types/dto/base-response";

export type CommentsByPostResponse = PaginatedResponse<
  "comments",
  "totalComments",
  CommentListItem
>;

export type CreateCommentResponse = BaseResponse<CommentMutationItem>;

// Mirrors the upstream OpenAPI schema even though the key looks like a docs bug.
export type UpdateCommentResponse = BaseResponse<{
  deletedComment: CommentMutationItem;
}>;

export type DeleteCommentResponse = BaseResponse<{
  deletedComment: CommentMutationItem;
}>;
