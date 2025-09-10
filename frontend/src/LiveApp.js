/**
 * LiveApp.js
 *
 * This component acts as the main container for displaying live Premier League data
 * fetched from the Spring Boot backend (which in turn calls the Football-Data API).
 *
 * Features:
 * - Toggle between Top Scorers, Standings, and Live Matches using buttons.
 * - Fetches data from corresponding endpoints:
 *   - /api/live-scorers → top scorers
 *   - /api/standings → league table
 *   - /api/live-matches → live/past/upcoming matches
 * - Renders the correct child component (PlayerList, StandingsList, MatchesListLive)
 *   depending on the selected view.
 */

import React, { useEffect, useState } from "react";
import PlayerList from "./PlayerList";
import StandingsList from "./StandingsList";
import MatchesListLive from "./MatchesListLive";

const BASE_URL = process.env.REACT_APP_API_URL_LIVE || "http://localhost:8081/api";

const LiveApp = () => {
    const [players, setPlayers] = useState([]);
    const [standings, setStandings] = useState([]);
    const [matches, setMatches] = useState([]);
    const [status, setStatus] = useState("");
    const [view, setView] = useState("scorers"); // default tab

    // Fetch live scorers
    const fetchLivePlayers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/live-scorers`);
            const data = await response.json();
            setPlayers(data);
        } catch (err) {
            setStatus("❌ Failed to fetch live scorers.");
        }
    };

    // Fetch league standings
    const fetchStandings = async () => {
        try {
            const response = await fetch(`${BASE_URL}/standings`);
            const data = await response.json();
            setStandings(data);
        } catch (err) {
            setStatus("❌ Failed to fetch standings.");
        }
    };

    // Fetch live matches
    const fetchMatches = async () => {
        try {
            const response = await fetch(`${BASE_URL}/live-matches`);
            const data = await response.json();
            setMatches(data);
        } catch (err) {
            setStatus("❌ Failed to fetch matches.");
        }
    };

    // Decide which fetch to call when the view changes
    useEffect(() => {
        if (view === "scorers") {
            fetchLivePlayers();
        } else if (view === "standings") {
            fetchStandings();
        } else if (view === "matches") {
            fetchMatches();
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
                <button onClick={() => setView("matches")} disabled={view === "matches"}>
                    Matches
                </button>
            </div>

            {/* Render based on tab */}
            {view === "scorers" ? (
                <PlayerList players={players} liveMode={true} />
            ) : view === "standings" ? (
                <StandingsList standings={standings} />
            ) : (
                <MatchesListLive matches={matches} />
            )}
        </div>
    );
};

export default LiveApp;
