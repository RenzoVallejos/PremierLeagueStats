/**
 * CustomApi Module
 *
 * Provides API helper functions for working with matches.
 * Handles communication with the backend using Axios.
 * Includes functions for fetching all matches and adding a new match.
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8081/api";

export const fetchMatches = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/matches`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch matches.");
    }
};

export const addMatch = async (matchData) => {
    try {
        const response = await axios.post(`${BASE_URL}/matches`, matchData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Failed to add match.");
    }
};
