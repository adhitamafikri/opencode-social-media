import type { PaginatedRequest } from "@/types/dto/base-request";

export type ListPostsRequest = PaginatedRequest;

export type GetPostByIdParams = {
  postId: string;
};

export type GetPostsByUsernameParams = PaginatedRequest & {
  username: string;
};

export type CreatePostRequest = {
  content?: string;
  tags?: string[];
  images?: File[];
};

export type UpdatePostRequest = {
  content?: string;
  tags?: string[];
  images?: File[];
};

export type DeletePostParams = {
  postId: string;
};
