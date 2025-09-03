import React, { useEffect, useState } from "react";
import PlayerList from "./PlayerList";
import StandingsList from "./StandingsList";

const LiveApp = () => {
    const [players, setPlayers] = useState([]);
    const [standings, setStandings] = useState([]);
    const [status, setStatus] = useState("");
    const [view, setView] = useState("scorers"); // default tab

    // Fetch live scorers
    const fetchLivePlayers = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/live-scorers");
            const data = await response.json();
            setPlayers(data);
        } catch (err) {
            setStatus("❌ Failed to fetch live scorers.");
        }
    };

    // Fetch league standings
    const fetchStandings = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/standings");
            const data = await response.json();
            setStandings(data);
        } catch (err) {
            setStatus("❌ Failed to fetch standings.");
        }
    };

    useEffect(() => {
        if (view === "scorers") {
            fetchLivePlayers();
        } else if (view === "standings") {
            fetchStandings();
        }
    }, [view]);

    return (
        <div>
            <h2>Live Premier League Data (API)</h2>
            <p>{status}</p>

            {/* Toggle buttons */}
            <div>
                <button onClick={() => setView("scorers")} disabled={view === "scorers"}>
                    Top Scorers
                </button>
                <button onClick={() => setView("standings")} disabled={view === "standings"}>
                    Standings
                </button>
            </div>

            {/* Render based on tab */}
            {view === "scorers" ? (
                <PlayerList players={players} liveMode={true} />
            ) : (
                <StandingsList standings={standings} />
            )}
        </div>
    );
};

export default LiveApp;

