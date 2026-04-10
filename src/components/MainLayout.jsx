import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Search, X } from 'lucide-react' // <-- ДОБАВИЛИ ИКОНКИ
import Sidebar from './Sidebar'

export default function MainLayout() {
  // что б испольтзовать только 1 шторку сбоку ---
  const [activeDrawer, setActiveDrawer] = useState(null)

  const toggleDrawer = drawerName => {
    if (activeDrawer === drawerName) {
      setActiveDrawer(null)
    } else {
      setActiveDrawer(drawerName)
    }
  }

  // логика поисковика
  // Стейт для хранения того, что вводит юзер
  const [searchQuery, setSearchQuery] = useState('')

  const recentSearches = [
    {
      id: 1,
      username: 'sashaa',
      name: 'Sasha',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
  ]

  // Фейковая база ВСЕХ юзеров (показываем, когда юзер что-то ищет)
  const allUsers = [
    {
      id: 1,
      username: 'sashaa',
      name: 'Sasha',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      username: 'sergey_dev',
      name: 'Sergey',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    {
      id: 3,
      username: 'samantha_fox',
      name: 'Sam Fox',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 4,
      username: 'john_doe',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
  ]

  // Фильтруем юзеров на лету.
  // toLowerCase() нужен, чтобы поиск не ломался от больших/маленьких букв
  const searchResults = allUsers.filter(
    user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const dummyNotifications = [
    {
      id: 1,
      user: { username: 'sashaa', avatar: 'https://i.pravatar.cc/150?img=1' },
      action: 'liked your photo.',
      time: '2 d',
      postImage:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=150',
    },
  ]

  return (
    <div className='flex bg-gray-50 min-h-screen'>
      <div className='z-50 relative'>
        <Sidebar onToggleDrawer={toggleDrawer} />
      </div>

      <main className='flex-1 ml-[250px]'>
        <Outlet />
      </main>

      {/* ТЕМНЫЙ ФОН */}
      {activeDrawer !== null && (
        <div
          className='fixed inset-0 bg-black/60 z-30 transition-opacity cursor-pointer'
          onClick={() => setActiveDrawer(null)}
        ></div>
      )}

      {/* ========================================= */}
      {/* ШТОРКА 1: ПОИСК */}
      {/* ========================================= */}
      <div
        className={`fixed top-0 left-[250px] h-screen w-[400px] bg-white z-40 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col ${
          activeDrawer === 'search' ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-6 flex flex-col h-full'>
          <h2 className='text-2xl font-bold mb-8'>Search</h2>

          {/* ИНПУТ ПОИСКА */}
          <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search size={16} className='text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} // Обновляем стейт при вводе
              className='w-full bg-gray-100 text-gray-900 rounded-md py-2 pl-10 pr-10 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 transition-colors'
            />
            {/* Крестик появляется только если в инпуте что-то написано */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')} // Очищаем стейт при клике
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
              >
                <X size={16} />
              </button>
            )}
          </div>

          <hr className='border-gray-200 mb-4 -mx-6' />

          {/* КОНТЕЙНЕР РЕЗУЛЬТАТОВ (со скроллом) */}
          <div className='flex-1 overflow-y-auto -mx-6 px-6'>
            {/* РАЗВИЛКА ЛОГИКИ */}
            {searchQuery === '' ? (
              // ЕСЛИ ПУСТО: Показываем Recent
              <>
                <div className='flex items-center justify-between mb-4 mt-2'>
                  <h3 className='font-bold text-[16px]'>Recent</h3>
                  <button className='text-ichgram-blue text-[14px] font-bold hover:text-blue-800 transition-colors'>
                    Clear all
                  </button>
                </div>
                {recentSearches.map(user => (
                  <div
                    key={user.id}
                    className='flex items-center justify-between mb-4'
                  >
                    <div className='flex items-center gap-3'>
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className='w-11 h-11 rounded-full object-cover border border-gray-100'
                      />
                      <div className='flex flex-col leading-tight'>
                        <span className='font-bold text-[14px]'>
                          {user.username}
                        </span>
                        <span className='text-gray-500 text-[14px]'>
                          {user.name}
                        </span>
                      </div>
                    </div>
                    <button className='text-gray-400 hover:text-gray-600'>
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </>
            ) : // ЕСЛИ ЕСТЬ ТЕКСТ: Показываем результаты поиска
            searchResults.length > 0 ? (
              searchResults.map(user => (
                <div
                  key={user.id}
                  className='flex items-center gap-3 mb-2 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-md transition-colors'
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className='w-11 h-11 rounded-full object-cover border border-gray-100'
                  />
                  <div className='flex flex-col leading-tight'>
                    <span className='font-bold text-[14px]'>
                      {user.username}
                    </span>
                    <span className='text-gray-500 text-[14px]'>
                      {user.name}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              // Если совпадений нет
              <div className='text-center text-gray-500 mt-10 text-[14px]'>
                No results found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* ШТОРКА 2: НОТИФИКАЦИИ*/}
      {/* ========================================= */}
      <div
        className={`fixed top-0 left-[250px] h-screen w-[400px] bg-white z-40 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out overflow-y-auto ${activeDrawer === 'notifications' ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-6'>Notifications</h2>
          <h3 className='font-bold text-[16px] mb-4'>New</h3>
          <div className='flex flex-col gap-4'>
            {dummyNotifications.map(notif => (
              <div key={notif.id} className='flex items-center justify-between'>
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
