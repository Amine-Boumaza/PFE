import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "./players";

export default function Team() {
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({
        Name: "",
        CoachID: ""
    });
    const [editingTeam, setEditingTeam] = useState(null); // Team being edited
    const [isAdding, setIsAdding] = useState(false); // State to control the visibility of the new team form

    useEffect(() => {
        // Fetch teams from the backend when component mounts
        axios
            .get("http://localhost:8081/management/teams")
            .then(response => {
                setTeams(response.data.teams);
                console.log("Fetched teams:", response.data.teams);
            })
            .catch(error => {
                console.error("Error fetching teams:", error);
            });
    }, []);

    const handleAddTeam = () => {
        // Send a POST request to add a new team
        axios
            .post("http://localhost:8081/management/teams", newTeam)
            .then(response => {
                setTeams([response.data.team, ...teams]);
                setNewTeam({ Name: "", CoachID: "" });
                setIsAdding(false); // Hide new row after adding
            })
            .catch(error => {
                console.error("Error adding team:", error);
            });
    };

    const handleDeleteTeam = (teamId) => {
        // Send a DELETE request to delete a team
        axios
            .delete(`http://localhost:8081/management/teams/${teamId}`)
            .then(() => {
                setTeams(teams.filter(team => team.TeamID !== teamId));
            })
            .catch(error => {
                console.error("Error deleting team:", error);
            });
    };

    const handleEdit = (team) => {
        setEditingTeam(team); // Set the team being edited
    };

    const handleSaveEdit = () => {
        // Save the edited team
        axios
            .put(`http://localhost:8081/management/teams/${editingTeam.TeamID}`, editingTeam)
            .then(response => {
                setTeams(teams.map(team =>
                    team.TeamID === editingTeam.TeamID ? response.data.team : team
                ));
                setEditingTeam(null); // Clear the editing state
            })
            .catch(error => {
                console.error("Error updating team:", error);
            });
    };

    return (
        <div>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold my-4">Team Management</h1>

                {/* New Team Form */}
                <div className="my-4">
                    {!isAdding && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Add New Team
                        </button>
                    )}
                </div>

                {/* Teams Table */}
                <div className="my-8">
                    <h2 className="text-xl font-bold mb-4">Teams List</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Team Name</th>
                                <th className="border border-gray-300 px-4 py-2">Coach ID</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isAdding && (
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            value={newTeam.Name}
                                            onChange={(e) => setNewTeam({ ...newTeam, Name: e.target.value })}
                                            placeholder="Team Name"
                                            className="border border-gray-300 rounded-md px-3 py-1"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            value={newTeam.CoachID}
                                            onChange={(e) => setNewTeam({ ...newTeam, CoachID: e.target.value })}
                                            placeholder="Coach ID"
                                            className="border border-gray-300 rounded-md px-3 py-1"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={handleAddTeam}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsAdding(false)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            )}
                            {teams.map((team) => (
                                <tr key={team.TeamID}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {editingTeam === team ? (
                                            <input
                                                type="text"
                                                value={editingTeam.Name}
                                                onChange={(e) =>
                                                    setEditingTeam({
                                                        ...editingTeam,
                                                        Name: e.target.value
                                                    })
                                                }
                                                className="border border-gray-300 rounded-md px-3 py-1"
                                            />
                                        ) : (
                                            team.Name
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {editingTeam === team ? (
                                            <input
                                                type="text"
                                                value={editingTeam.CoachID}
                                                onChange={(e) =>
                                                    setEditingTeam({
                                                        ...editingTeam,
                                                        CoachID: e.target.value
                                                    })
                                                }
                                                className="border border-gray-300 rounded-md px-3 py-1"
                                            />
                                        ) : (
                                            team.CoachID
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {editingTeam === team ? (
                                            <button
                                                onClick={handleSaveEdit}
                                                className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(team)}
                                                className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteTeam(team.TeamID)}
                                            className="bg-red-500 text-white py-1 px-3 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <Player />
            </div>
        </div>
    );
}
