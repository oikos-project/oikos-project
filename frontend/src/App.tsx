import React from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Main from './pages/Main'

function Home() {
  const backendUrl = import.meta.env.OIKOS_API_URL || 'http://localhost:51730';

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={4}>Welcome to Oikos Frontend!</Heading>
      <Text fontSize="lg" mb={4}>This is your React application with Chakra UI.</Text>
      <Text mb={4}>Backend API URL: {backendUrl}</Text>
      <Button colorScheme="teal" size="lg" as={Link} to="/register" mr={4}>Register</Button>
      <Button colorScheme="blue" size="lg" as={Link} to="/login">Login</Button>
    </Box>
  )
}

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
