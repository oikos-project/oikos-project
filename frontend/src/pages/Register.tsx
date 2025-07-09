import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const backendUrl = import.meta.env.OIKOS_API_URL || 'http://localhost:51730';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${backendUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Registration successful!');
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.message || data.error || 'Registration failed.');
      }
    } catch (error) {
      setMessage('Network error or server is unreachable.');
      console.error('Registration error:', error);
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="xl" textAlign="center" mb={6}>Register for Oikos</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4} isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" mb={6} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" size="lg" width="full" type="submit" mb={4}>
          Register
        </Button>
      </form>
      {message && <Text mt={4} textAlign="center" color={message.includes('successful') ? 'green.500' : 'red.500'}>{message}</Text>}
      <Text mt={4} textAlign="center">
        Already have an account? <Link as={RouterLink} to="/login" color="teal.500">Login here</Link>
      </Text>
    </Box>
  );
}

export default Register;
