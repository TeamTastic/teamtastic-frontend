import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/components/drawerContent.css';
import userIcon from '../assets/drawer/user-icon.svg';
import { useOrganizations } from '../contexts/OrganizationsContext';
import Options from "./options";

const DrawerContent = ({ isOpen, user }) => {
  const { currentOrganization, organizations, setCurrentOrganization } = useOrganizations();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOrganizationChange = (org) => {
    setCurrentOrganization(org);
    setShowDropdown(false);
    toast.success(`Organización cambiada a ${org}`); // Muestra un toast de éxito
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  };

  const filteredOrganizations = organizations
    .filter(org => org !== currentOrganization)
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className={`drawer-content ${isOpen ? 'open' : ''}`}>
      <ToastContainer /> {/* Contenedor de toast */}
      {user ? (
        <div className='user-block'>
          <img className='user-img' src={userIcon} alt="SVG"/>
          <p>{user}</p>
        </div>
      ) : null}

      {currentOrganization && (
        <div className="current-organization">
          <button className='btn2' onClick={() => setShowDropdown(!showDropdown)}>
            <span className="arrow"> {currentOrganization} {showDropdown ? '▲' : '▼'}</span>
          </button>
          {showDropdown && (
            <ul className="organization-dropdown">
              {filteredOrganizations.map((org, index) => (
                <li key={index} onClick={() => handleOrganizationChange(org)}>
                  {org}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Options />
    </div>
  );
}

export default DrawerContent;
