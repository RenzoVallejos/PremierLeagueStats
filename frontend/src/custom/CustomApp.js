/**
 * This component is the main container for managing custom players and matches
 * stored in the Postgres database through the Spring Boot backend.
 *
 * Features:
 * - Fetches all players from the backend on initial load.
 * - Provides functionality to:
 *   - Add new players (POST /players).
 *   - Update existing players (PUT /players).
 *   - Delete players by name (DELETE /players/{playerName}).
 * - Displays:
 *   - A form to add new matches (MatchForm).
 *   - A list of matches (MatchesList).
 *   - A form to add/update players (PlayerForm).
 *   - A list of players with delete options (PlayerList).
 *
 * API Base URL:
 * - Uses REACT_APP_API_URL_CUSTOM (env variable).
 * - Falls back to http://localhost:8081 if not provided.
 */
import React, { useEffect, useState } from "react";
import MatchesList from "./MatchesList";
import MatchForm from "./MatchForm";
import PlayerList from "./PlayerList";
import PlayerForm from "./PlayerForm";

const BASE_URL = process.env.REACT_APP_API_URL_CUSTOM || "http://localhost:8081";

const CustomApp = () => {
    const [players, setPlayers] = useState([]);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch players from backend
    const fetchPlayers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/players`);
            const data = await response.json();
            setPlayers(data);
        } catch (error) {
            setStatus("❌ Failed to load players. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    // Add player
    const addPlayer = async (player) => {
        try {
            const response = await fetch(`${BASE_URL}/players`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(player),
            });
            if (response.ok) {
                setStatus(`✅ Player "${player.playerName}" added successfully!`);
                await fetchPlayers();
            } else {
                setStatus(`❌ Failed to add player.`);
            }
        } catch (error) {
            setStatus(`❌ Network error. Please try again.`);
        }
    };

    // Update player
    const updatePlayer = async (player) => {
        try {
            const response = await fetch(`${BASE_URL}/players`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(player),
            });
            if (response.ok) {
                setStatus(`✅ Player "${player.playerName}" updated successfully!`);
                await fetchPlayers();
            } else {
                setStatus(`❌ Failed to update player "${player.playerName}".`);
            }
        } catch (error) {
            setStatus(`❌ Network error. Please try again.`);
        }
    };

    // Delete player
    const deletePlayer = async (playerName) => {
        try {
            const response = await fetch(`${BASE_URL}/players/${playerName}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setStatus(`✅ Player "${playerName}" deleted successfully!`);
                await fetchPlayers();
            } else {
                setStatus(`❌ Failed to delete player "${playerName}".`);
            }
        } catch (error) {
            setStatus(`❌ Network error. Please try again.`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6">
            {/* Status message */}
            {status && (
                <div className={`mb-6 p-4 rounded-lg ${
                    status.includes('✅') 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                    {status}
                </div>
            )}

            {/* Matches Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    🏆 Matches Management
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Match</h3>
                        <MatchForm />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Matches</h3>
                        <MatchesList />
                    </div>
                </div>
            </div>

            {/* Players Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    ⚽ Players Management
                </h2>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add/Update Player</h3>
                        <PlayerForm onAdd={addPlayer} onUpdate={updatePlayer} status={status} />
                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Players List</h3>
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                <span className="ml-3 text-gray-600">Loading players...</span>
                            </div>
                        ) : (
                            <PlayerList players={players} onDelete={deletePlayer} status={status} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomApp;
