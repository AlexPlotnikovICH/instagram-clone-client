import { useState } from 'react'
import { Link as LinkIcon } from 'lucide-react'
import { Link, useParams, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import PostModal from '../components/PostModal'

export default function Profile() {
  const { username } = useParams()
  const location = useLocation()

  // Наш профиль — это только строгий путь /profile
  const isOwnProfile = location.pathname === '/profile'

  const [selectedPost, setSelectedPost] = useState(null)

  const user = {
    username: isOwnProfile ? 'itcareerhub' : username,
    bio: '• Гарантия помощи с трудоустройством в ведущие IT-компании\n• Выпускники зарабатывают от 45k евро\nБЕСПЛАТНАЯ ... more',
    link: 'bit.ly/3rpilbh',
    avatar: '/ich-avatar.png',
    stats: { posts: 129, followers: 9993, following: 59 },
  }

  const posts = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 6,
      image:
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400',
    },
  ]

  return (
    <div className='flex flex-col w-full min-h-screen pt-10 pb-10 pl-25 bg-white'>
      <div className='w-full max-w-[935px] pr-4 flex flex-col flex-1'>
        <header className='flex gap-8 md:gap-20 mb-10 items-start px-4 md:px-0'>
          <div className='flex-shrink-0'>
            {isOwnProfile ? (
              // СВОЙ ПРОФИЛЬ
              <img
                src={user.avatar}
                alt={user.username}
                className='w-20 h-20 md:w-36 md:h-36 rounded-full object-cover border border-gray-300'
              />
            ) : (
              // ЧУЖОЙ ПРОФИЛЬ: Один контейнер для градиента и картинка с белой рамкой.
              <div className='w-20 h-20 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]'>
                <img
                  src={user.avatar}
                  alt={user.username}
                  className='w-full h-full rounded-full object-cover border-2 border-white bg-white'
                />
              </div>
            )}
          </div>

          <div className='flex flex-col flex-1 mt-2 md:mt-0'>
            <div className='flex flex-wrap items-center gap-4 mb-4 md:mb-6'>
              <h2 className='text-xl md:text-2xl font-normal'>
                {user.username}
              </h2>

              {isOwnProfile ? (
                <Link
                  to='/profile/edit'
                  className='bg-gray-100 hover:bg-gray-200 text-black px-4 py-1.5 rounded-lg font-semibold text-[14px] transition-colors block text-center'
                >
                  Edit profile
                </Link>
              ) : (
                <div className='flex gap-2'>
                  <button className='bg-[#0095f6] hover:bg-blue-600 text-white px-6 py-1.5 rounded-lg font-semibold text-[14px] transition-colors'>
                    Follow
                  </button>
                  <button className='bg-gray-100 hover:bg-gray-200 text-black px-6 py-1.5 rounded-lg font-semibold text-[14px] transition-colors'>
                    Message
                  </button>
                </div>
              )}
            </div>

            <div className='flex gap-6 mb-4 md:mb-6 text-[16px]'>
              <span>
                <span className='font-bold'>{user.stats.posts}</span> posts
              </span>
              <span>
                <span className='font-bold'>{user.stats.followers}</span>{' '}
                followers
              </span>
              <span>
                <span className='font-bold'>{user.stats.following}</span>{' '}
                following
              </span>
            </div>

            <div className='text-[14px]'>
              <p className='whitespace-pre-line leading-relaxed mb-1'>
                {user.bio}
              </p>
              <a
                href={`https://${user.link}`}
                target='_blank'
                rel='noreferrer'
                className='text-[#00376b] font-semibold flex items-center gap-1 hover:underline w-fit'
              >
                <LinkIcon size={14} />
                {user.link}
              </a>
            </div>
          </div>
        </header>

        <hr className='border-gray-300 mb-0' />

        <div className='grid grid-cols-3 gap-1 md:gap-4 mt-1 md:mt-4 mb-20'>
          {posts.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className='relative group cursor-pointer aspect-square'
            >
              <img
                src={post.image}
                alt='Post thumbnail'
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200'></div>
            </div>
          ))}
        </div>

        <div className='mt-auto'>
          <Footer />
        </div>
      </div>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  )
}
