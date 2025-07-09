import React, { useEffect } from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { getApiBaseUrl } from '../../shared/utils/api'
import { useAuth } from '../../auth/AuthContext'

function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const backendUrl = getApiBaseUrl();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

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

export default Home
