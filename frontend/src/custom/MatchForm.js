/**
 * Provides a form to add new matches to the backend.
 * - Validates input (teams cannot be the same).
 * - Submits match data using addMatch().
 * - Resets form on success and shows errors if any occur.
 */
import React, { useState } from "react";
import { addMatch } from "./CustomApi";

const MatchForm = () => {
    const [formData, setFormData] = useState({
        homeTeamId: "",
        awayTeamId: "",
        homeTeamScore: "",
        awayTeamScore: "",
        matchDate: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.homeTeamId === formData.awayTeamId) {
            setError("Home and Away teams cannot be the same.");
            return;
        }
        try {
            await addMatch(formData);
            setFormData({
                homeTeamId: "",
                awayTeamId: "",
                homeTeamScore: "",
                awayTeamScore: "",
                matchDate: "",
            });
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    ⚠️ {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Home Team ID
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 1"
                            value={formData.homeTeamId}
                            onChange={(e) =>
                                setFormData({ ...formData, homeTeamId: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Away Team ID
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 2"
                            value={formData.awayTeamId}
                            onChange={(e) =>
                                setFormData({ ...formData, awayTeamId: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Home Score
                        </label>
                        <input
                            type="number"
                            placeholder="0"
                            min="0"
                            value={formData.homeTeamScore}
                            onChange={(e) =>
                                setFormData({ ...formData, homeTeamScore: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center font-semibold"
                            required
                        />
                    </div>
                    <div className="text-center text-gray-500 font-bold text-lg pb-2">
                        VS
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Away Score
                        </label>
                        <input
                            type="number"
                            placeholder="0"
                            min="0"
                            value={formData.awayTeamScore}
                            onChange={(e) =>
                                setFormData({ ...formData, awayTeamScore: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center font-semibold"
                            required
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Match Date
                    </label>
                    <input
                        type="date"
                        value={formData.matchDate}
                        onChange={(e) =>
                            setFormData({ ...formData, matchDate: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
                
                <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                >
                    ➕ Add Match
                </button>
            </form>
        </div>
    );
};

export default MatchForm;
