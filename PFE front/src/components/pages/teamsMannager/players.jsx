import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import Swal from "sweetalert2";

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

  const handleEditPlayer = (player) => {
    setEditedPlayer(player);
    setEditingPlayerId(player.PlayerID);
  };

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

  const handleCancelEdit = () => {
    setEditingPlayerId(null);
  };

  return (
    <div className="container mx-auto p-4">
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
          <div className="overflow-auto" style={{ maxWidth: "100%" }}>
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-white">
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
          </div>
        </div>
      )}
    </div>

  );
}
