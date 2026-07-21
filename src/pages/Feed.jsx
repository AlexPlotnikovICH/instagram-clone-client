import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import Post from '../components/Post'
import Footer from '../components/Footer'
import api from '../api'

export default function Feed() {
  const { onOpenCreate, onToggleDrawer } = useOutletContext()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // Our api.js will automatically add the Bearer token to headers
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (err) {
        console.error('Ошибка загрузки ленты:', err)
        setError('Could not load posts. Try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className='flex min-h-screen w-full items-center justify-center'>
        <Loader2 className='animate-spin text-gray-400' size={40} />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex min-h-screen w-full items-center justify-center text-red-500 font-semibold'>
        {error}
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen w-full items-start pl-24 bg-transparent pt-10'>
      <div className='flex flex-col w-full max-w-[847px]'>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-[39px] pb-10'>
          {/* Use _id from MongoDB as the key */}
          {posts.map(post => (
            <Post key={post._id} post={post} />
          ))}

          {posts.length === 0 && (
            <p className='text-gray-500 text-center col-span-full'>
              No posts yet. Be the first!
            </p>
          )}
        </div>

        <div className='flex flex-col items-center justify-center py-10 pb-20'>
          <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-400'>
            <Check size={40} className='text-red-400' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>
            You've seen all the updates
          </h3>
        </div>

        <Footer onOpenCreate={onOpenCreate} onToggleDrawer={onToggleDrawer} />
      </div>
    </div>
  )
}
