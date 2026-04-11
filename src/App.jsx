import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import Messages from './pages/Messages'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/MainLayout'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичная зона */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Закрытая зона с Сайдбаром */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Вложенные роуты.*/}
          <Route index element={<Feed />} />
          <Route path='explore' element={<Explore />} />
          <Route path='messages' element={<Messages />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
