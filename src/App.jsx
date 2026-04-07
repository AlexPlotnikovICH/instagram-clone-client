import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичные роуты, сюда пускаем всех без проверки */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />{' '}
        {/* <-- Прорубили дверь */}
        {/* Защищенные роуты*/}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
