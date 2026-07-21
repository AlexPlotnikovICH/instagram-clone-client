import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import PostModal from '../components/PostModal'
import api from '../api'

export default function Explore() {
  const [explorePosts, setExplorePosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 2. Added state for opening a post
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const fetchExplorePosts = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/posts/explore')
        setExplorePosts(response.data)
      } catch (error) {
        console.error('Ошибка при загрузке рекомендаций:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExplorePosts()
  }, [])

  return (
    <div className='flex flex-col w-full pt-10 pb-20 pl-25'>
      <div className='w-full max-w-[935px]'>
        {isLoading ? (
          <div className='text-center text-gray-500 py-10 font-semibold'>
            Loading posts...
          </div>
        ) : explorePosts.length === 0 ? (
          <div className='text-center text-gray-500 py-10 font-semibold'>
            No posts found.
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-1 auto-rows-[300px]'>
            {explorePosts.map((post, index) => {
              const isLarge = index % 10 === 2 || index % 10 === 5

              return (
                <div
                  key={post._id}
                  onClick={() => setSelectedPost(post)} // 3. Added click handler
                  className={`relative group cursor-pointer bg-gray-100 ${isLarge ? 'row-span-2' : ''}`}
                >
                  <img
                    src={post.image}
                    alt='Explore item'
                    className='w-full h-full object-cover'
                  />

                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center'>
                    <span className='text-white opacity-0 group-hover:opacity-100 font-bold text-xl transition-opacity'>
                      View
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className='mt-20 w-full'>
          <Footer />
        </div>
      </div>

      {/* 4. Render the modal window if a post is selected */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  )
}
