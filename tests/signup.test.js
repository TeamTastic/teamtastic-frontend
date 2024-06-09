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

    test('Missing Name Error', async () => {
        renderWithRouter(<Register />);

        const surnameInput = screen.getByLabelText(/apellido/i);
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
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
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
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
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'secretpassword' } });

        const surnameInput = screen.getByLabelText(/apellido/i);

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(surnameInput.validity.valueMissing).toBe(true);
        });
    });


    test('Missing Password Error', async () => {
        renderWithRouter(<Register />);

        const nameInput = screen.getAllByLabelText(/nombre/i)[0];
        const surnameInput = screen.getByLabelText(/apellido/i);
        const usernameInput = screen.getByLabelText(/nombre de usuario/i);
        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
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
        const passwordInput = screen.getAllByLabelText(/contraseña/i)[0];

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });

        const confirmPasswordInput = screen.getByLabelText(/confirma contraseña/i);

        const submitButton = screen.getByText('Enviar');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(confirmPasswordInput.validity.valueMissing).toBe(true);
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