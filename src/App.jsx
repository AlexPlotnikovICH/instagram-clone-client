import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import Messages from './pages/Messages'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/MainLayout'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset' element={<ResetPassword />} />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Feed />} />
          <Route path='explore' element={<Explore />} />
          <Route path='messages' element={<Messages />} />

          {/* Наш собственный профиль */}
          <Route path='profile' element={<Profile />} />
          <Route path='profile/edit' element={<EditProfile />} />

          {/*  Динамический роут для чужих профилей. */}
          <Route path=':username' element={<Profile />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
