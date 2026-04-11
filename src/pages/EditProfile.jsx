import { useState } from 'react'
import { Link as LinkIcon } from 'lucide-react'

export default function EditProfile() {
  // Те самые стейты, которые спасут нас при подключении бэкенда.
  // Мы инициализируем их текущими данными юзера.
  const [username, setUsername] = useState('ichschool')
  const [website, setWebsite] = useState('bit.ly/3rpilbh')
  const [about, setAbout] = useState(
    '• Гарантия помощи с трудоустройством в ведущие IT-компании\n• Выпускники зарабатывают от 45k евро\nБЕСПЛАТНАЯ',
  )

  const BIO_MAX_CHARS = 150

  // Функция, которая потом будет отправлять данные на сервер
  const handleSave = () => {
    const updatedData = { username, website, about }
    console.log('Sending to backend:', updatedData)
    alert('Сохранено (пока только в консоль)!')
    // Тут потом будет fetch/axios запрос к API
  }

  // Общие классы для лейблов инпутов
  const labelClasses = 'block text-[16px] font-bold mb-2 mt-6'
  // Общие классы для самих инпутов
  const inputClasses =
    'w-full border border-gray-300 rounded-lg p-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all'

  return (
    // pl-25 - держим глобальный строй!
    <div className='flex flex-col w-full min-h-screen pt-10 pb-10 pl-25 bg-white text-black'>
      <div className='w-full max-w-[600px] pr-4 flex flex-col mx-auto md:mx-0'>
        <h1 className='text-2xl font-bold mb-8'>Edit profile</h1>

        {/* ========================================= */}
        {/* БЛОК 1: АВАТАР И КНОПКА "NEW PHOTO" */}
        {/* ========================================= */}
        <div className='flex items-center gap-5 bg-gray-200 rounded-2xl p-4 mb-8'>
          {' '}
          <div className='w-16 h-16 rounded-full border border-gray-300 p-0.5 flex-shrink-0'>
            <img
              src='/ich-avatar.png'
              alt='Current avatar'
              className='w-full h-full rounded-full object-cover'
            />
          </div>
          <div className='flex flex-col flex-1'>
            <span className='font-bold text-[16px]'>{username}</span>
            <p className='text-gray-500 text-[12px] line-clamp-2 leading-tight'>
              {about.split('\n')[0]}...{' '}
              {/* Показываем только первую строку био */}
            </p>
          </div>
          <button className='bg-ichgram-blue hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-[14px] transition-colors'>
            New photo
          </button>
        </div>

        {/* ========================================= */}
        {/* БЛОК 2: ФОРМА РЕДАКТИРОВАНИЯ */}
        {/* ========================================= */}
        <form onSubmit={e => e.preventDefault()} className='w-full'>
          {/* Поле Username */}
          <div className='relative'>
            <label htmlFor='username' className={labelClasses}>
              Username
            </label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={inputClasses}
              placeholder='Your username'
            />
          </div>

          {/* Поле Website */}
          <div className='relative'>
            <label htmlFor='website' className={labelClasses}>
              Website
            </label>
            <div className='relative'>
              {/* Иконка ссылки внутри инпута */}
              <LinkIcon
                size={18}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
              />
              <input
                id='website'
                type='text'
                value={website}
                onChange={e => setWebsite(e.target.value)}
                // Обрати внимание на pl-10, чтобы текст не наезжал на иконку
                className={`${inputClasses} pl-10`}
                placeholder='https://yoursite.com'
              />
            </div>
          </div>

          {/* Поле About (Textarea) */}
          <div className='relative'>
            <label htmlFor='about' className={labelClasses}>
              About
            </label>
            <textarea
              id='about'
              value={about}
              // Ограничиваем ввод, если превышен лимит
              onChange={e => {
                if (e.target.value.length <= BIO_MAX_CHARS) {
                  setAbout(e.target.value)
                }
              }}
              className={`${inputClasses} resize-none`}
              rows={5}
              placeholder='Tell about yourself...'
            />
            {/* Счетчик символов */}
            <div className='text-right text-[12px] text-gray-400 mt-1'>
              {about.length} / {BIO_MAX_CHARS}
            </div>
          </div>

          {/* Кнопка SAVE */}
          <div className='mt-10 flex justify-center md:justify-start'>
            <button
              type='button' // Чтобы не отправлял форму по дефолту
              onClick={handleSave}
              className='bg-ichgram-blue hover:bg-blue-600 text-white px-20 py-3 rounded-lg font-bold text-[16px] transition-colors w-full md:w-fit'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
