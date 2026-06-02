import { computed } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { postsKeys } from "@/queries/key-factory";
import {
  composeMutationHandlers,
  type MutationHookHandlers,
} from "@/queries/mutation-handlers";
import {
  createPost,
  deletePost,
  getPostById,
  listMyPosts,
  listPosts,
  listPostsByUsername,
  updatePost,
} from "@/services/posts.service";
import type { PaginatedRequest } from "@/types/dto/base-request";
import type {
  CreatePostRequest,
  DeletePostParams,
  GetPostByIdParams,
  GetPostsByUsernameParams,
  UpdatePostRequest,
} from "@/types/dto/posts-request";
import type {
  CreatePostResponse,
  DeletePostResponse,
  UpdatePostResponse,
} from "@/types/dto/posts-response";

type EnabledListQueryOptions = {
  enabled?: boolean;
  params?: PaginatedRequest;
};

type GetPostByIdQueryOptions = {
  enabled?: boolean;
  postId: string;
};

type GetPostsByUsernameQueryOptions = {
  enabled?: boolean;
  params?: PaginatedRequest;
  username: string;
};

type UpdatePostMutationVariables = {
  params: GetPostByIdParams;
  payload: UpdatePostRequest;
};

export function useQueryGetPosts(options: EnabledListQueryOptions = {}) {
  const { enabled = true, params } = options;
  const query = useQuery({
    queryKey: postsKeys.list(params),
    queryFn: () => listPosts(params),
    enabled,
  });

  const posts = computed(() => query.data.value?.data.posts ?? []);
  const totalPosts = computed(() => query.data.value?.data.totalPosts ?? 0);
  const page = computed(() => query.data.value?.data.page ?? 1);
  const totalPages = computed(() => query.data.value?.data.totalPages ?? 0);
  const hasNextPage = computed(() => query.data.value?.data.hasNextPage ?? false);
  const hasPrevPage = computed(() => query.data.value?.data.hasPrevPage ?? false);
  const nextPage = computed(() => query.data.value?.data.nextPage ?? null);
  const prevPage = computed(() => query.data.value?.data.prevPage ?? null);
  const isEmpty = computed(() => posts.value.length === 0);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    posts,
    totalPosts,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    isEmpty,
  };
}

export function useQueryGetPostById(options: GetPostByIdQueryOptions) {
  const query = useQuery({
    queryKey: postsKeys.byId(options.postId),
    queryFn: () => getPostById({ postId: options.postId }),
    enabled: options.enabled ?? true,
  });

  const post = computed(() => query.data.value?.data ?? null);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    post,
  };
}

export function useQueryGetMyPosts(options: EnabledListQueryOptions = {}) {
  const { enabled = true, params } = options;
  const query = useQuery({
    queryKey: postsKeys.myPosts(params),
    queryFn: () => listMyPosts(params),
    enabled,
  });

  const posts = computed(() => query.data.value?.data.posts ?? []);
  const totalPosts = computed(() => query.data.value?.data.totalPosts ?? 0);
  const page = computed(() => query.data.value?.data.page ?? 1);
  const totalPages = computed(() => query.data.value?.data.totalPages ?? 0);
  const hasNextPage = computed(() => query.data.value?.data.hasNextPage ?? false);
  const hasPrevPage = computed(() => query.data.value?.data.hasPrevPage ?? false);
  const nextPage = computed(() => query.data.value?.data.nextPage ?? null);
  const prevPage = computed(() => query.data.value?.data.prevPage ?? null);
  const isEmpty = computed(() => posts.value.length === 0);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    posts,
    totalPosts,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    isEmpty,
  };
}

export function useQueryGetPostsByUsername(
  options: GetPostsByUsernameQueryOptions,
) {
  const params: GetPostsByUsernameParams = {
    username: options.username,
    ...(options.params ?? {}),
  };
  const query = useQuery({
    queryKey: postsKeys.byUsername(options.username, options.params),
    queryFn: () => listPostsByUsername(params),
    enabled: options.enabled ?? true,
  });

  const posts = computed(() => query.data.value?.data.posts ?? []);
  const totalPosts = computed(() => query.data.value?.data.totalPosts ?? 0);
  const page = computed(() => query.data.value?.data.page ?? 1);
  const totalPages = computed(() => query.data.value?.data.totalPages ?? 0);
  const hasNextPage = computed(() => query.data.value?.data.hasNextPage ?? false);
  const hasPrevPage = computed(() => query.data.value?.data.hasPrevPage ?? false);
  const nextPage = computed(() => query.data.value?.data.nextPage ?? null);
  const prevPage = computed(() => query.data.value?.data.prevPage ?? null);
  const isEmpty = computed(() => posts.value.length === 0);

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    posts,
    totalPosts,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    isEmpty,
  };
}

export function useMutationCreatePost(
  handlers?: MutationHookHandlers<CreatePostResponse, CreatePostRequest>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postsKeys.root() });
    },
  });
  const mutation = useMutation({
    mutationFn: (payload: CreatePostRequest) => createPost(payload),
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

export function useMutationUpdatePost(
  handlers?: MutationHookHandlers<UpdatePostResponse, UpdatePostMutationVariables>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async (
      _: UpdatePostResponse,
      variables: UpdatePostMutationVariables,
    ) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.byId(variables.params.postId) }),
      ]);
    },
  });
  const mutation = useMutation({
    mutationFn: ({ params, payload }: UpdatePostMutationVariables) =>
      updatePost(params, payload),
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

export function useMutationDeletePost(
  handlers?: MutationHookHandlers<DeletePostResponse, DeletePostParams>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async (
      _: DeletePostResponse,
      variables: DeletePostParams,
    ) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.byId(variables.postId) }),
      ]);
    },
  });
  const mutation = useMutation({
    mutationFn: (params: DeletePostParams) => deletePost(params),
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
