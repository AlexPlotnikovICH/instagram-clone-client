import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, UploadCloud, Smile } from 'lucide-react'

export default function CreatePostModal({ isOpen, onClose }) {
  // Стейты для файла, превью и текста поста
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [caption, setCaption] = useState('')

  // Ссылка на невидимый инпут файла
  const fileInputRef = useRef(null)

  // Фейковые данные юзера для правой колонки
  const user = { username: 'skai_laba', avatar: '/ich-avatar.png' }

  // Блокировка скролла
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Очистка памяти от URL картинки при закрытии или смене файла
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  // Обработчик выбора файла
  const handleFileSelect = e => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file)) // Создаем временную ссылку для превью
    }
  }

  // Полная очистка при закрытии
  const handleClose = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setCaption('')
    onClose()
  }

  // Обработчик кнопки Share (пока просто заглушка)
  const handleShare = () => {
    console.log('Sending to backend:', { file: selectedFile, caption })
    alert('Готово к отправке на сервер!')
    handleClose()
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className='absolute top-4 right-4 text-white hover:text-gray-300 z-50'
      >
        <X size={32} />
      </button>

      <div
        className='bg-white flex flex-col w-full max-w-[800px] max-h-[80vh] rounded-xl overflow-hidden relative'
        onClick={e => e.stopPropagation()}
      >
        {/* ШАПКА МОДАЛКИ */}
        <div className='flex items-center justify-between p-3 border-b border-gray-200'>
          {/* Пустой div для центрирования заголовка */}
          <div className='w-10'></div>
          <h1 className='font-bold text-[16px] flex-1 text-center'>
            Create new post
          </h1>
          <div className='w-10 text-right'>
            {/* Кнопка Share появляется только если картинка загружена */}
            {previewUrl && (
              <button
                onClick={handleShare}
                className='text-[#0095f6] font-semibold text-[14px] hover:text-blue-800 transition-colors'
              >
                Share
              </button>
            )}
          </div>
        </div>

        {/* ТЕЛО МОДАЛКИ: Два состояния */}
        {!previewUrl ? (
          // СОСТОЯНИЕ 1: Картинка не выбрана (зона загрузки)
          <div className='flex flex-col items-center justify-center p-20 min-h-[400px]'>
            <UploadCloud
              size={64}
              className='text-gray-800 mb-4'
              strokeWidth={1}
            />
            <h2 className='text-xl font-normal mb-6'>
              Drag photos and videos here
            </h2>

            {/* Невидимый инпут */}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept='image/*'
              className='hidden'
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className='bg-[#0095f6] hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold text-[14px] transition-colors'
            >
              Select from computer
            </button>
          </div>
        ) : (
          // СОСТОЯНИЕ 2: Картинка выбрана
          <div className='flex flex-col md:flex-row h-full max-h-[70vh]'>
            {/* Левая колонка (Превью) */}
            <div className='w-full md:w-[60%] bg-gray-50 flex items-center justify-center border-r border-gray-200 min-h-[300px]'>
              <img
                src={previewUrl}
                alt='Preview'
                className='max-w-full max-h-full object-contain'
              />
            </div>

            {/* Правая колонка (Ввод текста) */}
            <div className='w-full md:w-[40%] flex flex-col bg-white'>
              <div className='flex items-center gap-3 p-4'>
                <img
                  src={user.avatar}
                  alt='author'
                  className='w-8 h-8 rounded-full object-cover border border-gray-200'
                />
                <span className='font-bold text-[14px]'>{user.username}</span>
              </div>

              <textarea
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder='Write a caption...'
                className='w-full flex-1 p-4 resize-none focus:outline-none text-[16px]'
                maxLength={2200}
              />

              <div className='flex items-center justify-between p-4 border-t border-gray-200 text-gray-400'>
                <Smile
                  size={20}
                  className='cursor-pointer hover:text-gray-600'
                />
                <span className='text-[12px]'>{caption.length}/2,200</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('modal-root'),
  )
}
