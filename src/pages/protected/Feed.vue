<template>
  <header>Feed</header>
  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  console.log("Page: Feed");
});
</script>
