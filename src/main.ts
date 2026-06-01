import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { router } from "@/router";
import "./style.css";
import App from "./App.vue";

createApp(App)
  .use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes TTL
          retry: 3,
          refetchOnWindowFocus: true,
        },
      },
    },
  })
  .use(router)
  .mount("#app");
