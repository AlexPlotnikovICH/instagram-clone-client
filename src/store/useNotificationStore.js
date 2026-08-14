import { create } from 'zustand'
import api from '../api'

const useNotificationStore = create((set, get) => ({
  notifications: [],
  hasUnread: false,

  fetchNotifications: async () => {
    try {
      const res = await api.get('/notifications')
      const notifications = res.data
      const hasUnread = notifications.some(notif => !notif.isRead)

      set({ notifications, hasUnread })
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  },

  markAsRead: async () => {
    const { hasUnread } = get()
    if (!hasUnread) return

    try {
      await api.put('/notifications/read')

      set({ hasUnread: false })
    } catch (error) {
      console.error('Error marking notifications as read:', error)
    }
  },
}))

export default useNotificationStore