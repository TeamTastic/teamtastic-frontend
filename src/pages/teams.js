import React from 'react';
import "../styles/pages/teams.css"
import starIcon from "../assets/info-icons/star-icon.svg";
import MoreInfo from "../components/moreInfo";
import withAuthorization from "../components/withAuthorization";

function Teams() {
    const Frontend = ['David', 'Belen P', 'Sofia'];
    const Backend = ['Joaco', 'Baltasar', 'Valentin'];
    const Other = ['Belen F', 'Agus'];

    const teams = [
        { name: 'Frontend', members: Frontend },
        { name: 'Backend', members: Backend },
        { name: 'Other', members: Other }
    ];

    return (
        <div className="teams">
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
            </div>
            <div className='teams-list'>
                {teams.map((team, index) => (
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
