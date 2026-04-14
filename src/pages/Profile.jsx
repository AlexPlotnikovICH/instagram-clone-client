import { useState, useEffect } from 'react'
import { Link as LinkIcon } from 'lucide-react'
import {
  Link,
  useParams,
  useLocation,
  useOutletContext,
} from 'react-router-dom'
import Footer from '../components/Footer'
import PostModal from '../components/PostModal'
import useAuthStore from '../store/useAuthStore'
import api from '../api'

export default function Profile() {
  const { onOpenCreate, onToggleDrawer } = useOutletContext()
  const { username: urlUsername } = useParams()
  const location = useLocation()

  // Получаем текущего пользователя и функцию обновления счетчика из стора
  const currentUser = useAuthStore(state => state.user)
  const updateFollowingCount = useAuthStore(state => state.updateFollowingCount)

  // Определяем, является ли профиль личным
  const isOwnProfile =
    location.pathname === '/profile' || urlUsername === currentUser?.username

  // Состояния компонента
  const [profileUser, setProfileUser] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        let targetUser = null

        // 1. ПОЛУЧАЕМ ДАННЫЕ (Теперь всегда через API!)
        const usernameToFetch = isOwnProfile
          ? currentUser?.username
          : urlUsername

        if (usernameToFetch) {
          const userRes = await api.get(`/users/${usernameToFetch}`)
          targetUser = userRes.data
        }

        setProfileUser(targetUser)

        // 2. ПОЛУЧАЕМ ПОСТЫ
        if (targetUser?._id) {
          const postsRes = await api.get(`/posts/user/${targetUser._id}`)
          setUserPosts(postsRes.data)
        }
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [urlUsername, isOwnProfile, currentUser])

  // Функция переключения подписки
  const handleFollowToggle = async () => {
    if (!profileUser || isOwnProfile) return

    const wasFollowing = profileUser.isFollowing

    try {
      if (wasFollowing) {
        await api.post(`/users/unfollow/${profileUser._id}`)
      } else {
        await api.post(`/users/follow/${profileUser._id}`)
      }

      // обновление локального состояния профиля
      setProfileUser(prev => ({
        ...prev,
        isFollowing: !wasFollowing,
        followersCount: wasFollowing
          ? prev.followersCount - 1
          : prev.followersCount + 1,
      }))

      // Синхронизация глобального счетчика подписок в useAuthStore
      if (updateFollowingCount) {
        updateFollowingCount(!wasFollowing)
      }
    } catch (error) {
      console.error('Ошибка при изменении статуса подписки:', error)
    }
  }

  // Рендеринг состояний загрузки или ошибки
  if (loading && !profileUser) {
    return (
      <div className='pl-25 pt-10 font-semibold text-gray-500'>
        Loading profile...
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div className='pl-25 pt-10 font-semibold text-red-500'>
        User not found
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full min-h-screen pt-10 pb-10 pl-25 bg-white'>
      <div className='w-full max-w-[935px] pr-4 flex flex-col flex-1'>
        <header className='flex gap-8 md:gap-20 mb-10 items-start px-4 md:px-0'>
          <div className='flex-shrink-0'>
            <img
              src={
                profileUser.profile_image ||
                `https://ui-avatars.com/api/?name=${profileUser.username}&background=random`
              }
              alt={profileUser.username}
              className='w-20 h-20 md:w-36 md:h-36 rounded-full object-cover border border-gray-300'
            />
          </div>

          <div className='flex flex-col flex-1'>
            <div className='flex flex-wrap items-center gap-4 mb-4 md:mb-6'>
              <h2 className='text-xl md:text-2xl font-normal'>
                {profileUser.username}
              </h2>
              {isOwnProfile ? (
                <Link
                  to='/profile/edit'
                  className='bg-gray-100 hover:bg-gray-200 text-black px-4 py-1.5 rounded-lg font-semibold text-[14px] transition-colors cursor-pointer'
                >
                  Edit profile
                </Link>
              ) : (
                <div className='flex gap-2'>
                  <button
                    onClick={handleFollowToggle}
                    className={`${
                      profileUser.isFollowing
                        ? 'bg-gray-200 text-black'
                        : 'bg-[#0095f6] text-white'
                    } px-6 py-1.5 rounded-lg font-semibold text-[14px] transition-colors cursor-pointer`}
                  >
                    {profileUser.isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                  <button className='bg-gray-100 hover:bg-gray-200 text-black px-6 py-1.5 rounded-lg font-semibold text-[14px] transition-colors cursor-pointer'>
                    Message
                  </button>
                </div>
              )}
            </div>

            <div className='font-semibold text-[16px] mb-1'>
              {profileUser.fullname}
            </div>

            <div className='flex gap-6 mb-4 md:mb-6 text-[16px]'>
              <span>
                <span className='font-bold'>{userPosts.length}</span> posts
              </span>
              <span>
                <span className='font-bold'>
                  {profileUser.followersCount || 0}
                </span>{' '}
                followers
              </span>
              <span>
                <span className='font-bold'>
                  {profileUser.followingCount || 0}
                </span>{' '}
                following
              </span>
            </div>

            <div className='text-[14px] mt-2'>
              <p className='whitespace-pre-line leading-relaxed'>
                {profileUser.bio || 'No bio yet...'}
              </p>

              {/* Рендерим ссылку только если она есть */}
              {profileUser.website && (
                <a
                  href={
                    profileUser.website.startsWith('http')
                      ? profileUser.website
                      : `https://${profileUser.website}`
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block mt-2 font-bold text-[#00376b] hover:underline flex items-center gap-1'
                >
                  <LinkIcon size={14} className='rotate-45' />
                  {/* Убираем http(s):// для красивого отображения */}
                  {profileUser.website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </div>
        </header>

        <hr className='border-gray-300 mb-6' />

        <div className='grid grid-cols-3 gap-1 md:gap-4 mb-20'>
          {userPosts.length === 0 ? (
            <div className='col-span-3 text-center text-gray-400 py-10'>
              No posts yet.
            </div>
          ) : (
            userPosts.map(post => (
              <div
                key={post._id}
                onClick={() => setSelectedPost(post)}
                className='relative group cursor-pointer aspect-square bg-gray-100 overflow-hidden'
              >
                <img
                  src={post.image}
                  alt='Post thumbnail'
                  className='w-full h-full object-cover hover:brightness-90 transition-all'
                />
              </div>
            ))
          )}
        </div>

        <div className='mt-auto'>
          <Footer onOpenCreate={onOpenCreate} onToggleDrawer={onToggleDrawer} />
        </div>
      </div>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  )
}
