import { useState, useEffect } from 'react' // Добавил useEffect
import { Outlet, useNavigate } from 'react-router-dom' // Добавил useNavigate
import { Search, X } from 'lucide-react'
import Sidebar from './Sidebar'
import CreatePostModal from './CreatePostModal'
import api from '../api' // Твой инстанс axios

export default function MainLayout() {
  const [activeDrawer, setActiveDrawer] = useState(null)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([]) // Теперь это стейт
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const toggleDrawer = drawerName => {
    if (activeDrawer === drawerName) {
      setActiveDrawer(null)
    } else {
      setActiveDrawer(drawerName)
    }
  }

  // --- ЛОГИКА ПОИСКА (DEBOUNCE) ---
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/users/search?query=${searchQuery}`)
        setSearchResults(response.data)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }, 500) // Задержка 500мс

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Функция для перехода в профиль и закрытия шторки
  const handleUserClick = username => {
    setActiveDrawer(null)
    setSearchQuery('')
    navigate(`/profile/${username}`)
  }

  // Пока оставим заглушкой, раз бэкенд нотификаций еще не готов
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
        <Sidebar
          onToggleDrawer={toggleDrawer}
          activeDrawer={activeDrawer}
          onOpenCreate={() => setIsCreatePostOpen(true)}
        />
      </div>

      <main className='flex-1 ml-[250px]'>
        <Outlet
          context={{
            onOpenCreate: () => setIsCreatePostOpen(true),
            onToggleDrawer: toggleDrawer,
          }}
        />
      </main>

      {activeDrawer !== null && (
        <div
          className='fixed inset-0 bg-black/60 z-30 transition-opacity cursor-pointer'
          onClick={() => setActiveDrawer(null)}
        ></div>
      )}

      {/* ШТОРКА 1: ПОИСК */}
      <div
        className={`fixed top-0 left-[250px] h-screen w-[400px] bg-white z-40 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col ${
          activeDrawer === 'search' ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-6 flex flex-col h-full'>
          <h2 className='text-2xl font-bold mb-8'>Search</h2>

          <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search size={16} className='text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full bg-gray-100 text-gray-900 rounded-md py-2 pl-10 pr-10 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 transition-colors'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
              >
                <X size={16} />
              </button>
            )}
          </div>

          <hr className='border-gray-200 mb-4 -mx-6' />

          <div className='flex-1 overflow-y-auto -mx-6 px-6'>
            {searchQuery === '' ? (
              <div className='mt-4 text-gray-500 text-[14px] font-semibold'>
                Recent (History not implemented)
              </div>
            ) : isLoading ? (
              <div className='text-center mt-10 text-gray-500'>
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map(user => (
                <div
                  key={user._id} // Используем _id из базы
                  onClick={() => handleUserClick(user.username)}
                  className='flex items-center gap-3 mb-2 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-md transition-colors'
                >
                  <img
                    src={
                      user.profile_image ||
                      `https://ui-avatars.com/api/?name=${user.username}&background=random`
                    }
                    alt={user.username}
                    className='w-11 h-11 rounded-full object-cover border border-gray-100'
                  />
                  <div className='flex flex-col leading-tight'>
                    <span className='font-bold text-[14px]'>
                      {user.username}
                    </span>
                    <span className='text-gray-500 text-[14px]'>
                      {user.fullname}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center text-gray-500 mt-10 text-[14px]'>
                No results found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ШТОРКА 2: НОТИФИКАЦИИ (без изменений) */}
      <div
        className={`fixed top-0 left-[250px] h-screen w-[400px] bg-white z-40 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out overflow-y-auto ${activeDrawer === 'notifications' ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-6'>Notifications</h2>
          <div className='flex flex-col gap-4'>
            {dummyNotifications.map(notif => (
              <div key={notif.id} className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <img
                    src={notif.user.avatar}
                    alt={notif.user.username}
                    className='w-10 h-10 rounded-full object-cover'
                  />
                  <div className='text-[14px]'>
                    <span className='font-bold mr-1'>
                      {notif.user.username}
                    </span>
                    <span>{notif.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  )
}
