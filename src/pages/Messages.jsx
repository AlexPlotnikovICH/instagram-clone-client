import { useOutletContext } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Messages() {
  // "пульт" для футера
  const { onOpenCreate, onToggleDrawer } = useOutletContext()

  // Фейковые чаты
  const chats = [
    {
      id: 1,
      username: 'nikiita',
      lastMsg: 'Nikiita sent a message.',
      time: '2 wek',
      avatar: 'https://i.pravatar.cc/150?img=12',
      active: true, // Выделен серым
    },
    {
      id: 2,
      username: 'sashaa',
      lastMsg: 'Sashaa sent a message.',
      time: '2 wek',
      avatar: 'https://i.pravatar.cc/150?img=1',
      active: false,
    },
  ]

  return (
    // Главный контейнер жестко фиксируем по высоте экрана
    <div className='flex flex-col h-screen w-full bg-white'>
      {/* ОСНОВНАЯ ЗОНА ЧАТОВ (Занимает все свободное место над футером) */}
      <div className='flex flex-1 overflow-hidden'>
        {/* ========================================= */}
        {/* ЛЕВАЯ КОЛОНКА (Список чатов) */}
        {/* ========================================= */}
        <div className='w-[350px] border-r border-gray-200 flex flex-col'>
          <div className='p-6 flex justify-between items-center'>
            <h2 className='text-xl font-bold'>itcareerhub</h2>
          </div>

          <div className='flex-1 overflow-y-auto'>
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                  chat.active ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={chat.avatar}
                  alt={chat.username}
                  className='w-14 h-14 rounded-full object-cover'
                />
                <div className='flex flex-col'>
                  <span className='font-medium text-[14px]'>
                    {chat.username}
                  </span>
                  <span className='text-gray-500 text-[12px]'>
                    {chat.lastMsg} · {chat.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================= */}
        {/* ПРАВАЯ КОЛОНКА (Активный чат) */}
        {/* ========================================= */}
        <div className='flex-1 flex flex-col'>
          {/* Шапка чата */}
          <div className='flex items-center gap-3 p-4 border-b border-gray-100'>
            <img
              src='https://i.pravatar.cc/150?img=12'
              alt='nikiita'
              className='w-10 h-10 rounded-full object-cover'
            />
            <span className='font-bold text-[16px]'>nikiita</span>
          </div>

          {/* Область сообщений (Скроллится только она!) */}
          <div className='flex-1 overflow-y-auto p-6 flex flex-col'>
            {/* Инфо профиля */}
            <div className='flex flex-col items-center mb-10 mt-6'>
              <img
                src='https://i.pravatar.cc/150?img=12'
                alt='nikiita'
                className='w-24 h-24 rounded-full object-cover mb-4'
              />
              <h2 className='text-xl font-bold mb-1'>nikiita</h2>
              <p className='text-gray-500 text-[14px] mb-4'>
                nikiita · ICHgram
              </p>
              <button className='bg-gray-100 hover:bg-gray-200 text-black px-4 py-1.5 rounded-lg font-semibold text-[14px] transition-colors'>
                View profile
              </button>
            </div>

            {/* Дата */}
            <div className='text-center text-gray-500 text-[12px] mb-6'>
              Jun 26, 2024, 08:49 PM.
            </div>

            {/* Входящее сообщение */}
            <div className='flex items-end gap-2 mb-6'>
              <img
                src='https://i.pravatar.cc/150?img=12'
                alt='nikiita'
                className='w-8 h-8 rounded-full object-cover'
              />
              <div className='bg-gray-100 text-black px-4 py-3 rounded-2xl rounded-bl-sm max-w-[60%] text-[14px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>

            {/* Исходящее сообщение */}
            <div className='flex items-end justify-end gap-2 mb-6'>
              <div className='bg-[#4F00FF] text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-[60%] text-[14px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <img
                src='/ich-avatar.png'
                alt='My avatar'
                className='w-8 h-8 rounded-full object-cover border border-gray-200 bg-white p-0.5'
              />
            </div>
          </div>

          {/* Поле ввода (прибито под сообщениями) */}
          <div className='p-4 mb-2'>
            <div className='border border-gray-300 rounded-full px-6 py-3'>
              <input
                type='text'
                placeholder='Write message'
                className='w-full outline-none text-[14px] bg-transparent'
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* ФУТЕР*/}
      {/* ========================================= */}
      <div className='shrink-0 pb-4'>
        <Footer onOpenCreate={onOpenCreate} onToggleDrawer={onToggleDrawer} />
      </div>
    </div>
  )
}
