import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Player() {
    const [players, setPlayers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [newPlayer, setNewPlayer] = useState({
        Name: "",
        TenantID: "",
        UserID: "",
        TeamID: "",
        Date_of_Birth: "",
        Place_of_birth: "",
        Blood_type: "",
        Height: "",
        weight: "",
        ph_Number: "",
        Parent_Number: "",
        Sex: "",
    });
    const [editedPlayer, setEditedPlayer] = useState({
        PlayerID: "",
        Name: "",
        TenantID: "",
        UserID: "",
        TeamID: "",
        Date_of_Birth: "",
        Place_of_birth: "",
        Blood_type: "",
        Height: "",
        weight: "",
        ph_Number: "",
        Parent_Number: "",
        Sex: "",
    });

    useEffect(() => {
        // Fetch players from the backend when component mounts
        axios.get("http://localhost:8081/management/players")
            .then(response => {
                setPlayers(response.data.players);
                console.log("Fetched players:", response.data.players);
            })
            .catch(error => {
                console.error("Error fetching players:", error);
            });
    }, []);

    const handleAddPlayer = () => {
        // Send a POST request to add a new player
        axios.post("http://localhost:8081/management/players", newPlayer)
            .then(response => {
                const updatedPlayers = [...players, response.data.player];
                setPlayers(updatedPlayers);
                setNewPlayer({
                    Name: "",
                    TenantID: "",
                    UserID: "",
                    TeamID: "",
                    Date_of_Birth: "",
                    Place_of_birth: "",
                    Blood_type: "",
                    Height: "",
                    weight: "",
                    ph_Number: "",
                    Parent_Number: "",
                    Sex: "",
                });
            })
            .catch(error => {
                console.error("Error adding player:", error);
            });
    };

    const handleDeletePlayer = (playerId) => {
        // Send a DELETE request to delete a player
        axios.delete(`http://localhost:8081/management/players/${playerId}`)
            .then(() => {
                const updatedPlayers = players.filter(player => player.PlayerID !== playerId);
                setPlayers(updatedPlayers);
            })
            .catch(error => {
                console.error("Error deleting player:", error);
            });
    };

    const handleEditPlayer = (player) => {
        // Set the player to be edited
        setEditedPlayer(player);
    };

    const handleSubmitEdit = () => {
        // Send a PUT request to update the edited player
        axios.put(`http://localhost:8081/management/players/${editedPlayer.PlayerID}`, editedPlayer)
            .then(response => {
                const updatedPlayers = players.map(player => {
                    if (player.PlayerID === editedPlayer.PlayerID) {
                        return response.data.player; // Update with the response from the server
                    }
                    return player;
                });
                setPlayers(updatedPlayers);
                // Clear the edited player state
                setEditedPlayer({
                    PlayerID: "",
                    Name: "",
                    TenantID: "",
                    UserID: "",
                    TeamID: "",
                    Date_of_Birth: "",
                    Place_of_birth: "",
                    Blood_type: "",
                    Height: "",
                    weight: "",
                    ph_Number: "",
                    Parent_Number: "",
                    Sex: "",
                });
            })
            .catch(error => {
                console.error("Error updating player:", error);
            });
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const filteredPlayers = players.filter(player =>
        player.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Player Management</h1>

            {/* New Player Form */}
            <div className="my-4">
                <h2 className="text-xl font-semibold mb-2">Add New Player</h2>
                <div className="flex flex-wrap">
                    <input
                        type="text"
                        value={newPlayer.Name}
                        onChange={(e) => setNewPlayer({ ...newPlayer, Name: e.target.value })}
                        placeholder="Name"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="text"
                        value={newPlayer.TenantID}
                        onChange={(e) => setNewPlayer({ ...newPlayer, TenantID: e.target.value })}
                        placeholder="Tenant ID"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="text"
                        value={newPlayer.UserID}
                        onChange={(e) => setNewPlayer({ ...newPlayer, UserID: e.target.value })}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="text"
                        value={newPlayer.TeamID}
                        onChange={(e) => setNewPlayer({ ...newPlayer, TeamID: e.target.value })}
                        placeholder="Team ID"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="date"
                        value={newPlayer.Date_of_Birth}
                        onChange={(e) => setNewPlayer({ ...newPlayer, Date_of_Birth: e.target.value })}
                        placeholder="Date of Birth"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="text"
                        value={newPlayer.Place_of_birth}
                        onChange={(e) => setNewPlayer({ ...newPlayer, Place_of_birth: e.target.value })}
                        placeholder="Place of Birth"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="text"
                        value={newPlayer.Blood_type}
                        onChange={(e) => setNewPlayer({ ...newPlayer, Blood_type: e.target.value })}
                        placeholder="Blood Type"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="text"
                        value={newPlayer.Height}
                        onChange={(e) => setNewPlayer({ ...newPlayer, Height: e.target.value })}
                        placeholder="Height"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="text"
                        value={newPlayer.weight}
                        onChange={(e) => setNewPlayer({ ...newPlayer, weight: e.target.value })}
                        placeholder="Weight"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="text"
                        value={newPlayer.ph_Number}
                        onChange={(e) => setNewPlayer({ ...newPlayer, ph_Number: e.target.value })}
                        placeholder="Phone Number"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="text"
                        value={newPlayer.Parent_Number}
                        onChange={(e) => setNewPlayer({ ...newPlayer, Parent_Number: e.target.value })}
                        placeholder="Parent's Number"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <select
                        value={newPlayer.Sex}
                        onChange={(e) => setNewPlayer({ ...newPlayer, Sex: e.target.value })}
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    >
                        <option value="" disabled>Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <button
                        onClick={handleAddPlayer}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Search Input */}
            <div className="my-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search Players"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
            </div>

            {/* Players Table */}
            <div className="my-8">
                <h2 className="text-xl font-bold mb-4">Players List</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Tenant ID</th>
                            <th className="border border-gray-300 px-4 py-2">User ID</th>
                            <th className="border border-gray-300 px-4 py-2">Team ID</th>
                            <th className="border border-gray-300 px-4 py-2">Date of Birth</th>
                            <th className="border border-gray-300 px-4 py-2">Place of Birth</th>
                            <th className="border border-gray-300 px-4 py-2">Blood Type</th>
                            <th className="border border-gray-300 px-4 py-2">Height</th>
                            <th className="border border-gray-300 px-4 py-2">Weight</th>
                            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                            <th className="border border-gray-300 px-4 py-2">Parent's Number</th>
                            <th className="border border-gray-300 px-4 py-2">Sex</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlayers.map(player => (
                            <tr key={player.PlayerID}>
                                <td className="border border-gray-300 px-4 py-2">{player.Name}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.TenantID}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.UserID}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.TeamID}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.Date_of_Birth}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.Place_of_birth}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.Blood_type}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.Height}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.weight}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.ph_Number}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.Parent_Number}</td>
                                <td className="border border-gray-300 px-4 py-2">{player.Sex}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleEditPlayer(player)}
                                        className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                                    >
                                        Edit
                                    </button>
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

            {/* Edit Player Form */}
            {editedPlayer.PlayerID !== "" && (
                <div className="my-4">
                    <h2 className="text-xl font-semibold mb-2">Edit Player</h2>
                    <div className="flex flex-wrap">
                        <input
                            type="text"
                            value={editedPlayer.Name}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, Name: e.target.value })}
                            placeholder="Name"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={editedPlayer.TenantID}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, TenantID: e.target.value })}
                            placeholder="Tenant ID"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={editedPlayer.UserID}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, UserID: e.target.value })}
                            placeholder="User ID"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={editedPlayer.TeamID}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, TeamID: e.target.value })}
                            placeholder="Team ID"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="date"
                            value={editedPlayer.Date_of_Birth}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, Date_of_Birth: e.target.value })}
                            placeholder="Date of Birth"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={editedPlayer.Place_of_birth}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, Place_of_birth: e.target.value })}
                            placeholder="Place of Birth"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={editedPlayer.Blood_type}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, Blood_type: e.target.value })}
                            placeholder="Blood Type"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={editedPlayer.Height}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, Height: e.target.value })}
                            placeholder="Height"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={editedPlayer.weight}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, weight: e.target.value })}
                            placeholder="Weight"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={editedPlayer.ph_Number}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, ph_Number: e.target.value })}
                            placeholder="Phone Number"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="text"
                            value={editedPlayer.Parent_Number}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, Parent_Number: e.target.value })}
                            placeholder="Parent's Number"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <select
                            value={editedPlayer.Sex}
                            onChange={(e) => setEditedPlayer({ ...editedPlayer, Sex: e.target.value })}
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        >
                            <option value="" disabled>Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
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
    );
}
