import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PrivateRoute() {
  const [message, setMessage] = useState('');

  useEffect(() => {

    // Realizar la solicitud a la ruta privada al cargar el componente
    axios.get('/private_route'
        )
      .then(response => {
        // Si la solicitud es exitosa, mostrar el mensaje de la ruta privada
        toast.success('Esto indica que esta bien iniciada la sesión');
        setMessage(response.data);
        console.log(response)
      })
      .catch(error => {
        // Si hay un error, mostrar el mensaje de error
        setMessage('Error al acceder a la ruta privada');
        toast.error('Esto indica que esta bien iniciada la sesión');

      });
  }, []); // La dependencia vacía asegura que el efecto se ejecute solo una vez al cargar el componente

  return (
    <div>
      <h1>Ruta Privada</h1>
      <p>{message}</p>
      <ToastContainer />
    </div>
  );
}

export default PrivateRoute;