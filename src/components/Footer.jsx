export default function Footer() {
  const links = [
    'Home',
    'Search',
    'Explore',
    'Messages',
    'Notifications',
    'Create',
  ]

  return (
    // mt-auto прижимает футер к низу, если контента мало
    <footer className='mt-10 flex w-full flex-col items-center justify-center pb-10 text-xs text-gray-400'>
      <div className='mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2'>
        {links.map(link => (
          <a key={link} href='#' className='hover:underline'>
            {link}
          </a>
        ))}
      </div>
      <p>© 2024 ICHgram</p>
    </footer>
  )
}
