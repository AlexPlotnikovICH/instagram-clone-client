import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [loginString, setLoginString] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    // SIMULATE SUBMISSION
    if (!loginString.trim()) return

    alert(
      `Если аккаунт ${loginString} существует, мы отправили на него ссылку для сброса пароля.`,
    )
    navigate('/login')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-white p-4'>
      <div className='w-full max-w-[380px] flex flex-col'>
        {/* ОСНОВНОЙ БЛОК */}
        <div className='flex flex-col items-center border border-gray-300 bg-white px-10 pt-10 pb-6 text-center rounded-t-sm'>
          {/* Иконка замка */}
          <div className='mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-black'>
            <Lock size={48} strokeWidth={1.5} />
          </div>

          <h2 className='mb-3 text-[16px] font-bold'>Trouble logging in?</h2>

          <p className='mb-4 text-[14px] text-gray-500 leading-tight'>
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </p>

          <form onSubmit={handleSubmit} className='flex w-full flex-col gap-3'>
            <input
              type='text'
              placeholder='Email or Username'
              value={loginString}
              onChange={e => setLoginString(e.target.value)}
              className='w-full rounded-sm border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none'
              required
            />

            <button
              type='submit'
              className='mt-1 w-full rounded-lg bg-ichgram-blue py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600'
            >
              Reset your password
            </button>
          </form>

          {/* Разделитель OR */}
          <div className='my-5 flex w-full items-center gap-4'>
            <div className='h-px flex-1 bg-gray-300'></div>
            <span className='text-[12px] font-bold text-gray-400'>OR</span>
            <div className='h-px flex-1 bg-gray-300'></div>
          </div>

          <Link
            to='/register'
            className='text-[14px] font-bold text-gray-900 hover:text-gray-600 transition-colors'
          >
            Create new account
          </Link>
        </div>

        {/* НИЖНИЙ БЛОК: Back to login */}
        <div className='flex items-center justify-center border border-t-0 border-gray-300 bg-gray-50 p-3 rounded-b-sm'>
          <Link
            to='/login'
            className='text-[14px] font-bold text-gray-900 hover:text-gray-600 transition-colors'
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
