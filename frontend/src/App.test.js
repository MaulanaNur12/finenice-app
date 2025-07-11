import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// Mock semua komponen halaman
jest.mock('./pages/Login', () => () => <div>Login Mock</div>);
jest.mock('./pages/Register', () => () => <div>Register Mock</div>);
jest.mock('./pages/Products', () => () => <div>Products Mock</div>);
jest.mock('./pages/Checkout', () => () => <div>Checkout Mock</div>);
jest.mock('./pages/Transactions', () => () => <div>Transactions Mock</div>);
jest.mock('./pages/AllTransactions', () => () => <div>AllTransactions Mock</div>);

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

describe('App Routing and UI', () => {
  test('renders sidebar with login and register links when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Finenice/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('renders Products component by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Products Mock/i)).toBeInTheDocument();
  });
});