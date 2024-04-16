import React from 'react';
import "../styles/teams.css"

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

export default Teams;