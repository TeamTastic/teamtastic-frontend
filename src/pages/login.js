import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css'; // Se mantiene el estilo del registro, se puede modificar si es necesario
import portada from '../assets/portada.png'; // Se mantiene la imagen de portada, se puede cambiar si es necesario
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Login() { // Define el componente funcional Login
  // Declaración de estados usando el hook useState
  const navigate = useNavigate(); // Obtiene la función navigate del hook useNavigate
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [error, setError] = useState(''); // Estado para manejar errores

  // Función para manejar el inicio de sesión
  const handleLogin = async (event) => {
    event.preventDefault(); // Evitar envío del formulario

    // Lógica de autenticación
    try {
      await axios.post('/user/login', {
        email,
        password,
      });

      const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
      }, {});

      const authToken = cookies['authToken']; // Replace 'authToken' with your actual cookie name

      if (authToken) {
        // Store the authorization token in localStorage or session storage for future use
        localStorage.setItem('authToken', authToken);

      }else{
        console.log('No se encontró el token de autenticación')
      }

      // Redireccionar a la página principal después del inicio de sesión


      navigate('/privateRoute');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
    }
  };

  // Función para mostrar/ocultar la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Cambiar el estado de mostrar/ocultar contraseña
  };

  return (
    <div className="register-container"> {/* Contenedor principal con clase register-container */}
      <div className="register-content"> {/* Contenido con clase register-content */}
        <img src={portada} alt="Portada Teamtastic" className="register-image" /> {/* Imagen de portada con clase register-image */}
        <form onSubmit={handleLogin}> {/* Formulario de inicio de sesión con función onSubmit */}
          <div className="register-input-container"> {/* Contenedor de entrada de datos */}
            <FontAwesomeIcon icon={faEnvelope} className="register-input-icon" /> {/* Icono de correo electrónico */}
            <input
              type="email"
              placeholder="Correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /> {/* Input para el correo electrónico */}
          </div>
          <div className="register-input-container"> {/* Contenedor de entrada de datos */}
            <FontAwesomeIcon icon={faLock} className="register-input-icon" /> {/* Icono de contraseña */}
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /> {/* Input para la contraseña */}
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="register-icon"
              onClick={toggleShowPassword}
            /> {/* Icono para mostrar/ocultar contraseña */}
          </div>
          {error && <span className="register-error-message">{error}</span>} {/* Mensaje de error si las credenciales son incorrectas */}
          <div className="register-input-container"> {/* Contenedor de entrada de datos */}
            <button className="register-button" type="submit">
              Iniciar sesión
            </button> {/* Botón para enviar el formulario de inicio de sesión */}
          </div>
        </form>
        <p className="register-signup"> {/* Párrafo para el enlace de registro */}
          ¿No tienes una cuenta?{' '} {/* Texto de pregunta */}
          <Link to="/register" className="register-link">Regístrate</Link> {/* Enlace de registro con clase register-link */}
        </p>
      </div>
    </div>
  );
}

export default Login; // Exporta el componente Login por defecto