import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import About from './pages/About'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element= {<LoginPage />} />
        <Route path="/home" element= {<HomePage />} />
        <Route path="/about" element= {<About />} />
      </Routes>
    </>
  )
}

export default App
