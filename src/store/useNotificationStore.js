import { create } from 'zustand'
import api from '../api'

const useNotificationStore = create((set, get) => ({
  notifications: [],
  hasUnread: false,

  // Получаем список при загрузке приложения или открытии шторки
  fetchNotifications: async () => {
    try {
      const res = await api.get('/notifications')
      const notifications = res.data

      // Ищем, есть ли хоть одно непрочитанное (isRead === false)
      const hasUnread = notifications.some(notif => !notif.isRead)

      set({ notifications, hasUnread })
    } catch (error) {
      console.error('Ошибка загрузки уведомлений:', error)
    }
  },

  // Гасим точку и отправляем запрос на бэкенд
  markAsRead: async () => {
    const { hasUnread } = get()

    // если непрочитанных нет, нечего дергать сервер
    if (!hasUnread) return

    try {
      // Отправляем запрос в фоне
      await api.put('/notifications/read')

      set({ hasUnread: false })
    } catch (error) {
      console.error('Ошибка при сбросе статуса:', error)
    }
  },
}))

export default useNotificationStore
