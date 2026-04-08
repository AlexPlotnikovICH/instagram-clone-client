import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/MainLayout'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичная зона */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Закрытая зона (работает только с токеном) */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Вложенные роуты. Атрибут index значит, что Feed покажется по умолчанию на пути "/" */}
          <Route index element={<Feed />} />
          {/* В будущем мы добавим сюда <Route path="profile" element={<Profile />} /> и т.д. */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
