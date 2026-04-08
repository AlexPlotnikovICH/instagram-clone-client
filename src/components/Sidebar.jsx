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

export default function Sidebar() {
  // Хук useLocation знает, на каком адресе (URL) мы сейчас находимся
  const location = useLocation()

  // Массив настроек меню.
  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Messages', path: '/messages', icon: MessageCircle },
    { name: 'Notifications', path: '/notifications', icon: Heart },
    { name: 'Create', path: '/create', icon: PlusSquare },
    { name: 'Profile', path: '/profile', icon: User },
  ]

  return (
    // fixed меню к левому краю. h-screen - высота на весь экран.
    <div className='fixed left-0 top-0 flex h-screen w-[250px] flex-col border-r border-gray-300 bg-white px-3 py-8'>
      {/* Логотип-ссылка на главную */}
      <Link to='/' className='mb-10 px-3'>
        <img src={logo} alt='ICHGRAM' className='w-28' />
      </Link>

      {/* Навигация */}
      <nav className='flex flex-col gap-1'>
        {menuItems.map(item => {
          const Icon = item.icon
          // совпадает ли путь кнопки с текущим URL браузера
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.name}
              to={item.path}
              // Если активно - делаем шрифт жирным. hover - подсветка при наведении.
              className={`flex items-center gap-4 rounded-md p-3 transition-colors hover:bg-gray-100 ${
                isActive ? 'font-bold' : 'font-normal'
              }`}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span className='text-[16px]'>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
