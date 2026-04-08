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
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    setErrors({}) // Сбрасываем все ошибки перед новым запросом

    const userData = { email, fullName, username, password }
    const response = await register(userData)

    if (response.success) {
      navigate('/login')
    } else {
      setPassword('')

      if (response.error.includes('существует')) {
        // Вешаем ошибку конкретно на поле username, как в макете
        setErrors({ username: 'This username or email is already taken.' })
      } else if (response.error.includes('заполните')) {
        setErrors({ general: 'Please fill in all fields.' })
      } else {
        setErrors({ general: response.error })
      }
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

            <div className='flex w-full flex-col'>
              <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                // Если есть ошибка username, рамка становится красной
                className={`w-full rounded-sm border bg-gray-50 px-2 py-2 text-sm focus:outline-none ${
                  errors.username
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-gray-400'
                }`}
              />
              {/* Точечный вывод текста ошибки */}
              {errors.username && (
                <p className='mt-1 text-left text-[11px] text-red-500'>
                  {errors.username}
                </p>
              )}
            </div>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none'
            />

            <p className='mt-2 text-center text-[12px] text-gray-500'>
              People who use our service may have uploaded your contact
              information to Instagram.{' '}
              <a href='#' className='font-semibold text-[#00376b]'>
                Learn More
              </a>
            </p>
            <p className='mb-4 text-center text-[12px] text-gray-500'>
              By signing up, you agree to our{' '}
              <a href='#' className='font-semibold text-[#00376b]'>
                Terms
              </a>
              ,{' '}
              <a href='#' className='font-semibold text-[#00376b]'>
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href='#' className='font-semibold text-[#00376b]'>
                Cookies Policy
              </a>
              .
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
