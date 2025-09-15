import React from "react";

const StandingsList = ({ standings }) => {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {standings.map((team, index) => (
                    <tr key={index}>
                        <td>{team.position}</td>
                        <td>
                            <img
                                src={team.crest}
                                alt={team.teamName}
                                style={{
                                    width: "25px",
                                    height: "25px",
                                    marginRight: "8px",
                                    verticalAlign: "middle",
                                }}
                            />
                            {team.teamName}
                        </td>
                        <td>{team.playedGames}</td>
                        <td>{team.won}</td>
                        <td>{team.draw}</td>
                        <td>{team.lost}</td>
                        <td>{team.goalsFor}</td>
                        <td>{team.goalsAgainst}</td>
                        <td>{team.goalDifference}</td>
                        <td>{team.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StandingsList;

