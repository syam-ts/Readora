import { defineConfig } from 'vite'
import path from "path" 
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react"
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
  },
})