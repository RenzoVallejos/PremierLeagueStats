/**
 * LiveApp.js
 *
 * Main container for live Premier League data.
 * - Tabs: Standings (left), Matches (middle), Top Scorers (right).
 */

import React, { useEffect, useState } from "react";
import PlayerList from "../custom/PlayerList";
import StandingsList from "./StandingsList";
import MatchesListLive from "./MatchesListLive";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8081/api";

const LiveApp = () => {
    const [players, setPlayers] = useState([]);
    const [standings, setStandings] = useState([]);
    const [matches, setMatches] = useState([]);
    const [status, setStatus] = useState("");
    const [view, setView] = useState("standings"); // default tab → Standings

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

    // Fetch data based on active view
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
        <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white shadow-lg rounded-xl p-6">
                {/* Header row with title on left and tabs on right */}
                <div className="flex justify-between items-center border-b border-gray-200 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 pb-2">
                        Premier League 2025-2026
                    </h2>

                    <div className="flex space-x-6">
                        {/* Standings first */}
                        <button
                            className={`pb-2 text-sm font-medium ${
                                view === "standings"
                                    ? "text-indigo-600 border-b-2 border-indigo-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setView("standings")}
                        >
                            Standings
                        </button>

                        {/* Matches in the middle */}
                        <button
                            className={`pb-2 text-sm font-medium ${
                                view === "matches"
                                    ? "text-indigo-600 border-b-2 border-indigo-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setView("matches")}
                        >
                            Matches
                        </button>

                        {/* Scorers last */}
                        <button
                            className={`pb-2 text-sm font-medium ${
                                view === "scorers"
                                    ? "text-indigo-600 border-b-2 border-indigo-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setView("scorers")}
                        >
                            Top Scorers
                        </button>
                    </div>
                </div>

                {status && <p className="text-red-600 mb-4">{status}</p>}

                {/* Render based on tab */}
                {view === "scorers" ? (
                    <PlayerList players={players} liveMode={true} />
                ) : view === "standings" ? (
                    <StandingsList standings={standings} />
                ) : (
                    <MatchesListLive matches={matches} />
                )}
            </div>
        </div>
    );
};

export default LiveApp;
