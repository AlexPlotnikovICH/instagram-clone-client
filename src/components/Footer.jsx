import { Link } from 'react-router-dom'

export default function Footer({ onOpenCreate, onToggleDrawer }) {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Search', action: () => onToggleDrawer('search') },
    { name: 'Explore', path: '/explore' },
    { name: 'Messages', path: '/messages' },
    { name: 'Notifications', action: () => onToggleDrawer('notifications') },
    { name: 'Create', action: onOpenCreate },
  ]

  return (
    <footer className='mt-10 flex w-full flex-col items-center justify-center pb-10 text-xs text-gray-400'>
      <div className='mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2'>
        {menuItems.map(item => {
          if (item.path) {
            return (
              <Link key={item.name} to={item.path} className='hover:underline'>
                {item.name}
              </Link>
            )
          }
          return (
            <button
              key={item.name}
              onClick={item.action}
              className='hover:underline cursor-pointer'
            >
              {item.name}
            </button>
          )
        })}
      </div>
      <p>© 2026 ICHgram</p>
    </footer>
  )
}
