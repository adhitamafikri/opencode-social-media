import type { MediaAsset, User } from "@/types/users";

export type PostAuthorProfile = {
  __v: number;
  _id: string;
  account: User;
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

export type Post = {
  __v: number;
  _id: string;
  author: PostAuthorProfile;
  comments: number;
  content: string;
  createdAt: string;
  images: MediaAsset[];
  isBookmarked: boolean;
  isLiked: boolean;
  likes: number;
  tags: string[];
  updatedAt: string;
};
