/**
 * MatchesListLive.js
 *
 * Displays the list of Premier League matches with live status.
 * - Styled with Tailwind to match PlayerList’s modern UI.
 * - Allows clicking a team name to view its roster.
 * - Includes a search box to filter matches by team name (substring, case-insensitive).
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";

const MatchesListLive = ({ matches }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Normalize status values (map TIMED → SCHEDULED)
    const normalizeStatus = (status) => {
        if (status === "TIMED") return "SCHEDULED";
        return status;
    };

    // Status colors with Tailwind classes
    const getStatusClass = (status) => {
        switch (status) {
            case "LIVE":
                return "text-green-600 font-bold";
            case "FINISHED":
                return "text-red-600 font-bold";
            case "SCHEDULED":
                return "text-blue-600 font-bold";
            default:
                return "text-gray-500 font-bold";
        }
    };

    // Filter matches based on search term
    const filteredMatches = matches.filter(
        (match) =>
            match.homeTeamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            match.awayTeamName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Premier League Matches
            </h3>

            {/* Search Box */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by team name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-sm px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border border-gray-200 bg-white">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Home</th>
                        <th className="px-4 py-2 text-center">Score</th>
                        <th className="px-4 py-2 text-left">Away</th>
                        <th className="px-4 py-2 text-center">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                    {filteredMatches.length > 0 ? (
                        filteredMatches.map((match) => {
                            const status = normalizeStatus(match.status);
                            return (
                                <tr key={match.id} className="hover:bg-gray-50">
                                    {/* Match Date & Time */}
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        {new Date(match.utcDate).toLocaleDateString()}{" "}
                                        {new Date(match.utcDate).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>

                                    {/* Home Team */}
                                    <td className="px-4 py-2 flex items-center gap-2">
                                        <img
                                            src={match.homeTeamCrest}
                                            alt={match.homeTeamName}
                                            className="w-6 h-6 object-contain"
                                        />
                                        <Link
                                            to={`/team/${match.homeTeamId}`}
                                            className="text-indigo-600 hover:underline"
                                        >
                                            {match.homeTeamName}
                                        </Link>
                                    </td>

                                    {/* Score */}
                                    <td className="px-4 py-2 text-center font-bold">
                                        {match.homeScore !== null && match.awayScore !== null
                                            ? `${match.homeScore} - ${match.awayScore}`
                                            : "-"}
                                    </td>

                                    {/* Away Team */}
                                    <td className="px-4 py-2 flex items-center gap-2">
                                        <img
                                            src={match.awayTeamCrest}
                                            alt={match.awayTeamName}
                                            className="w-6 h-6 object-contain"
                                        />
                                        <Link
                                            to={`/team/${match.awayTeamId}`}
                                            className="text-indigo-600 hover:underline"
                                        >
                                            {match.awayTeamName}
                                        </Link>
                                    </td>

                                    {/* Status */}
                                    <td
                                        className={`px-4 py-2 text-center ${getStatusClass(
                                            status
                                        )}`}
                                    >
                                        {status}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                className="px-4 py-6 text-center text-gray-500 italic"
                            >
                                No matches found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MatchesListLive;
