import { apiClient } from "@/configs/axios.client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  FollowersListParams,
  FollowingListParams,
  FollowUserParams,
} from "@/types/dto/follow-request";
import type {
  FollowersResponse,
  FollowingResponse,
  FollowUserResponse,
} from "@/types/dto/follow-response";

export async function followUser(
  params: FollowUserParams,
): Promise<FollowUserResponse> {
  const { data } = await apiClient.post<FollowUserResponse>(
    `${API_ENDPOINTS.follow}/${params.toBeFollowedUserId}`,
  );

  return data;
}

export async function listFollowers(
  params: FollowersListParams,
): Promise<FollowersResponse> {
  const { username, ...query } = params;
  const { data } = await apiClient.get<FollowersResponse>(
    `${API_ENDPOINTS.follow}/list/followers/${username}`,
    {
      params: query,
    },
  );

  return data;
}

export async function listFollowing(
  params: FollowingListParams,
): Promise<FollowingResponse> {
  const { username, ...query } = params;
  const { data } = await apiClient.get<FollowingResponse>(
    `${API_ENDPOINTS.follow}/list/following/${username}`,
    {
      params: query,
    },
  );

  return data;
}
