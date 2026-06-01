import { apiClient } from "@/configs/axios.client";
import { API_ENDPOINTS } from "@/configs/api";
import type {
  GetProfileByUsernameParams,
  UpdateProfileRequest,
} from "@/types/dto/profile-request";
import type {
  MyProfileResponse,
  ProfileByUsernameResponse,
  UpdateProfileResponse,
} from "@/types/dto/profile-response";

export async function getMyProfile(): Promise<MyProfileResponse> {
  const { data } = await apiClient.get<MyProfileResponse>(API_ENDPOINTS.profile);

  return data;
}

export async function updateProfile(
  payload: UpdateProfileRequest,
): Promise<UpdateProfileResponse> {
  const { data } = await apiClient.patch<UpdateProfileResponse>(
    API_ENDPOINTS.profile,
    payload,
  );

  return data;
}

export async function getProfileByUsername(
  params: GetProfileByUsernameParams,
): Promise<ProfileByUsernameResponse> {
  const { data } = await apiClient.get<ProfileByUsernameResponse>(
    `${API_ENDPOINTS.profile}/u/${params.username}`,
  );

  return data;
}
