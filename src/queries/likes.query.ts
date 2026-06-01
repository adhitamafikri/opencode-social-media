import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { commentsKeys, postsKeys } from "@/queries/key-factory";
import { likeComment, likePost } from "@/services/likes.service";
import type {
  LikeCommentParams,
  LikePostParams,
} from "@/types/dto/likes-request";

export function useMutationLikePost() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (params: LikePostParams) => likePost(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postsKeys.root() });
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

export function useMutationLikeComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (params: LikeCommentParams) => likeComment(params),
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
