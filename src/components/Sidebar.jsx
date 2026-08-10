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
  Sparkles,
} from 'lucide-react'
import logo from '../assets/icons/ICHGRAMlogo.svg'
import useAuthStore from '../store/useAuthStore'
import useNotificationStore from '../store/useNotificationStore'

export default function Sidebar({
  onToggleDrawer,
  activeDrawer,
  onOpenCreate,
}) {
  const location = useLocation()
  const navigate = useNavigate()

  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)

  const fetchNotifications = useNotificationStore(
    state => state.fetchNotifications,
  )
  const hasUnread = useNotificationStore(state => state.hasUnread)

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
    { name: 'AI Assistant', path: '/ai-assistant', icon: Sparkles },
    {
      name: 'Notifications',
      action: () => {
        onToggleDrawer('notifications')
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
    <div className='fixed bottom-0 left-0 z-50 flex w-full flex-row items-center justify-around border-t border-gray-200 bg-white px-2 py-2 md:top-0 md:h-screen md:w-[80px] md:flex-col md:justify-start md:border-r md:border-t-0 md:px-3 md:py-8 lg:w-[250px]'>
      
      {/* Логотип: скрываем на мобилках, показываем сокращенно на планшетах, полностью на десктопе */}
      <Link to='/' className='hidden md:flex mb-10 px-0 lg:px-3 justify-center lg:justify-start'>
        <img src={logo} alt='ICHGRAM' className='hidden lg:block w-28' />
        <span className='block lg:hidden font-bold text-2xl italic'>IG</span>
      </Link>

      <nav className='flex flex-row w-full justify-around md:flex-col md:gap-1 md:flex-1'>
        {menuItems.map(item => {
          const isActive = item.path
            ? location.pathname === item.path
            : activeDrawer === item.name.toLowerCase()

          // Классы подстраиваются под мобилки (justify-center, w-auto) и десктоп (lg:justify-start, w-full)
          const commonClasses = `flex items-center justify-center lg:justify-start gap-4 rounded-md p-3 transition-colors hover:bg-gray-100 w-auto md:w-full text-left cursor-pointer relative ${
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
                {/* RED DOT */}
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
              {/* Текст скрыт на мобилках и планшетах, виден только на десктопе */}
              <span className='hidden lg:block text-[16px]'>{item.name}</span>
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
        className='hidden md:flex items-center justify-center lg:justify-start gap-4 rounded-md p-3 transition-colors hover:bg-gray-100 w-full text-left cursor-pointer mt-auto text-gray-700 hover:text-red-500 hover:bg-red-50 group'
      >
        <LogOut size={24} className='group-hover:text-red-500' />
        <span className='hidden lg:block text-[16px] font-normal'>Log out</span>
      </button>
    </div>
  )
}
