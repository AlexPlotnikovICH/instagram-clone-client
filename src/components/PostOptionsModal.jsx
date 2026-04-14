export default function PostOptionsModal({
  isOpen,
  onClose,
  isOwnPost,
  postId,
  onDeletePost,
}) {
  if (!isOpen) return null

  const handleAction = actionName => {
    if (actionName === 'Copy link') {
      // Формируем прямую ссылку на пост, даже если самого роута на фронте пока нет
      const postUrl = `${window.location.origin}/p/${postId}`
      navigator.clipboard.writeText(postUrl)
      alert(`Ссылка скопирована:\n${postUrl}`)
    } else if (actionName === 'Edit' || actionName === 'Go to post') {
      alert('Функция в разработке 🛠')
    } else if (actionName === 'Delete') {
      if (window.confirm('Точно удалить этот пост? Действие необратимо.')) {
        onDeletePost(postId)
      }
    }

    onClose()
  }

  return (
    <div
      className='fixed inset-0 z-[60] flex items-center justify-center bg-black/65'
      onClick={onClose}
    >
      <div
        className='bg-white w-[400px] rounded-xl flex flex-col overflow-hidden text-[14px]'
        onClick={e => e.stopPropagation()}
      >
        {/* Рендерим Delete и Edit ТОЛЬКО если пост принадлежит текущему юзеру */}
        {isOwnPost && (
          <>
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
          </>
        )}

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
