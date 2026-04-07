import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import logo from '../assets/icons/ICHGRAMlogo.svg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)

  const handleSubmit = async e => {
    e.preventDefault()

    // Ждем, пока Axios сходит на бэкенд и вернет true/false
    const isSuccess = await login(email, password)

    // Если токен получен и записан — перекидываем юзера в Ленту
    if (isSuccess) {
      navigate('/')
    }
  }

  return (
    // Глав. конт.: на весь экран, по центру, фон белый
    <div className='flex min-h-screen items-center justify-center bg-white p-4'>
      {/* Контейнер форма логина */}
      <div className='w-full max-w-[350px] flex flex-col gap-3'>
        {/* Верхний блок с формой*/}
        <div className='flex flex-col items-center border border-gray-300 bg-white p-10'>
          <img src={logo} alt='Ichgram' className='mb-8 h-20' />

          <form onSubmit={handleSubmit} className='flex w-full flex-col gap-2'>
            <input
              type='text'
              placeholder='Username, or email'
              // привязываем значение к стейту
              value={email}
              // обновляем стейт при вводе
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
              className='mt-2 w-full rounded-lg bg-ichgram-blue py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600'
            >
              Log in
            </button>
          </form>

          {/* Разделитель OR */}
          <div className='my-4 flex w-full items-center gap-3'>
            <div className='h-[1px] flex-1 bg-gray-300'></div>
            <span className='text-[13px] font-semibold text-gray-500'>OR</span>
            <div className='h-[1px] flex-1 bg-gray-300'></div>
          </div>

          <a href='#' className='text-xs text-blue-900'>
            Forgot password?
          </a>
        </div>

        {/* Нижний блок регистрации */}
        <div className='flex items-center justify-center border border-gray-300 bg-white p-5 text-sm'>
          <p>
            Don't have an account?{' '}
            {/* Компонент Link из React Router для перехода без перезагрузки */}
            <Link to='/register' className='font-semibold text-ichgram-blue'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
