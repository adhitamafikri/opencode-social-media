import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 5173,
      host: env.VITE_APP_HOST || "localhost",
    },
  };
});
