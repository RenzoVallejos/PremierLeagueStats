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
        <form onSubmit={handleSubmit}>
            <h2>Add Match</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="number"
                placeholder="Home Team ID"
                value={formData.homeTeamId}
                onChange={(e) =>
                    setFormData({ ...formData, homeTeamId: e.target.value })
                }
            />
            <input
                type="number"
                placeholder="Away Team ID"
                value={formData.awayTeamId}
                onChange={(e) =>
                    setFormData({ ...formData, awayTeamId: e.target.value })
                }
            />
            <input
                type="number"
                placeholder="Home Team Score"
                value={formData.homeTeamScore}
                onChange={(e) =>
                    setFormData({ ...formData, homeTeamScore: e.target.value })
                }
            />
            <input
                type="number"
                placeholder="Away Team Score"
                value={formData.awayTeamScore}
                onChange={(e) =>
                    setFormData({ ...formData, awayTeamScore: e.target.value })
                }
            />
            <input
                type="date"
                value={formData.matchDate}
                onChange={(e) =>
                    setFormData({ ...formData, matchDate: e.target.value })
                }
            />
            <button type="submit">Add Match</button>
        </form>
    );
};

export default MatchForm;
