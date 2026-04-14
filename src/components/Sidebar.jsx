import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  LogOut,
} from 'lucide-react'
import logo from '../assets/icons/ICHGRAMlogo.svg'
import useAuthStore from '../store/useAuthStore'
import useNotificationStore from '../store/useNotificationStore' // <-- ИМПОРТ НОВОГО СТОРА

export default function Sidebar({
  onToggleDrawer,
  activeDrawer,
  onOpenCreate,
}) {
  const location = useLocation()
  const navigate = useNavigate()

  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)

  // Достаем методы и стейт из стора уведомлений
  const fetchNotifications = useNotificationStore(
    state => state.fetchNotifications,
  )
  const markAsRead = useNotificationStore(state => state.markAsRead)
  const hasUnread = useNotificationStore(state => state.hasUnread)

  // Запрашиваем статус уведомлений при загрузке сайдбара
  useEffect(() => {
    if (user) {
      fetchNotifications()
    }
  }, [user, fetchNotifications])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Search', action: () => onToggleDrawer('search'), icon: Search },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Messages', path: '/messages', icon: MessageCircle },
    {
      name: 'Notifications',
      action: () => {
        onToggleDrawer('notifications')
        markAsRead() // <-- ГАСИМ ТОЧКУ ПРИ КЛИКЕ
      },
      icon: Heart,
    },
    { name: 'Create', action: onOpenCreate, icon: PlusSquare },
    {
      name: 'Profile',
      path: '/profile',
      icon: user?.profile_image ? 'avatar' : User,
    },
  ]

  return (
    <div className='fixed left-0 top-0 flex h-screen w-[250px] flex-col border-r border-gray-300 bg-white px-3 py-8'>
      <Link to='/' className='mb-10 px-3'>
        <img src={logo} alt='ICHGRAM' className='w-28' />
      </Link>

      <nav className='flex flex-col gap-1 flex-1'>
        {menuItems.map(item => {
          const isActive = item.path
            ? location.pathname === item.path
            : activeDrawer === item.name.toLowerCase()

          const commonClasses = `flex items-center gap-4 rounded-md p-3 transition-colors hover:bg-gray-100 w-full text-left cursor-pointer relative ${
            isActive ? 'font-bold' : 'font-normal'
          }`

          const renderIcon = () => {
            if (item.name === 'Profile' && item.icon === 'avatar') {
              return (
                <img
                  src={user.profile_image}
                  alt='My profile'
                  className={`w-6 h-6 rounded-full object-cover border ${isActive ? 'border-black' : 'border-gray-200'}`}
                  onError={e => {
                    e.target.style.display = 'none'
                  }}
                />
              )
            }

            const Icon = item.icon
            return (
              <div className='relative'>
                <Icon
                  size={24}
                  strokeWidth={isActive ? 3.0 : 2}
                  fill={
                    isActive && item.name === 'Notifications'
                      ? 'currentColor'
                      : 'none'
                  }
                />
                {/* КРАСНАЯ ТОЧКА */}
                {item.name === 'Notifications' && hasUnread && (
                  <span className='absolute -top-1 -right-1 flex h-3 w-3'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white'></span>
                  </span>
                )}
              </div>
            )
          }

          const content = (
            <>
              {renderIcon()}
              <span className='text-[16px]'>{item.name}</span>
            </>
          )

          if (item.action) {
            return (
              <button
                key={item.name}
                onClick={item.action}
                className={commonClasses}
              >
                {content}
              </button>
            )
          }

          return (
            <Link key={item.name} to={item.path} className={commonClasses}>
              {content}
            </Link>
          )
        })}
      </nav>

      <button
        onClick={handleLogout}
        className='flex items-center gap-4 rounded-md p-3 transition-colors hover:bg-gray-100 w-full text-left cursor-pointer mt-auto text-gray-700 hover:text-red-500 hover:bg-red-50 group'
      >
        <LogOut size={24} className='group-hover:text-red-500' />
        <span className='text-[16px] font-normal'>Log out</span>
      </button>
    </div>
  )
}
