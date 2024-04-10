import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';


function PrivateRoute() {
  const [message, setMessage] = useState('');

  useEffect(() => {

    // Realizar la solicitud a la ruta privada al cargar el componente
    axios.get('/private_route'
        )
      .then(response => {
        // Si la solicitud es exitosa, mostrar el mensaje de la ruta privada
        setMessage(response.data);
        console.log(response)
      })
      .catch(error => {
        // Si hay un error, mostrar el mensaje de error
        setMessage('Error al acceder a la ruta privada');
      });
  }, []); // La dependencia vacía asegura que el efecto se ejecute solo una vez al cargar el componente

  return (
    <div>
      <h1>Ruta Privada</h1>
      <p>{message}</p>
    </div>
  );
}

export default PrivateRoute;