export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
  profile: `${API_BASE_URL}/social-media/profile`,
  posts: `${API_BASE_URL}/social-media/posts`,
  comments: `${API_BASE_URL}/social-media/comments`,
  likes: `${API_BASE_URL}/social-media/like`,
  bookmarks: `${API_BASE_URL}/social-media/bookmarks`,
  follow: `${API_BASE_URL}/social-media/follow`,
};
