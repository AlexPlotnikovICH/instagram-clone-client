import { Heart, MessageCircle } from 'lucide-react'

export default function Feed() {
  // Фейковые данные.
  const dummyPosts = [
    {
      id: 1,
      author: { username: 'sashaa', avatar: 'https://i.pravatar.cc/150?img=1' },
      timeAgo: '2 wk',
      image:
        'https://images.unsplash.com/photo-1506744626753-1fa44df14dd4?q=80&w=600&auto=format&fit=crop', // Заглушка (деревья)
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
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop', // Заглушка (ноутбук)
      likes: '42',
      caption: 'Learning React and Tailwind today ',
      commentsCount: 5,
    },
  ]

  return (
    // Главный контейнер. Добавили px-8 для отступов по бокам
    <div className='flex min-h-screen w-full justify-start pl-24 bg-transparent pt-10'>
      {' '}
      {/* СЕТКА (CSS Grid):
        grid - включаем сеточный режим.
        gap-8 - дырка между постами (32px).
        grid-cols-1 - по умолчанию (на мобилках) 1 колонка.
        xl:grid-cols-2 - на больших экранах делаем 2 колонки.
      */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 pb-20'>
        {/* Каркасы постов с жесткими размерами */}
        {dummyPosts.map(post => (
          <div
            key={post.id}
            // w-[404px] и h-[718px]
            className='h-[718px] w-[404px] bg-white border border-gray-200 shadow-sm'
          >
            <p className='p-4 text-center text-gray-500'>
              Пост {post.id} <br /> (404x718)
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
