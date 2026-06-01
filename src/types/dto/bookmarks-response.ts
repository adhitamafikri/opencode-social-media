import type { BookmarkToggle } from "@/types/likes";
import type { Post } from "@/types/posts";
import type { BaseResponse, PaginatedResponse } from "@/types/dto/base-response";

export type BookmarksResponse = PaginatedResponse<
  "bookmarkedPosts",
  "totalBookmarkedPosts",
  Post
>;

export type BookmarkPostResponse = BaseResponse<BookmarkToggle>;
