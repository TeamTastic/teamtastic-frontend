import React, { useState, useEffect } from 'react';
import '../styles/pages/record.css';
import '../styles/components/add-organization-button.css';
import '../styles/components/organization-button.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../components/header";

function Record() {
  const navigate = useNavigate();
  const [isRegisteredInOrg, setIsRegisteredInOrg] = useState(false);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('/api/organization/leagues');
        if (response.data && response.data.length > 0) {
          setIsRegisteredInOrg(true);
          setLeagues(response.data);
        } else {
          setIsRegisteredInOrg(false);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setIsRegisteredInOrg(false);
      }
    };

    fetchLeagues();
  }, []);


  return (

    <div className="record">
      <Header/>            
      <h1> &#9314; Vea el historial de equipos armados</h1>
      <div className="welcome">
        {isRegisteredInOrg ? (
          <>
            <div className="organization-list">
              {leagues.map((org, index) => (
                <ul key={index}>
                  <button className="organization-button">
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
            <p>Vemos que aún no tienes ninguna liga creada... ¡haz una ahora!</p>
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
