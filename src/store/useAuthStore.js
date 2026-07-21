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

      await api.post('/auth/register', payload)
      return { success: true }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed'
      console.error('Register Error:', errorMessage)
      return { success: false, error: errorMessage }
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false })
  },
  updateUser: newUserData => {
    localStorage.setItem('user', JSON.stringify(newUserData))
    set({ user: newUserData })
  },
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
