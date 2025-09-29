/**
 * TeamRoster.js
 *
 * Displays the roster (squad) for a given team.
 * - Fetches players from backend: /api/live/teams/:id
 * - Uses useParams() to grab teamId from the URL
 * - Renders a simple table with player info
 */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8081/api";

const TeamRoster = () => {
    const { id } = useParams(); // get teamId from URL
    const [team, setTeam] = useState(null);
    const [status, setStatus] = useState("");

    // Fetch team details + roster
    const fetchTeam = async () => {
        try {
            const response = await fetch(`${BASE_URL}/live/teams/${id}`);
            if (!response.ok) throw new Error("Failed to fetch team");
            const data = await response.json();
            setTeam(data);
        } catch (err) {
            setStatus("❌ Failed to fetch team roster.");
        }
    };

    useEffect(() => {
        fetchTeam();
    }, [id]);

    if (status) {
        return <p className="text-red-600">{status}</p>;
    }

    if (!team) {
        return <p className="text-gray-600">Loading team roster...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
            {/* Back link */}
            <div className="mb-4">
                <Link
                    to="/"
                    className="text-indigo-600 hover:underline font-medium"
                >
                    ← Back to Standings
                </Link>
            </div>

            {/* Team header */}
            <div className="flex items-center gap-3 mb-6">
                <img
                    src={team.crest}
                    alt={team.name}
                    className="w-10 h-10 object-contain"
                />
                <h2 className="text-2xl font-bold text-gray-800">{team.name}</h2>
            </div>

            {/* Roster table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 shadow-sm rounded-lg">
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Position</th>
                        <th className="px-4 py-2 text-left">Nationality</th>
                        <th className="px-4 py-2 text-left">Age</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {team.squad.map((player, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium text-gray-800">
                                {player.playerName}
                            </td>
                            <td className="px-4 py-2">{player.position || "N/A"}</td>
                            <td className="px-4 py-2">{player.nation}</td>
                            <td className="px-4 py-2">{player.age ? player.age : "N/A"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamRoster;
