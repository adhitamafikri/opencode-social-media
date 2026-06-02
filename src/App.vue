<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import { shallowRef, watch } from "vue";
import { RouterView } from "vue-router";
// import PublicLayout from "@/layouts/Public.vue";

// const route = useRoute();
// const layout = shallowRef(PublicLayout);

// const layouts: Record<"public" | "auth" | "primary", any> = {
//   public: PublicLayout,
//   auth: () => import("@/layouts/Auth.vue"),
//   primary: () => import("@/layouts/Primary.vue"),
// };

// watch(
//   () => route.meta.layout,
//   async (metaLayout) => {
//     try {
//       const component = layouts[metaLayout] || PublicLayout;
//       // Resolve lazy-loaded components if needed
//       layout.value =
//         typeof component === "function"
//           ? (await component()).default
//           : component;
//     } catch (e) {
//       layout.value = PublicLayout;
//     }
//   },
//   { immediate: true },
// );
</script>

<template>
  <!-- <HelloWorld /> -->
  <RouterView />
</template>
