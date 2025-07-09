import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await login(email, password);

      if (data.message) {
        setMessage(data.message || 'Login successful!');
        navigate('/main'); // Redirect directly on success
      } else {
        setMessage(data.error || 'Login failed.');
      }
    } catch (error) {
      setMessage('Network error or server is unreachable.');
      console.error('Login error:', error);
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="xl" textAlign="center" mb={6}>Login to Oikos</Heading>
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
          Login
        </Button>
      </form>
      {message && <Text mt={4} textAlign="center" color={message.includes('successful') ? 'green.500' : 'red.500'}>{message}</Text>}
      <Text mt={4} textAlign="center">
        Don't have an account? <Link as={RouterLink} to="/register" color="teal.500">Register here</Link>
      </Text>
    </Box>
  );
}

export default Login;
