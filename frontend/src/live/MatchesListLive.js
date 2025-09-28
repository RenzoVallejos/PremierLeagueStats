/**
 * MatchesListLive.js
 *
 * Styled with Tailwind to match PlayerList’s modern UI.
 */

import React from "react";

const MatchesListLive = ({ matches }) => {
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

    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Premier League Matches
            </h3>

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
                    {matches.map((match) => {
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
                                    {match.homeTeamName}
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
                                    {match.awayTeamName}
                                </td>

                                {/* Status */}
                                <td className={`px-4 py-2 text-center ${getStatusClass(status)}`}>
                                    {status}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MatchesListLive;
