import type { MutationOptions } from "@tanstack/vue-query";

type MutationOnSuccess<
  TData,
  TVariables,
  TError = Error,
  TOnMutateResult = unknown,
> = NonNullable<
  MutationOptions<TData, TError, TVariables, TOnMutateResult>["onSuccess"]
>;

type MutationOnError<
  TData,
  TVariables,
  TError = Error,
  TOnMutateResult = unknown,
> = NonNullable<
  MutationOptions<TData, TError, TVariables, TOnMutateResult>["onError"]
>;

export type MutationHookHandlers<
  TData,
  TVariables,
  TError = Error,
  TOnMutateResult = unknown,
> = {
  onSuccess?: MutationOptions<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >["onSuccess"];
  onError?: MutationOptions<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >["onError"];
};

type ComposeMutationHandlersOptions<
  TData,
  TVariables,
  TError = Error,
  TOnMutateResult = unknown,
> = {
  handlers?: MutationHookHandlers<TData, TVariables, TError, TOnMutateResult>;
  internalOnSuccess?: MutationOnSuccess<TData, TVariables, TError, TOnMutateResult>;
  internalOnError?: MutationOnError<TData, TVariables, TError, TOnMutateResult>;
};

export function composeMutationHandlers<
  TData,
  TVariables,
  TError = Error,
  TOnMutateResult = unknown,
>(options: ComposeMutationHandlersOptions<TData, TVariables, TError, TOnMutateResult>) {
  const { handlers, internalOnSuccess, internalOnError } = options;

  async function onSuccess(
    ...args: Parameters<MutationOnSuccess<TData, TVariables, TError, TOnMutateResult>>
  ): Promise<void> {
    if (internalOnSuccess) {
      await internalOnSuccess(...args);
    }

    if (handlers?.onSuccess) {
      await handlers.onSuccess(...args);
    }
  }

  async function onError(
    ...args: Parameters<MutationOnError<TData, TVariables, TError, TOnMutateResult>>
  ): Promise<void> {
    if (internalOnError) {
      await internalOnError(...args);
    }

    if (handlers?.onError) {
      await handlers.onError(...args);
    }
  }

  return {
    onSuccess: internalOnSuccess || handlers?.onSuccess ? onSuccess : undefined,
    onError: internalOnError || handlers?.onError ? onError : undefined,
  };
}
