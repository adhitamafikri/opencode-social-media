<template>
  <ContentContainer>
    <RouterView />
  </ContentContainer>
  <Footer />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "@/components/Footer.vue";
import ContentContainer from "@/components/ContentContainer.vue";
</script>
