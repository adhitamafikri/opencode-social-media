import { computed } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { bookmarksKeys, postsKeys } from "@/queries/key-factory";
import {
  composeMutationHandlers,
  type MutationHookHandlers,
} from "@/queries/mutation-handlers";
import { bookmarkPost, listBookmarks } from "@/services/bookmarks.service";
import type { PaginatedRequest } from "@/types/dto/base-request";
import type { BookmarkPostParams } from "@/types/dto/bookmarks-request";
import type { BookmarkPostResponse } from "@/types/dto/bookmarks-response";

type ListBookmarksQueryOptions = {
  enabled?: boolean;
  params?: PaginatedRequest;
};

export function useQueryGetBookmarks(options: ListBookmarksQueryOptions = {}) {
  const { enabled = true, params } = options;
  const query = useQuery({
    queryKey: bookmarksKeys.list(params),
    queryFn: () => listBookmarks(params),
    enabled,
  });

  const bookmarkedPosts = computed(() => query.data.value?.data.bookmarkedPosts ?? []);
  const totalBookmarkedPosts = computed(
    () => query.data.value?.data.totalBookmarkedPosts ?? 0,
  );
  const page = computed(() => query.data.value?.data.page ?? 1);
  const totalPages = computed(() => query.data.value?.data.totalPages ?? 0);
  const hasNextPage = computed(() => query.data.value?.data.hasNextPage ?? false);
  const hasPrevPage = computed(() => query.data.value?.data.hasPrevPage ?? false);
  const nextPage = computed(() => query.data.value?.data.nextPage ?? null);
  const prevPage = computed(() => query.data.value?.data.prevPage ?? null);
  const isEmpty = computed(() => bookmarkedPosts.value.length === 0);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    bookmarkedPosts,
    totalBookmarkedPosts,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    isEmpty,
  };
}

export function useMutationBookmarkPost(
  handlers?: MutationHookHandlers<BookmarkPostResponse, BookmarkPostParams>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: bookmarksKeys.root() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
      ]);
    },
  });
  const mutation = useMutation({
    mutationFn: (params: BookmarkPostParams) => bookmarkPost(params),
    onSuccess,
    onError,
  });

  return {
    data: mutation.data,
    pending: mutation.isPending,
    error: mutation.error,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    reset: mutation.reset,
  };
}
