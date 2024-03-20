import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css';
import portada from '../assets/portada.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault(); // Evitar envío del formulario

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Envío al backend
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
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-input-container">
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
