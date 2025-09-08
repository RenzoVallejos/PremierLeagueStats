import React from "react";

const PlayerList = ({ players, onDelete, liveMode = false }) => {
    return (
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
                {!liveMode && <th>Action</th>}
            </tr>
            </thead>
            <tbody>
            {players.map((player, index) => (
                <tr key={index}>
                    {/* Player name */}
                    <td>{player.playerName}</td>

                    {/* Team name with crest if available */}
                    <td>
                        {liveMode && player.teamCrest ? (
                            <>
                                <img
                                    src={player.teamCrest}
                                    alt={player.teamName}
                                    style={{
                                        width: "25px",
                                        height: "25px",
                                        marginRight: "8px",
                                        verticalAlign: "middle",
                                    }}
                                />
                                {player.teamName}
                            </>
                        ) : (
                            player.teamName
                        )}
                    </td>

                    {/* Other info */}
                    <td>{player.position ?? "N/A"}</td>
                    <td>{player.nation}</td>
                    <td>{player.age ?? "N/A"}</td>
                    <td>{player.goals}</td>
                    <td>{player.assists}</td>

                    {/* Delete only for custom mode */}
                    {!liveMode && (
                        <td>
                            <button onClick={() => onDelete(player.playerName)}>
                                Delete
                            </button>
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PlayerList;
