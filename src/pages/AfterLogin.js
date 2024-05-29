import React from 'react';
import flecha from '../assets/flecha.png';
import { useNavigate } from 'react-router-dom';
import equipo from '../assets/equipo.webp';
import "../styles/pages/afterLogin.css"
import Header from "../components/header";

function AfterLogin() {
  const navigate = useNavigate();

  return (
    <div className="after-login-container">
      <Header/>
      <div className="after-login-content">
        <div className="welcome-text">
          <h1>Hola,</h1>
          <h2>Comienza a crear tus equipos</h2>
          <img
          src={flecha}
          className='button'
          alt={'button'}
          onClick={() => {
            navigate('/privateRoute');
          }}
        />
        </div>
      </div>
      {/* Imagen del futbolista */}
      <img src={equipo} alt="Equipo" className="equipo-image" />
    </div>
  );
}

export default AfterLogin;
