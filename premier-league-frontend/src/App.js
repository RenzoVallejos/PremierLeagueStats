import React, { useState } from "react";
import CustomApp from "./CustomApp";
import LiveApp from "./LiveApp";

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
