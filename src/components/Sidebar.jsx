import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
} from 'lucide-react'
import logo from '../assets/icons/ICHGRAMlogo.svg'

// Добавили activeDrawer в пропсы
export default function Sidebar({ onToggleDrawer, activeDrawer }) {
  const location = useLocation()

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Search', action: () => onToggleDrawer('search'), icon: Search },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Messages', path: '/messages', icon: MessageCircle },
    {
      name: 'Notifications',
      action: () => onToggleDrawer('notifications'),
      icon: Heart,
    },
    { name: 'Create', path: '/create', icon: PlusSquare },
    { name: 'Profile', path: '/profile', icon: User },
  ]

  return (
    <div className='fixed left-0 top-0 flex h-screen w-[250px] flex-col border-r border-gray-300 bg-white px-3 py-8'>
      <Link to='/' className='mb-10 px-3'>
        <img src={logo} alt='ICHGRAM' className='w-28' />
      </Link>

      <nav className='flex flex-col gap-1'>
        {menuItems.map(item => {
          const Icon = item.icon

          //  активен по URL ИЛИ активен по открытой шторке
          const isActive = item.path
            ? location.pathname === item.path
            : activeDrawer === item.name.toLowerCase()

          const commonClasses = `flex items-center gap-4 rounded-md p-3 transition-colors hover:bg-gray-100 w-full text-left cursor-pointer ${
            isActive ? 'font-bold' : 'font-normal'
          }`

          const content = (
            <>
              <Icon
                size={24}
                // Оставляем жирность для акцента
                strokeWidth={isActive ? 3.0 : 2}
                fill={
                  isActive && item.name === 'Notifications'
                    ? 'currentColor'
                    : 'none'
                }
              />
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
    </div>
  )
}
