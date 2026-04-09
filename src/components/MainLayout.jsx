import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function MainLayout() {
  return (
    // Главный контейнер на весь экран
    <div className='flex min-h-screen w-full bg-gray-50'>
      {/* левое меню (оно fixed, ширина 250px) */}
      <Sidebar />

      {/* Правая динамическая часть */}
      {/* ml-[250px] - костыль чтобы контент не уехал под меню */}
      <div className='flex w-full flex-1 flex-col ml-[250px]'>
        <Outlet />
      </div>
    </div>
  )
}
