import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/icons/ICHGRAMlogo.svg'
import useAuthStore from '../store/useAuthStore'
import { Loader2 } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const register = useAuthStore(state => state.register)

  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if (isSubmitting) return

    setErrors({})

    // Валидация на фронте
    if (password.length < 6) {
      setErrors({ general: 'Password must be at least 6 characters.' })
      return
    }

    setIsSubmitting(true)
    const userData = { email, fullName, username, password }
    const response = await register(userData)

    if (response.success) {
      navigate('/login')
    } else {
      setIsSubmitting(false)
      // Если бэк вернул ошибку уникальности
      if (
        response.error.toLowerCase().includes('exist') ||
        response.error.toLowerCase().includes('существует')
      ) {
        setErrors({ username: 'This username or email is already taken.' })
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
          <p className='mb-6 font-semibold text-gray-500 text-[16px] leading-tight'>
            Sign up to see photos and videos from your friends.
          </p>

          <form onSubmit={handleSubmit} className='flex w-full flex-col gap-2'>
            <input
              type='email'
              placeholder='Email'
              value={email}
              required
              disabled={isSubmitting}
              onChange={e => setEmail(e.target.value)}
              className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none disabled:opacity-70'
            />
            <input
              type='text'
              placeholder='Full Name'
              value={fullName}
              disabled={isSubmitting}
              onChange={e => setFullName(e.target.value)}
              className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none disabled:opacity-70'
            />
            <div className='flex w-full flex-col'>
              <input
                type='text'
                placeholder='Username'
                value={username}
                disabled={isSubmitting}
                onChange={e => setUsername(e.target.value)}
                className={`w-full rounded-sm border bg-gray-50 px-2 py-2 text-sm focus:outline-none ${
                  errors.username
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-gray-400'
                } disabled:opacity-70`}
              />
              {errors.username && (
                <p className='mt-1 text-left text-[11px] text-red-500 font-medium'>
                  {errors.username}
                </p>
              )}
            </div>
            <input
              type='password'
              placeholder='Password'
              value={password}
              disabled={isSubmitting}
              onChange={e => setPassword(e.target.value)}
              className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none disabled:opacity-70'
            />

            {errors.general && (
              <p className='text-[12px] text-red-500 font-medium'>
                {errors.general}
              </p>
            )}

            <p className='mt-2 text-center text-[11px] text-gray-400'>
              By signing up, you agree to our{' '}
              <span className='font-semibold'>Terms</span> and{' '}
              <span className='font-semibold'>Privacy Policy</span>.
            </p>

            <button
              type='submit'
              disabled={isSubmitting}
              className='mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0095f6] py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300'
            >
              {isSubmitting && <Loader2 size={16} className='animate-spin' />}
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </form>
        </div>

        <div className='flex items-center justify-center border border-gray-300 bg-white p-5 text-sm'>
          <p className='text-gray-600'>
            Have an account?{' '}
            <Link to='/login' className='font-semibold text-[#0095f6]'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
