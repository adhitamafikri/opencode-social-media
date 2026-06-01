<template>
  <header>Header</header>
  <main>
    <slot />
  </main>
  <footer>Footer</footer>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  console.log("Layout: Home");
});
</script>