export default function PostOptionsModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const handleAction = actionName => {
    console.log(`Выбрано действие: ${actionName}`)
    // Если выбрали Copy Link, можно даже реально скопировать в буфер
    if (actionName === 'Copy link') {
      navigator.clipboard.writeText(window.location.href)
      alert('Ссылка скопирована!')
    }
    onClose() // Закрываем меню после любого действия
  }

  return (
    <div
      // z-[60] критически важно, чтобы перекрыть первую модалку
      className='fixed inset-0 z-[60] flex items-center justify-center bg-black/65'
      onClick={onClose}
    >
      <div
        className='bg-white w-[400px] rounded-xl flex flex-col overflow-hidden text-[14px]'
        onClick={e => e.stopPropagation()} // Блокировка клика, чтобы не закрылось
      >
        <button
          onClick={() => handleAction('Delete')}
          className='py-3.5 border-b border-gray-200 text-red-500 font-bold hover:bg-gray-50 active:bg-gray-100 transition-colors'
        >
          Delete
        </button>
        <button
          onClick={() => handleAction('Edit')}
          className='py-3.5 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors'
        >
          Edit
        </button>
        <button
          onClick={() => handleAction('Go to post')}
          className='py-3.5 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors'
        >
          Go to post
        </button>
        <button
          onClick={() => handleAction('Copy link')}
          className='py-3.5 border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors'
        >
          Copy link
        </button>
        <button
          onClick={onClose}
          className='py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
