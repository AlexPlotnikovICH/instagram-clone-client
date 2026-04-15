import { create } from 'zustand'
import api from '../api'

const getInitialUser = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

const useAuthStore = create(set => ({
  user: getInitialUser(),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (emailOrUsername, password) => {
    try {
      const response = await api.post('/auth/login', {
        email: emailOrUsername,
        password,
      })

      const { token, ...userData } = response.data

      if (!token) {
        throw new Error('Сервер не вернул токен')
      }

      // Теперь userData — это объект {_id, fullname, username, email}
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))

      set({ user: userData, token, isAuthenticated: true })

      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      console.error('Login Error:', errorMessage)
      return { success: false, error: errorMessage }
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

      // Отправляем запрос
      await api.post('/auth/register', payload)

      // Бэкенд токен не дает, поэтому мы просто возвращаем success
      // и пусть Register.jsx перекинет юзера на страницу логина
      return { success: true }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed'
      console.error('Register Error:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  // Функция для кнопки выхода
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false })
  },
  // Функция для обновления данных юзера в стейте (после редактирования профиля)
  updateUser: newUserData => {
    localStorage.setItem('user', JSON.stringify(newUserData))
    set({ user: newUserData })
  },
  // Функция счетчика подписок текущего юзера
  updateFollowingCount: isFollowing => {
    set(state => {
      if (!state.user) return state

      const updatedUser = {
        ...state.user,
        followingCount:
          (state.user.followingCount || 0) + (isFollowing ? 1 : -1),
      }

      localStorage.setItem('user', JSON.stringify(updatedUser))

      return { user: updatedUser }
    })
  },
}))

export default useAuthStore
