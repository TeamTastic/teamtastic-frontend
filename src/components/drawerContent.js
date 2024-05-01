import React from 'react';
import { Link } from 'react-router-dom';
import './DrawerContent.css'; // Importa los estilos del contenido del Drawer
import userIcon from '../assets/drawer/user-icon.svg';
import homeIcon from '../assets/drawer/home-icon.svg';
import oneIcon from '../assets/drawer/one-icon.svg';
import twoIcon  from '../assets/drawer/two-icon.svg';
import threeIcon from '../assets/drawer/three-icon.svg';
import configIcon from '../assets/drawer/config-icon.svg';
import logoutIcon from '../assets/drawer/logout-icon.svg';
const DrawerContent = ({ isOpen }) => {
    return (
        <div className={`drawer-content ${isOpen ? 'open' : ''}`}>
            <div className='user-block'>
                <img className='user-img' src={userIcon} alt="SVG"/>
                <p> Juan Perez </p>
            </div>
            <ul>
                <li>
                    <Link to="/">
                        <div className='list-item'>
                            <img src={homeIcon} alt="SVG"/>
                            Inicio
                        </div>
                    </Link>

                    <ul className='nested-list'>
                        <li>
                            <Link to="/one">
                                <div className='list-item'>
                                    <img src={oneIcon} alt="SVG"/>
                                    Ingreso de habilidades

                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/two">
                                <div className='list-item'>
                                    <img src={twoIcon} alt="SVG"/>
                                    Carga de plantilla
                                </div>
                            </Link>

                        </li>
                        <li>
                            <Link to="/three">
                                <div className='list-item'>
                                    <img src={threeIcon} alt="SVG"/>
                                    Visualización de equipos
                                </div>
                            </Link>

                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/register">
                        <div className='list-item'>
                            <img src={configIcon} alt="SVG"/>
                            Configuración
                        </div>
                    </Link>

                </li>
                <li>
                    <Link to="/login">
                        <div className='list-item'>
                            <img src={logoutIcon} alt="SVG"/>
                            Cerrar sesión
                        </div>
                    </Link>
                </li>
                {/*<li><Link to="/register">Registro</Link></li>*/}
                {/*<li><Link to="/login">Iniciar sesión</Link></li>*/}
                {/*<li><Link to="/template">Template</Link></li>*/}
                {/*<li><Link to="/upload">Subir</Link></li>*/}
                {/*<li><Link to="/download">Descargar</Link></li>*/}
                {/*<li><Link to="/teams">Equipos</Link></li>*/}
            </ul>
        </div>
    );
}

export default DrawerContent;
