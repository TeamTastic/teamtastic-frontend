import React from "react";
import {Link} from "react-router-dom";
import homeIcon from "../assets/drawer/home-icon.svg";
import oneIcon from "../assets/drawer/one-icon.svg";
import twoIcon from "../assets/drawer/two-icon.svg";
import threeIcon from "../assets/drawer/three-icon.svg";
import configIcon from "../assets/drawer/config-icon.svg";
import logoutIcon from "../assets/drawer/logout-icon.svg";

function Options() {
    return (
        <div className={'drawer-options'}>
            <ul>
                <li>
                    <Link to="/home">
                        <div className='list-item'>
                            <img src={homeIcon} alt="SVG"/>
                            Inicio
                        </div>
                    </Link>

                    <ul className='nested-list'>
                        <li>
                            <Link to="/download">
                                <div className='list-item'>
                                    <img src={oneIcon} alt="SVG"/>
                                    Ingreso de habilidades

                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/upload">
                                <div className='list-item'>
                                    <img src={twoIcon} alt="SVG"/>
                                    Carga de plantilla
                                </div>
                            </Link>

                        </li>
                        <li>
                            <Link to="/record">
                                <div className='list-item'>
                                    <img src={threeIcon} alt="SVG"/>
                                    Visualización de equipos
                                </div>
                            </Link>

                        </li>
                    </ul>
                </li>
{/*
                <li>
                    <Link to="/information">
                        <div className='list-item'>
                            Información
                        </div>
                    </Link>

                </li>
                <li>
                    <Link to="/register">
                        <div className='list-item'>
                            <img src={configIcon} alt="SVG"/>
                            Configuración
                        </div>
                    </Link>
                </li>
*/}                
                <li className="logout">
                    <Link to="/logout">
                        <div className='list-item'>
                            <img src={logoutIcon} alt="SVG"/>
                            Cerrar sesión
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Options;