import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostOptionsModal from './PostOptionsModal'
import { createPortal } from 'react-dom'
import { X, MoreHorizontal, Heart, MessageCircle, Smile } from 'lucide-react'
import useAuthStore from '../store/useAuthStore' // Нужен для проверки "свой/чужой"

export default function PostModal({ post, onClose }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const currentUser = useAuthStore(state => state.user)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!post) return null

  // ЛОГИКА ССЫЛКИ
  const isOwnPost = post.user?._id === currentUser?._id
  const profileUrl = isOwnPost ? '/profile' : `/profile/${post.user?.username}`

  // ДАННЫЕ АВТОРА И КОММЕНТОВ
  const author = {
    username: post?.user?.username || 'unknown',
    avatar:
      post?.user?.profile_image ||
      `https://ui-avatars.com/api/?name=${post.user?.username || 'U'}&background=random`,
  }
  const caption = post?.caption || ''
  const comments = post?.comments || []
  const likesCount = post?.likes?.length || 0
  const postDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : 'НЕДАВНО'

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 md:p-10'
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className='absolute top-4 right-4 text-white hover:text-gray-300 z-50'
      >
        <X size={32} />
      </button>

      <div
        className='bg-white flex flex-col md:flex-row w-full max-w-[1200px] h-full max-h-[90vh] rounded-md overflow-hidden relative'
        onClick={e => e.stopPropagation()}
      >
        {/* КАРТИНКА */}
        <div className='w-full md:w-[60%] bg-black flex items-center justify-center min-h-[50vh] md:min-h-0'>
          <img
            src={post.image}
            alt='Post'
            className='max-w-full max-h-full object-contain'
          />
        </div>

        {/* ИНТЕРФЕЙС */}
        <div className='w-full md:w-[40%] flex flex-col bg-white h-full max-h-[90vh]'>
          {/* ШАПКА С ССЫЛКОЙ */}
          <div className='flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0'>
            <Link
              to={profileUrl}
              onClick={onClose}
              className='flex items-center gap-3 cursor-pointer'
            >
              <img
                src={author.avatar}
                alt='author'
                className='w-8 h-8 rounded-full object-cover border border-gray-200'
              />
              <span className='font-bold text-[14px] hover:text-gray-500 transition-colors'>
                {author.username}
              </span>
            </Link>
            <MoreHorizontal
              className='cursor-pointer text-gray-700 hover:text-black'
              onClick={() => setIsOptionsOpen(true)}
            />
          </div>

          <div className='flex-1 overflow-y-auto p-4 space-y-5'>
            {/* ОПИСАНИЕ С ССЫЛКОЙ */}
            {caption && (
              <div className='flex gap-3'>
                <Link to={profileUrl} onClick={onClose}>
                  <img
                    src={author.avatar}
                    alt='author'
                    className='w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-200'
                  />
                </Link>
                <div className='text-[14px]'>
                  <Link
                    to={profileUrl}
                    onClick={onClose}
                    className='font-bold mr-2 hover:text-gray-500'
                  >
                    {author.username}
                  </Link>
                  <span className='whitespace-pre-line'>{caption}</span>
                </div>
              </div>
            )}

            {/* КОММЕНТАРИИ */}
            {comments.length === 0 ? (
              <div className='text-center text-gray-400 text-sm py-4'>
                Пока нет комментариев
              </div>
            ) : (
              comments.map(comment => (
                <div
                  key={comment._id}
                  className='flex gap-3 justify-between group'
                >
                  <div className='flex gap-3'>
                    {/* Тут тоже можно добавить Link на автора коммента, если нужно */}
                    <img
                      src={
                        comment?.user?.profile_image ||
                        `https://ui-avatars.com/api/?name=${comment?.user?.username || 'U'}&background=random`
                      }
                      alt='user'
                      className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                    />
                    <div className='text-[14px]'>
                      <span className='font-bold mr-2'>
                        {comment?.user?.username || 'User'}
                      </span>
                      <span>{comment.text}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ПОДВАЛ */}
          <div className='border-t border-gray-200 flex-shrink-0'>
            <div className='p-4'>
              <div className='flex justify-between mb-3'>
                <div className='flex gap-4'>
                  <Heart
                    className='cursor-pointer hover:text-gray-500 transition-colors'
                    size={24}
                  />
                  <MessageCircle
                    className='cursor-pointer hover:text-gray-500 transition-colors'
                    size={24}
                  />
                </div>
              </div>
              <div className='font-bold text-[14px] mb-1'>
                {likesCount} likes
              </div>
              <div className='text-gray-500 text-[10px] uppercase mb-1'>
                {postDate}
              </div>
            </div>
            {/* Инпут оставили без изменений */}
            <div className='flex items-center gap-3 px-4 py-3 border-t border-gray-200'>
              <Smile size={24} className='text-gray-700 cursor-pointer' />
              <input
                type='text'
                placeholder='Add a comment...'
                className='flex-1 focus:outline-none text-[14px]'
              />
              <button className='text-[#0095f6] font-semibold text-[14px]'>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <PostOptionsModal
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
      />
    </div>,
    document.getElementById('modal-root'),
  )
}
