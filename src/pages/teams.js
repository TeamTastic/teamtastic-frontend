import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import "../styles/pages/teams.css";
import withAuthorization from "../components/withAuthorization";
import Header from "../components/header";
import { useOrganizations } from '../contexts/OrganizationsContext';
import { useLeague } from '../contexts/LeagueContext';
import axios from '../axiosConfig';
import anotherInstance from "../anotherInstance";

const Teams = () => {
  const [equipos, setEquipos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [equiposFiltrados, setEquiposFiltrados] = useState([]);
  const equiposPorPagina = 8;
  const indexOfLastEquipo = paginaActual * equiposPorPagina;
  const indexOfFirstEquipo = indexOfLastEquipo - equiposPorPagina;
  const [equiposPaginaActual, setEquiposPaginaActual] = useState([]);
  const { currentOrganization } = useOrganizations();
  const { selectedLeague } = useLeague();

  useEffect(() => {
    if (currentOrganization && selectedLeague) {
      axios.get('/get_league_url', {
        params: {
          org: currentOrganization,
          league: selectedLeague
        }
      })
          .then(response => {
            return anotherInstance.get(response.data.url);
          })
          .then(response => {
            const auxTeams = response.data.teams.map((team, index) => ({
              name: `Equipo ${index + 1}`,
              members: team
            }));
            setEquipos(auxTeams);
            setEquiposFiltrados(auxTeams);
            setEquiposPaginaActual(auxTeams.slice(indexOfFirstEquipo, indexOfLastEquipo));
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
    }
  }, [currentOrganization, selectedLeague]);

  useEffect(() => {
    const filteredEquipos = equipos.filter(equipo =>
        equipo.members.some(jugador => jugador.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setEquiposFiltrados(filteredEquipos);
    setPaginaActual(1); // Reset to the first page when search term changes
  }, [searchTerm, equipos]);

  useEffect(() => {
    setEquiposPaginaActual(equiposFiltrados.slice(indexOfFirstEquipo, indexOfLastEquipo));
  }, [equiposFiltrados, paginaActual]);

  const totalPaginas = Math.ceil(equiposFiltrados.length / equiposPorPagina);

  const handleEquipoClick = (equipo) => {
    setEquipoSeleccionado(equipo === equipoSeleccionado ? null : equipo);
  };

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  return (
      <div className="equipos-container">
        <Header />
        <h2>Equipos</h2>
        <input
            type="text"
            placeholder="Buscar jugadores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="equipos-lista">
          {equiposPaginaActual.map((equipo, index) => {
            const isSelected = equipo === equipoSeleccionado;
            return (
                <div
                    key={index}
                    className={`equipo-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleEquipoClick(equipo)}
                >
                  <div className="equipo-header">
                    <span className="equipo-title">{equipo.name}</span>
                    {isSelected ? <FaMinus /> : <FaPlus />}
                  </div>
                  {isSelected && (
                      <ul className="jugadores-list">
                        {equipo.members.map((jugador, index) => (
                            <li key={index} className="jugador-item">{jugador}</li>
                        ))}
                      </ul>
                  )}
                </div>
            );
          })}
        </div>
        <div className="paginacion">
          <button onClick={handlePaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
          <span>Página {paginaActual} de {totalPaginas}</span>
          <button onClick={handlePaginaSiguiente} disabled={paginaActual === totalPaginas}>Siguiente</button>
        </div>
      </div>
  );
};

export default withAuthorization(Teams);
;