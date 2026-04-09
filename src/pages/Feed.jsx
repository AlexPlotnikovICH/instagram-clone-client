import { Heart, MessageCircle } from 'lucide-react'
import Post from '../components/Post'

export default function Feed() {
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
      caption: 'Learning React and Tailwind today 🚀',
      commentsCount: 5,
    },
  ]

  return (
    // Главный контейнер.
    <div className='flex min-h-screen w-full justify-start pl-24 bg-transparent pt-10'>
      {' '}
      {/* СЕТКА (CSS Grid):
        grid - включаем сеточный режим.
        gap-8 - дырка между постами (32px).
        grid-cols-1 - по умолчанию (на мобилках) 1 колонка.
        xl:grid-cols-2 - на больших экранах делаем 2 колонки.
      */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 pb-20'>
        {/* Пробегаемся по массиву и отдаем данные внутрь компонента Post */}
        {dummyPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
