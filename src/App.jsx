import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/MainLayout'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичная зона */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

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
          <Route path='explore' element={<Explore />} />{' '}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
