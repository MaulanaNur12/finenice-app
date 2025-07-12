import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

// Reset mocks setelah setiap test
afterEach(() => {
  jest.resetAllMocks();
});

describe('Login component', () => {
  test('renders form inputs and button', () => {
    render(<Login setToken={jest.fn()} />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('calls setToken on successful login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ access_token: 'fake-token' }),
      })
    );

    const setTokenMock = jest.fn();
    render(<Login setToken={setTokenMock} />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'testpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(setTokenMock).toHaveBeenCalledWith('fake-token');
    });
  });

  test('shows error message on failed login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ msg: 'Invalid credentials' }),
      })
    );

    render(<Login setToken={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrong' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('shows validation error when fields are empty', async () => {
    render(<Login setToken={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/wajib diisi/i)).toBeInTheDocument();
    });
  });

  test('shows network error on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject('Network error'));

    render(<Login setToken={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'user' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'pass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/kesalahan jaringan/i)).toBeInTheDocument();
    });
  });
});
