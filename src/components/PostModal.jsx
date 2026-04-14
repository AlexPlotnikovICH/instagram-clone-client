import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostOptionsModal from './PostOptionsModal'
import { createPortal } from 'react-dom'
import { X, MoreHorizontal, Heart, MessageCircle, Smile } from 'lucide-react'
import api from '../api'
import useAuthStore from '../store/useAuthStore'

export default function PostModal({ post, onClose }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const currentUser = useAuthStore(state => state.user)

  // 1. Инициализируем локальный стейт
  const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUser?._id))
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0)
  const [comments, setComments] = useState(post.comments || [])
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!post) return null

  // Логика ссылок и аватарок
  const isOwnPost = post.user?._id === currentUser?._id
  const profileUrl = isOwnPost ? '/profile' : `/profile/${post.user?.username}`
  const authorAvatar =
    post.user?.profile_image ||
    `https://ui-avatars.com/api/?name=${post.user?.username || 'U'}&background=random`

  // --- ФУНКЦИЯ ЛАЙКА ---
  const handleLike = async () => {
    const previousIsLiked = isLiked
    const previousLikeCount = likeCount

    setIsLiked(!previousIsLiked)
    setLikeCount(
      previousIsLiked ? previousLikeCount - 1 : previousLikeCount + 1,
    )

    try {
      const response = await api.put(`/posts/${post._id}/like`)
      // Синхронизируем с реальностью от сервера
      setLikeCount(response.data.length)
      setIsLiked(response.data.includes(currentUser?._id))
    } catch (error) {
      console.error('Like error:', error)
      // Откат при ошибке
      setIsLiked(previousIsLiked)
      setLikeCount(previousLikeCount)
    }
  }
  // --- ФУНКЦИЯ УДАЛЕНИЯ ПОСТА ---
  const handleDeletePost = async id => {
    try {
      await api.delete(`/posts/${id}`)
      alert('Пост успешно удален!')
      // костыль: чтобы пост исчез из ленты, просто перезагружаем страницу.
      window.location.reload()
    } catch (error) {
      console.error('Delete post error:', error)
      alert(error.response?.data?.message || 'Ошибка при удалении поста')
    }
  }
  // --- ФУНКЦИЯ ДОБАВЛЕНИЯ КОММЕНТАРИЯ ---
  const handleAddComment = async e => {
    e.preventDefault()
    if (!commentText.trim()) return

    try {
      const response = await api.post(`/posts/${post._id}/comment`, {
        text: commentText,
      })
      setComments(response.data)
      setCommentText('')
    } catch (error) {
      console.error('Comment error:', error)
    }
  }

  // --- ФУНКЦИЯ УДАЛЕНИЯ КОММЕНТАРИЯ ---
  const handleDeleteComment = async commentId => {
    if (!window.confirm('Удалить комментарий?')) return

    try {
      const response = await api.delete(
        `/posts/${post._id}/comment/${commentId}`,
      )
      // Бэкенд возвращает обновленный массив
      setComments(response.data)
    } catch (error) {
      console.error('Delete comment error:', error)
      alert(error.response?.data?.message || 'Ошибка при удалении комментария')
    }
  }

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
        {/* ЛЕВАЯ ЧАСТЬ: Изображение */}
        <div className='w-full md:w-[60%] bg-black flex items-center justify-center min-h-[50vh] md:min-h-0'>
          <img
            src={post.image}
            alt='Post content'
            className='max-w-full max-h-full object-contain'
          />
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Контент */}
        <div className='w-full md:w-[40%] flex flex-col bg-white h-full max-h-[90vh]'>
          {/* ШАПКА */}
          <div className='flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0'>
            <Link
              to={profileUrl}
              onClick={onClose}
              className='flex items-center gap-3'
            >
              <img
                src={authorAvatar}
                alt='author'
                className='w-8 h-8 rounded-full object-cover border border-gray-200'
              />
              <span className='font-bold text-[14px] hover:text-gray-500'>
                {post.user?.username}
              </span>
            </Link>
            <MoreHorizontal
              className='cursor-pointer text-gray-700 hover:text-black'
              onClick={() => setIsOptionsOpen(true)}
            />
          </div>

          {/* КОММЕНТАРИИ И ОПИСАНИЕ */}
          <div className='flex-1 overflow-y-auto p-4 space-y-5'>
            {post.caption && (
              <div className='flex gap-3'>
                <img
                  src={authorAvatar}
                  className='w-8 h-8 rounded-full flex-shrink-0 object-cover'
                  alt='author'
                />
                <div className='text-[14px] pt-1'>
                  <span className='font-bold mr-2'>{post.user?.username}</span>
                  <span className='whitespace-pre-line'>{post.caption}</span>
                </div>
              </div>
            )}

            {/* СПИСОК КОММЕНТОВ */}
            {comments.map(comment => {
              // проверка прав на удаление
              const canDelete =
                comment.user?._id === currentUser?._id ||
                post.user?._id === currentUser?._id

              return (
                <div
                  key={comment._id}
                  className='flex gap-3 justify-between items-start group'
                >
                  <div className='flex gap-3'>
                    <img
                      src={
                        comment.user?.profile_image ||
                        `https://ui-avatars.com/api/?name=${comment.user?.username || 'U'}&background=random`
                      }
                      className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                      alt='comment-author'
                    />
                    <div className='text-[14px] leading-tight pt-1'>
                      <span className='font-bold mr-2'>
                        {comment.user?.username || 'User'}
                      </span>
                      <span className='break-words'>{comment.text}</span>
                    </div>
                  </div>

                  {/* Кнопка удаления */}
                  {canDelete && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1'
                      title='Удалить комментарий'
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          {/* ПОДВАЛ (ЛАЙКИ) */}
          <div className='border-t border-gray-200 flex-shrink-0'>
            <div className='p-4'>
              <div className='flex gap-4 mb-2'>
                <button
                  onClick={handleLike}
                  className={`transition-transform active:scale-125 ${isLiked ? 'text-red-500' : 'text-gray-900'}`}
                >
                  <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <MessageCircle
                  size={24}
                  className='cursor-pointer text-gray-900'
                />
              </div>
              <div className='font-bold text-[14px]'>{likeCount} likes</div>
            </div>

            {/* ИНПУТ КОММЕНТАРИЯ */}
            <form
              onSubmit={handleAddComment}
              className='flex items-center gap-3 px-4 py-3 border-t border-gray-200'
            >
              <Smile size={24} className='text-gray-700 cursor-pointer' />
              <input
                type='text'
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder='Add a comment...'
                className='flex-1 focus:outline-none text-[14px]'
              />
              <button
                type='submit'
                disabled={!commentText.trim()}
                className='text-[#0095f6] font-semibold text-[14px] disabled:opacity-50'
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>

      <PostOptionsModal
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        isOwnPost={isOwnPost}
        postId={post._id}
        onDeletePost={handleDeletePost}
      />
    </div>,
    document.getElementById('modal-root'),
  )
}
