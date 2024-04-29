import React from 'react';
import { Link } from 'react-router-dom';
import './DrawerContent.css'; // Importa los estilos del contenido del Drawer

const DrawerContent = ({ isOpen }) => {
    return (
        <div className={`drawer-content ${isOpen ? 'open' : ''}`}>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/register">Registro</Link></li>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/template">Template</Link></li>
                <li><Link to="/upload">Subir</Link></li>
                <li><Link to="/download">Descargar</Link></li>
                <li><Link to="/teams">Equipos</Link></li>
            </ul>
        </div>
    );
}

export default DrawerContent;
