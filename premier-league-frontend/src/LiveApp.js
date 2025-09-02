import React, { useEffect, useState } from "react";
import PlayerList from "./PlayerList";

const LiveApp = () => {
    const [players, setPlayers] = useState([]);
    const [status, setStatus] = useState("");

    // Fetch live scorers from backend (already normalized in Spring Boot)
    const fetchLivePlayers = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/live-scorers");
            if (!response.ok) {
                throw new Error("Failed to fetch live data");
            }
            const data = await response.json();
            setPlayers(data);
            setStatus(" Live API data loaded!");
        } catch (err) {
            console.error("Error fetching live data:", err);
            setStatus("❌ Failed to fetch live data.");
        }
    };

    useEffect(() => {
        fetchLivePlayers();
    }, []);

    return (
        <div>
            <h2>Live Top Scorers (API)</h2>
            <p>{status}</p>

            {/* PlayerList is reused (no delete button in live mode) */}
            <PlayerList players={players} liveMode={true} />
        </div>
    );
};

export default LiveApp;
