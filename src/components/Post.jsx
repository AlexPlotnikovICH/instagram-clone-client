import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from 'lucide-react'

export default function Post({ post }) {
  return (
    // Главный контейнер поста с динамической высотой и разделителем border-b
    <div className='flex w-[404px] flex-col border-b border-gray-200 pb-3'>
      {/* 1. ШАПКА: Аватарка, Ник, Время */}
      <div className='flex items-center justify-between py-3 px-1'>
        <div className='flex items-center gap-3'>
          <img
            src={post.author.avatar}
            alt={post.author.username}
            className='h-8 w-8 rounded-full object-cover border border-gray-100'
          />
          <div className='flex items-center gap-1.5 text-[14px]'>
            <span className='font-bold text-gray-900 cursor-pointer hover:text-gray-500'>
              {post.author.username}
            </span>
            <span className='text-gray-500'>• {post.timeAgo} •</span>
            <button className='font-bold text-ichgram-blue hover:text-blue-800 transition-colors'>
              follow
            </button>
          </div>
        </div>
        <button className='p-1 hover:bg-gray-50 rounded-full transition-colors'>
          <MoreHorizontal size={20} className='text-gray-700' />
        </button>
      </div>

      {/* 2. КАРТИНКА */}
      <div className='w-full h-[500px] bg-gray-100 rounded-sm overflow-hidden border border-gray-200'>
        <img
          src={post.image}
          alt='post content'
          className='h-full w-full object-cover'
        />
      </div>

      {/* 3. ПОДВАЛ (Actions, Likes, Caption) */}
      <div className='flex flex-col pt-3 px-1'>
        {/* Панель иконок */}
        <div className='flex justify-between mb-2'>
          <div className='flex items-center gap-4'>
            <button className='hover:text-gray-500 transition-colors'>
              <Heart size={24} />
            </button>
            <button className='hover:text-gray-500 transition-colors'>
              <MessageCircle size={24} />
            </button>
            <button className='hover:text-gray-500 transition-colors'>
              <Send size={24} />
            </button>
          </div>
          <button className='hover:text-gray-500 transition-colors'>
            <Bookmark size={24} />
          </button>
        </div>

        {/* Количество лайков */}
        <span className='font-bold text-[14px] text-gray-900 mb-1'>
          {post.likes} likes
        </span>

        {/* Текст поста (Никнейм + Описание) */}
        <div className='text-[14px] mb-1'>
          <span className='font-bold text-gray-900 mr-2 cursor-pointer hover:text-gray-500'>
            {post.author.username}
          </span>
          <span className='text-gray-900'>{post.caption}</span>
        </div>

        {/* Ссылка на комментарии */}
        <button className='text-[14px] text-gray-500 text-left mb-1 hover:text-gray-400'>
          View all {post.commentsCount} comments
        </button>

        {/* ИНПУТ ДЛЯ КОММЕНТАРИЯ */}
        <div className='flex items-center justify-between pb-1'>
          <input
            type='text'
            placeholder='Add a comment...'
            className='w-full text-[14px] bg-transparent outline-none placeholder-gray-500'
          />
        </div>
      </div>
    </div>
  )
}
