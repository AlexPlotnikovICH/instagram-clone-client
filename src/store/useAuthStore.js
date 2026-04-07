import { create } from 'zustand'
import api from '../api/axios'

const useAuthStore = create(set => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (email, password) => {
    try {
      // POST-запрос, передаем почту и пароль
      const response = await api.post('/auth/login', { email, password })

      // Достаем токен из ответа
      const token = response.data.token

      // Сохраняем в память браузера
      localStorage.setItem('token', token)

      // Обновляем стейт Zustand
      set({ token: token, isAuthenticated: true })

      // сигнал компоненту - успешно
      return true
    } catch (error) {
      console.error(
        'Login Error:',
        error.response?.data?.message || error.message,
      )
      return false
    }
  },
  register: async userData => {
    try {
      const payload = {
        email: userData.email,
        username: userData.username,
        fullname: userData.fullName,
        password: userData.password,
      }

      await api.post('/auth/register', payload)

      return { success: true }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Ошибка при регистрации'
      console.error('Register Error:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },
}))

export default useAuthStore
