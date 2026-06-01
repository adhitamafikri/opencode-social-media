import type { User } from "@/types/users";

export type CommentAuthorSummary = {
  _id: string;
  account: User;
  firstName: string;
  lastName: string;
};

export type CommentListItem = {
  __v: number;
  _id: string;
  author: CommentAuthorSummary;
  content: string;
  createdAt: string;
  isLiked: boolean;
  likes: number;
  postId: string;
  updatedAt: string;
};

export type CommentMutationItem = {
  __v: number;
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  postId: string;
  updatedAt: string;
};
