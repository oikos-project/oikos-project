import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './auth/pages/Register'
import Login from './auth/pages/Login'
import Chat from './chat/pages/Chat' // This is the Chat page
import Home from './home/pages/Home'
import { useAuth } from './auth/hooks/useAuth'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
