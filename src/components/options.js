import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import homeIcon from "../assets/drawer/home-icon.svg";
import oneIcon from "../assets/drawer/one-icon.svg";
import twoIcon from "../assets/drawer/two-icon.svg";
import threeIcon from "../assets/drawer/three-icon.svg";
import logoutIcon from "../assets/drawer/logout-icon.svg";
import inviteIcon from "../assets/drawer/invite-icon.svg";
import { useOrganizations } from '../contexts/OrganizationsContext';
import InvitePopup from './invitePopup';
import axios from '../axiosConfig';

function Options() {
  const { currentOrganization } = useOrganizations();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get('/get_token', {
          params: { name: currentOrganization }
        });
        setToken(response.data.organization_token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    if (currentOrganization) {
      fetchToken();
    }
  }, [currentOrganization]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className='drawer-options'>
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
        <li>
          <button onClick={openPopup} className='list-item-button'>
            <div className='list-item'>
              <img src={inviteIcon} alt="SVG"/>
              Invitar a mi organización
            </div>
          </button>
        </li>
        <li className="logout">
          <Link to="/logout">
            <div className='list-item'>
              <img src={logoutIcon} alt="SVG"/>
              Cerrar sesión
            </div>
          </Link>
        </li>
      </ul>
      <InvitePopup isOpen={isPopupOpen} onClose={closePopup} token={token} />
    </div>
  );
}

export default Options;
