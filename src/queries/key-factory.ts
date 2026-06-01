type ListParams = {
  page?: number;
  limit?: number;
};

export const usersKeys = {
  currentUser: () => ['users', 'current-user'] as const,
} as const;

export const profileKeys = {
  me: () => ['profile', 'me'] as const,
  byUsername: (username: string) => ['profile', 'byUsername', username] as const,
} as const;

export const postsKeys = {
  list: (params?: ListParams) => ['posts', params ?? {}] as const,
  byId: (postId: string) => ['posts', 'byId', postId] as const,
  myPosts: (params?: ListParams) => ['posts', 'myPosts', params ?? {}] as const,
  byUsername: (username: string, params?: ListParams) =>
    ['posts', 'byUsername', username, params ?? {}] as const,
} as const;

export const commentsKeys = {
  byPostId: (postId: string, params?: ListParams) =>
    ['comments', 'byPostId', postId, params ?? {}] as const,
} as const;

export const likesKeys = {} as const;

export const bookmarksKeys = {
  list: (params?: ListParams) => ['bookmarks', params ?? {}] as const,
} as const;

export const followKeys = {
  followers: (username: string, params?: ListParams) =>
    ['follow', 'followers', username, params ?? {}] as const,
  following: (username: string, params?: ListParams) =>
    ['follow', 'following', username, params ?? {}] as const,
} as const;

export const queryKeys = {
  users: usersKeys,
  profile: profileKeys,
  posts: postsKeys,
  comments: commentsKeys,
  bookmarks: bookmarksKeys,
  follow: followKeys,
} as const;
