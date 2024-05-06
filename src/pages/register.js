import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/register.css';
import portada from '../assets/portada.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsRegistering(true);

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      setIsRegistering(false);
      return;
    }

    try {
      await axios.post('/user/signup', {
        name,
        email,
        password,
      });
      toast.success('Registro exitoso. Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      if (error.response) {
        // Error de respuesta del servidor con código de estado
        const errorMessage = error.response.data.error || 'Error al registrar usuario';
        toast.error(errorMessage);
      } else if (error.request) {
        // Error de solicitud sin respuesta del servidor
        toast.error('Error de solicitud al registrar usuario');
      } else {
        // Error en la configuración de la solicitud
        toast.error('Error al registrar usuario. Por favor, inténtelo de nuevo más tarde.');
      }
    }
    setIsRegistering(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <img src={portada} alt="Portada Teamtastic" className="register-image" />
        <form onSubmit={handleRegister}>
          <div className="register-input-container">
            <FontAwesomeIcon icon={faUser} className="register-input-icon" />
            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="register-input-container">
            <FontAwesomeIcon icon={faEnvelope} className="register-input-icon" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-input-container">
            <FontAwesomeIcon icon={faLock} className="register-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="register-icon"
              onClick={toggleShowPassword}
            />
          </div>
          <div className="register-input-container">
            <FontAwesomeIcon icon={faLock} className="register-input-icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Repetir contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="register-icon"
              onClick={toggleShowConfirmPassword}
            />
          </div>
          <div className="register-input-container">
            <button className="register-button" type="submit" disabled={isRegistering}>
              Registrarse
            </button>
          </div>
        </form>
        <p className="register-signup">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="register-link">Inicia sesión</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
