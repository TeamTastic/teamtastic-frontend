import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/drawerContent.css'; // Importa los estilos del contenido del Drawer
import userIcon from '../assets/drawer/user-icon.svg';
import Options from './options';

// Configura el elemento root para el modal (esto es necesario para que el modal se monte correctamente)
Modal.setAppElement('#root');

const DrawerContent = ({ isOpen, user }) => {
    const navigate = useNavigate();
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const openUserModal = () => {
        setIsUserModalOpen(true);
    };

    const closeUserModal = () => {
        setIsUserModalOpen(false);
    };

    return (
        <div className={`drawer-content ${isOpen ? 'open' : ''}`}>
            {user ? (
                <div className='user-block' onClick={openUserModal}>
                    <img className='user-img' src={userIcon} alt="User Icon" />
                    <p>{user}</p>
                </div>
            ) : null}

            <Options />

            <Modal
                isOpen={isUserModalOpen}
                onRequestClose={closeUserModal}
                contentLabel="User Information Modal"
                className="user-modal"
                overlayClassName="user-modal-overlay"
            >
                <button onClick={closeUserModal} className="user-modal-close-button">&times;</button>
                <h2>Información del Usuario</h2>
                <p>Nombre: {user}</p>
                {/* Agrega aquí más información del usuario que desees mostrar */}
            </Modal>
        </div>
    );
}

export default DrawerContent;
