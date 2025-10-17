/**
 * App.js
 *
 * Root component of the Premier League App.
 *
 * - Uses React Router to handle navigation.
 * - `/` → Toggle between LiveApp (API) and CustomApp (Postgres).
 * - `/team/:id` → Shows TeamRoster page for a selected team.
 */

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomApp from "./custom/CustomApp";
import LiveApp from "./live/LiveApp";
import TeamRoster from "./live/TeamRoster";

const App = () => {
    const [view, setView] = useState("live"); // default to Live API

    return (
        <Router>
            <Routes>
                {/* Home route with toggle */}
                <Route
                    path="/"
                    element={
                        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-100">
                            {/* Header */}
                            <div className="bg-white shadow-sm border-b">
                                <div className="max-w-6xl mx-auto px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">⚽</span>
                                            </div>
                                            <h1 className="text-2xl font-bold text-gray-900">Premier League Stats</h1>
                                        </div>
                                        
                                        {/* Toggle buttons */}
                                        <div className="flex bg-gray-100 rounded-lg p-1">
                                            <button
                                                onClick={() => setView("live")}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                                    view === "live"
                                                        ? "bg-white text-indigo-600 shadow-sm"
                                                        : "text-gray-600 hover:text-gray-900"
                                                }`}
                                            >
                                                🔴 Live Data
                                            </button>
                                            <button
                                                onClick={() => setView("custom")}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                                    view === "custom"
                                                        ? "bg-white text-indigo-600 shadow-sm"
                                                        : "text-gray-600 hover:text-gray-900"
                                                }`}
                                            >
                                                🗄️ Custom Data
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main content */}
                            <div className="py-6">
                                {view === "custom" ? <CustomApp /> : <LiveApp />}
                            </div>
                        </div>
                    }
                />

                {/* Team roster route */}
                <Route path="/team/:id" element={<TeamRoster />} />
            </Routes>
        </Router>
    );
};

export default App;
