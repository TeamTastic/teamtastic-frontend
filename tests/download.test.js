import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Download from '../src/pages/download';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import generateTemplate from '../src/components/generateTemplate';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mock = new MockAdapter(axios);
//const navigate = useNavigate();

beforeAll(() => {
  mock.onGet('/private_route').reply(200);
  mock.onPost('/login').reply((config) => {
    const { email, password } = JSON.parse(config.data);
    if (email === 'test@example.com' && password === 'password123') {
      return [200, { token: 'fakeToken' }];
    } else {
      return [401, { message: 'Invalid credentials' }];
    }
  });
});


afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.clearAllTimers();
  mock.reset();
});

jest.mock('../src/components/generateTemplate', () => jest.fn());
jest.mock('../src/components/download-template-button', () => ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
));
jest.mock('../src/components/switchButton', () => ({ value, onChange, options }) => (
  <label>
  <input
    type="checkbox"
    checked={value === 'Rango numérico'}
    onChange={(e) => onChange(e.target.checked ? 'Rango numérico' : 'Lista de Opciones')}
  />
  SwitchButton
</label>
));
jest.mock('../src/components/moreInfo', () => ({ children }) => <div>{children}</div>);
jest.mock('../src/components/header', () => () => <div>Header</div>);
jest.mock('../src/pages/PopUp', () => ({ onClose, onContinue }) => (
  <div>
    <button onClick={onClose}>Close</button>
    <button onClick={onContinue}>Continue</button>
  </div>
));


describe('Download component', () => {

  test('Mostrar contenido inical', () => {
    render(<Router>
      <Download />
      <ToastContainer />
    </Router>);

    const input = screen.getByPlaceholderText('Nuevo atributo'); //use placeholder pq por rol no encunetra
    expect(screen.getByText(/Ingrese hasta 5 nuevos atributos/i)).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(screen.getByText(/Lista de Opciones/i)).toBeInTheDocument();
    expect(screen.getByText(/Rango numérico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Icon/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Descargar Template/i })).toBeInTheDocument();
  });

  test('Agregar habilidad nueva', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    const sButton = screen.getByRole('checkbox', {name: 'SwitchButton' }); 
    fireEvent.click(sButton);
    const skillInput = screen.getByPlaceholderText('Nuevo atributo');
    const addButton = screen.getByRole('button', { name: /Add Icon/i });
    fireEvent.change(skillInput, { target: { value: 'Habilidad 1' } });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Habilidad 1/i)).toBeInTheDocument());
    expect(skillInput).toHaveValue('');

  });

  test('Mostrar error al intentar cargar una habilidad vacia de tipo rango numerico', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    const addButton = screen.getByRole('button', { name: /Add Icon/i });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Por favor, ingresa un atributo/i)).toBeInTheDocument());
  });

  test('Mostrar error al intentar cargar una habilidad vacia de tipo lista de opciones', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    const skillInput = screen.getByPlaceholderText('Nuevo atributo');
    fireEvent.change(skillInput, { target: { value: 'Habilidad 1' } });
    
    const addButton = screen.getByRole('button', { name: /Agregar/i });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Por favor, ingresa una opción/i)).toBeInTheDocument());

  });

  test('Mostrar error cuando se intente agregar una habilidad duplicada de tipo rango numerico', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    const sButton = screen.getByRole('checkbox', {name: 'SwitchButton' }); 
    fireEvent.click(sButton);

    const addButton = screen.getByRole('button', { name: /Add Icon/i });
    const input = screen.getByPlaceholderText('Nuevo atributo');

    fireEvent.change(input, { target: { value: 'Habilidad 1' } });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Habilidad 1/i)).toBeInTheDocument());

    fireEvent.change(input, { target: { value: 'Habilidad 1' } });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Este atributo ya ha sido ingresado/i)).toBeInTheDocument());
  });

  test('Mostrar error cuando se intente agregar una habilidad de tipo lista de opciones con opción duplicada', async () => {
    render(
      <Router>
        <Download />
        <ToastContainer />
      </Router>
    );
  
    const addButton = screen.getByRole('button', { name: /Agregar/i });
  
    const input = screen.getByPlaceholderText('Nuevo atributo');
    fireEvent.change(input, { target: { value: 'Habilidad 1' } });
  
    const optionInput = screen.getByPlaceholderText('Agregue nueva opción');
    fireEvent.change(optionInput, { target: { value: 'Opción 1' } });
  
    fireEvent.click(addButton);
  
    await waitFor(() => expect(screen.getByText(/Opción 1/i)).toBeInTheDocument());
  
    fireEvent.change(optionInput, { target: { value: 'Opción 1' } });
    fireEvent.click(addButton);
  
    await waitFor(() => expect(screen.getByText(/Esta opción ya ha sido ingresada/i)).toBeInTheDocument());
  });
  
  test('Mostrar error cuando se intente agregar una habilidad de tipo lista de opciones con menos de tres opciones', async () => {
    render(
      <Router>
        <Download />
        <ToastContainer />
      </Router>
    );
  
    const addButton = screen.getByRole('button', { name: /Agregar/i });
    const addAtributeButton = screen.getByRole('button', { name: /Add Icon/i });
  
    const input = screen.getByPlaceholderText('Nuevo atributo');
    fireEvent.change(input, { target: { value: 'Habilidad 1' } });
  
    const optionInput = screen.getByPlaceholderText('Agregue nueva opción');
    fireEvent.change(optionInput, { target: { value: 'Opción 1' } });
  
    fireEvent.click(addButton);

    fireEvent.change(optionInput, { target: { value: 'Opción 2' } });
  
    fireEvent.click(addButton);
  
    await waitFor(() => 
      expect(screen.getByText(/Opción 1/i)).toBeInTheDocument(),
      expect(screen.getByText(/Opción 2/i)).toBeInTheDocument()
    );
  
    fireEvent.click(addAtributeButton);
  
    await waitFor(() => expect(screen.getByText(/Se requiere un mínimo de 3 opciones para "Lista de Opciones"/i)).toBeInTheDocument());
  });

  
  

  // - Downloading the template
  // - Handling errors during download
  // - Testing PopUp component behavior (if applicable)
});
