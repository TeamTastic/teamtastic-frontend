// Importación de módulos y estilos
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css';
import portada from '../assets/portada.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Register() { // Define el componente funcional Register
  // Declaración de estados usando el hook useState
  const navigate = useNavigate(); // Obtiene la función navigate del hook useNavigate
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para la confirmación de contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la confirmación de contraseña
  const [error, setError] = useState(''); // Estado para manejar errores

  // Función para manejar el registro de usuario
  const handleRegister = async (event) => {
    event.preventDefault(); // Evitar envío del formulario

    if (password !== confirmPassword) { // Comprobar si las contraseñas coinciden
      setError('Las contraseñas no coinciden'); // Establecer mensaje de error
      return; // Salir de la función
    }

    // Envío al backend
  };

  // Función para mostrar/ocultar la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Cambiar el estado de mostrar/ocultar contraseña
  };

  // Función para mostrar/ocultar la confirmación de contraseña
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // Cambiar el estado de mostrar/ocultar confirmación de contraseña
  };

  // Función para manejar el cambio en la confirmación de contraseña
  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value); // Actualizar el estado de confirmación de contraseña
    if (password !== value) { // Comprobar si las contraseñas coinciden
      setError('Las contraseñas no coinciden'); // Establecer mensaje de error
    } else {
      setError(''); // Borrar mensaje de error si las contraseñas coinciden
    }
  };

  return (
    <div className="register-container"> {/* Contenedor principal con clase register-container */}
      <div className="register-content"> {/* Contenido con clase register-content */}
        <img src={portada} alt="Portada Teamtastic" className="register-image" /> {/* Imagen de portada con clase register-image */}
        <form onSubmit={handleRegister}> {/* Formulario de registro con función onSubmit */}
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
          <div className="register-input-container"> {/* Contenedor de entrada de datos */}
            <FontAwesomeIcon icon={faLock} className="register-input-icon" /> {/* Icono de confirmación de contraseña */}
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Repetir contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            /> {/* Input para la confirmación de contraseña */}
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="register-icon"
              onClick={toggleShowConfirmPassword}
            /> {/* Icono para mostrar/ocultar confirmación de contraseña */}
          </div>
          {error && <span className="register-error-message">{error}</span>} {/* Mensaje de error si las contraseñas no coinciden */}
          <div className="register-input-container"> {/* Contenedor de entrada de datos */}
            <button className="register-button" type="submit">
              Registrarse
            </button> {/* Botón para enviar el formulario de registro */}
          </div>
        </form>
        <p className="register-signup"> {/* Párrafo de registro con clase register-signup */}
          ¿Ya tienes una cuenta?{' '} {/* Texto de pregunta */}
          <Link to="/login" className="register-link">Inicia sesión</Link> {/* Enlace de inicio de sesión con clase register-link */}
        </p>
      </div>
    </div>
  );
}

export default Register; // Exporta el componente Register por defecto
