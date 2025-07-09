import React from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'

function App() {
  const backendUrl = import.meta.env.OIKOS_API_URL || 'http://localhost:5000';

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={4}>Welcome to Oikos Frontend!</Heading>
      <Text fontSize="lg" mb={4}>This is your React application with Chakra UI.</Text>
      <Text mb={4}>Backend API URL: {backendUrl}</Text>
      <Button colorScheme="teal" size="lg">Get Started</Button>
    </Box>
  )
}

export default App