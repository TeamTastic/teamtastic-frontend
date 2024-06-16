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

jest.mock('axios');
jest.mock('../src/components/withAuthorization', () => (component) => component);
const mock = new MockAdapter(axios);
//const navigate = useNavigate();

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
jest.mock('../src/pages/PopUp', () => ({ onClose, onContinue }) => (
  <div>
    <button onClick={onClose}>Close</button>
    <button onClick={onContinue}>Continue</button>
  </div>
));


describe('Download component', () => {

  test('Mostrar contenido inicial', async () => {
    render(
      <Router>
        <Download />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/① Ingrese hasta 5 habilidades/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByRole('button', { name: /Comenzar/i });
    fireEvent.click(botonComenzar);

    expect(screen.getByText(/Lista de Opciones/i)).toBeInTheDocument();
    expect(screen.getByText(/Rango numérico/i)).toBeInTheDocument();
    expect(screen.getByText(/Agregar atributo/i)).toBeInTheDocument();
    expect(screen.getByText(/Descargar Template/i)).toBeInTheDocument();
    
    const listaDeOpBoton = screen.getByRole('button', { name: /Lista de Opciones/i });
    fireEvent.click(listaDeOpBoton);

    expect(screen.getByPlaceholderText(/Nuevo atributo 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Agregar atributo/i)).toBeInTheDocument();
    expect(screen.getByText(/Descargar Template/i)).toBeInTheDocument();
    
  });

  test('Agregar habilidad nueva', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    await waitFor(() => {
      expect(screen.getByText(/① Ingrese hasta 5 habilidades/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByRole('button', { name: /Comenzar/i });
    fireEvent.click(botonComenzar);

    const habilidadInput = screen.getByPlaceholderText('Nuevo atributo 1');
    const addButton = screen.getByRole('button', { name: /Agregar atributo/i });

    fireEvent.change(habilidadInput, { target: { value: 'Habilidad 1' } });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Habilidad 1/i)).toBeInTheDocument());
    expect(habilidadInput).toHaveValue('');

  });

  test('Mostrar error al intentar cargar una habilidad vacia de tipo rango numerico', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    await waitFor(() => {
      expect(screen.getByText(/① Ingrese hasta 5 habilidades/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByRole('button', { name: /Comenzar/i });
    fireEvent.click(botonComenzar);

    const addButton = screen.getByRole('button', { name: /Agregar atributo/i });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Por favor, ingresa un atributo/i)).toBeInTheDocument());
  });

  test('Mostrar error al intentar cargar una habilidad vacia de tipo lista de opciones', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);

    await waitFor(() => {
      expect(screen.getByText(/① Ingrese hasta 5 habilidades/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByRole('button', { name: /Comenzar/i });
    fireEvent.click(botonComenzar);

    const sButton = screen.getByText('Lista de Opciones'); 
    fireEvent.click(sButton);

    const addButton = screen.getByRole('button', { name: /Agregar atributo/i });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/Por favor, ingresa un atributo/i)).toBeInTheDocument());

  });

  test('Mostrar error cuando se intente agregar una habilidad duplicada de tipo rango numerico', async () => {
    render
    (<Router>
      <Download />
      <ToastContainer />
    </Router>);
    
    await waitFor(() => {
      expect(screen.getByText(/① Ingrese hasta 5 habilidades/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByRole('button', { name: /Comenzar/i });
    fireEvent.click(botonComenzar);

    const habilidadInput = screen.getByPlaceholderText('Nuevo atributo 1');
    const addButton = screen.getByRole('button', { name: /Agregar atributo/i });

    fireEvent.change(habilidadInput, { target: { value: 'Habilidad 1' } });
    fireEvent.click(addButton);

    const habilidadInput2 = screen.getByPlaceholderText('Nuevo atributo 2');
    fireEvent.click(addButton);

    fireEvent.change(habilidadInput2, { target: { value: 'Habilidad 1' } });
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
  
    await waitFor(() => {
      expect(screen.getByText(/① Ingrese hasta 5 habilidades/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByRole('button', { name: /Comenzar/i });
    fireEvent.click(botonComenzar);

    const sButton = screen.getByText('Lista de Opciones'); 
    fireEvent.click(sButton);

    const habilidadInput = screen.getByPlaceholderText('Nuevo atributo 1');
    const addButton = screen.getByRole('button', { name: /Agregar atributo/i });
    const addAtributeButton = screen.getByRole('button', { name: /Add Icon/i });
    const optionInput = screen.getByPlaceholderText('Agregue nueva opción');

    fireEvent.change(habilidadInput, { target: { value: 'Habilidad 1' } });
    fireEvent.change(optionInput, { target: { value: 'Opción 1' } });
    fireEvent.click(addAtributeButton);
    fireEvent.change(optionInput, { target: { value: 'Opción 2' } });
    fireEvent.click(addAtributeButton);
    fireEvent.change(optionInput, { target: { value: 'Opción 3' } });
    fireEvent.click(addAtributeButton);
    fireEvent.click(addButton);

    const habilidadInput2 = screen.getByPlaceholderText('Nuevo atributo 2');

    fireEvent.change(habilidadInput2, { target: { value: 'Habilidad 1' } });
    fireEvent.change(optionInput, { target: { value: 'Opción 1' } });
    fireEvent.click(addAtributeButton);
    fireEvent.change(optionInput, { target: { value: 'Opción 2' } });
    fireEvent.click(addAtributeButton);
    fireEvent.change(optionInput, { target: { value: 'Opción 3' } });
    fireEvent.click(addAtributeButton);
    fireEvent.click(addButton);
  
    await waitFor(() => expect(screen.getByText(/Este atributo ya ha sido ingresado/i)).toBeInTheDocument());
  });
  
  test('Mostrar error cuando se intente agregar una habilidad de tipo lista de opciones con menos de tres opciones', async () => {
    render(
      <Router>
        <Download />
        <ToastContainer />
      </Router>
    );
  
    await waitFor(() => {
      expect(screen.getByText(/① Ingrese hasta 5 habilidades/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByRole('button', { name: /Comenzar/i });
    fireEvent.click(botonComenzar);

    const sButton = screen.getByText('Lista de Opciones'); 
    fireEvent.click(sButton);

    const habilidadInput = screen.getByPlaceholderText('Nuevo atributo 1');
    const addButton = screen.getByRole('button', { name: /Agregar atributo/i });
    const addAtributeButton = screen.getByRole('button', { name: /Add Icon/i });
    const optionInput = screen.getByPlaceholderText('Agregue nueva opción');

    fireEvent.change(habilidadInput, { target: { value: 'Habilidad 1' } });
    fireEvent.change(optionInput, { target: { value: 'Opción 1' } });
    fireEvent.click(addAtributeButton);
    fireEvent.change(optionInput, { target: { value: 'Opción 2' } });
    fireEvent.click(addAtributeButton);

    fireEvent.click(addButton);
  
    await waitFor(() => expect(screen.getByText(/Se requiere un mínimo de 3 opciones para "Lista de Opciones"/i)).toBeInTheDocument());
  }); 

  test('debería iniciar la descarga del template', async () => {
    render(
      <Router>
        <Download />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/① Ingrese hasta 5 habilidades/i)).toBeInTheDocument();
    });

    const botonComenzar = screen.getByRole('button', { name: /Comenzar/i });
    fireEvent.click(botonComenzar);

    const habilidadInput = screen.getByPlaceholderText('Nuevo atributo 1');
    const addButton = screen.getByRole('button', { name: /Agregar atributo/i });

    fireEvent.change(habilidadInput, { target: { value: 'Habilidad 1' } });
    fireEvent.click(addButton);
        
    const habilidadInput2 = screen.getByPlaceholderText('Nuevo atributo 2');
    fireEvent.change(habilidadInput2, { target: { value: 'Habilidad 2' } });
    fireEvent.click(addButton);

    const habilidadInput3 = screen.getByPlaceholderText('Nuevo atributo 3');
    fireEvent.change(habilidadInput3, { target: { value: 'Habilidad 3' } });
    fireEvent.click(addButton);

    const downloadButton = screen.getByRole('button', { name: /Descargar Template/i });
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(generateTemplate).toHaveBeenCalledTimes(1);
      expect(generateTemplate).toHaveBeenCalledWith([
        { header: 'Nombre' },
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
        },
        { header: 'No juega con' }
      ]);
    });
    
  }); 
 

});
