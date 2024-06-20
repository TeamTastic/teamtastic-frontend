import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Download from '../src/pages/download';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import generateTemplate from '../src/components/generateTemplate';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('axios');
jest.mock('../src/components/withAuthorization', () => (component) => component);
const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.onGet('/private_route').reply(200);
  mock.onPost('/login').reply((config) => {
    const { username, password } = JSON.parse(config.data);
    if (username === 'test' && password === 'password123') {
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

describe('Download component', () => {

  test('Mostrar contenido inicial', async () => {
    render(
      <Router>
        <Download />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/① ¿Deseas especificar el rol de cada participante?/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByText('Sí');
    fireEvent.click(botonComenzar);

    expect(screen.getByPlaceholderText(/Nuevo rol/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/Nuevo rol/i), { target: { value: 'Rol 1' } });
    const addAtributeButton = screen.getByRole('button', { name: /Add Icon/i });
    fireEvent.click(addAtributeButton);
        
    const siguienteBoton = screen.getByRole('button', { name: /Siguiente/i });
    fireEvent.click(siguienteBoton);

    expect(screen.getByPlaceholderText(/Atributo 1/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nuevo atributo 1/i)).toBeInTheDocument();
    
  });

  test('Agregar habilidad nueva', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    await waitFor(() => {
      expect(screen.getByText(/① ¿Deseas especificar el rol de cada participante?/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByText('No');
    fireEvent.click(botonComenzar);

    const habilidadInput = screen.getByPlaceholderText('Nuevo atributo 1');
    const addButton = screen.getByRole('button', { name: /Add Icon/i });

    fireEvent.change(habilidadInput, { target: { value: 'Habilidad 1' } });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByDisplayValue('Habilidad 1')).toBeInTheDocument());

    expect(screen.getByPlaceholderText(/Atributo 2/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nuevo atributo 2/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /DESCARGAR TEMPLATE/i})).toBeInTheDocument();

  });

  test('Mostrar error al intentar cargar una habilidad vacia de tipo rango numerico', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    await waitFor(() => {
      expect(screen.getByText(/① ¿Deseas especificar el rol de cada participante?/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByText('No');
    fireEvent.click(botonComenzar);

    const addButton = screen.getByRole('button', { name: /Add Icon/i });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Por favor, ingresa un nombre para el atributo actual antes de agregar uno nuevo/i)).toBeInTheDocument());
  });

  test('Mostrar error al intentar cargar una habilidad vacia de tipo lista de opciones', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    await waitFor(() => {
      expect(screen.getByText(/① ¿Deseas especificar el rol de cada participante?/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByText('Sí');
    fireEvent.click(botonComenzar);

    const addButton = screen.getByRole('button', { name: /Add Icon/i });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Por favor, ingresa un rol/i)).toBeInTheDocument());

  });

  test('Mostrar error cuando se intente agregar una habilidad de tipo lista de opciones con opción duplicada', async () => {
    render(
      <Router>
        <Download />
        <ToastContainer />
      </Router>
    );
  
    await waitFor(() => {
      expect(screen.getByText(/① ¿Deseas especificar el rol de cada participante?/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByText('Sí');
    fireEvent.click(botonComenzar);

    expect(screen.getByPlaceholderText(/Nuevo rol/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/Nuevo rol/i), { target: { value: 'Rol 1' } });

    const addButton = screen.getByRole('button', { name: /Add Icon/i });
    fireEvent.click(addButton);

    expect(screen.getByPlaceholderText(/Nuevo rol/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/Nuevo rol/i), { target: { value: 'Rol 1' } });

    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Este rol ya ha sido ingresado/i)).toBeInTheDocument());
    
  });
  
  test('debería iniciar la descarga del template', async () => {
    render(
      <Router>
        <Download />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/① ¿Deseas especificar el rol de cada participante?/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByText('No');
    fireEvent.click(botonComenzar);

    fireEvent.change(screen.getByPlaceholderText(/Nuevo atributo 1/i), { target: { value: 'Habilidad 1' } });
    const addAtributeButton = screen.getByRole('button', { name: /Add Icon/i });
    fireEvent.click(addAtributeButton);

    fireEvent.change(screen.getByPlaceholderText(/Nuevo atributo 2/i), { target: { value: 'Habilidad 2' } });
    fireEvent.click(addAtributeButton);

    fireEvent.change(screen.getByPlaceholderText(/Nuevo atributo 3/i), { target: { value: 'Habilidad 3' } });
    fireEvent.click(addAtributeButton);
        
    const descargarButton = screen.getByRole('button', { name: /DESCARGAR TEMPLATE/i });
    fireEvent.click(descargarButton);

    await waitFor(() => {
      expect(generateTemplate).toHaveBeenCalledTimes(1);
      expect(generateTemplate).toHaveBeenCalledWith([
        { header: 'Nombre' },
        { header: "No juega con" },
        {
          header: 'Habilidad 1',
          opciones: Array.from({ length: 50 }, (_, i) => i + 1)
        },
        {
          header: 'Habilidad 2',
          opciones: Array.from({ length: 50 }, (_, i) => i + 1)
        },
        {
          header: 'Habilidad 3',
          opciones: Array.from({ length: 50 }, (_, i) => i + 1)
        }
      ]);
    });
    
  });  
 

});
