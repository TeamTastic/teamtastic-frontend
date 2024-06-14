import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    navigate('/home'); // o cualquier ruta que deba mostrarse tras cambiar la organización
  };

  return (
    <div className={`drawer-content ${isOpen ? 'open' : ''}`}>
      {user ? (
        <div className='user-block'>
          <img className='user-img' src={userIcon} alt="SVG"/>
          <p>{user}</p>
        </div>
      ) : null}

      {currentOrganization && (
        <div className="current-organization">
          <p>Organización actual: {currentOrganization}</p>
          <button onClick={() => setShowDropdown(!showDropdown)}>
            Cambiar organización
          </button>
          {showDropdown && (
            <ul className="organization-dropdown">
              {organizations.map((org, index) => (
                <li key={index} onClick={() => handleOrganizationChange(org)}>
                  {org}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Options/>
    </div>
  );
}

export default DrawerContent;
