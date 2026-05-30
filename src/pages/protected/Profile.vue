<template>
  <header>Profile</header>
  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  console.log("Page: Profile");
});
</script>
