import type { PaginatedRequest } from "@/types/dto/base-request";

export type ListBookmarksRequest = PaginatedRequest;

export type BookmarkPostParams = {
  postId: string;
};
