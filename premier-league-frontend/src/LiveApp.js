import React, { useEffect, useState } from "react";
import PlayerList from "./PlayerList";

const LiveApp = () => {
    const [players, setPlayers] = useState([]);
    const [status, setStatus] = useState("");

    // Fetch live scorers from backend
    const fetchLivePlayers = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/live-scorers");
            const data = await response.json();

            // Transform API data into table format
            const scorers = data.scorers.map((s) => ({
                playerName: s.player.name,
                team: {
                    name: s.team.name,
                    crest: s.team.crest,   // ✅ include crest here
                },
                position: s.player.position || "N/A",
                nation: s.player.nationality || "N/A",
                age: s.player.dateOfBirth
                    ? new Date().getFullYear() -
                    new Date(s.player.dateOfBirth).getFullYear()
                    : "-",
                goals: s.goals,
                assists: s.assists || 0,
            }));

            setPlayers(scorers);
            setStatus(" Live API data loaded!");
        } catch (err) {
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

            {/* PlayerList is reused, delete buttons hidden in API mode */}
            <PlayerList players={players} liveMode={true} />
        </div>
    );
};

export default LiveApp;
