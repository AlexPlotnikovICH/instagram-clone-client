import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import logo from '../assets/icons/ICHGRAMlogo.svg'
import iphonePhones from '../assets/images/iphone-frames.png'
import { Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false)

  const login = useAuthStore(state => state.login)
  const demoLogin = useAuthStore(state => state.demoLogin)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setError('')

    const response = await login(email, password)

    if (response.success) {
      navigate('/')
    } else {
      setError(response.error || 'Invalid email or password')
      setIsSubmitting(false)
    }
  }

  const handleDemoLogin = async () => {
    if (isDemoSubmitting) return

    setIsDemoSubmitting(true)
    setError('')

    const response = await demoLogin()

    if (response.success) {
      navigate('/')
    } else {
      setError(response.error || 'Failed to login as demo user')
      setIsDemoSubmitting(false)
    }
  }

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-gray-50 px-4'>
      <div className='flex w-full max-w-[850px] items-center justify-center gap-8'>
        <div className='hidden h-[600px] w-[380px] shrink-0 md:block'>
          <img
            src={iphonePhones}
            alt='Phones'
            className='h-full w-full object-contain'
          />
        </div>

        <div className='flex w-full max-w-[350px] flex-col shrink-0'>
          <div className='flex flex-col items-center rounded-sm border border-gray-300 bg-white p-10 pb-6 shadow-sm'>
            <img src={logo} alt='logo' className='mb-10 w-44' />

            <form
              onSubmit={handleSubmit}
              className='flex w-full flex-col gap-2'
            >
              <input
                type='text'
                placeholder='Username, or email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isSubmitting || isDemoSubmitting}
                className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none disabled:opacity-70'
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isSubmitting || isDemoSubmitting}
                className='w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:border-gray-400 focus:outline-none disabled:opacity-70'
              />

              <button
                type='submit'
                disabled={isSubmitting || isDemoSubmitting}
                className='mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-[#0095f6] py-1.5 text-sm font-semibold text-white hover:bg-[#1877f2] disabled:bg-blue-300'
              >
                {isSubmitting && <Loader2 size={16} className='animate-spin' />}
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            {error && (
              <p className='mt-4 text-center text-xs font-medium text-red-500'>
                {error}
              </p>
            )}

            <div className='mt-6 flex w-full items-center justify-between gap-2'>
              <div className='h-px w-full bg-gray-300'></div>
              <span className='text-xs font-semibold text-gray-500'>OR</span>
              <div className='h-px w-full bg-gray-300'></div>
            </div>

            <button
              type='button'
              onClick={handleDemoLogin}
              disabled={isDemoSubmitting || isSubmitting}
              className='mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 py-1.5 text-sm font-semibold text-white hover:bg-gray-900 disabled:bg-gray-400'
            >
              {isDemoSubmitting && <Loader2 size={16} className='animate-spin' />}
              {isDemoSubmitting ? 'Loading...' : 'Log in as Demo Guest'}
            </button>

            <Link
              to='/reset'
              className='mb-2 mt-6 block text-center text-[12px] text-[#00376b] hover:underline'
            >
              Forgot password?
            </Link>
          </div>

          <div className='mt-3 flex w-full justify-center rounded-sm border border-gray-300 bg-white p-6 shadow-sm'>
            <p className='text-sm text-gray-600'>
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