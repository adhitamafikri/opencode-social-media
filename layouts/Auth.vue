<template>
  <header>Auth Layout</header>
  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  console.log("Layout: Auth");
});
</script>