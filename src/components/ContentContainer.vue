<template>
  <main>
    <slot />
  </main>
</template>

<style scoped>
@reference "../style.css";

main {
  @apply w-full p-4 min-h-screen;
}
</style>
