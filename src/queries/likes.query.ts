import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { commentsKeys, postsKeys } from "@/queries/key-factory";
import {
  composeMutationHandlers,
  type MutationHookHandlers,
} from "@/queries/mutation-handlers";
import { likeComment, likePost } from "@/services/likes.service";
import type {
  LikeCommentParams,
  LikePostParams,
} from "@/types/dto/likes-request";
import type {
  LikeCommentResponse,
  LikePostResponse,
} from "@/types/dto/likes-response";

export function useMutationLikePost(
  handlers?: MutationHookHandlers<LikePostResponse, LikePostParams>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postsKeys.root() });
    },
  });
  const mutation = useMutation({
    mutationFn: (params: LikePostParams) => likePost(params),
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

export function useMutationLikeComment(
  handlers?: MutationHookHandlers<LikeCommentResponse, LikeCommentParams>,
) {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = composeMutationHandlers({
    handlers,
    internalOnSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: commentsKeys.root() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.root() }),
      ]);
    },
  });
  const mutation = useMutation({
    mutationFn: (params: LikeCommentParams) => likeComment(params),
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
