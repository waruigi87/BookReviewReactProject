import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import About from './pages/About'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute'
import Header from './components/Header'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element= {
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
          } />
        <Route path="/signup" element= {
          <PublicRoute>
              <SignUpPage />
          </PublicRoute>
          } />
        <Route path="/home" element= {
          <ProtectedRoute>
            <Header />
            <HomePage />
          </ProtectedRoute>
          } />
        <Route path="/about" element= {
          <ProtectedRoute>
            <Header />
            <About />
          </ProtectedRoute>
          
          } />
      </Routes>
    </>
  )
}

export default App
