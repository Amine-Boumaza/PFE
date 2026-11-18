import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "./players";
import Swal from "sweetalert2";

export default function Team() {
<<<<<<< HEAD
  const [CurrentTenant, setCurrentTenant] = useState(null);
  const [users, setUsers] = useState([]);
  const [Coaches, setCoaches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [CurrentTeam, setCurrentTeam] = useState(null);
  const [newTeam, setNewTeam] = useState({ Name: "", CoachID: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editedTeam, setEditedTeam] = useState({
    TeamID: "",
    Name: "",
    CoachID: "",
  });

  useEffect(() => {
    Gettenants();
  }, []);

  useEffect(() => {
    if (CurrentTenant) {
      GetTeams(CurrentTenant);
      GetCoaches(CurrentTenant);
    }
  }, [CurrentTenant]);

  const Gettenants = () => {
    axios
      .get("http://localhost:8081/api/management/admin/GetTenents")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching session reports:", error);
      });
  };

  const GetTeams = (ID) => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetAllTeams?TenantID=${ID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTeams(response.data);
        console.log("Teams Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching Teams:", error);
      });
  };

  const GetCoaches = (ID) => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetCoaches?TenantID=${ID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setCoaches(response.data);
        console.log("Coaches Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching Coaches:", error);
      });
  };

  const handleSelectTenants = (ID) => {
    setCurrentTenant(ID);
  };

  const handleSelectTeam = (teamId) => {
    // If teamId is provided, set it directly as the current team
    if (teamId) {
      setCurrentTeam(teamId);
    } else {
      // Otherwise, extract teamId from URL parameter
      const queryParams = new URLSearchParams(location.search);
      const teamName = queryParams.get("teamName");
      if (teamName && teams.length > 0) {
        const selectedTeam = teams.find((team) => team.Name === teamName);
        if (selectedTeam) {
          setCurrentTeam(selectedTeam.TeamID);
        }
      }
    }
  };
  const handleAddTeam = () => {
    axios
      .post(
        `http://localhost:8081/api/management/mannager/AddTeams?TenantID=${CurrentTenant}`,
        newTeam,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTeams([...teams, response.data]);
        console.log("new team", response.data);
        setNewTeam({
          Name: "",
          CoachID: "",
        });
        setIsAdding(false);
      })
      .catch((error) => {
        console.error("Error adding Team:", error);
      });
  };

  const HandleDeletePlayer = (teamId) => {
    axios
      .delete(
        `http://localhost:8081/api/management/mannager/DeletePlayer?TeamID=${teamId}`,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        console.log("All players related to the team deleted");
      })
      .catch((error) => {
        console.error("Error deleting players:", error);
      });
  };
  const HandleDeleteTeam = (teamId) => {
    axios
      .delete(
        `http://localhost:8081/api/management/mannager/DeleteTeam?TeamID=${teamId}`,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        console.log("Team and related data deleted successfully");
        GetTeams();
      })
      .catch((error) => {
        console.error(
          "Error deleting team:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const deleteTeamAndPlayers = (teamId) => {
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
        HandleDeletePlayer(teamId);
        HandleDeleteTeam(teamId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleEditTeam = (team) => {
    setEditingTeam(team.TeamID);
    setEditedTeam(team);
  };

  const handleSubmitEdit = () => {
    console.log("editedTeam", editedTeam);
    axios
      .put(
        `http://localhost:8081/api/management/mannager/EditTeam?TeamID=${editedTeam.TeamID}`,
        editedTeam,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTeams(
          teams.map((team) =>
            team.TeamID === editedTeam.TeamID ? response.data : team
          )
        );
        setEditedTeam({ TeamID: "", Name: "", CoachID: "" });
        setEditingTeam(null);
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-4">Team Management</h1>
        <div className="py-8">
          <div className="flex justify-center">
            <h2 className="text-2xl font-semibold leading-tight text-center">Tenants</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal rounded-lg overflow-hidden">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">TenantsID</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Contact Info</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900">{user.TenantID}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900">{user.AssociationName}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900">{user.ContactInfo}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button onClick={() => handleSelectTenants(user.TenantID)} className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-700 transition duration-300">
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {CurrentTenant && (
            <>
              {teams.length === 0 ? (
                <>
                  {Coaches.length === 0 ? (
                    <h6 className="text-xl font-bold mb-4">You Can't Add Teams (Add Coach Before)</h6>
                  ) : (
                    <div className="my-4">
                      {!isAdding && (
                        <button onClick={() => setIsAdding(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                          Add New Team
                        </button>
                      )}
                      {isAdding && (
                        <div className="my-8">
                          <h2 className="text-xl font-bold mb-4">Add New Team</h2>
                          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-700 text-white">
                              <tr>
                                <th className="border border-gray-300 px-4 py-2">Team Name</th>
                                <th className="border border-gray-300 px-4 py-2">Coach</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-gray-300 px-4 py-2">
                                  <input type="text" value={newTeam.Name} onChange={(e) => setNewTeam({ ...newTeam, Name: e.target.value })} placeholder="Team Name" className="border border-gray-300 rounded-md px-3 py-1" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  <select id="dataSelect" value={newTeam.CoachID} onChange={(e) => setNewTeam({ ...newTeam, CoachID: e.target.value })} className="border border-gray-300 rounded-md px-3 py-1">
                                    <option value="">--Select--</option>
                                    {Coaches.map((coach) => (
                                      <option key={coach.CoachID} value={coach.CoachID}>{coach.Name}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  <button onClick={handleAddTeam} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                                    Save
                                  </button>
                                  <button onClick={() => setIsAdding(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-700 transition duration-300">
                                    Cancel
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="my-8">
                  <div className="my-4">
                    {!isAdding && (
                      <button onClick={() => setIsAdding(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Add New Team
                      </button>
                    )}
                  </div>
                  <h2 className="text-xl font-bold mb-4">Teams List</h2>
                  <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-white">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Team Name</th>
                        <th className="border border-gray-300 px-4 py-2">Coach</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isAdding && (
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">
                            <input type="text" value={newTeam.Name} onChange={(e) => setNewTeam({ ...newTeam, Name: e.target.value })} placeholder="Team Name" className="border border-gray-300 rounded-md px-3 py-1" />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <select id="dataSelect" value={newTeam.CoachID} onChange={(e) => setNewTeam({ ...newTeam, CoachID: e.target.value })} className="border border-gray-300 rounded-md px-3 py-1">
                              <option value="">--Select--</option>
                              {Coaches.map((coach) => (
                                <option key={coach.CoachID} value={coach.CoachID}>{coach.Name}</option>
                              ))}
                            </select>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <button onClick={handleAddTeam} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                              Save
                            </button>
                            <button onClick={() => setIsAdding(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-700 transition duration-300">
                              Cancel
                            </button>
                          </td>
                        </tr>
                      )}
                      {teams.map((team) => (
                        <tr key={team.TeamID} className="hover:bg-gray-100">
                          <td className="border border-gray-300 px-4 py-2">
                            {editingTeam === team.TeamID ? (
                              <input type="text" value={editedTeam.Name} onChange={(e) => setEditedTeam({ ...editedTeam, Name: e.target.value })} placeholder="Team Name" className="border border-gray-300 rounded-md px-3 py-1" />
                            ) : (
                              team.Name
                            )}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {editingTeam === team.TeamID ? (
                              <select id="dataSelect" value={editedTeam.CoachID} onChange={(e) => setEditedTeam({ ...editedTeam, CoachID: e.target.value })} className="border border-gray-300 rounded-md px-3 py-1">
                                <option value="">--Select--</option>
                                {Coaches.map((coach) => (
                                  <option key={coach.CoachID} value={coach.CoachID}>{coach.Name}</option>
                                ))}
                              </select>
                            ) : (
                              team.CoachName
                            )}
                          </td>
                          <td
                            className="border border-gray-300 px-4 py-2">
                            {editingTeam === team.TeamID ? (
                              <div>
                                <button onClick={handleSubmitEdit} className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-700 transition duration-300">
                                  Save
                                </button>
                                <button onClick={() => setEditingTeam(null)} className="bg-gray-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-gray-700 transition duration-300">
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div>
                                <button onClick={() => handleSelectTeam(team.TeamID)} className="bg-green-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-green-700 transition duration-300">
                                  Select
                                </button>
                                <button onClick={() => handleEditTeam(team)} className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-700 transition duration-300">
                                  Edit
                                </button>
                                <button onClick={() => deleteTeamAndPlayers(team.TeamID)} className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300">
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
=======
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
>>>>>>> origin/master
        </div>
      </div>


      <div>
        {CurrentTeam && (
          <>
            <Player CurrentTeam={CurrentTeam} CurrentTenant={CurrentTenant} />
          </>
        )}
      </div>
    </div>
  );
}
