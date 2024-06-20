import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import "../styles/pages/teams.css";
import withAuthorization from "../components/withAuthorization";
import {useLocation} from "react-router-dom";
import axios from "../axiosConfig";
import anotherInstance from "../anotherInstance";
import {Drawer} from "@mui/material";
import Header from "../components/header";

function Teams() {


  const equiposPorPagina = 8;
  const [paginaActual, setPaginaActual] = useState(1);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [equiposFiltrados, setEquiposFiltrados] = useState([]);
  const location = useLocation();
  const {league, currentOrganization} = location.state || {};
  const {teamsUrl, setTeamsUrl} = useState('');
  const [allTeams, setAllTeams] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("/get_league_url",{
      params: {
        org: currentOrganization,
        league: league
      }
    }).then((response) => {

      anotherInstance.get(response.data.url)
          .then(response => {
            setAllTeams(response.data);
          })
    }).catch((error) => {console.error(error);});
  }, []);



  useEffect(() => {
    if (allTeams === null) return;
    const auxTeams = [];
    let i = 1;
    for (const team of allTeams['teams']) {
      const name = "Equipo"
      const aux = {name:name+` ${i}` , members: team};
      auxTeams.push(aux);
      i++;
    }
    setTeams(auxTeams);
  }, [allTeams]);

  useEffect(() => {
    const filteredEquipos = teams.filter(equipo => {
      return equipo.members.some(jugador => jugador.toLowerCase().includes(searchTerm.toLowerCase()));
    });
    setEquiposFiltrados(filteredEquipos);
    setPaginaActual(1); // Reiniciar a la primera página cuando cambia el término de búsqueda
  }, [teams, searchTerm]);

  const totalPaginas = Math.ceil(equiposFiltrados.length / equiposPorPagina);

  const handleEquipoClick = (equipo) => {
    if (equipo === equipoSeleccionado) {
      setEquipoSeleccionado(null);
    } else {
      setEquipoSeleccionado(equipo);
    }
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

  const indexOfLastEquipo = paginaActual * equiposPorPagina;
  const indexOfFirstEquipo = indexOfLastEquipo - equiposPorPagina;

  const equiposPaginaActual = equiposFiltrados.slice(indexOfFirstEquipo, indexOfLastEquipo);

  return (
  
    <div className="equipos-container">
      <Header/>
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