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
        <div className="bg-gray-50 rounded-lg p-4">
            <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <input 
                        name="playerName" 
                        value={form.playerName} 
                        onChange={handleChange} 
                        placeholder="Player Name" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                    <input 
                        name="teamName" 
                        value={form.teamName} 
                        onChange={handleChange} 
                        placeholder="Team Name" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <select 
                            name="position" 
                            value={form.position} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select Position</option>
                            <option value="GK">Goalkeeper</option>
                            <option value="DEF">Defender</option>
                            <option value="MID">Midfielder</option>
                            <option value="FWD">Forward</option>
                        </select>
                        <input 
                            name="nation" 
                            value={form.nation} 
                            onChange={handleChange} 
                            placeholder="Nationality" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <input 
                            name="age" 
                            type="number" 
                            value={form.age} 
                            onChange={handleChange} 
                            placeholder="Age" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            min="16" 
                            max="45"
                        />
                        <input 
                            name="goals" 
                            type="number" 
                            value={form.goals} 
                            onChange={handleChange} 
                            placeholder="Goals" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            min="0"
                        />
                        <input 
                            name="assists" 
                            type="number" 
                            value={form.assists} 
                            onChange={handleChange} 
                            placeholder="Assists" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            min="0"
                        />
                    </div>
                </div>
                
                <div className="flex space-x-3 pt-2">
                    <button 
                        onClick={handleAdd}
                        type="button"
                        className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                    >
                        ➕ Add Player
                    </button>
                    <button 
                        onClick={handleUpdate}
                        type="button"
                        className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                    >
                        ✏️ Update Player
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PlayerForm;
