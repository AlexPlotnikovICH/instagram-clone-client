import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MoreHorizontal, Heart, MessageCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import api from '../api'
import useAuthStore from '../store/useAuthStore'
import PostModal from './PostModal'

export default function Post({ post }) {
  const currentUser = useAuthStore(state => state.user)
  const updateFollowingCount = useAuthStore(state => state.updateFollowingCount)

  // --- STATE ---
  const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUser?._id))
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0)
  const [comments, setComments] = useState(post.comments || [])
  const [commentText, setCommentText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFollowed, setIsFollowed] = useState(false)

  // State for the like animation on double-click
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)

  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : 'just now'

  const profileUrl =
    currentUser?._id === post.user?._id
      ? '/profile'
      : `/profile/${post.user?.username}`

  // --- FOLLOW LOGIC ---
  const handleFollow = async () => {
    if (!post.user?._id) return

    try {
      await api.post(`/users/follow/${post.user._id}`)
      setIsFollowed(true)
      if (updateFollowingCount) updateFollowingCount(true)
    } catch (error) {
      if (error.response?.status === 400) {
        setIsFollowed(true)
      } else {
        console.error(
          'Critical follow error:',
          error.response?.data?.message || error.message,
        )
      }
    }
  }

  // --- LIKE LOGIC ---
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

  // --- DOUBLE-CLICK LOGIC (Only likes, does not unlike) ---
  const handleDoubleClick = () => {
    // 1. Trigger the heart animation regardless
    setShowHeartAnimation(true)
    setTimeout(() => setShowHeartAnimation(false), 1000)

    // 2. Like the post on the backend ONLY if it's not already liked
    if (!isLiked) {
      handleLike()
    }
  }

  // --- COMMENT LOGIC ---
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

  return (
    <div className='flex w-[404px] flex-col border-b border-gray-200 pb-3'>
      {/* 1. HEADER */}
      <div className='flex items-center justify-between py-3 px-1'>
        <div className='flex items-center gap-3'>
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
            />
          </Link>
          <div className='flex items-center gap-1.5 text-[14px]'>
            <Link
              to={profileUrl}
              className='font-bold text-gray-900 cursor-pointer hover:text-gray-500'
            >
              {post.user?.username || 'unknown'}
            </Link>
            <span className='text-gray-500'>• {timeAgo} •</span>

            {/* FOLLOW BUTTON */}
            {currentUser?._id !== post.user?._id && !isFollowed && (
              <button
                onClick={handleFollow}
                className='font-bold text-[#0095f6] hover:text-blue-800 transition-colors cursor-pointer'
              >
                follow
              </button>
            )}
          </div>
        </div>
        <button className='p-1 hover:bg-gray-50 rounded-full transition-colors'>
          <MoreHorizontal size={20} className='text-gray-700' />
        </button>
      </div>

      {/* 2. IMAGE WITH DOUBLE-CLICK */}
      <div
        className='relative w-full h-[500px] bg-gray-100 rounded-sm overflow-hidden border border-gray-200 cursor-pointer touch-manipulation flex items-center justify-center group'
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={post.image}
          alt='post content'
          className='h-full w-full object-cover select-none'
        />

        {/* Heart animation overlay */}
        {showHeartAnimation && (
          <div className='absolute z-10 animate-ping opacity-80'>
            <Heart size={100} fill='white' className='text-white' />
          </div>
        )}
      </div>

      {/* 3. FOOTER */}
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

        <button
          onClick={() => setIsModalOpen(true)}
          className='text-[14px] text-gray-500 text-left mb-1 cursor-pointer hover:text-gray-700 transition-colors'
        >
          View all {comments.length} comments
        </button>

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

      {isModalOpen && (
        <PostModal
          post={{ ...post, comments: comments }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
