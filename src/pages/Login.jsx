import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import logo from '../assets/icons/ICHGRAMlogo.svg'

import iphonePhones from '../assets/images/iphone-frames.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    const success = await login(email, password)
    if (success) {
      navigate('/')
    } else {
      setError('Неверный email или пароль')
    }
  }

  return (
    // ГЛАВНЫЙ КОНТЕЙНЕР (на весь экран, центрирует контент)
    <div className='flex min-h-screen w-full items-center justify-center bg-gray-50 px-4'>
      {/* ВНУТРЕННИЙ ФЛЕКС-КОНТЕЙНЕР (Ограничивает ширину, держит две колонки) */}
      <div className='flex w-full max-w-[850px] items-center justify-center gap-8'>
        {/* ЛЕВАЯ КОЛОНКА: Айфоны (Скрыта на мобильных, видна от md и выше) */}
        <div className='hidden h-[600px] w-[380px] shrink-0 md:block'>
          <img
            src={iphonePhones}
            alt='Instagram on iPhones'
            className='h-full w-full object-contain'
          />
        </div>

        {/* ПРАВАЯ КОЛОНКА: форма логина */}
        <div className='flex w-full max-w-[350px] flex-col shrink-0'>
          {/* Блок формы */}
          <div className='flex flex-col items-center rounded-sm border border-gray-300 bg-white p-10 pb-6 shadow-sm'>
            <img src={logo} alt='ICHGRAM logo' className='mb-10 w-44' />

            <form
              onSubmit={handleSubmit}
              className='flex w-full flex-col gap-2'
            >
              <input
                type='text'
                placeholder='Username, or email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none'
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none'
              />

              <button
                type='submit'
                className='mt-2 w-full rounded-md bg-[#0095f6] py-1.5 text-sm font-semibold text-white hover:bg-[#1877f2]'
              >
                Log in
              </button>
            </form>

            {error && <p className='mt-4 text-xs text-red-500'>{error}</p>}

            <div className='mt-6 flex w-full items-center justify-between gap-2'>
              <div className='h-px w-full bg-gray-300'></div>
              <span className='text-xs font-semibold text-gray-500'>OR</span>
              <div className='h-px w-full bg-gray-300'></div>
            </div>

            <a href='#' className='mt-6 text-xs text-[#00376b]'>
              Forgot password?
            </a>
          </div>

          {/* Блок "Don't have an account?" */}
          <div className='mt-3 flex w-full justify-center rounded-sm border border-gray-300 bg-white p-6 shadow-sm'>
            <p className='text-sm'>
              Don't have an account?{' '}
              <Link to='/register' className='font-semibold text-[#0095f6]'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
