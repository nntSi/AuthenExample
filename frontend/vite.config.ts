import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: { usePolling: true },
    host: true,
    strictPort: true,
    port: 80,
  },
  plugins: [react()],
});
