import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Feed from './pages/Feed'
import ProtectedRoute from './components/ProtectedRoute' // <-- Импортируем нашу таможню

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичный роут, сюда пускаем всех */}
        <Route path='/login' element={<Login />} />

        {/* Защищенный роут Ленты */}
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
