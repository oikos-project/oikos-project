import { Box, Heading, Button, Text } from '@chakra-ui/react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={4}>Welcome to Oikos Chat!</Heading>
      {user && <Text fontSize="lg" mb={4}>Logged in as: {user.email}</Text>}
      <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
      {/* Chat interface will go here */}
    </Box>
  );
};

export default Chat;
