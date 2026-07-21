import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, UploadCloud, Smile, Loader2 } from 'lucide-react'
import api from '../api'
import useAuthStore from '../store/useAuthStore'

export default function CreatePostModal({ isOpen, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [caption, setCaption] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fileInputRef = useRef(null)

  const currentUser = useAuthStore(state => state.user)

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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleFileSelect = e => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError('')
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setCaption('')
    setError('')
    onClose()
  }

  const handleShare = async () => {
    if (!selectedFile) return

    try {
      setIsSubmitting(true)
      setError('')

      const formData = new FormData()

      formData.append('image', selectedFile)
      if (caption.trim()) {
        formData.append('caption', caption)
      }

      await api.post('/posts', formData)

      handleClose()
      window.location.reload()
    } catch (err) {
      console.error('Error creating post:', err)
      setError(
        err.response?.data?.message || 'Failed to create post. Try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  if (!currentUser) return null

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className='absolute top-4 right-4 text-white hover:text-gray-300 z-50'
        disabled={isSubmitting}
      >
        <X size={32} />
      </button>

      <div
        className='bg-white flex flex-col w-full max-w-[800px] max-h-[80vh] rounded-xl overflow-hidden relative'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex items-center justify-between p-3 border-b border-gray-200'>
          <div className='w-10'></div>
          <h1 className='font-bold text-[16px] flex-1 text-center'>
            Create new post
          </h1>
          <div className='w-10 text-right'>
            {previewUrl && (
              <button
                onClick={handleShare}
                disabled={isSubmitting}
                className='text-[#0095f6] font-semibold text-[14px] hover:text-blue-800 transition-colors disabled:opacity-50 flex items-center gap-1 justify-end w-full'
              >
                {isSubmitting ? (
                  <Loader2 size={16} className='animate-spin' />
                ) : (
                  'Share'
                )}
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className='w-full bg-red-100 text-red-600 text-center py-2 text-sm font-semibold'>
            {error}
          </div>
        )}

        {!previewUrl ? (
          <div className='flex flex-col items-center justify-center p-20 min-h-[400px]'>
            <UploadCloud
              size={64}
              className='text-gray-800 mb-4'
              strokeWidth={1}
            />
            <h2 className='text-xl font-normal mb-6'>
              Drag photos and videos here
            </h2>
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
          <div className='flex flex-col md:flex-row h-full max-h-[70vh]'>
            <div className='w-full md:w-[60%] bg-gray-50 flex items-center justify-center border-r border-gray-200 min-h-[300px] relative'>
              <img
                src={previewUrl}
                alt='Preview'
                className={`max-w-full max-h-full object-contain ${isSubmitting ? 'opacity-50' : ''}`}
              />
            </div>

            <div className='w-full md:w-[40%] flex flex-col bg-white'>
              <div className='flex items-center gap-3 p-4'>
                <img
                  src={
                    currentUser.profile_image ||
                    'https://via.placeholder.com/150'
                  }
                  alt='author'
                  className='w-8 h-8 rounded-full object-cover border border-gray-200'
                />
                <span className='font-bold text-[14px]'>
                  {currentUser.username}
                </span>
              </div>

              <textarea
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder='Write a caption...'
                disabled={isSubmitting}
                className='w-full flex-1 p-4 resize-none focus:outline-none text-[16px] disabled:bg-gray-50'
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
