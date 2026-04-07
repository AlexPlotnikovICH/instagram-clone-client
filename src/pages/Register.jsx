import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/icons/ICHGRAMlogo.svg'
import useAuthStore from '../store/useAuthStore'

export default function Register() {
  const navigate = useNavigate()
  const register = useAuthStore(state => state.register)

  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('') // Сбрасываем старую ошибку перед новым броском

    // Формируем объект, который ждет наш Zustand
    const userData = { email, fullName, username, password }

    // Ждем ответ от бэкенда.
    const response = await register(userData)

    if (response.success) {
      // Успех: бэкенд создал юзера (статус 201).
      // Отправляем его ручками вбивать пароль на страницу входа.
      navigate('/login')
    } else {
      // Провал: бэкенд ругается (дубликат или пустые поля).
      // Кладем текст ошибки в стейт, чтобы верстка показала красный текст.
      setError(response.error)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-white p-4'>
      <div className='w-full max-w-[350px] flex flex-col gap-3'>
        <div className='flex flex-col items-center border border-gray-300 bg-white p-10 text-center'>
          <img src={logo} alt='Ichgram' className='mb-4 h-12' />
          <p className='mb-6 font-semibold text-gray-500'>
            Sign up to see photos and videos from your friends.
          </p>

          <form onSubmit={handleSubmit} className='flex w-full flex-col gap-2'>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none'
            />

            <input
              type='text'
              placeholder='Full Name'
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none'
            />

            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none'
            />

            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none'
            />

            {/* Блок вывода ошибки */}
            {error && <p className='text-sm text-red-500 my-2'>{error}</p>}

            <p className='my-3 text-xs text-gray-500'>
              People who use our service may have uploaded your contact
              information to Instagram.
            </p>

            <button
              type='submit'
              className='mt-2 w-full rounded-lg bg-ichgram-blue py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600'
            >
              Sign up
            </button>
          </form>
        </div>

        <div className='flex items-center justify-center border border-gray-300 bg-white p-5 text-sm'>
          <p>
            Have an account?{' '}
            <Link to='/login' className='font-semibold text-ichgram-blue'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
