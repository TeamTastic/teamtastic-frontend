import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../src/pages/login';
import { BrowserRouter } from 'react-router-dom';


const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};


describe('Login Component', () => {
  test('shows error when email is not entered', async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
    expect(emailInput.validity.valueMissing).toBe(true);
  });

  test('shows error when password is not entered', async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/iniciar sesión/i));

    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    expect(passwordInput.validity.valueMissing).toBe(true);
  });
});