/**
 * StandingsList.js
 *
 * Displays the league standings table (e.g., Premier League).
 * Styled with Tailwind for consistency with PlayerList and MatchesListLive.
 * Highlights:
 * - Top 5 → Champions League (bg-green-50)
 * - 6th → Europa League (bg-yellow-50)
 * - Bottom 3 (18th–20th) → Relegation (bg-red-50)
 */
import React from "react";

const StandingsList = ({ standings }) => {
    // Decide row background based on position
    const getRowStyle = (position) => {
        if (position >= 1 && position <= 5) {
            return "bg-green-50"; // Champions League
        } else if (position === 6) {
            return "bg-yellow-50"; // Europa League
        } else if (position >= 18) {
            return "bg-red-50"; // Relegation
        }
        return "";
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                League Standings
            </h3>

            {/* Legend */}
            <div className="flex gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-green-50 border border-green-200 rounded"></span>
                    <span>Champions League (1st–5th)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded"></span>
                    <span>Europa League (6th)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-50 border border-red-200 rounded"></span>
                    <span>Relegation (18th–20th)</span>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border border-gray-200 bg-white">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="px-4 py-2 text-left">Pos</th>
                        <th className="px-4 py-2 text-left">Team</th>
                        <th className="px-4 py-2 text-center">Played</th>
                        <th className="px-4 py-2 text-center">W</th>
                        <th className="px-4 py-2 text-center">D</th>
                        <th className="px-4 py-2 text-center">L</th>
                        <th className="px-4 py-2 text-center">GF</th>
                        <th className="px-4 py-2 text-center">GA</th>
                        <th className="px-4 py-2 text-center">GD</th>
                        <th className="px-4 py-2 text-center">Points</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                    {standings.map((team, index) => (
                        <tr
                            key={index}
                            className={`${getRowStyle(
                                team.position
                            )} hover:bg-gray-100`}
                        >
                            {/* Position */}
                            <td className="px-4 py-2 font-medium text-gray-900">
                                {team.position}
                            </td>

                            {/* Team with crest */}
                            <td className="px-4 py-2 flex items-center gap-2">
                                <img
                                    src={team.crest}
                                    alt={team.teamName}
                                    className="w-6 h-6 object-contain"
                                />
                                {team.teamName}
                            </td>

                            {/* Stats */}
                            <td className="px-4 py-2 text-center">{team.playedGames}</td>
                            <td className="px-4 py-2 text-center text-green-600 font-semibold">
                                {team.won}
                            </td>
                            <td className="px-4 py-2 text-center">{team.draw}</td>
                            <td className="px-4 py-2 text-center text-red-600 font-semibold">
                                {team.lost}
                            </td>
                            <td className="px-4 py-2 text-center">{team.goalsFor}</td>
                            <td className="px-4 py-2 text-center">{team.goalsAgainst}</td>
                            <td className="px-4 py-2 text-center">{team.goalDifference}</td>
                            <td className="px-4 py-2 text-center font-bold text-indigo-600">
                                {team.points}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StandingsList;
