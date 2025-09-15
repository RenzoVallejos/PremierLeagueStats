/**
 * PlayerForm.js
 *
 * Form component for managing **Custom players** (Postgres DB).
 * - Allows adding new players or updating existing ones.
 * - Not used for Live API players (since they cannot be modified).
 */
import React, { useState } from "react";

function PlayerForm({ onAdd, onUpdate, status }) {
    const [form, setForm] = useState({
        playerName: "",
        teamName: "",
        position: "",
        nation: "",
        age: "",
        goals: "",
        assists: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        onAdd(form);
        setForm({ playerName: "", teamName: "", position: "", nation: "", age: "", goals: "", assists: "" });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        onUpdate(form);
        setForm({ playerName: "", teamName: "", position: "", nation: "", age: "", goals: "", assists: "" });
    };

    return (
        <div>
            <h3>Add / Update Player</h3>
            <form>
                <input name="playerName" value={form.playerName} onChange={handleChange} placeholder="Name" />
                <input name="teamName" value={form.teamName} onChange={handleChange} placeholder="Team" />
                <input name="position" value={form.position} onChange={handleChange} placeholder="Position" />
                <input name="nation" value={form.nation} onChange={handleChange} placeholder="Nation" />
                <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
                <input name="goals" value={form.goals} onChange={handleChange} placeholder="Goals" />
                <input name="assists" value={form.assists} onChange={handleChange} placeholder="Assists" />
                <button onClick={handleAdd}>Add Player</button>
                <button onClick={handleUpdate}>Update Player</button>
            </form>

            {/* show status under form */}
            {status && <p style={{ marginTop: "10px", color: "green" }}>{status}</p>}
        </div>
    );
}

export default PlayerForm;
