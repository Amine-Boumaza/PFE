<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> origin/master
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import Swal from "sweetalert2";

<<<<<<< HEAD
export default function Player(props) {
  const { CurrentUser } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamName = queryParams.get("teamName");
  const [players, setPlayers] = useState([]);
  const [CurrentTeam, SetCurrentTeam] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    TenantID: CurrentUser.TenantID,
    Name: "",
    TeamID: props.CurrentTeam,
    Date_of_Birth: "",
    Place_of_birth: "",
    Blood_type: "",
    Height: "",
    weight: "",
    ph_Number: "",
    Parent_Number: "",
    Sex: "",
  });

  const CheckSelectedTeam = () => {
    if (teamName) {
      SetCurrentTeam(teamName);
    } else {
      SetCurrentTeam(props.CurrentTeam);
    }
  };

  const [editedPlayer, setEditedPlayer] = useState({
    TenantID: CurrentUser.TenantID,
    Name: "",
    TeamID: props.CurrentTeam,
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
    CheckSelectedTeam();
  }, []);

  useEffect(() => {
    if (CurrentTeam) {
      fetchPlayers(CurrentTeam);
    }
  }, [CurrentTeam]);

  useEffect(() => {
    if (props.CurrentTeam) {
      SetCurrentTeam(props.CurrentTeam);
    }
  }, [props.CurrentTeam]);

  const handleAddPlayer = () => {
    setNewPlayer({
      ...newPlayer,
      TeamID: props.CurrentTeam,
=======
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
>>>>>>> origin/master
    });
    console.log(newPlayer);
    if (Object.values(newPlayer).some((value) => value === "")) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields.",
        icon: "error",
      });
      return;
    }

    axios
      .post(
        `http://localhost:8081/api/management/mannager/AddPlayer?TeamID=${CurrentTeam}`,
        newPlayer,
        {
          ...newPlayer,
          TeamID: CurrentTeam,
        }
      )
      .then((response) => {
        setPlayers([...players, response.data]);
        console.log("new Player", response.data);
        setNewPlayer({
          TenantID: CurrentUser.TenantID,
          Name: "",
          TeamID: CurrentTeam,
          Date_of_Birth: "",
          Place_of_birth: "",
          Blood_type: "",
          Height: "",
          weight: "",
          ph_Number: "",
          Parent_Number: "",
          Sex: "",
        });
        setShowAddForm(false); // Hide the form after adding the player
      })
      .catch((error) => {
        console.error("Error adding Team:", error);
      });
  };

  const fetchPlayers = (TeamID) => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetTeamsPlayers?TeamID=${TeamID}`
      )
      .then((response) => {
        setPlayers(response.data);
        console.log("Players fetch", response.data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  };

  const handleDeletePlayer = (playerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        axios
          .delete(
            `http://localhost:8081/api/management/mannager/DeletePlayerByID?PlayerID=${playerId}`
          )
          .then(() => {
            setPlayers(
              players.filter((player) => player.PlayerID !== playerId)
            );
          })
          .catch((error) => {
            console.error("Error deleting player:", error);
          });
      }
    });
  };

<<<<<<< HEAD
  const handleEditPlayer = (player) => {
    setEditedPlayer(player);
    setEditingPlayerId(player.PlayerID);
  };
=======
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


>>>>>>> origin/master

  const handleSubmitEdit = () => {
    if (Object.values(editedPlayer).some((value) => value === "")) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields.",
        icon: "error",
      });
      return;
    }

    axios
      .put(
        `http://localhost:8081/management/players/${editedPlayer.PlayerID}`,
        editedPlayer
      )
      .then((response) => {
        setPlayers(
          players.map((player) => {
            if (player.PlayerID === editedPlayer.PlayerID) {
              return response.data.player;
            }
            return player;
          })
        );
        setEditedPlayer({
          PlayerID: "",
          Name: "",
          Date_of_Birth: "",
          Blood_type: "",
          Height: "",
          weight: "",
          ph_Number: "",
          Parent_Number: "",
          Sex: "",
        });
        setEditingPlayerId(null); // Hide the edit form after editing the player
      })
      .catch((error) => {
        console.error("Error updating player:", error);
      });
  };

