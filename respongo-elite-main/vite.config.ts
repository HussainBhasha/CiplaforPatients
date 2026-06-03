import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { port: 8080, host: true },
  build: { sourcemap: 'hidden' },
  plugins: [react(), tsconfigPaths()],
})
