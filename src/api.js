import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api',
})

// перехватчик (interceptor) для запросов
api.interceptors.request.use(
  config => {
    // Пытаемся достать токен (пока мы договоримся хранить его в localStorage)
    const token = localStorage.getItem('token')

    // Если токен есть, пришиваем его к заголовкам
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default api
