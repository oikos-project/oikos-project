import { Box, Heading, Button, Text, Flex, Spacer, VStack, Input, IconButton, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowUpIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const Chat = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'other' },
    { id: 2, text: 'Hi there!', sender: 'me' },
    { id: 3, text: 'How are you?', sender: 'other' },
    { id: 4, text: 'I am good, thanks! And you?', sender: 'me' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const toolbarBg = useColorModeValue('gray.100', 'gray.700');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputValue, sender: 'me' }]);
      setInputValue('');
    }
  };

  return (
    <Flex direction="column" h="100vh">
      <Flex as="header" p={4} bg={toolbarBg} borderBottomWidth="1px" alignItems="center" flexShrink={0}>
        <Heading as="h1" size="md">OikOS</Heading>
        <Spacer />
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
          mr={4}
        />
        {user && <Text fontSize="md" mr={4}>{user.email}</Text>}
        <Button size="sm" colorScheme="red" onClick={handleLogout}>Logout</Button>
      </Flex>
      
      <VStack flex="1" overflowY="auto" p={4} spacing={4}>
        {messages.map((message) => (
          <Flex key={message.id} w="full" justify={message.sender === 'me' ? 'flex-end' : 'flex-start'}>
            <Box
              bg={message.sender === 'me' ? 'blue.500' : 'gray.200'}
              color={message.sender === 'me' ? 'white' : 'black'}
              px={4}
              py={2}
              borderRadius="lg"
              maxW="70%"
            >
              {message.text}
            </Box>
          </Flex>
        ))}
      </VStack>

      <Flex p={4} borderTopWidth="1px" alignItems="center" flexShrink={0}>
        <Input
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton
            icon={<ArrowUpIcon />}
            aria-label="Send message"
            colorScheme="blue"
            onClick={handleSendMessage}
            ml={2}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
