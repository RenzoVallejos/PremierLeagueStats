/**
 * Fetches and displays a list of matches from the backend API.
 * - Loads matches on mount using fetchMatches().
 * - Handles and shows errors if fetch fails.
 * - Renders a list of match details or a "no matches" message.
 */
import React, { useEffect, useState } from "react";
import { fetchMatches } from "./CustomApi";


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
        return (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                ⚠️ {error}
            </div>
        );
    }

    if (matches.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-gray-500 text-lg">No matches available</p>
                <p className="text-gray-400 text-sm mt-2">
                    Add your first match using the form
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3 max-h-64 overflow-y-auto">
            {matches.map((match) => (
                <div key={match.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Match #{match.id}
                        </span>
                        <span className="text-sm text-gray-600">
                            {match.matchDate ? new Date(match.matchDate).toLocaleDateString() : "Date TBD"}
                        </span>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4">
                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">Home</div>
                            <div className="text-2xl font-bold text-indigo-600">
                                {match.homeTeamScore}
                            </div>
                        </div>
                        
                        <div className="text-gray-400 font-bold text-lg">
                            VS
                        </div>
                        
                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">Away</div>
                            <div className="text-2xl font-bold text-purple-600">
                                {match.awayTeamScore}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MatchesList;
