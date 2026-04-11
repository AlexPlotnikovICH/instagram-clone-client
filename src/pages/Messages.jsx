import { Send, Image, Heart } from 'lucide-react'

export default function Messages() {
  // Фейковые чаты для левой колонки
  const chats = [
    {
      id: 1,
      username: 'nikiita',
      lastMsg: 'Nikiita sent a message.',
      time: '2 wek',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: 2,
      username: 'sashaa',
      lastMsg: 'Sashaa sent a message.',
      time: '2 wek',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
  ]

  return (
    // pl-25 - твой вчерашний стандарт. h-screen, чтобы не было лишнего скролла страницы.
    <div className='flex h-screen w-full pl-25 bg-white'>
      {/* ЛЕВАЯ КОЛОНКА: Список чатов (350px) */}
      <div className='w-[350px] border-r border-gray-200 flex flex-col'>
        <div className='p-6 flex justify-between items-center'>
          <h2 className='text-xl font-bold'>itcareerhub</h2>
          {/* Иконка "новое сообщение" (можно добавить потом) */}
        </div>

        <div className='flex-1 overflow-y-auto'>
          {chats.map(chat => (
            <div
              key={chat.id}
              className='flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors'
            >
              <img
                src={chat.avatar}
                alt={chat.username}
                className='w-14 h-14 rounded-full object-cover'
              />
              <div className='flex flex-col'>
                <span className='font-medium text-[14px]'>{chat.username}</span>
                <span className='text-gray-500 text-[12px]'>
                  {chat.lastMsg} · {chat.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ПРАВАЯ КОЛОНКА: Область чата */}
      <div className='flex-1 flex flex-col'>
        {/* Если чат не выбран (или как у нас сейчас - статичная заглушка) */}
        <div className='flex-1 flex flex-col items-center justify-center p-10 text-center'>
          {/* Иконка в круге */}
          <div className='w-24 h-24 border-2 border-black rounded-full flex items-center justify-center mb-4'>
            <Send size={40} strokeWidth={1.5} />
          </div>
          <h3 className='text-xl font-medium'>Your messages</h3>
          <p className='text-gray-500 mt-2'>
            Send private photos and messages to a friend or group.
          </p>
          <button className='mt-6 bg-ichgram-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors'>
            Send message
          </button>
        </div>

        {/* НИЖНЯЯ ПАНЕЛЬ ВВОДА (просто для визуала) */}
        <div className='p-4 border-t border-gray-200'>
          <div className='relative flex items-center border border-gray-300 rounded-full px-4 py-2'>
            <input
              type='text'
              placeholder='Message...'
              className='flex-1 outline-none text-[14px]'
            />
            <div className='flex gap-3 text-gray-500'>
              <Image size={20} className='cursor-pointer' />
              <Heart size={20} className='cursor-pointer' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
