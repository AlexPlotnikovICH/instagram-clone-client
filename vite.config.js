import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Настройки локального сервера для разработки
  server: {
    // Жестко фиксируем порт
    port: 5173,
    // Настраиваем прокси для обхода CORS
    proxy: {
      // Перехватываем все запросы, начинающиеся с /api
      '/api': {
        // Перенаправляем их на твой бэкенд
        target: 'http://localhost:3333',
        // Подменяем заголовок origin, чтобы сервер думал, что запрос пришел от него самого
        changeOrigin: true,
      },
    },
  },
})
