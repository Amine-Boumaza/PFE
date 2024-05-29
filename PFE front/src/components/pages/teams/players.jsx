import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Players() {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [newPlayer, setNewPlayer] = useState({
        Name: "",
        TenantID: "",
        UserID: "",
        TeamID: "",
        Date_of_Birth: "",
        Place_of_birth: "",
        Blood_type: "",
        Height: "",
        Weight: "",
        Ph_Number: "",
        Parent_Number: "",
        Sex: "",
    });
    const [isAdding, setIsAdding] = useState(false); // New state to control the visibility of the new row
    const [editingPlayer, setEditingPlayer] = useState(null); // Player being edited

    useEffect(() => {
        axios
            .get("http://localhost:8081/management/players")
            .then((response) => {
                setPlayers(response.data.players);
            })
            .catch((error) => {
                console.error("Error fetching players:", error);
            });

        axios
            .get("http://localhost:8081/management/teams")
            .then((response) => {
                setTeams(response.data.teams);
            })
            .catch((error) => {
                console.error("Error fetching teams:", error);
            });
    }, []);

    const handleAddPlayer = () => {
        axios
            .post("http://localhost:8081/management/players", newPlayer)
            .then((response) => {
                setPlayers([response.data.player, ...players]);
                setNewPlayer({
                    Name: "",
                    TenantID: "",
                    UserID: "",
                    TeamID: "",
                    Date_of_Birth: "",
                    Place_of_birth: "",
                    Blood_type: "",
                    Height: "",
                    Weight: "",
                    Ph_Number: "",
                    Parent_Number: "",
                    Sex: "",
                });
                setIsAdding(false);
            })
            .catch((error) => {
                console.error("Error adding player:", error);
            });
    };

    const handleDeletePlayer = (playerId) => {
        axios
            .delete(`http://localhost:8081/management/players/${playerId}`)
            .then(() => {
                setPlayers(players.filter((player) => player.PlayerID !== playerId));
            })
            .catch((error) => {
                console.error("Error deleting player:", error);
            });
    };

    const handleEdit = (player) => {
        setEditingPlayer(player); // Set the player being edited
    };

    const handleSaveEdit = () => {
        axios
            .put(`http://localhost:8081/management/players/${editingPlayer.PlayerID}`, editingPlayer)
            .then((response) => {
                setPlayers(
                    players.map((p) =>
                        p.PlayerID === editingPlayer.PlayerID ? response.data.player : p
                    )
                );
                setEditingPlayer(null); // Clear the editing state
            })
            .catch((error) => {
                console.error("Error updating player:", error);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Players</h1>

            <div className="my-4">
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Add New Player
                    </button>
                )}
            </div>

            <div className="my-8">
                <h2 className="text-xl font-bold mb-4">Players List</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">TeamID</th>
                            <th className="border border-gray-300 px-4 py-2">Date of Birth</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isAdding && (
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        value={newPlayer.Name}
                                        onChange={(e) =>
                                            setNewPlayer({ ...newPlayer, Name: e.target.value })
                                        }
                                        placeholder="Name"
                                        className="border border-gray-300 rounded-md px-3 py-1"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select
                                        value={newPlayer.TeamID}
                                        onChange={(e) =>
                                            setNewPlayer({ ...newPlayer, TeamID: e.target.value })
                                        }
                                        className="border border-gray-300 rounded-md px-3 py-1"
                                    >
                                        <option value="">Select Team</option>
                                        {teams.map((team) => (
                                            <option key={team.TeamID} value={team.TeamID}>
                                                {team.TeamName}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="date"
                                        value={newPlayer.Date_of_Birth}
                                        onChange={(e) =>
                                            setNewPlayer({ ...newPlayer, Date_of_Birth: e.target.value })
                                        }
                                        className="border border-gray-300 rounded-md px-3 py-1"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={handleAddPlayer}
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
                        {players.map((player) => (
                            <tr key={player.PlayerID}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingPlayer === player ? (
                                        <input
                                            type="text"
                                            value={editingPlayer.Name}
                                            onChange={(e) =>
                                                setEditingPlayer({ ...editingPlayer, Name: e.target.value })
                                            }
                                            className="border border-gray-300 rounded-md px-3 py-1"
                                        />
                                    ) : (
                                        player.Name
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingPlayer === player ? (
                                        <select
                                            value={editingPlayer.TeamID}
                                            onChange={(e) =>
                                                setEditingPlayer({ ...editingPlayer, TeamID: e.target.value })
                                            }
                                            className="border border-gray-300 rounded-md px-3 py-1"
                                        >
                                            {teams.map((team) => (
                                                <option key={team.TeamID} value={team.TeamID}>
                                                    {team.TeamName}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        player.TeamID
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingPlayer === player ? (
                                        <input
                                            type="date"
                                            value={editingPlayer.Date_of_Birth}
                                            onChange={(e) =>
                                                setEditingPlayer({
                                                    ...editingPlayer,
                                                    Date_of_Birth: e.target.value,
                                                })
                                            }
                                            className="border border-gray-300 rounded-md px-3 py-1"
                                        />
                                    ) : (
                                        player.Date_of_Birth
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editingPlayer === player ? (
                                        <button
                                            onClick={handleSaveEdit}
                                            className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(player)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeletePlayer(player.PlayerID)}
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
    );
}
