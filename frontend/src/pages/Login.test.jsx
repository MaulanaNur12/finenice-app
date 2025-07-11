import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('renders form inputs and button', () => {
    render(<Login setToken={jest.fn()} />);

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('calls setToken on successful login', async () => {
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ access_token: 'fake-token' }),
      })
    );

    const setTokenMock = jest.fn();
    render(<Login setToken={setTokenMock} />);

    // Isi input form
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'testpass' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Tunggu sampai setToken dipanggil
    await waitFor(() => {
      expect(setTokenMock).toHaveBeenCalledWith('fake-token');
    });
  });

  test('shows alert on failed login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ msg: 'Invalid credentials' }),
      })
    );

    // Mock alert
    window.alert = jest.fn();

    render(<Login setToken={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrong' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    });
  });
});
