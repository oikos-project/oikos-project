import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Chat from './Chat';
import { useAuth } from '../../auth/hooks/useAuth';
import { vi } from 'vitest';

// Mock the useAuth hook
vi.mock('../../auth/hooks/useAuth');

describe('Chat', () => {
  beforeEach(() => {
    // Provide a mock implementation for useAuth
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      logout: vi.fn(),
    });
  });

  it('renders the chat page with header, messages, and input', () => {
    render(
      <ChakraProvider>
        <Router>
          <Chat />
        </Router>
      </ChakraProvider>
    );

    // Check for header elements
    expect(screen.getByText('OikOS')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Check for messages
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();

    // Check for input form
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByLabelText('Send message')).toBeInTheDocument();
  });
});
