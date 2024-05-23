import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../src/pages/register'; 
import { BrowserRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';


const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Register Component', () => {
    test('successful register', async () => {
        renderWithRouter(<Register />);

        const nameInput = screen.getAllByLabelText(/nombre/i)[0];
        const surnameInput = screen.getByLabelText(/apellido/i);
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'secretpassword' } });

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(nameInput.validity.valueMissing).toBe(false);
            expect(surnameInput.validity.valueMissing).toBe(false);
            expect(usernameInput.validity.valueMissing).toBe(false);
            expect(emailInput.validity.valueMissing).toBe(false);
            expect(passwordInput.validity.valueMissing).toBe(false);
            expect(confirmPasswordInput.validity.valueMissing).toBe(false);
        });
    });

    test('Missing Name Error', async () => {
        renderWithRouter(<Register />);

        const surnameInput = screen.getByLabelText(/apellido/i);
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'secretpassword' } });

        const nameInput = screen.getAllByLabelText(/nombre/i)[0];

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(nameInput.validity.valueMissing).toBe(true);
        });
    });

    test('Missing User Name Error', async () => {
        renderWithRouter(<Register />);

        const nameInput = screen.getAllByLabelText(/nombre/i)[0];
        const surnameInput = screen.getByLabelText(/apellido/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'secretpassword' } });

        const usernameInput = screen.getByLabelText(/nombre de usuario/i);

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(usernameInput.validity.valueMissing).toBe(true);
        });
    });

    test('Missing Surname Error', async () => {
        renderWithRouter(<Register />);

        const nameInput = screen.getAllByLabelText(/nombre/i)[0];
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'secretpassword' } });

        const surnameInput = screen.getByLabelText(/apellido/i);

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(surnameInput.validity.valueMissing).toBe(true);
        });
    });

    test('Missing Email Error', async () => {
        renderWithRouter(<Register />);

        const nameInput = screen.getAllByLabelText(/nombre/i)[0];
        const surnameInput = screen.getByLabelText(/apellido/i);
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'secretpassword' } });

        const emailInput = screen.getByLabelText(/email/i);

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(emailInput.validity.valueMissing).toBe(true);
        });
    });

    test('Missing Password Error', async () => {
        renderWithRouter(<Register />);

        const nameInput = screen.getAllByLabelText(/nombre/i)[0];
        const surnameInput = screen.getByLabelText(/apellido/i);
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const emailInput = screen.getByLabelText(/email/i);
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'secretpassword' } });

        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(passwordInput.validity.valueMissing).toBe(true);
        });
    });

    test('Missing Password Confirmation Error', async () => {
        renderWithRouter(<Register />);

        const nameInput = screen.getAllByLabelText(/nombre/i)[0];
        const surnameInput = screen.getByLabelText(/apellido/i);
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });

        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(confirmPasswordInput.validity.valueMissing).toBe(true);
        });
    });

    test('Invalid Email Error', async () => {
        renderWithRouter(<Register />);

        const emailInput = screen.getByLabelText(/email/i);
        fireEvent.change(emailInput, { target: { value: 'john.doe.example.com' } });

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(emailInput.validity.typeMismatch).toBe(true);
        });
    });

    test('Password equals Password Confirmation', async () => {
        renderWithRouter(<Register />);

        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(passwordInput, { target: { value: 'passwordexample' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'passwordexample' } });

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(passwordInput.value).toBe(confirmPasswordInput.value);
        });
    });
});