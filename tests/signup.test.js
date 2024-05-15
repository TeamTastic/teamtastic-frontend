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

        const nameInput = screen.getByPlaceholderText('Nombre de Usuario');
        const emailInput = screen.getByPlaceholderText('Correo electrónico');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Repetir contraseña');
  
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'secretpassword' } });
  
        const submitButton = screen.getByText('Registrarse');
        fireEvent.click(submitButton);
  
        await waitFor(() => {
            expect(nameInput.validity.valueMissing).toBe(false);
            expect(emailInput.validity.valueMissing).toBe(false);
            expect(passwordInput.validity.valueMissing).toBe(false);
            expect(confirmPasswordInput.validity.valueMissing).toBe(false);
        });

    });
 
    test('Missing User Name Error', async () => {

        renderWithRouter(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'secretpassword' } });
        fireEvent.change(screen.getByPlaceholderText('Repetir contraseña'), { target: { value: 'secretpassword' } });      

        const nameInput = screen.getByPlaceholderText('Nombre de Usuario');

        const submitButton = screen.getByText('Registrarse');
        fireEvent.click(submitButton);

        await waitFor(() =>{
            expect(nameInput.validity.valueMissing).toBe(true);
        });
        
    });

    test('Missing Email Error', async () => {

        renderWithRouter(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Nombre de Usuario'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'secretpassword' } });
        fireEvent.change(screen.getByPlaceholderText('Repetir contraseña'), { target: { value: 'secretpassword' } });      

        const emailInput = screen.getByPlaceholderText('Correo electrónico');

        const submitButton = screen.getByText('Registrarse');
        fireEvent.click(submitButton);
  
        await waitFor(() =>{
            expect(emailInput.validity.valueMissing).toBe(true);
        });
        
    });

    test('Missing Password Error', async () => {

        renderWithRouter(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Nombre de Usuario'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Repetir contraseña'), { target: { value: 'secretpassword' } });

        const passwordInput = screen.getByPlaceholderText('Contraseña');

        const submitButton = screen.getByText('Registrarse');
        fireEvent.click(submitButton);
  
        await waitFor(() =>{
            expect(passwordInput.validity.valueMissing).toBe(true);
        });
        
    });

    test('Missing Password Confirmation Error', async () => {

        renderWithRouter(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Nombre de Usuario'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'secretpassword' } });

        const passwordConfirmationInput = screen.getByPlaceholderText('Repetir contraseña');

        const submitButton = screen.getByText('Registrarse');
        fireEvent.click(submitButton);
  
        await waitFor(() =>{
            expect(passwordConfirmationInput.validity.valueMissing).toBe(true);
        });
    });

    test('Invalid Email Error', async () => {

        renderWithRouter(<Register />);
    
        const emailInput = screen.getByPlaceholderText('Correo electrónico');
        fireEvent.change(emailInput, { target: { value: 'john.doe.example.com' } });
        
        const submitButton = screen.getByText('Registrarse');
        fireEvent.click(submitButton);

        await waitFor(() =>{
            expect(emailInput.value.includes('@')).toBe(false);
        });
        
    });

    test('Password equals Password Confirmation', async () => {
        
        renderWithRouter(<Register />);
    
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Repetir contraseña');
    
        fireEvent.change(passwordInput, { target: { value: 'passwordexample' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'passwordexample' } });
    
        const submitButton = screen.getByText('Registrarse');
        fireEvent.click(submitButton);

        await waitFor(() => {
                      
            expect(passwordInput.value).toBe(confirmPasswordInput.value);
            
        });
    });
    

}); 