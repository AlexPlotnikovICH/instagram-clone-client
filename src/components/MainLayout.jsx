import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function MainLayout() {
  const [isNotifOpen, setIsNotifOpen] = useState(false)

  const toggleNotifications = () => {
    setIsNotifOpen(!isNotifOpen)
  }

  const dummyNotifications = [
    {
      id: 1,
      user: { username: 'sashaa', avatar: 'https://i.pravatar.cc/150?img=1' },
      action: 'liked your photo.',
      time: '2 d',
      postImage:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 2,
      user: { username: 'sashaa', avatar: 'https://i.pravatar.cc/150?img=1' },
      action: 'commented your photo.',
      time: '2 wek',
      postImage:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=150',
    },
    {
      id: 3,
      user: { username: 'sashaa', avatar: 'https://i.pravatar.cc/150?img=1' },
      action: 'started following.',
      time: '2 d',
      postImage:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=150',
    },
  ]

  return (
    <div className='flex bg-gray-50 min-h-screen'>
      {/* САЙДБАР */}
      <div className='z-50 relative'>
        <Sidebar onToggleNotif={toggleNotifications} />
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ (Лента) */}
      <main className='flex-1 ml-[250px]'>
        <Outlet />
      </main>

      {/* ТЕМНЫЙ ФОН */}
      {isNotifOpen && (
        <div
          className='fixed inset-0 bg-black/60 z-30 transition-opacity cursor-pointer'
          onClick={() => setIsNotifOpen(false)}
        ></div>
      )}

      {/* ШТОРКА */}
      <div
        className={`fixed top-0 left-[250px] h-screen w-[400px] bg-white z-40 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out overflow-y-auto ${
          isNotifOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-6'>Notifications</h2>
          <h3 className='font-bold text-[16px] mb-4'>New</h3>

          {/* СПИСОК УВЕДОМЛЕНИЙ */}
          <div className='flex flex-col gap-4'>
            {dummyNotifications.map(notif => (
              <div key={notif.id} className='flex items-center justify-between'>
                {/* Левая часть: Аватарка + Текст */}
                <div className='flex items-center gap-3'>
                  <img
                    src={notif.user.avatar}
                    alt={notif.user.username}
                    className='w-10 h-10 rounded-full object-cover border border-gray-100'
                  />
                  <div className='text-[14px] leading-tight max-w-[200px]'>
                    <span className='font-bold mr-1 cursor-pointer hover:text-gray-500'>
                      {notif.user.username}
                    </span>
                    <span className='text-gray-900'>{notif.action}</span>
                    <span className='text-gray-500 ml-1'>{notif.time}</span>
                  </div>
                </div>

                {/* Правая часть: Картинка */}
                <img
                  src={notif.postImage}
                  alt='post thumbnail'
                  className='w-10 h-10 rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
