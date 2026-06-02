<template>
  <section class="mx-auto flex w-full max-w-md flex-col gap-6 py-10">
    <div class="space-y-2 text-center">
      <h1 class="text-3xl font-semibold">Register</h1>
      <p class="text-base-content/70">Create your account to start sharing.</p>
    </div>

    <form class="card bg-base-100 border border-base-300 shadow-sm" @submit="onSubmit">
      <div class="card-body gap-4">
        <label class="form-control w-full gap-2">
          <span class="label-text font-medium">Username</span>
          <input
            v-model="username"
            type="text"
            class="input input-bordered w-full"
            placeholder="Choose a username"
            autocomplete="username"
          />
          <span v-if="usernameError" class="text-error text-sm">{{ usernameError }}</span>
        </label>

        <label class="form-control w-full gap-2">
          <span class="label-text font-medium">Email</span>
          <input
            v-model="email"
            type="email"
            class="input input-bordered w-full"
            placeholder="Enter your email"
            autocomplete="email"
          />
          <span v-if="emailError" class="text-error text-sm">{{ emailError }}</span>
        </label>

        <label class="form-control w-full gap-2">
          <span class="label-text font-medium">Password</span>
          <input
            v-model="password"
            type="password"
            class="input input-bordered w-full"
            placeholder="Create a password"
            autocomplete="new-password"
          />
          <span v-if="passwordError" class="text-error text-sm">{{ passwordError }}</span>
        </label>

        <div v-if="submitError" role="alert" class="alert alert-error alert-soft">
          <span>{{ submitError }}</span>
        </div>

        <button type="submit" class="btn btn-primary w-full" :disabled="pending">
          <span v-if="pending" class="loading loading-spinner loading-sm" />
          <span>{{ pending ? "Registering..." : "Register" }}</span>
        </button>

        <p class="text-base-content/70 text-center text-sm">
          Already have an account?
          <RouterLink to="/auth/login" class="link link-primary font-medium">Login</RouterLink>
        </p>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { useMutationRegister } from "@/queries/auth.query";
import type { RegisterRequest } from "@/types/dto/auth-request";

const router = useRouter();

const { handleSubmit } = useForm<RegisterRequest>({
  initialValues: {
    username: "",
    email: "",
    password: "",
    role: "USER",
  },
});

const { value: username, errorMessage: usernameError } = useField<string>(
  "username",
  validateUsername,
);
const { value: email, errorMessage: emailError } = useField<string>("email", validateEmail);
const { value: password, errorMessage: passwordError } = useField<string>(
  "password",
  validatePassword,
);

const submitAlertMessage = ref<string>("");

const { error, mutateAsync, pending, reset } = useMutationRegister({
  onSuccess: async () => {
    submitAlertMessage.value = "";
    await router.replace("/auth/login");
  },
  onError: (mutationError: unknown) => {
    submitAlertMessage.value = resolveRegisterAlertMessage(mutationError);
  },
});

const submitError = computed<string>(() => {
  return submitAlertMessage.value || resolveRegisterAlertMessage(error.value);
});

const onSubmit = handleSubmit(async (values: RegisterRequest) => {
  reset();
  submitAlertMessage.value = "";
  await mutateAsync({
    ...values,
    role: "USER",
  });
});

function resolveRegisterAlertMessage(error: unknown): string {
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

  return "Unable to register. Please try again.";
}

function validateUsername(value: string | undefined): true | string {
  if (!value?.trim()) {
    return "Username is required";
  }

  return true;
}

function validateEmail(value: string | undefined): true | string {
  if (!value?.trim()) {
    return "Email is required";
  }

  if (!/^\S+@\S+\.\S+$/.test(value)) {
    return "Email must be valid";
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
