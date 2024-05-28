import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Player() {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const teamName = queryParams.get("teamName");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
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

    const [showEditModal, setShowEditModal] = useState(false);

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

        // Fetch teams from the backend
        axios.get("http://localhost:8081/management/teams")
            .then(response => {
                setTeams(response.data.teams);
                console.log("Fetched teams:", response.data.teams);
            })
            .catch(error => {
                console.error("Error fetching teams:", error);
            });
    }, []); // Run once on component mount

    useEffect(() => {
        console.log("Team Name:", teamName);
        console.log("Teams:", teams);
        if (teamName && teams.length > 0) {
            // Find the team with the matching name
            const selectedTeam = teams.find(team => team.Name === teamName);
            console.log("Selected Team:", selectedTeam);
            if (selectedTeam) {
                console.log("Selected Team ID:", selectedTeam.TeamID); // Log the selected team ID
                setSelectedTeam(selectedTeam.TeamID.toString()); // Set the selected team ID
                axios.get(`http://localhost:8081/management/team?teamId=${selectedTeam.TeamID}`)
                    .then(response => {
                        setPlayers(response.data.players);
                        console.log("Fetched players for selected team:", response.data.players);
                    })
                    .catch(error => {
                        console.error("Error fetching players for selected team:", error);
                    });
            }
        } else {
            // If no teamName is present in the URL, select all teams
            setSelectedTeam("");
            axios.get("http://localhost:8081/management/players")
                .then(response => {
                    setPlayers(response.data.players);
                    console.log("Fetched all players:", response.data.players);
                })
                .catch(error => {
                    console.error("Error fetching all players:", error);
                });
        }
    }, [teamName, teams]);



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
        // Set the player to be edited and show the edit modal
        setEditedPlayer(player);
        setShowEditModal(true);
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
                setShowEditModal(false); // Close the modal
            })
            .catch(error => {
                console.error("Error updating player:", error);
            });
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const handleTeamSelect = (event) => {
        setSelectedTeam(event.target.value);
    };

    const filteredPlayers = players.filter(player =>
        player.Name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedTeam ? player.TeamID === parseInt(selectedTeam) : true)
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
                    <select
                        value={newPlayer.TeamID}
                        onChange={(e) => setNewPlayer({ ...newPlayer, TeamID: e.target.value })}
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    >
                        <option value="" disabled>Select Team</option>
                        {teams.map(team => (
                            <option key={team.TeamID} value={team.TeamID}>{team.Name}</option>
                        ))}
                    </select>
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

            {/* Team Selection Dropdown */}
            <div className="my-4">
                <label htmlFor="team-select" className="text-lg font-semibold mr-2">Filter by Team:</label>
                <select
                    id="team-select"
                    value={selectedTeam}
                    onChange={handleTeamSelect}
                    className="border border-gray-300 rounded-md px-3 py-1"
                >
                    <option value="">All Teams</option>
                    {teams.map(team => (
                        <option key={team.TeamID} value={team.TeamID}>{team.Name}</option>
                    ))}
                </select>
            </div>

            {/* Search Bar */}
            <div className="my-4">
                <label htmlFor="search" className="text-lg font-semibold mr-2">Search:</label>
                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by player name"
                    className="border border-gray-300 rounded-md px-3 py-1"
                />
            </div>

            {/* Player List */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
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
                                        className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeletePlayer(player.PlayerID)}
                                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Player Modal */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-2">Edit Player</h2>
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
                            <select
                                value={editedPlayer.TeamID}
                                onChange={(e) => setEditedPlayer({ ...editedPlayer, TeamID: e.target.value })}
                                className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                            >
                                <option value="" disabled>Select Team</option>
                                {teams.map(team => (
                                    <option key={team.TeamID} value={team.TeamID}>{team.Name}</option>
                                ))}
                            </select>
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
                            <div className="flex justify-end w-full mt-4">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitEdit}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
