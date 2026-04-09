import { MoreHorizontal } from 'lucide-react'

export default function Post({ post }) {
  return (
    <div className='flex w-[404px] flex-col border-b border-gray-200 pb-5 mb-4'>
      <div className='flex items-center justify-between py-3 px-1'>
        <div className='flex items-center gap-3'>
          <img
            src={post.author.avatar}
            alt={post.author.username}
            className='h-8 w-8 rounded-full object-cover border border-gray-100'
          />

          <div className='flex items-center gap-1.5 text-[14px]'>
            {/* Имя пользователя */}
            <span className='font-bold text-gray-900 cursor-pointer hover:text-gray-500'>
              {post.author.username}
            </span>
            {/* Время публикации */}
            <span className='text-gray-500'>• {post.timeAgo} •</span>
            {/* Кнопка follow*/}
            <button className='font-bold text-ichgram-blue hover:text-blue-800 transition-colors'>
              follow
            </button>
          </div>
        </div>

        <button className='p-1 hover:bg-gray-50 rounded-full transition-colors'>
          <MoreHorizontal size={20} className='text-gray-700' />
        </button>
      </div>

      {/* Место для фото*/}
      <div className='w-full h-[500px] bg-gray-100 rounded-sm overflow-hidden border border-gray-200'>
        <img
          src={post.image}
          alt='post content'
          className='h-full w-full object-cover'
        />
      </div>
    </div>
  )
}
