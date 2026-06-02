<template>
  <Header />
  <ContentContainer>
    <RouterView />
  </ContentContainer>
  <Footer />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ContentContainer from "@/components/ContentContainer.vue";
</script>
