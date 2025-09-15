/**
 *
 * Root component of the Premier League App.
 *
 * - Acts as the entry point for the frontend React application.
 * - Provides a toggle between:
 *    1. LiveApp → Fetches live data (scorers, standings, matches) via API.
 *    2. CustomApp → Manages custom players and matches stored in Postgres.
 * - Maintains local state (`view`) to determine which app to render.
 * - Renders toggle buttons for switching between Live (API) and Custom (Postgres) modes.
 */
import React, { useState } from "react";
import CustomApp from "./custom/CustomApp";
import LiveApp from "./live/LiveApp";

const App = () => {
    const [view, setView] = useState("live"); // default to Live API

    return (
        <div>
            <h1>Premier League App</h1>

            {/* Toggle buttons */}
            <div>
                <button onClick={() => setView("live")} disabled={view === "live"}>
                    Live (API)
                </button>
                <button onClick={() => setView("custom")} disabled={view === "custom"}>
                    Custom (Postgres)
                </button>
            </div>

            {/* Render correct app */}
            {view === "custom" ? <CustomApp/> : <LiveApp/>}
        </div>
    );
};

export default App;