import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './auth/pages/Register'
import Login from './auth/pages/Login'
import Main from './pages/Main'
import Home from './home/pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  )
}

export default App
