import React from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { getApiBaseUrl } from '../utils/api'

function Home() {
  const backendUrl = getApiBaseUrl();

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
