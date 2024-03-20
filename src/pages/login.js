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
    <div className="container">
      <div className="content">
        <img src={portada} alt="Portada Teamtastic" className="image" />
        <h2>¡Bienvenido!</h2>
        <h3>Arma tus equipos</h3>
        <div className="input-container"></div>
        <button className="button" onClick={handleRegisterClick}>
          Registrarse
        </button>
        <p className="signup">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Welcome;
