import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import About from './pages/About'
import './App.css'
import SignUpPage from './pages/SignUpPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/signup" element= {<SignUpPage />} />
        <Route path="/home" element= {<HomePage />} />
        <Route path="/about" element= {<About />} />
      </Routes>
    </>
  )
}

export default App
