export type MediaAsset = {
  _id: string;
  localPath: string;
  url: string;
};

export type AuthUser = {
  __v: number;
  _id: string;
  avatar: MediaAsset;
  createdAt: string;
  email: string;
  isEmailVerified: boolean;
  loginType: string;
  role: string;
  updatedAt: string;
  username: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AvatarUpdateUser = AuthUser & {
  emailVerificationExpiry: string;
  emailVerificationToken: string;
  password: string;
  refreshToken: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  avatar: MediaAsset;
  isEmailVerified?: boolean;
  loginType?: string;
  role?: string;
};

export type Profile = {
  __v: number;
  _id: string;
  account: User;
  bio: string;
  countryCode: string;
  coverImage: MediaAsset;
  createdAt: string;
  dob: string;
  firstName: string;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  lastName: string;
  location: string;
  owner: string;
  phoneNumber: string;
  updatedAt: string;
};

export type FollowListUserProfile = {
  __v: number;
  _id: string;
  bio: string;
  countryCode: string;
  coverImage: MediaAsset;
  createdAt: string;
  dob: string;
  firstName: string;
  lastName: string;
  location: string;
  owner: string;
  phoneNumber: string;
  updatedAt: string;
};

export type FollowListUser = {
  _id: string;
  avatar: MediaAsset;
  email: string;
  isFollowing: boolean;
  profile: FollowListUserProfile;
  username: string;
};

export type FollowListSubjectProfile = {
  _id: string;
  bio: string;
  countryCode: string;
  coverImage: MediaAsset;
  firstName: string;
  lastName: string;
  location: string;
  phoneNumber: string;
};

export type FollowListSubjectUser = {
  _id: string;
  avatar: MediaAsset;
  email: string;
  isEmailVerified: boolean;
  profile: FollowListSubjectProfile;
  username: string;
};
