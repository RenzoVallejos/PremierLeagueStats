/**
 * PlayerList.js
 *
 * Displays a table of players.
 * - Used for both Custom (editable) and Live (read-only) modes.
 *
 * Custom mode:
 *   - Shows all player info.
 *   - Includes a Delete button.
 *
 * Live mode:
 *   - Displays team crest images if available.
 *   - Hides the Delete button (read-only).
 */
import React from "react";

const PlayerList = ({ players, onDelete, liveMode = false }) => {
    if (!players || players.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-4xl mb-4">⚽</div>
                <p className="text-gray-500 text-lg">
                    {liveMode ? "No top scorers available" : "No players added yet"}
                </p>
                {!liveMode && (
                    <p className="text-gray-400 text-sm mt-2">
                        Add your first player using the form above
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Team</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Position</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nation</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Age</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Goals</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assists</th>
                    {!liveMode && <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {players.map((player, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        {/* Player name */}
                        <td className="px-4 py-3 font-medium text-gray-900">
                            {player.playerName}
                        </td>

                        {/* Team name with crest if available */}
                        <td className="px-4 py-3">
                            <div className="flex items-center">
                                {liveMode && player.teamCrest ? (
                                    <>
                                        <img
                                            src={player.teamCrest}
                                            alt={player.teamName}
                                            className="w-6 h-6 mr-2 rounded-sm"
                                        />
                                        <span className="text-gray-900">{player.teamName}</span>
                                    </>
                                ) : (
                                    <span className="text-gray-900">{player.teamName}</span>
                                )}
                            </div>
                        </td>

                        {/* Other info */}
                        <td className="px-4 py-3 text-gray-700">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {player.position ?? "N/A"}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{player.nation}</td>
                        <td className="px-4 py-3 text-gray-700">{player.age ?? "N/A"}</td>
                        <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                ⚽ {player.goals}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                🎯 {player.assists}
                            </span>
                        </td>

                        {/* Delete only for custom mode */}
                        {!liveMode && (
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => onDelete(player.playerName)}
                                    className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    🗑️ Delete
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerList;
