import React, { useState, useEffect } from 'react';
import '../styles/pages/record.css';
import '../styles/components/add-organization-button.css';
import '../styles/components/organization-button.css';
import axios from '../axiosConfig';
import {useNavigate} from 'react-router-dom';
import Header from "../components/header";
import { useOrganizations } from '../contexts/OrganizationsContext';

function Record() {
  const { currentOrganization } = useOrganizations();
  const navigate = useNavigate();
  const [isRegisteredInOrg, setIsRegisteredInOrg] = useState(false);
  const [leagues, setLeagues] = useState([]);


  useEffect(() => {
    const fetchLeagues = async () => {
      if (!currentOrganization) {
        return;
      }

      try {
        const response = await axios.get(`/get_organization_leagues`, {
          params: {
            org: currentOrganization
          }
        });
        if (response.data && response.data.length > 0) {
          setIsRegisteredInOrg(true);
          setLeagues(response.data);
        } else {
          setIsRegisteredInOrg(false);
        }
      } catch (error) {
        console.error('Error fetching leagues:', error);
        setIsRegisteredInOrg(false);
      }
    };

    fetchLeagues();
  }, [currentOrganization]);

  function showTeams(league) {
    console.log('showTeams:', league);
    return () => {
      navigate('/teams', { state: { league, currentOrganization } });
    };
  }

  return (
    <div className="record">
      <Header />
      <h1> &#9314; Vea el historial de equipos armados</h1>
      <div className="welcome">
        {isRegisteredInOrg ? (
          <>
            <div className="organization-list">
              {leagues.map((league, index) => (
                <ul key={index}>
                  <button className="organization-button" onClick={showTeams(league)}>
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">{league}</span>
                  </button>
                </ul>
              ))}
            </div>
            <div className="line"></div>
            <div className="actions">
              <h2>¿Prefieres agregar una nueva?</h2>
              <button className="add-organization-button" onClick={() => navigate('/download')}>
                <span></span><span></span><span></span><span></span>
                Descargar Template
              </button>
              <button className="add-organization-button" onClick={() => navigate('/upload')}>
                <span></span><span></span><span></span><span></span>
                Cargar Planilla
              </button>
            </div>
          </>
        ) : (
          <>
            <p>Vemos que aún no hay ninguna liga creada en {currentOrganization}... ¡haz una ahora!</p>
            <div className="line"></div>
            <div className="actions">
              <button className="add-organization-button" onClick={() => navigate('/download')}>
                <span></span><span></span><span></span><span></span>
                Descargar Template
              </button>
              <button className="add-organization-button" onClick={() => navigate('/upload')}>
                <span></span><span></span><span></span><span></span>
                Cargar Planilla
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Record;
