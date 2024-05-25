import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "./players";

export default function Team() {
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({
        Name: "",
        CoachID: "",
    });
    const [editedTeam, setEditedTeam] = useState({
        TeamID: "",
        Name: "",
        CoachID: "",
    });

    useEffect(() => {
        // Fetch teams from the backend when component mounts
        axios.get("http://localhost:8081/management/teams")
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
        axios.post("http://localhost:8081/management/teams", newTeam)
            .then(response => {
                setTeams([...teams, response.data.team]);
                setNewTeam({ Name: "", CoachID: "" });
            })
            .catch(error => {
                console.error("Error adding team:", error);
            });
    };

    const handleDeleteTeam = (teamId) => {
        // Send a DELETE request to delete a team
        axios.delete(`http://localhost:8081/management/teams/${teamId}`)
            .then(() => {
                setTeams(teams.filter(team => team.TeamID !== teamId));
            })
            .catch(error => {
                console.error("Error deleting team:", error);
            });
    };

    const handleEditTeam = (team) => {
        // Set the team to be edited
        setEditedTeam(team);
    };

    const handleSubmitEdit = () => {
        // Send a PUT request to update the edited team
        axios.put(`http://localhost:8081/management/teams/${editedTeam.TeamID}`, editedTeam)
            .then(response => {
                // Update the teams state with the edited team
                setTeams(teams.map(team => {
                    if (team.TeamID === editedTeam.TeamID) {
                        return response.data.team; // Update with the response from the server
                    }
                    return team;
                }));
                // Clear the edited team state
                setEditedTeam({ TeamID: "", Name: "", CoachID: "" });
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
                    <h2 className="text-xl font-semibold mb-2">Add New Team</h2>
                    <div className="flex">
                        <input
                            type="text"
                            value={newTeam.Name}
                            onChange={(e) => setNewTeam({ ...newTeam, Name: e.target.value })}
                            placeholder="Team Name"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={newTeam.CoachID}
                            onChange={(e) => setNewTeam({ ...newTeam, CoachID: e.target.value })}
                            placeholder="Coach ID"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <button
                            onClick={handleAddTeam}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Add
                        </button>
                    </div>
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
                            {teams.map(team => (
                                <tr key={team.TeamID}>
                                    <td className="border border-gray-300 px-4 py-2">{team.Name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{team.CoachID}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleEditTeam(team)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                                        >
                                            Edit
                                        </button>
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

                {/* Edit Team Form */}
                {editedTeam.TeamID !== "" && (
                    <div className="my-4">
                        <h2 className="text-xl font-semibold mb-2">Edit Team</h2>
                        <div className="flex">
                            <input
                                type="text"
                                value={editedTeam.Name}
                                onChange={(e) => setEditedTeam({ ...editedTeam, Name: e.target.value })}
                                placeholder="Team Name"
                                className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                            />
                            <input
                                type="text"
                                value={editedTeam.CoachID}
                                onChange={(e) => setEditedTeam({ ...editedTeam, CoachID: e.target.value })}
                                placeholder="Coach ID"
                                className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                            />
                            <button
                                onClick={handleSubmitEdit}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}

            </div>

            <div><Player /></div>

        </div>
    );
}
