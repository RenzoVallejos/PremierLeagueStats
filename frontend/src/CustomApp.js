import React, { useEffect, useState } from "react";
import MatchesList from "./MatchesList";
import MatchForm from "./MatchForm";
import PlayerList from "./PlayerList";
import PlayerForm from "./PlayerForm";

const CustomApp = () => {
    const [players, setPlayers] = useState([]);
    const [status, setStatus] = useState("");

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
            setStatus(` Player "${player.playerName}" added successfully!`);
            await fetchPlayers();
        } else {
            setStatus(`❌ Failed to add player.`);
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
            setStatus(` Player "${player.playerName}" updated successfully!`);
            await fetchPlayers();
        } else {
            setStatus(`❌ Failed to update player "${player.playerName}".`);
        }
    };

    // Delete player
    const deletePlayer = async (playerName) => {
        const response = await fetch(`http://localhost:8081/players/${playerName}`, {
            method: "DELETE",
        });
        if (response.ok) {
            setStatus(` Player "${playerName}" deleted successfully!`);
            await fetchPlayers();
        } else {
            setStatus(`❌ Failed to delete player "${playerName}".`);
        }
    };

    return (
        <div>
            <h2>Custom Players (Postgres)</h2>
            <MatchForm />
            <MatchesList />

            <h2>Players</h2>
            <PlayerForm onAdd={addPlayer} onUpdate={updatePlayer} status={status} />
            <PlayerList players={players} onDelete={deletePlayer} status={status} />
        </div>
    );
};

export default CustomApp;
