import { computed } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { commentsKeys, postsKeys } from "@/queries/key-factory";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
  updateComment,
} from "@/services/comments.service";
import type { PaginatedRequest } from "@/types/dto/base-request";
import type {
  CreateCommentParams,
  CreateCommentRequest,
  DeleteCommentParams,
  GetCommentsByPostParams,
  UpdateCommentParams,
  UpdateCommentRequest,
} from "@/types/dto/comments-request";

type GetCommentsByPostQueryOptions = {
  enabled?: boolean;
  params?: PaginatedRequest;
  postId: string;
};

type CreateCommentMutationVariables = {
  params: CreateCommentParams;
  payload: CreateCommentRequest;
};

type UpdateCommentMutationVariables = {
  params: UpdateCommentParams;
  payload: UpdateCommentRequest;
};

export function useQueryGetCommentsByPost(
  options: GetCommentsByPostQueryOptions,
) {
  const params: GetCommentsByPostParams = {
    postId: options.postId,
    ...(options.params ?? {}),
  };
  const query = useQuery({
    queryKey: commentsKeys.byPostId(options.postId, options.params),
    queryFn: () => getCommentsByPost(params),
    enabled: options.enabled ?? true,
  });

  const comments = computed(() => query.data.value?.data.comments ?? []);
  const totalComments = computed(() => query.data.value?.data.totalComments ?? 0);
  const page = computed(() => query.data.value?.data.page ?? 1);
  const totalPages = computed(() => query.data.value?.data.totalPages ?? 0);
  const hasNextPage = computed(() => query.data.value?.data.hasNextPage ?? false);
  const hasPrevPage = computed(() => query.data.value?.data.hasPrevPage ?? false);
  const nextPage = computed(() => query.data.value?.data.nextPage ?? null);
  const prevPage = computed(() => query.data.value?.data.prevPage ?? null);
  const isEmpty = computed(() => comments.value.length === 0);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    comments,
    totalComments,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    isEmpty,
  };
}

export function useMutationCreateComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ params, payload }: CreateCommentMutationVariables) =>
      createComment(params, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: commentsKeys.root() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
      ]);
    },
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

export function useMutationUpdateComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ params, payload }: UpdateCommentMutationVariables) =>
      updateComment(params, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: commentsKeys.root() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
      ]);
    },
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

export function useMutationDeleteComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (params: DeleteCommentParams) => deleteComment(params),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: commentsKeys.root() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
      ]);
    },
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
