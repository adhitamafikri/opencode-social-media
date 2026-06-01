import { apiClient } from "@/configs/axios.client";
import { API_ENDPOINTS } from "@/configs/api";
import type { PaginatedRequest } from "@/types/dto/base-request";
import type {
  CreatePostRequest,
  DeletePostParams,
  GetPostByIdParams,
  GetPostsByUsernameParams,
  ListPostsRequest,
  UpdatePostRequest,
} from "@/types/dto/posts-request";
import type {
  CreatePostResponse,
  DeletePostResponse,
  MyPostsResponse,
  PostListResponse,
  PostResponse,
  PostsByUsernameResponse,
  UpdatePostResponse,
} from "@/types/dto/posts-response";

function buildPostFormData(payload: CreatePostRequest | UpdatePostRequest): FormData {
  const formData = new FormData();

  if (payload.content !== undefined) {
    formData.append("content", payload.content);
  }

  payload.tags?.forEach((tag, index) => {
    formData.append(`tags[${index}]`, tag);
  });

  payload.images?.forEach((image) => {
    formData.append("images", image);
  });

  return formData;
}

export async function listPosts(
  params?: ListPostsRequest,
): Promise<PostListResponse> {
  const { data } = await apiClient.get<PostListResponse>(API_ENDPOINTS.posts, {
    params,
  });

  return data;
}

export async function createPost(
  payload: CreatePostRequest,
): Promise<CreatePostResponse> {
  const formData = buildPostFormData(payload);
  const { data } = await apiClient.post<CreatePostResponse>(
    API_ENDPOINTS.posts,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}

export async function getPostById(
  params: GetPostByIdParams,
): Promise<PostResponse> {
  const { data } = await apiClient.get<PostResponse>(
    `${API_ENDPOINTS.posts}/${params.postId}`,
  );

  return data;
}

export async function updatePost(
  params: GetPostByIdParams,
  payload: UpdatePostRequest,
): Promise<UpdatePostResponse> {
  const formData = buildPostFormData(payload);
  const { data } = await apiClient.patch<UpdatePostResponse>(
    `${API_ENDPOINTS.posts}/${params.postId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}

export async function deletePost(
  params: DeletePostParams,
): Promise<DeletePostResponse> {
  const { data } = await apiClient.delete<DeletePostResponse>(
    `${API_ENDPOINTS.posts}/${params.postId}`,
  );

  return data;
}

export async function listMyPosts(
  params?: PaginatedRequest,
): Promise<MyPostsResponse> {
  const { data } = await apiClient.get<MyPostsResponse>(
    `${API_ENDPOINTS.posts}/get/my`,
    {
      params,
    },
  );

  return data;
}

export async function listPostsByUsername(
  params: GetPostsByUsernameParams,
): Promise<PostsByUsernameResponse> {
  const { username, ...query } = params;
  const { data } = await apiClient.get<PostsByUsernameResponse>(
    `${API_ENDPOINTS.posts}/get/u/${username}`,
    {
      params: query,
    },
  );

  return data;
}
