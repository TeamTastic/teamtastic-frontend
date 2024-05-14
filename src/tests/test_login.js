import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

test('shows error when email is not entered', async () => {
  render(<Login />);
  
  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText(/iniciar sesión/i));

  const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
  expect(emailInput.validity.valueMissing).toBe(true);
});

test('shows error when password is not entered', async () => {
  render(<Login />);
  
  fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByText(/iniciar sesión/i));
  
  const passwordInput = screen.getByPlaceholderText(/contraseña/i);
  expect(passwordInput.validity.valueMissing).toBe(true);
});