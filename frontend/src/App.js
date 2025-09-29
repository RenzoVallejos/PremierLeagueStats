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
                        <div>
                            <h1>Premier League App</h1>

                            {/* Toggle buttons */}
                            <div>
                                <button
                                    onClick={() => setView("live")}
                                    disabled={view === "live"}
                                >
                                    Live (API)
                                </button>
                                <button
                                    onClick={() => setView("custom")}
                                    disabled={view === "custom"}
                                >
                                    Custom (Postgres)
                                </button>
                            </div>

                            {/* Render correct app */}
                            {view === "custom" ? <CustomApp /> : <LiveApp />}
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
