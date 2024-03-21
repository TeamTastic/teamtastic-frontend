import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css';
import portada from '../assets/portada.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await axios.post('/user/signup', {
        name,
        email,
        password,
      });      
      navigate('/login');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError('Error al registrar usuario. Por favor, inténtelo de nuevo más tarde.');
    }
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
    if (password !== value) {
      setError('Las contraseñas no coinciden');
    } else {
      setError('');
    }
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
          {error && <span className="register-error-message">{error}</span>}
          <div className="register-input-container">
            <button className="register-button" type="submit">
              Registrarse
            </button>
          </div>
        </form>
        <p className="register-signup">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="register-link">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
