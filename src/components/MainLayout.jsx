import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import Sidebar from './Sidebar'
import CreatePostModal from './CreatePostModal'
import api from '../api'

export default function MainLayout() {
  const [activeDrawer, setActiveDrawer] = useState(null)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  // Поиск
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearchLoading, setIsSearchLoading] = useState(false)

  // Уведомления
  const [notifications, setNotifications] = useState([])
  const [isNotifLoading, setIsNotifLoading] = useState(false)

  const navigate = useNavigate()

  const toggleDrawer = drawerName => {
    setActiveDrawer(prev => (prev === drawerName ? null : drawerName))
  }

  // --- ЛОГИКА ПОИСКА (DEBOUNCE) ---
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearchLoading(true)
      try {
        const response = await api.get(`/users/search?query=${searchQuery}`)
        setSearchResults(response.data)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsSearchLoading(false)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // --- ЛОГИКА УВЕДОМЛЕНИЙ ---
  const fetchNotifications = async () => {
    setIsNotifLoading(true)
    try {
      const response = await api.get('/notifications')
      setNotifications(response.data)
    } catch (error) {
      console.error('Fetch notifications error:', error)
    } finally {
      setIsNotifLoading(false)
    }
  }

  useEffect(() => {
    if (activeDrawer === 'notifications') {
      fetchNotifications()
    }
  }, [activeDrawer])

  const handleUserClick = username => {
    setActiveDrawer(null)
    setSearchQuery('')
    navigate(`/profile/${username}`)
  }

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

      {/* ОВЕРЛЕЙ */}
      {activeDrawer !== null && (
        <div
          className='fixed inset-0 bg-black/40 z-30 transition-opacity cursor-pointer'
          onClick={() => setActiveDrawer(null)}
        ></div>
      )}

      {/* ШТОРКА ПОИСКА */}
      <div
        className={`fixed top-0 left-[250px] h-screen w-[400px] bg-white z-40 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col ${activeDrawer === 'search' ? 'translate-x-0' : '-translate-x-full'}`}
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
              className='w-full bg-gray-100 rounded-md py-2 pl-10 pr-10 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 transition-colors'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'
              >
                <X size={16} />
              </button>
            )}
          </div>
          <hr className='border-gray-200 mb-4 -mx-6' />
          <div className='flex-1 overflow-y-auto -mx-6 px-6'>
            {isSearchLoading ? (
              <div className='text-center mt-10 text-gray-500'>
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map(user => (
                <div
                  key={user._id}
                  onClick={() => handleUserClick(user.username)}
                  className='flex items-center gap-3 mb-2 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-md transition-colors'
                >
                  <img
                    src={
                      user.profile_image ||
                      `https://ui-avatars.com/api/?name=${user.username}&background=random`
                    }
                    className='w-11 h-11 rounded-full object-cover border border-gray-100'
                    alt={user.username}
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
              searchQuery !== '' && (
                <div className='text-center text-gray-500 mt-10'>
                  No results found.
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ШТОРКА УВЕДОМЛЕНИЙ */}
      <div
        className={`fixed top-0 left-[250px] h-screen w-[400px] bg-white z-40 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col ${activeDrawer === 'notifications' ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='p-6 flex flex-col h-full'>
          <h2 className='text-2xl font-bold mb-6'>Notifications</h2>
          <div className='flex-1 overflow-y-auto -mx-6 px-6'>
            {isNotifLoading ? (
              <div className='text-center mt-10 text-gray-500'>Loading...</div>
            ) : notifications.length > 0 ? (
              notifications.map(notif => (
                <div
                  key={notif._id}
                  className='flex items-center justify-between mb-4'
                >
                  <div className='flex items-center gap-3'>
                    <img
                      src={
                        notif.sender?.profile_image ||
                        `https://ui-avatars.com/api/?name=${notif.sender?.username}&background=random`
                      }
                      className='w-11 h-11 rounded-full object-cover'
                      alt='avatar'
                    />
                    <div className='text-[14px] leading-tight'>
                      <span
                        className='font-bold mr-1 cursor-pointer hover:text-gray-500'
                        onClick={() => handleUserClick(notif.sender?.username)}
                      >
                        {notif.sender?.username}
                      </span>
                      <span className='text-gray-900'>
                        {notif.type === 'follow' && 'started following you.'}
                        {notif.type === 'like' && 'liked your photo.'}
                        {notif.type === 'comment' && 'commented on your post.'}
                      </span>
                    </div>
                  </div>
                  {notif.post && (
                    <img
                      src={notif.post.image}
                      className='w-10 h-10 rounded-md object-cover ml-2'
                      alt='post'
                    />
                  )}
                </div>
              ))
            ) : (
              <div className='text-center text-gray-500 mt-10'>
                No notifications yet.
              </div>
            )}
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
