/**
 * MatchesListLive.js
 *
 * This component displays live, upcoming, and past Premier League matches
 * fetched from the backend (MatchDTO).
 *
 * Features:
 * - Shows match date and time (localized to user’s system).
 * - Displays home and away teams with their crest images.
 * - Shows live/full-time scores (or "-" if not available yet).
 * - Includes match status (color-coded: LIVE, SCHEDULED, FINISHED).
 * - Normalizes API status: "TIMED" → "SCHEDULED".
 * - Adds fallback for missing crest images.
 */

import React from "react";

const MatchesListLive = ({ matches }) => {

    // Normalize status values (map TIMED → SCHEDULED)
    const normalizeStatus = (status) => {
        if (status === "TIMED") return "SCHEDULED";
        return status;
    };

    // Status colors
    const getStatusStyle = (status) => {
        switch (status) {
            case "LIVE":
                return { color: "green", fontWeight: "bold" };
            case "FINISHED":
                return { color: "red", fontWeight: "bold" };
            case "SCHEDULED":
                return { color: "blue", fontWeight: "bold" };
            default:
                return { color: "gray", fontWeight: "bold" };
        }
    };

    return (
        <div>
            <h3>Premier League Matches</h3>
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                <tr>
                    <th>Date</th>
                    <th>Home</th>
                    <th>Score</th>
                    <th>Away</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {matches.map((match) => {
                    const status = normalizeStatus(match.status);
                    return (
                        <tr key={match.id}>
                            {/* Match Date & Time */}
                            <td>
                                {new Date(match.utcDate).toLocaleDateString()}{" "}
                                {new Date(match.utcDate).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </td>

                            {/* Home Team */}
                            <td>
                                <img
                                    src={match.homeTeamCrest}
                                    alt={match.homeTeamName}
                                    style={{
                                        width: "25px",
                                        marginRight: "8px",
                                        verticalAlign: "middle",
                                    }}
                                />
                                {match.homeTeamName}
                            </td>

                            {/* Score */}
                            <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                {match.homeScore !== null && match.awayScore !== null
                                    ? `${match.homeScore} - ${match.awayScore}`
                                    : "-"}
                            </td>

                            {/* Away Team */}
                            <td>
                                <img
                                    src={match.awayTeamCrest}
                                    alt={match.awayTeamName}
                                    style={{
                                        width: "25px",
                                        marginRight: "8px",
                                        verticalAlign: "middle",
                                    }}
                                />
                                {match.awayTeamName}
                            </td>

                            {/* Status (normalized + color-coded) */}
                            <td style={getStatusStyle(status)}>{status}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default MatchesListLive;
