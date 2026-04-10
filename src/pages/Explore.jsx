import React from 'react'
// Функция для генерации цветных паттернов-заглушек (data URI)
// Это гарантирует, что картинки загрузятся всегда и мгновенно.
const generatePatternUrl = (color1, color2, text) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#grad)" />
      <text x="50%" y="50%" font-family="sans-serif" font-size="40" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.8">
        ${text}
      </text>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export default function Explore() {
  // Фейковая база данных с ГАРАНТИРОВАННЫМИ картинками
  const dummyExplore = [
    { id: 1, image: generatePatternUrl('#FF6B6B', '#FF8E53', '0') },
    { id: 2, image: generatePatternUrl('#4ECDC4', '#556270', '1') },
    { id: 3, image: generatePatternUrl('#C7F464', '#FF6B6B', '2 (BIG)') }, // Эта будет большой (индекс 2)
    { id: 4, image: generatePatternUrl('#556270', '#FF8E53', '3') },
    { id: 5, image: generatePatternUrl('#A8E6CF', '#DCEDC1', '4') },
    { id: 6, image: generatePatternUrl('#FFD3B6', '#FFAAA5', '5 (BIG)') }, // Эта будет большой (индекс 5)
    { id: 7, image: generatePatternUrl('#FF8C94', '#FFD3B6', '6') },
    { id: 8, image: generatePatternUrl('#E0E3DA', '#FFFFF3', '7') },
    { id: 9, image: generatePatternUrl('#8D909B', '#E0E3DA', '8') },
    { id: 10, image: generatePatternUrl('#F67280', '#C06C84', '9') },
    { id: 11, image: generatePatternUrl('#6C5B7B', '#355C7D', '10') },
    { id: 12, image: generatePatternUrl('#99B898', '#FECEAB', '11') },
  ]

  return (
    <div className='flex flex-col w-full items-center pt-10 pb-20'>
      <div className='w-full max-w-[935px] px-4'>
        {/* СЕТКА */}
        <div className='grid grid-cols-3 gap-1 auto-rows-[300px]'>
          {dummyExplore.map((post, index) => {
            // Математика паттерна: большие картинки на позициях 2, 5, 12, 15...
            const isLarge = index % 10 === 2 || index % 10 === 5

            return (
              <div
                key={post.id}
                className={`relative group cursor-pointer ${isLarge ? 'row-span-2' : ''}`}
              >
                {/* Картинка. object-cover критически важен. */}
                <img
                  src={post.image}
                  alt={`Explore item ${index}`}
                  className='w-full h-full object-cover'
                />

                {/* Hover-эффект */}
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center'>
                  <span className='text-white opacity-0 group-hover:opacity-100 font-bold text-xl transition-opacity'>
                    View
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
