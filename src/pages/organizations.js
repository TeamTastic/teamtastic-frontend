import React, { useState, useEffect } from 'react';
import { Modal, Box } from '@mui/material';
import RegisterOrganization from '../components/register-organization';
import AddOrganization from '../components/add-organization';
import '../styles/pages/organizations.css';
import '../styles/components/add-organization-button.css';
import '../styles/components/organization-button.css';
import axios from '../axiosConfig';
import withAuthorization from "../components/withAuthorization";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/header";
import { useOrganizations } from '../contexts/OrganizationsContext';
import { useNavigate } from 'react-router-dom';

function Organizations() {
  const { setCurrentOrganization, organizations, setOrganizations } = useOrganizations();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isRegisteredInOrg, setIsRegisteredInOrg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('/user-organizations');
        if (response.data && response.data.organizations && response.data.organizations.length > 0) {
          setIsRegisteredInOrg(true);
          setOrganizations(response.data.organizations);
        } else {
          setIsRegisteredInOrg(false);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setIsRegisteredInOrg(false);
        toast.error('Error al cargar las organizaciones');
      }
    };

    fetchOrganizations();
  }, [setOrganizations]);

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleSubmitRegister = async (orgName) => {
    try {
      const response = await axios.post('/org/create', { org_name: orgName });
      console.log('Organization added:', response);
      toast.success('Organización creada exitosamente');
      setShowRegisterForm(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error registering organization:', error);
      toast.error('Error al crear la organización');
    }
  };

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const orgCode = formData.get('orgCode');

    try {
      await axios.post('/api/organizations/add', { code: orgCode });
      toast.success('Organización agregada exitosamente');
      setShowAddForm(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error adding organization:', error);
      toast.error('Error al agregar la organización');
    }
  };

  const handleOrganizationClick = (org) => {
    setCurrentOrganization(org);
    navigate('/home');
  };

  return (
    <div className="organization">
      <ToastContainer />
      <div className="welcome">
        {isRegisteredInOrg ? (
          <>
            <h2>Ingrese a una de sus organizaciones</h2>
            <div className="organization-list">
              {organizations.map((org, index) => (
                <ul key={index}>
                  <button 
                    className="organization-button"
                    onClick={() => handleOrganizationClick(org)}
                  >
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
      <div className="line"></div>
      <div className="actions">
        {isRegisteredInOrg && <h2>O si lo prefiere</h2>}
        <button className="add-organization-button" onClick={toggleRegisterForm}>
          <span></span><span></span><span></span><span></span>
          Crear Organización
        </button>
        <button className="add-organization-button" onClick={toggleAddForm}>
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

export default withAuthorization(Organizations);
