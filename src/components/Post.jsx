import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MoreHorizontal, Heart, MessageCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import api from '../api'
import useAuthStore from '../store/useAuthStore'
import PostModal from './PostModal' // Подключаем модалку

export default function Post({ post }) {
  const currentUser = useAuthStore(state => state.user)

  // СТЕЙТЫ ЛАЙКОВ
  const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUser?._id))
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0)

  // СТЕЙТЫ КОММЕНТАРИЕВ И МОДАЛКИ
  const [comments, setComments] = useState(post.comments || [])
  const [commentText, setCommentText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : 'just now'

  // Логика ссылки: если пост наш -> идем в /profile, если чужой -> в /profile/никнейм
  const profileUrl =
    currentUser?._id === post.user?._id
      ? '/profile'
      : `/profile/${post.user?.username}`

  // БОЕВАЯ ФУНКЦИЯ ЛАЙКА
  const handleLike = async () => {
    const previousIsLiked = isLiked
    const previousLikeCount = likeCount

    setIsLiked(!previousIsLiked)
    setLikeCount(
      previousIsLiked ? previousLikeCount - 1 : previousLikeCount + 1,
    )

    try {
      const response = await api.put(`/posts/${post._id}/like`)
      const updatedLikes = response.data
      setLikeCount(updatedLikes.length)
      setIsLiked(updatedLikes.includes(currentUser?._id))
    } catch (error) {
      console.error('Like error:', error)
      setIsLiked(previousIsLiked)
      setLikeCount(previousLikeCount)
    }
  }

  // БОЕВАЯ ФУНКЦИЯ КОММЕНТАРИЯ
  const handleAddComment = async e => {
    e.preventDefault()
    if (!commentText.trim()) return

    try {
      // Контракт бэкенда: POST /api/posts/:id/comment, передаем text
      const response = await api.post(`/posts/${post._id}/comment`, {
        text: commentText,
      })

      // Бэкенд возвращает обновленный массив комментариев
      setComments(response.data)
      setCommentText('') // Очищаем инпут
    } catch (error) {
      console.error('Comment error:', error)
    }
  }

  return (
    <div className='flex w-[404px] flex-col border-b border-gray-200 pb-3'>
      {/* 1. ШАПКА */}
      <div className='flex items-center justify-between py-3 px-1'>
        <div className='flex items-center gap-3'>
          {/* ССЫЛКА НА ПРОФИЛЬ (Аватар) */}
          <Link to={profileUrl}>
            <img
              src={
                post.user?._id === currentUser?._id
                  ? currentUser?.profile_image
                  : post.user?.profile_image ||
                    `https://ui-avatars.com/api/?name=${post.user?.username || 'U'}&background=random`
              }
              alt={post.user?.username}
              className='h-8 w-8 rounded-full object-cover border border-gray-100 cursor-pointer'
              onError={e => {
                e.target.src = `https://ui-avatars.com/api/?name=${post.user?.username || 'U'}&background=random`
              }}
            />
          </Link>
          <div className='flex items-center gap-1.5 text-[14px]'>
            {/* ССЫЛКА НА ПРОФИЛЬ (Никнейм) */}
            <Link
              to={profileUrl}
              className='font-bold text-gray-900 cursor-pointer hover:text-gray-500'
            >
              {post.user?.username || 'unknown'}
            </Link>
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
          <button
            onClick={handleLike}
            className={`transition-all duration-200 transform active:scale-125 ${
              isLiked ? 'text-red-500' : 'text-gray-900 hover:text-gray-500'
            }`}
          >
            <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
          </button>

          {/* КНОПКА ОТКРЫТИЯ МОДАЛКИ С КОММЕНТАРИЯМИ */}
          <button
            onClick={() => setIsModalOpen(true)}
            className='hover:text-gray-500 transition-colors'
          >
            <MessageCircle size={24} />
          </button>
        </div>

        <span className='font-bold text-[14px] text-gray-900 mb-1'>
          {likeCount} likes
        </span>

        <div className='text-[14px] mb-1'>
          <Link
            to={profileUrl}
            className='font-bold text-gray-900 mr-2 hover:text-gray-500'
          >
            {post.user?.username}
          </Link>
          <span className='text-gray-900'>{post.caption}</span>
        </div>

        {/* ССЫЛКА НА ВСЕ КОММЕНТАРИИ */}
        <button
          onClick={() => setIsModalOpen(true)}
          className='text-[14px] text-gray-500 text-left mb-1 hover:text-gray-400'
        >
          View all {comments.length} comments
        </button>

        {/* ФОРМА ДОБАВЛЕНИЯ КОММЕНТАРИЯ */}
        <form
          onSubmit={handleAddComment}
          className='flex items-center justify-between pb-1 mt-1'
        >
          <input
            type='text'
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder='Add a comment...'
            className='w-full text-[14px] bg-transparent outline-none placeholder-gray-500 pr-2'
          />
          {commentText.trim() && (
            <button
              type='submit'
              className='text-[#0095f6] font-semibold text-[14px] hover:text-blue-800'
            >
              Post
            </button>
          )}
        </form>
      </div>

      {/* РЕНДЕР МОДАЛКИ (передаем актуальные комменты) */}
      {isModalOpen && (
        <PostModal
          post={{ ...post, comments: comments }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
