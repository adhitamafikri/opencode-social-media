import type { PaginatedRequest } from "@/types/dto/base-request";

export type FollowUserParams = {
  toBeFollowedUserId: string;
};

export type FollowersListParams = PaginatedRequest & {
  username: string;
};

export type FollowingListParams = PaginatedRequest & {
  username: string;
};
