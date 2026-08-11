import { useState, useEffect } from 'react'
import { Link as LinkIcon } from 'lucide-react'
import {
  Link,
  useParams,
  useLocation,
  useOutletContext,
  useNavigate,
} from 'react-router-dom'
import Footer from '../components/Footer'
import PostModal from '../components/PostModal'
import useAuthStore from '../store/useAuthStore'
import api from '../api'

export default function Profile() {
  const { onOpenCreate, onToggleDrawer } = useOutletContext()
  const { username: urlUsername } = useParams()
  const location = useLocation()
  
  const currentUser = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout) 
  const navigate = useNavigate()
  const updateFollowingCount = useAuthStore(state => state.updateFollowingCount)

  const isOwnProfile = location.pathname === '/profile' || urlUsername === currentUser?.username

  const [profileUser, setProfileUser] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        let targetUser = null
        
        const usernameToFetch = isOwnProfile ? currentUser?.username : urlUsername

        if (usernameToFetch) {
          const userRes = await api.get(`/users/${usernameToFetch}`)
          targetUser = userRes.data
        }

        setProfileUser(targetUser)

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

  const handleFollowToggle = async () => {
    if (!profileUser || isOwnProfile) return

    const wasFollowing = profileUser.isFollowing

    try {
      if (wasFollowing) {
        await api.post(`/users/unfollow/${profileUser._id}`)
      } else {
        await api.post(`/users/follow/${profileUser._id}`)
      }

      setProfileUser(prev => ({
        ...prev,
        isFollowing: !wasFollowing,
        followersCount: wasFollowing ? prev.followersCount - 1 : prev.followersCount + 1,
      }))

      if (updateFollowingCount) {
        updateFollowingCount(!wasFollowing)
      }
    } catch (error) {
      console.error('Ошибка при изменении статуса подписки:', error)
    }
  }

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
    <div className='flex flex-col w-full min-h-screen pt-4 sm:pt-10 pb-20 sm:pb-10 px-4 sm:px-8 lg:px-24 bg-white'>      
      <div className='w-full max-w-[935px] mx-auto flex flex-col flex-1'>
        <header className='flex flex-col sm:flex-row gap-6 md:gap-20 mb-10 items-center sm:items-start px-0'>          
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
                <div className='flex gap-2'>
                  <Link
                    to='/profile/edit'
                    className='bg-gray-100 hover:bg-gray-200 text-black px-4 py-1.5 rounded-lg font-semibold text-[14px] transition-colors cursor-pointer'
                  >
                    Edit profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                    className='md:hidden bg-red-50 hover:bg-red-100 text-red-500 px-4 py-1.5 rounded-lg font-semibold text-[14px] transition-colors cursor-pointer'
                  >
                    Log out
                  </button>
                </div>
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