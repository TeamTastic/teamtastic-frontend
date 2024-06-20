import React, {useEffect, useState} from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/register.css'; // Importa el nuevo archivo de estilos para el login
import portada from '../assets/portada.png'; // Se mantiene la imagen de portada, se puede cambiar si es necesario
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';

function Login() { // Define el componente funcional Login
  const navigate = useNavigate(); // Obtiene la función navigate del hook useNavigate
  const [user, setUser] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [error, setError] = useState(''); // Estado para manejar errores
  //savein local storage user

  // Función para manejar el inicio de sesión
  const handleLogin = async (event) => {
    event.preventDefault(); // Evitar envío del formulario

    // Lógica de autenticación
    try {
      await axios.post('/user/login', {
        username: user,
        password,
      });

      // Redireccionar a la página principal después del inicio de sesión
      navigate('/organizations');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      toast.error('Error al iniciar sesión. Alguna de las credenciales no es correcta');
    }
  };

  // Función para mostrar/ocultar la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Cambiar el estado de mostrar/ocultar contraseña
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleLogin}>
        <img src={portada} alt="Portada Teamtastic" className="register-image" />
        <p className="register-title">Inicio de Sesión</p>
        <p className="register-message">Inicia sesión para ingresar al sitio web.</p>
        <label>
          <input
            required
            placeholder=""
            type="text"
            className="register-input"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <span>Nombre de Usuario</span>
        </label>
        <label className="register-password-label">
          <input
            required
            placeholder=""
            type={showPassword ? 'text' : 'password'}
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Contraseña</span>
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="register-icon"
            onClick={toggleShowPassword}
          />
        </label>
        <button className="register-submit" type="submit">Iniciar Sesión</button>
        <p className="register-signin">¿Aun no tienes una cuenta? <Link to="/register">Registrarse</Link></p>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Login; // Exporta el componente Login por defecto
