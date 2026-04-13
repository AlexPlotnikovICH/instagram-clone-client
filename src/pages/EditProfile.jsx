import { useState, useRef, useEffect } from 'react'
import { Link as LinkIcon, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import useAuthStore from '../store/useAuthStore'

export default function EditProfile() {
  const navigate = useNavigate()

  // Достаем юзера и новую функцию обновления из стора
  const currentUser = useAuthStore(state => state.user)
  const updateUser = useAuthStore(state => state.updateUser)

  // Инициализируем стейты реальными данными
  const [fullname, setFullname] = useState(currentUser?.fullname || '')
  const [bio, setBio] = useState(currentUser?.bio || '')
  const [website, setWebsite] = useState('') // Заглушка

  // Стейты для файла аватара
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(
    currentUser?.profile_image || 'https://via.placeholder.com/150',
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fileInputRef = useRef(null)
  const BIO_MAX_CHARS = 150

  // Очистка памяти от временных ссылок
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Обработка выбора файла
  const handleFileSelect = e => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError('')
    }
  }

  // БОЕВАЯ ФУНКЦИЯ СОХРАНЕНИЯ (Плавный React-путь)
  const handleSave = async () => {
    try {
      setIsSubmitting(true)
      setError('')

      const formData = new FormData()
      formData.append('fullname', fullname)
      formData.append('bio', bio)

      if (selectedFile) {
        formData.append('profile_image', selectedFile)
      }

      // 1. Стучимся на правильный URL
      const response = await api.put('/users/profile', formData)

      // 2.  обновляем стейт в памяти
      updateUser(response.data)

      // 3. уходим на страницу профиля
      navigate('/profile')
    } catch (err) {
      console.error('Update profile error:', err)
      setError(err.response?.data?.message || 'Failed to update profile.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const labelClasses = 'block text-[16px] font-bold mb-2 mt-6'
  const inputClasses =
    'w-full border border-gray-300 rounded-lg p-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all disabled:bg-gray-100'

  if (!currentUser) return null // Защита от рендера без данных

  return (
    <div className='flex flex-col w-full min-h-screen pt-10 pb-10 pl-25 bg-white text-black'>
      <div className='w-full max-w-[600px] pr-4 flex flex-col mx-auto md:mx-0'>
        <h1 className='text-2xl font-bold mb-8'>Edit profile</h1>

        {error && (
          <div className='bg-red-100 text-red-600 p-3 rounded-lg mb-6 font-semibold text-sm'>
            {error}
          </div>
        )}

        <div className='flex items-center gap-5 bg-gray-200 rounded-2xl p-4 mb-8'>
          <div className='w-16 h-16 rounded-full border border-gray-300 p-0.5 flex-shrink-0'>
            <img
              src={previewUrl}
              alt='Current avatar'
              className={`w-full h-full rounded-full object-cover ${isSubmitting ? 'opacity-50' : ''}`}
            />
          </div>
          <div className='flex flex-col flex-1'>
            <span className='font-bold text-[16px]'>
              {currentUser.username}
            </span>
            <p className='text-gray-500 text-[12px] line-clamp-2 leading-tight'>
              {bio ? bio.split('\n')[0] + '...' : 'No bio yet...'}
            </p>
          </div>

          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept='image/*'
            className='hidden'
          />

          <button
            type='button'
            onClick={() => fileInputRef.current.click()}
            disabled={isSubmitting}
            className='bg-[#0095f6] hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-[14px] transition-colors disabled:opacity-50'
          >
            New photo
          </button>
        </div>

        <form onSubmit={e => e.preventDefault()} className='w-full'>
          <div className='relative'>
            <label htmlFor='fullname' className={labelClasses}>
              Full Name
            </label>
            <input
              id='fullname'
              type='text'
              value={fullname}
              onChange={e => setFullname(e.target.value)}
              disabled={isSubmitting}
              className={inputClasses}
              placeholder='Your full name'
            />
          </div>

          <div className='relative'>
            <label htmlFor='website' className={labelClasses}>
              Website{' '}
              <span className='text-gray-400 font-normal text-sm'>
                (Not supported yet)
              </span>
            </label>
            <div className='relative'>
              <LinkIcon
                size={18}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
              />
              <input
                id='website'
                type='text'
                value={website}
                onChange={e => setWebsite(e.target.value)}
                disabled={isSubmitting}
                className={`${inputClasses} pl-10`}
                placeholder='https://yoursite.com'
              />
            </div>
          </div>

          <div className='relative'>
            <label htmlFor='bio' className={labelClasses}>
              Bio
            </label>
            <textarea
              id='bio'
              value={bio}
              disabled={isSubmitting}
              onChange={e => {
                if (e.target.value.length <= BIO_MAX_CHARS) {
                  setBio(e.target.value)
                }
              }}
              className={`${inputClasses} resize-none`}
              rows={5}
              placeholder='Tell about yourself...'
            />
            <div className='text-right text-[12px] text-gray-400 mt-1'>
              {bio.length} / {BIO_MAX_CHARS}
            </div>
          </div>

          <div className='mt-10 flex justify-center md:justify-start'>
            <button
              type='button'
              onClick={handleSave}
              disabled={isSubmitting}
              className='bg-[#0095f6] hover:bg-blue-600 text-white px-20 py-3 rounded-lg font-bold text-[16px] transition-colors w-full md:w-fit flex justify-center items-center gap-2 disabled:opacity-50'
            >
              {isSubmitting && <Loader2 size={18} className='animate-spin' />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
