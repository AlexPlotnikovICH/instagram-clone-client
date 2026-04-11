import Footer from '../components/Footer'

export default function NotFound() {
  return (
    // pl-25 - держим наш стандарт отступа.
    // min-h-screen и flex-col нужны, чтобы прижать футер к низу, если контента мало
    <div className='flex flex-col w-full min-h-screen pt-10 pb-10 pl-25 bg-white'>
      {/* Основной блок с контентом по центру */}
      <div className='flex-1 flex items-center justify-center w-full max-w-[935px] pr-4'>
        <div className='flex items-center gap-10'>
          {/* Картинка */}
          <div className='w-1/2 flex justify-end'>
            <img
              src='src/assets/images/iphone-frames.png'
              alt='404 Page Not Found'
              className='max-w-[300px] object-contain'
            />
          </div>

          {/* Текст */}
          <div className='w-1/2 flex flex-col justify-center pl-10'>
            <h2 className='text-[24px] font-bold mb-4 leading-tight'>
              Oops! Page Not Found (404 Error)
            </h2>
            <p className='text-gray-500 text-[16px] leading-relaxed'>
              We're sorry, but the page you're looking for doesn't seem to
              exist. If you typed the URL manually, please double-check the
              spelling. If you clicked on a link, it may be outdated or broken.
            </p>
          </div>
        </div>
      </div>

      {/* ФУТЕР */}
      <div className='w-full max-w-[935px] mt-auto'>
        <Footer />
      </div>
    </div>
  )
}
