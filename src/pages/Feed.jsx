import { Check } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import Post from '../components/Post'
import Footer from '../components/Footer'

export default function Feed() {
  // пульт управления из контекста Outlet
  const { onOpenCreate, onToggleDrawer } = useOutletContext()

  // Фейковые данные.
  const dummyPosts = [
    {
      id: 1,
      author: { username: 'sashaa', avatar: 'https://i.pravatar.cc/150?img=1' },
      timeAgo: '2 wek',
      image:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
      likes: '101 824',
      caption: "It's golden, Ponyboy!",
      commentsCount: 732,
    },
    {
      id: 2,
      author: {
        username: 'alex_dev',
        avatar: 'https://i.pravatar.cc/150?img=11',
      },
      timeAgo: '2 days',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
      likes: '42',
      caption: 'Learning React and Tailwind today',
      commentsCount: 5,
    },
  ]

  return (
    <div className='flex flex-col min-h-screen w-full items-start pl-24 bg-transparent pt-10'>
      <div className='flex flex-col w-full max-w-[847px]'>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-[39px] pb-10'>
          {dummyPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>

        <div className='flex flex-col items-center justify-center py-10 pb-20'>
          <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-400'>
            <Check size={40} className='text-red-400' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>
            You've seen all the updates
          </h3>
          <p className='text-sm text-gray-500'>
            You have viewed all new publications
          </p>
        </div>

        {/*Передаем функции в футер */}
        <Footer onOpenCreate={onOpenCreate} onToggleDrawer={onToggleDrawer} />
      </div>
    </div>
  )
}
