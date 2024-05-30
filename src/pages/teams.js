import React, { useState, useEffect } from 'react';
import "../styles/pages/teams.css";
import starIcon from "../assets/info-icons/star-icon.svg";
import MoreInfo from "../components/moreInfo";
import Header from "../components/header";
import withAuthorization from "../components/withAuthorization";

function Teams() {
    const [filterName, setFilterName] = useState("");
    const [filteredTeams, setFilteredTeams] = useState([]);

    const teams = [
        { name: 'Team1', members: ['David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando', 'Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor'] },
        { name: 'Team2', members: ['Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo', 'Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas'] },
        { name: 'Team3', members: ['Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel', 'Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David'] },
        { name: 'Team4', members: ['Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
        { name: 'Team5', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
        { name: 'Team6', members: ['Lola', 'Hector', 'Paula', 'Eduardo', 'Ivan', 'Lucas', 'Sara', 'Gonzalo', 'David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando'] },
        { name: 'Team7', members: ['Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor', 'Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo'] },
        { name: 'Team8', members: ['Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas', 'Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel'] },
        { name: 'Team9', members: ['Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David', 'Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo'] },
        { name: 'Team10', members: ['Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan', 'Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel'] }
    ];

    useEffect(() => {
        // Añadir la clase específica al body cuando el componente se monta
        document.body.classList.add('body-teams');

        // Limpiar la clase cuando el componente se desmonta
        return () => {
            document.body.classList.remove('body-teams');
        };
    }, []);

    useEffect(() => {
        // Filtrar los equipos según el nombre ingresado
        if (filterName === "") {
            setFilteredTeams(teams);
        } else {
            const filtered = teams.filter(team => 
                team.members.some(member => member.toLowerCase().includes(filterName.toLowerCase()))
            );
            setFilteredTeams(filtered);
        }
    }, [filterName, teams]);

    const handleFilterChange = (event) => {
        setFilterName(event.target.value);
    };

    return (
        <div className="teams">
            <Header />
            <MoreInfo>
                <div className='info-container'>
                    <div className='info-header'>
                        <img src={starIcon} alt="Star Icon"/>
                        <h1>Formación de Equipos</h1>
                    </div>
                    <ul>
                        <li>Una vez subida la planilla, el sistema procesará la información y creará automáticamente los equipos basados en las puntuaciones de las habilidades ingresadas.</li>
                    </ul>
                </div>
            </MoreInfo>
            <div className='teams-list-header'>
                <h1> Equipos Generados </h1>
                <input 
                    type="text" 
                    placeholder="Filtrar por nombre" 
                    value={filterName}
                    onChange={handleFilterChange}
                    className="filter-input"
                />
            </div>
            <div className='teams-list'>
                {filteredTeams.map((team, index) => (
                    <div className="listed-team" key={index}>
                        <div className="team-name-container">
                            <h2>{team.name}</h2>
                        </div>
                        <ul>
                            {team.members.map((member, memberIndex) => (
                                <li key={memberIndex}>{member}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default withAuthorization(Teams);
