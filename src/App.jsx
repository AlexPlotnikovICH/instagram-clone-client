// Подключаем инструменты роутера
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Подключаем наши болванки страниц
import Login from './pages/Login'
import Feed from './pages/Feed'

function App() {
  return (
    // Оборачиваем всё приложение в провайдер роутера
    <BrowserRouter>
      <Routes>
        {/* Главная страница (Лента) */}
        <Route path='/' element={<Feed />} />
        {/* Страница авторизации */}
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
