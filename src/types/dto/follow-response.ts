import type { FollowToggle } from "@/types/likes";
import type {
  FollowListSubjectUser,
  FollowListUser,
} from "@/types/users";
import type { BaseResponse, PaginationMeta } from "@/types/dto/base-response";

export type FollowersListData = PaginationMeta & {
  followers: FollowListUser[];
  totalFollowers: number;
  user: FollowListSubjectUser;
};

export type FollowingListData = PaginationMeta & {
  following: FollowListUser[];
  totalFollowing: number;
  user: FollowListSubjectUser;
};

export type FollowUserResponse = BaseResponse<FollowToggle>;

export type FollowersResponse = BaseResponse<FollowersListData>;

export type FollowingResponse = BaseResponse<FollowingListData>;
