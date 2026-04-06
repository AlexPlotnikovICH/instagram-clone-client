import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Feed from './pages/Feed'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
