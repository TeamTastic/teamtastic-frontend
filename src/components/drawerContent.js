import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/components/drawerContent.css'; // Importa los estilos del contenido del Drawer
import userIcon from '../assets/drawer/user-icon.svg';

import Options from "./options";
const DrawerContent = ({ isOpen, user }) => {
    const navigate = useNavigate();

    return (
        <div className={`drawer-content ${isOpen ? 'open' : ''}`}>
            {user ? (
                <div className='user-block'>
                    <img className='user-img' src={userIcon} alt="SVG"/>
                    <p> {user} </p>
                </div>
            ) : null}

            <Options/>


        </div>
    );
}

export default DrawerContent;
