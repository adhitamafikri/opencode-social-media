import { apiClient } from "@/configs/axios.client";
import { API_ENDPOINTS } from "@/configs/api";
import type { UpdateAvatarRequest } from "@/types/dto/users-request";
import type {
  CurrentUserResponse,
  UpdateAvatarResponse,
} from "@/types/dto/users-response";

function buildAvatarFormData(payload: UpdateAvatarRequest): FormData {
  const formData = new FormData();

  formData.append("avatar", payload.avatar);

  return formData;
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const { data } = await apiClient.get<CurrentUserResponse>(
    `${API_ENDPOINTS.users}/current-user`,
  );

  return data;
}

export async function updateAvatar(
  payload: UpdateAvatarRequest,
): Promise<UpdateAvatarResponse> {
  const formData = buildAvatarFormData(payload);
  const { data } = await apiClient.patch<UpdateAvatarResponse>(
    `${API_ENDPOINTS.users}/avatar`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}