<<<<<<< HEAD
  const handleCancelEdit = () => {
    setEditingPlayerId(null);
  };

  return (
    <div>
      {CurrentTeam && (
        <div className="my-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
          >
            {showAddForm ? "Cancel" : "Add New Player"}
          </button>
        </div>
      )}

      {CurrentTeam && (
        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Players List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Phone Number(+213)
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Date Of Birth
                </th>
                <th className="border border-gray-300 px-4 py-2">Sex</th>
                <th className="border border-gray-300 px-4 py-2">
                  Place Of Birth
                </th>
                <th className="border border-gray-300 px-4 py-2">Height(Cm)</th>
                <th className="border border-gray-300 px-4 py-2">Weight(Kg)</th>
                <th className="border border-gray-300 px-4 py-2">Blood Type</th>
                <th className="border border-gray-300 px-4 py-2">
                  Parent Number (+213)
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showAddForm && (
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
=======
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
>>>>>>> origin/master
                    <input
                      type="text"
                      value={newPlayer.Name}
                      onChange={(e) =>
                        setNewPlayer({ ...newPlayer, Name: e.target.value })
                      }
                      placeholder="Full Name"
                      className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={newPlayer.ph_Number}
                      onChange={(e) =>
                        setNewPlayer({
                          ...newPlayer,
                          ph_Number: e.target.value,
                        })
                      }
                      placeholder="Phone Number"
                      className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
<<<<<<< HEAD
                      type="date"
                      value={newPlayer.Date_of_Birth}
                      onChange={(e) =>
                        setNewPlayer({
                          ...newPlayer,
                          Date_of_Birth: e.target.value,
                        })
                      }
                      placeholder="Date of Birth"
                      className="border border-gray-300 rounded-md px-3 py-1 mr-2"
=======
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
>>>>>>> origin/master
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={newPlayer.Sex}
                      onChange={(e) =>
                        setNewPlayer({ ...newPlayer, Sex: e.target.value })
                      }
                      className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={newPlayer.Place_of_birth}
                      onChange={(e) =>
                        setNewPlayer({
                          ...newPlayer,
                          Place_of_birth: e.target.value,
                        })
                      }
                      placeholder="Place of Birth"
                      className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={newPlayer.Height}
                      onChange={(e) =>
                        setNewPlayer({ ...newPlayer, Height: e.target.value })
                      }
                      placeholder="Height"
                      className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={newPlayer.weight}
                      onChange={(e) =>
                        setNewPlayer({ ...newPlayer, weight: e.target.value })
                      }
                      placeholder="Weight"
                      className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={newPlayer.Blood_type}
                      onChange={(e) =>
                        setNewPlayer({
                          ...newPlayer,
                          Blood_type: e.target.value,
                        })
                      }
                      placeholder="Blood Type"
                      className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={newPlayer.Parent_Number}
                      onChange={(e) =>
                        setNewPlayer({
                          ...newPlayer,
                          Parent_Number: e.target.value,
                        })
                      }
                      placeholder="Parent Number"
                      className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={handleAddPlayer}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              )}
              {players.map((player) =>
                editingPlayerId === player.PlayerID ? (
                  <tr key={player.PlayerID}>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={editedPlayer.Name}
                        onChange={(e) =>
                          setEditedPlayer({
                            ...editedPlayer,
                            Name: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={editedPlayer.ph_Number}
                        onChange={(e) =>
                          setEditedPlayer({
                            ...editedPlayer,
                            ph_Number: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="date"
                        value={editedPlayer.Date_of_Birth}
                        onChange={(e) =>
                          setEditedPlayer({
                            ...editedPlayer,
                            Date_of_Birth: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={editedPlayer.Sex}
                        onChange={(e) =>
                          setEditedPlayer({
                            ...editedPlayer,
                            Sex: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={editedPlayer.Place_of_birth}
                        onChange={(e) =>
                          setEditedPlayer({
                            ...editedPlayer,
                            Place_of_birth: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={editedPlayer.Height}
                        onChange={(e) =>
                          setEditedPlayer({
                            ...editedPlayer,
                            Height: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={editedPlayer.weight}
                        onChange={(e) =>
                          setEditedPlayer({
                            ...editedPlayer,
                            weight: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={editedPlayer.Blood_type}
                        onChange={(e) =>
                          setEditedPlayer({
                            ...editedPlayer,
                            Blood_type: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={editedPlayer.Parent_Number}
                        onChange={(e) =>
                          setEditedPlayer({
                            ...editedPlayer,
                            Parent_Number: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={handleSubmitEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={player.PlayerID}>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.Name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.ph_Number}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.Date_of_Birth}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.Sex}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.Place_of_birth}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.Height}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.weight}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.Blood_type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {player.Parent_Number}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEditPlayer(player)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
<<<<<<< HEAD
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePlayer(player.PlayerID)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
=======
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
>>>>>>> origin/master
        </div>
      )}
    </div>
  );
}
