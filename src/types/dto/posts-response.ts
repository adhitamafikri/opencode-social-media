import type { Post } from "@/types/posts";
import type { BaseResponse, PaginatedResponse } from "@/types/dto/base-response";

export type PostListResponse = PaginatedResponse<"posts", "totalPosts", Post>;

export type PostResponse = BaseResponse<Post>;

export type CreatePostResponse = BaseResponse<Post>;

export type UpdatePostResponse = BaseResponse<Post>;

export type DeletePostResponse = BaseResponse<Record<string, never>>;

export type MyPostsResponse = PaginatedResponse<"posts", "totalPosts", Post>;

export type PostsByUsernameResponse = PaginatedResponse<"posts", "totalPosts", Post>;
