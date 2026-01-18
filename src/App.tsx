import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Layout from './components/Layout'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <Layout>
              <HomePage />
            </Layout>
          </PublicRoute>
        } />
        
        <Route path="/login" element= {
          <PublicRoute>
            <Layout>
              <LoginPage />
            </Layout>
          </PublicRoute>
          } />
        <Route path="/signup" element= {
          <PublicRoute>
            <Layout>
              <SignUpPage />
            </Layout>
              
          </PublicRoute>
          } />
        <Route path="/home" element= {
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
          } />
        <Route path="/about" element= {
          <ProtectedRoute>
            <Layout>
              <About />
            </Layout>   
          </ProtectedRoute>
          
          } />
      </Routes>
    </>
  )
}

export default App
