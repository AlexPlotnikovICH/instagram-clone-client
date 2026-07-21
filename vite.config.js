import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Local development server settings
  server: {
    // Hardcode the port
    port: 5173,
    // Configure a proxy to bypass CORS
    proxy: {
      // Intercept all requests starting with /api
      '/api': {
        // Redirect them to your backend
        target: 'http://localhost:3333',
        // Change the origin header so the server thinks the request is coming from itself
        changeOrigin: true,
      },
    },
  },
})
