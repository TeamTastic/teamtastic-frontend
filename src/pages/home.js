// src/pages/home.js
import React, { useState, useEffect } from 'react';
import { Modal, Box} from '@mui/material';
import RegisterOrganization from '../components/register-organization';
import AddOrganization from '../components/add-organization';
import '../styles/pages/home.css';
import '../styles/components/add-organization-button.css';
import '../styles/components/organization-button.css';

function Home() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isRegisteredInOrg, setIsRegisteredInOrg] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const userOrganizations = checkUserOrganizations();
    if (userOrganizations.length > 0) {
      setIsRegisteredInOrg(true);
      setOrganizations(userOrganizations);
    } else {
      setIsRegisteredInOrg(false);
    }
  }, []);

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    // Enviar registro de Organización
    setShowRegisterForm(false);
  };

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    // Agregar Organización existente
    setShowAddForm(false);
  };

  const checkUserOrganizations = () => {
    return ["Organización 1", "Organización 2"];
  };

  return (
    <div className='home'>
      <div className='welcome'>
        <h1>Bienvenido a TeamTastic</h1>
        {isRegisteredInOrg ? (
          <>
            <h2>Ingrese a una de sus organizaciones</h2>
            <div className="organization-list">
              {organizations.map((org, index) => (
                <ul>
                  <button key={index} className="organization-button">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">{org}</span>
                  </button>
                </ul>
              ))}
            </div>
          </>
        ) : (
          <p>Vemos que aún no estás en ninguna organización... ¡únete a una!</p>
        )}
      </div>
      <div className='line'></div>
      <div className='actions'>
        {isRegisteredInOrg && <h2>O si lo prefiere</h2>}
        <button className='add-organization-button' onClick={toggleRegisterForm}>
          <span></span><span></span><span></span><span></span>
          Crear Organización
        </button>
        <button className='add-organization-button' onClick={toggleAddForm}>
          <span></span><span></span><span></span><span></span>
          Agregar Organización existente
        </button>
      </div>
      <Modal
        open={showRegisterForm}
        onClose={toggleRegisterForm}
        aria-labelledby="modal-register-title"
        aria-describedby="modal-register-description"
      >
        <Box>
          <RegisterOrganization handleSubmit={handleSubmitRegister} handleClose={toggleRegisterForm} />
        </Box>
      </Modal>
      <Modal
        open={showAddForm}
        onClose={toggleAddForm}
        aria-labelledby="modal-add-title"
        aria-describedby="modal-add-description"
      >
        <Box>
          <AddOrganization handleSubmit={handleSubmitAdd} handleClose={toggleAddForm} />
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
