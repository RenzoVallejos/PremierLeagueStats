import React, { useEffect, useState } from "react";
import { fetchMatches } from "./services/api";


const MatchesList = () => {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMatches()
            .then((data) => {
                setMatches(data);
            })
            .catch((err) => {
                setError("Failed to fetch matches.");
                console.error(err);
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Matches</h2>
            {matches.length === 0 ? (
                <p>No matches available.</p>
            ) : (
                <ul>
                    {matches.map((match) => (
                        <li key={match.id}>
                            <p>
                                <strong>Match ID:</strong> {match.id}
                            </p>
                            <p>
                                <strong>Home Team Score:</strong> {match.homeTeamScore}
                            </p>
                            <p>
                                <strong>Away Team Score:</strong> {match.awayTeamScore}
                            </p>
                            <p>
                                <strong>Match Date:</strong>{" "}
                                {match.matchDate ? match.matchDate : "N/A"}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MatchesList;
