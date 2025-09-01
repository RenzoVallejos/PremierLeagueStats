import React, { useEffect, useState } from "react";
import MatchesList from "./MatchesList";
import MatchForm from "./MatchForm";
import PlayersList from "./PlayerList";
import PlayerForm from "./PlayerForm";

const App = () => {
    const [players, setPlayers] = useState([]);

    // Fetch players from backend
    const fetchPlayers = async () => {
        const response = await fetch("http://localhost:8081/players");
        const data = await response.json();
        setPlayers(data);
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    // Add player
    const addPlayer = async (player) => {
        const response = await fetch("http://localhost:8081/players", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player),
        });
        if (response.ok) {
            await fetchPlayers(); // refresh list
        }
    };

    // Update player
    const updatePlayer = async (player) => {
        const response = await fetch("http://localhost:8081/players", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player),
        });
        if (response.ok) {
            await fetchPlayers(); // refresh list
        }
    };

    // Delete player
    const deletePlayer = async (playerName) => {
        await fetch(`http://localhost:8081/players/${playerName}`, {
            method: "DELETE",
        });
        await fetchPlayers(); // refresh list
    };

    return (
        <div>
            <h1>Premier League App</h1>

            <h2>Add Match</h2>
            <MatchForm />
            <MatchesList />

            <h2>Players</h2>
            <PlayerForm onAdd={addPlayer} onUpdate={updatePlayer} />
            <PlayersList players={players} onDelete={deletePlayer} />
        </div>
    );
};

export default App;
