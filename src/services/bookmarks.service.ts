import { apiClient } from "@/configs/axios.client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  BookmarkPostParams,
  ListBookmarksRequest,
} from "@/types/dto/bookmarks-request";
import type {
  BookmarkPostResponse,
  BookmarksResponse,
} from "@/types/dto/bookmarks-response";

export async function listBookmarks(
  params?: ListBookmarksRequest,
): Promise<BookmarksResponse> {
  const { data } = await apiClient.get<BookmarksResponse>(API_ENDPOINTS.bookmarks, {
    params,
  });

  return data;
}

export async function bookmarkPost(
  params: BookmarkPostParams,
): Promise<BookmarkPostResponse> {
  const { data } = await apiClient.post<BookmarkPostResponse>(
    `${API_ENDPOINTS.bookmarks}/${params.postId}`,
  );

  return data;
}
