import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Importamos el archivo CSS para los estilos del encabezado

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="nav-menu">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/register">Registro</Link>
          </li>
          <li>
            <Link to="/login">Iniciar sesión</Link>
          </li>
          <li>
            <Link to="/template">Template</Link>
          </li>
          <li>
            <Link to="/upload">Subir</Link>
          </li>
          <li>
            <Link to="/download">Descargar</Link>
          </li>
          <li>
            <Link to="/teams">Equipos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
