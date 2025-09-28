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
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 shadow-sm rounded-lg">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Team</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-left">Nation</th>
                    <th className="px-4 py-2 text-left">Age</th>
                    <th className="px-4 py-2 text-left">Goals</th>
                    <th className="px-4 py-2 text-left">Assists</th>
                    {!liveMode && <th className="px-4 py-2 text-left">Action</th>}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {players.map((player, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        {/* Player name */}
                        <td className="px-4 py-2 font-medium text-gray-800">
                            {player.playerName}
                        </td>

                        {/* Team name with crest if available */}
                        <td className="px-4 py-2 flex items-center">
                            {liveMode && player.teamCrest ? (
                                <>
                                    <img
                                        src={player.teamCrest}
                                        alt={player.teamName}
                                        className="w-6 h-6 mr-2 inline-block"
                                    />
                                    {player.teamName}
                                </>
                            ) : (
                                player.teamName
                            )}
                        </td>

                        {/* Other info */}
                        <td className="px-4 py-2">{player.position ?? "N/A"}</td>
                        <td className="px-4 py-2">{player.nation}</td>
                        <td className="px-4 py-2">{player.age ?? "N/A"}</td>
                        <td className="px-4 py-2 font-semibold text-indigo-600">
                            {player.goals}
                        </td>
                        <td className="px-4 py-2">{player.assists}</td>

                        {/* Delete only for custom mode */}
                        {!liveMode && (
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => onDelete(player.playerName)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                                >
                                    Delete
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
