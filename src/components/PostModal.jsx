import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Smile,
} from 'lucide-react'

export default function PostModal({ post, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!post) return null

  // ФЕЙКОВЫЕ ДАННЫЕ (Пока нет бэкенда, хардкодим их здесь)
  const author = {
    username: 'itcareerhub',
    avatar: '/ich-avatar.png',
  }

  const caption =
    'Потрясающие новости пришли к нам из Черногории! Проект по поддержке бездомных животных TailBook, в разработке которого участвуют сразу 9 наших стажеров, будет представлен на Web Summit 2024 в Португалии🔥\n\nМы поздравляем наших студентов, приглашаем вас на Web Summit и предлагаем стать частью огромного сообщества...'

  const mockComments = [
    {
      id: 1,
      username: 'coach.tonia',
      text: '😍 спасибо!!!! 👏',
      time: '17 h',
      likes: 1,
      avatar: 'https://ui-avatars.com/api/?name=CT&background=random',
    },
    {
      id: 2,
      username: 'fssociety',
      text: 'Вау, это очень классно на самом деле!',
      time: '23 h',
      likes: 3,
      avatar: 'https://ui-avatars.com/api/?name=FS&background=random',
    },
    {
      id: 3,
      username: 'student_101',
      text: 'Когда следующий набор?',
      time: '1 d',
      likes: 0,
      avatar: 'https://ui-avatars.com/api/?name=S1&background=random',
    },
    {
      id: 4,
      username: 'dev_guy',
      text: 'TailBook крутые, удачи на саммите!',
      time: '1 d',
      likes: 5,
      avatar: 'https://ui-avatars.com/api/?name=DG&background=random',
    },
    {
      id: 5,
      username: 'hr_partner',
      text: 'Ждем выпускников на собеседования',
      time: '2 d',
      likes: 12,
      avatar: 'https://ui-avatars.com/api/?name=HR&background=random',
    },
  ]

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

      {/* ГЛАВНЫЙ КОНТЕЙНЕР */}
      <div
        className='bg-white flex flex-col md:flex-row w-full max-w-[1200px] h-full max-h-[90vh] rounded-md overflow-hidden relative'
        onClick={e => e.stopPropagation()}
      >
        {/* ========================================= */}
        {/* ЛЕВАЯ КОЛОНКА (Картинка) */}
        {/* ========================================= */}
        <div className='w-full md:w-[60%] bg-black flex items-center justify-center min-h-[50vh] md:min-h-0'>
          <img
            src={post.image}
            alt='Post content'
            className='max-w-full max-h-full object-contain'
          />
        </div>

        {/* ========================================= */}
        {/* ПРАВАЯ КОЛОНКА (Интерфейс) */}
        {/* ========================================= */}
        <div className='w-full md:w-[40%] flex flex-col bg-white h-full max-h-[90vh]'>
          {/* 1. ШАПКА (прибита гвоздями к верху) */}
          <div className='flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0'>
            <div className='flex items-center gap-3 cursor-pointer'>
              <img
                src={author.avatar}
                alt='author'
                className='w-8 h-8 rounded-full object-cover border border-gray-200'
              />
              <span className='font-bold text-[14px] hover:text-gray-500 transition-colors'>
                {author.username}
              </span>
            </div>
            <MoreHorizontal className='cursor-pointer text-gray-700 hover:text-black' />
          </div>

          {/* 2. ТЕЛО (Зона скролла) */}
          <div className='flex-1 overflow-y-auto p-4 space-y-5'>
            {/* Описание поста (Caption) */}
            <div className='flex gap-3'>
              <img
                src={author.avatar}
                alt='author'
                className='w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-200'
              />
              <div className='text-[14px]'>
                <span className='font-bold mr-2 cursor-pointer hover:text-gray-500'>
                  {author.username}
                </span>
                <span className='whitespace-pre-line'>{caption}</span>
                <div className='text-gray-500 text-[12px] mt-2'>1 d</div>
              </div>
            </div>

            {/* Список комментариев */}
            {mockComments.map(comment => (
              <div
                key={comment.id}
                className='flex gap-3 justify-between group'
              >
                <div className='flex gap-3'>
                  <img
                    src={comment.avatar}
                    alt={comment.username}
                    className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                  />
                  <div className='text-[14px]'>
                    <span className='font-bold mr-2 cursor-pointer hover:text-gray-500'>
                      {comment.username}
                    </span>
                    <span>{comment.text}</span>
                    <div className='flex gap-4 text-gray-500 text-[12px] mt-1 font-semibold'>
                      <span>{comment.time}</span>
                      {comment.likes > 0 && (
                        <button className='hover:text-gray-700'>
                          {comment.likes} likes
                        </button>
                      )}
                      <button className='hover:text-gray-700'>Reply</button>
                    </div>
                  </div>
                </div>
                {/* Иконка лайка на комменте (появляется при наведении) */}
                <button className='text-gray-400 hover:text-black self-center p-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Heart size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* 3. ПОДВАЛ (прибит гвоздями к низу) */}
          <div className='border-t border-gray-200 flex-shrink-0'>
            <div className='p-4'>
              {/* Иконки действий */}
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
                  <Send
                    className='cursor-pointer hover:text-gray-500 transition-colors'
                    size={24}
                  />
                </div>
                <Bookmark
                  className='cursor-pointer hover:text-gray-500 transition-colors'
                  size={24}
                />
              </div>

              {/* Статистика */}
              <div className='font-bold text-[14px] mb-1'>25 likes</div>
              <div className='text-gray-500 text-[10px] uppercase mb-1'>
                1 DAY AGO
              </div>
            </div>

            {/* Инпут комментария */}
            <div className='flex items-center gap-3 px-4 py-3 border-t border-gray-200'>
              <Smile
                size={24}
                className='text-gray-700 cursor-pointer hover:text-gray-500 transition-colors'
              />
              <input
                type='text'
                placeholder='Add a comment...'
                className='flex-1 focus:outline-none text-[14px]'
              />
              <button className='text-[#0095f6] font-semibold text-[14px] hover:text-blue-800 transition-colors'>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root'),
  )
}
