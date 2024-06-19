import React, { useState, useEffect } from 'react';
import '../styles/pages/record.css';
import '../styles/components/add-organization-button.css';
import '../styles/components/organization-button.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../components/header";
import { useOrganizations } from '../contexts/OrganizationsContext';
import { useLeague } from '../contexts/LeagueContext'; // Importar el contexto de la liga
import { toast, ToastContainer } from 'react-toastify';


function Record() {
  const { currentOrganization } = useOrganizations();
  const navigate = useNavigate();
  const { selectLeague } = useLeague(); // Obtener la función para seleccionar la liga del contexto
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

  // Función para manejar la obtención de ligas al hacer clic en un botón de liga
  const handleGetOrganizationLeagues = async (currentOrganization) => {
    try {
      const response = await axios.get(`/get_organization_leagues`, {
        params: {
          organization: currentOrganization
        }
      });
      if (response.data && response.data.length > 0) {
        setLeagues(response.data);
      }
    } catch (error) {
      console.error('Error fetching leagues:', error);
      toast.error('Error al obtener las ligas');
    }
  };

  // Función para navegar a la pantalla de equipos
  const navigateToTeams = (league) => {
    selectLeague(league); // Actualizar el contexto con la liga seleccionada
    navigate('/teams'); // Navegar a la pantalla de equipos
  };

  return (
    <div className="record">
      <Header />
      <h1> &#9314; Vea el historial de equipos armados</h1>
      <div className="welcome">
        {isRegisteredInOrg ? (
          <>
            <div className="organization-list">
              {leagues.map((org, index) => (
                <ul key={index}>
                  <button className="organization-button" onClick={() => navigateToTeams(org)}>
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">{org}</span>
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
