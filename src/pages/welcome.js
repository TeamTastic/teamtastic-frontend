import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/welcome.css';
import portada from '../assets/portada.png';

function Welcome() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <img src={portada} alt="Portada Teamtastic" className="welcome-image" />
        <h2 className="welcome-h2">¡Bienvenido!</h2>
        <h3 className="welcome-h3">Arma tus equipos</h3>
        <div className="input-container"></div>
        <button className="welcome-button" onClick={handleRegisterClick}>
          Registrarse
        </button>
        <p className="welcome-signup">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="welcome-link">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Welcome;
