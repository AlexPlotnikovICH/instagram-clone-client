import { useState } from 'react'
import { MoreHorizontal, Heart, MessageCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import api from '../api' // Наш axios
import useAuthStore from '../store/useAuthStore' // Чтобы знать свой ID

export default function Post({ post }) {
  const currentUser = useAuthStore(state => state.user)

  // Инициализируем стейт из данных, пришедших с бэка
  // Проверяем, есть ли наш ID в массиве лайков
  const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUser?._id))
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0)

  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : 'just now'

  // БОЕВАЯ ФУНКЦИЯ ЛАЙКА
  const handleLike = async () => {
    // 1. ЗАПОМИНАЕМ СТАРЫЕ ЗНАЧЕНИЯ
    const previousIsLiked = isLiked
    const previousLikeCount = likeCount

    // 2. OPTIMISTIC UPDATE: Меняем UI мгновенно
    setIsLiked(!previousIsLiked)
    setLikeCount(
      previousIsLiked ? previousLikeCount - 1 : previousLikeCount + 1,
    )

    try {
      // 3. ОТПРАВЛЯЕМ ЗАПРОС
      // Контракт: PUT /api/posts/:id/like
      const response = await api.put(`/posts/${post._id}/like`)

      // На всякий случай синхронизируем данные с тем, что реально вернул сервер
      // (Сервер возвращает обновленный массив лайков)
      const updatedLikes = response.data
      setLikeCount(updatedLikes.length)
      setIsLiked(updatedLikes.includes(currentUser?._id))
    } catch (error) {
      console.error('Like error:', error)
      // 4. ROLLBACK: Если сервер упал, возвращаем как было
      setIsLiked(previousIsLiked)
      setLikeCount(previousLikeCount)
    }
  }

  return (
    <div className='flex w-[404px] flex-col border-b border-gray-200 pb-3'>
      {/* 1. ШАПКА */}
      <div className='flex items-center justify-between py-3 px-1'>
        <div className='flex items-center gap-3'>
          <img
            src={
              // Если это пост текущего юзера, берем его свежую аватарку из стора
              post.user?._id === currentUser?._id
                ? currentUser?.profile_image
                : post.user?.profile_image ||
                  `https://ui-avatars.com/api/?name=${post.user?.username || 'U'}&background=random`
            }
            alt={post.user?.username}
            className='h-8 w-8 rounded-full object-cover border border-gray-100'
            onError={e => {
              // Если вдруг и это не прогрузилось, ставим стандартную букву
              e.target.src = `https://ui-avatars.com/api/?name=${post.user?.username || 'U'}&background=random`
            }}
          />
          <div className='flex items-center gap-1.5 text-[14px]'>
            <span className='font-bold text-gray-900 cursor-pointer hover:text-gray-500'>
              {post.user?.username || 'unknown'}
            </span>
            <span className='text-gray-500'>• {timeAgo} •</span>
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

      {/* 3. ПОДВАЛ */}
      <div className='flex flex-col pt-3 px-1'>
        <div className='flex items-center gap-4 mb-2'>
          {/* КНОПКА ЛАЙКА */}
          <button
            onClick={handleLike}
            className={`transition-all duration-200 transform active:scale-125 ${
              isLiked ? 'text-red-500' : 'text-gray-900 hover:text-gray-500'
            }`}
          >
            <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
          </button>

          <button className='hover:text-gray-500 transition-colors'>
            <MessageCircle size={24} />
          </button>
        </div>

        <span className='font-bold text-[14px] text-gray-900 mb-1'>
          {likeCount} likes
        </span>

        <div className='text-[14px] mb-1'>
          <span className='font-bold text-gray-900 mr-2 cursor-pointer'>
            {post.user?.username}
          </span>
          <span className='text-gray-900'>{post.caption}</span>
        </div>

        <button className='text-[14px] text-gray-500 text-left mb-1 hover:text-gray-400'>
          View all {post.comments?.length || 0} comments
        </button>

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
