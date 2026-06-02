<template>
  <section class="mx-auto flex w-full max-w-md flex-col gap-6 py-10">
    <div class="space-y-2 text-center">
      <h1 class="text-3xl font-semibold">Login</h1>
      <p class="text-base-content/70">Sign in to continue to your feed.</p>
    </div>

    <form class="card bg-base-100 border border-base-300 shadow-sm" @submit="onSubmit">
      <div class="card-body gap-4">
        <label class="form-control w-full gap-2">
          <span class="label-text font-medium">Username</span>
          <input
            v-model="username"
            type="text"
            class="input input-bordered w-full"
            placeholder="Enter your username"
            autocomplete="username"
          />
          <span v-if="usernameError" class="text-error text-sm">{{ usernameError }}</span>
        </label>

        <label class="form-control w-full gap-2">
          <span class="label-text font-medium">Password</span>
          <input
            v-model="password"
            type="password"
            class="input input-bordered w-full"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
          <span v-if="passwordError" class="text-error text-sm">{{ passwordError }}</span>
        </label>

        <div v-if="submitError" role="alert" class="alert alert-error alert-soft">
          <span>{{ submitError }}</span>
        </div>

        <button type="submit" class="btn btn-primary w-full" :disabled="pending">
          <span v-if="pending" class="loading loading-spinner loading-sm" />
          <span>{{ pending ? "Signing in..." : "Login" }}</span>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { useMutationLogin } from "@/queries/auth.query";

type LoginFormValues = {
  password: string;
  username: string;
};

const router = useRouter();

const { handleSubmit } = useForm<LoginFormValues>({
  initialValues: {
    username: "",
    password: "",
  },
});

const { value: username, errorMessage: usernameError } = useField<string>(
  "username",
  validateUsername,
);
const { value: password, errorMessage: passwordError } = useField<string>(
  "password",
  validatePassword,
);

const submitAlertMessage = ref<string>("");

const { error, mutateAsync, pending, reset } = useMutationLogin({
  onSuccess: async () => {
    submitAlertMessage.value = "";
    await router.replace("/p");
  },
  onError: (mutationError: unknown) => {
    submitAlertMessage.value = resolveLoginAlertMessage(mutationError);
  },
});

const submitError = computed<string>(() => {
  return submitAlertMessage.value || resolveLoginAlertMessage(error.value);
});

const onSubmit = handleSubmit(async (values: LoginFormValues) => {
  reset();
  submitAlertMessage.value = "";
  await mutateAsync(values);
});

function resolveLoginAlertMessage(error: unknown): string {
  if (!error) {
    return "";
  }

  if (typeof error === "object" && error !== null && "response" in error) {
    const response = Reflect.get(error, "response");

    if (typeof response === "object" && response !== null && "data" in response) {
      const data = Reflect.get(response, "data");

      if (typeof data === "object" && data !== null && "message" in data) {
        const responseMessage = Reflect.get(data, "message");

        if (typeof responseMessage === "string") {
          return responseMessage;
        }
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to login. Please try again.";
}

function validateUsername(value: string | undefined): true | string {
  if (!value?.trim()) {
    return "Username is required";
  }

  return true;
}

function validatePassword(value: string | undefined): true | string {
  if (!value?.trim()) {
    return "Password is required";
  }

  return true;
}
</script>
