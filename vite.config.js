import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import config from "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://mnogo-sushi-server.vercel.app",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
