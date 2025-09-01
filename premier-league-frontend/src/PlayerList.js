import React from "react";

function PlayersList({ players, onDelete }) {
    return (
        <div>
            <h2>Premier League Players</h2>
            <table border="1">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Nation</th>
                    <th>Age</th>
                    <th>Goals</th>
                    <th>Assists</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {players.map((p, i) => (
                    <tr key={i}>
                        <td>{p.playerName}</td>
                        <td>{p.teamName}</td>
                        <td>{p.position}</td>
                        <td>{p.nation}</td>
                        <td>{p.age || "-"}</td>
                        <td>{p.goals || "-"}</td>
                        <td>{p.assists || "-"}</td>
                        <td>
                            <button onClick={() => onDelete(p.playerName)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlayersList;
