import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Player from "./players";
import { AuthContext } from "../../../../Context/AuthContext";
import Swal from "sweetalert2";

export default function Team() {
  const { CurrentUser } = useContext(AuthContext);
  const [Coaches, setCoaches] = useState([]);
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
  const [CurrentTeam, setCurrentTeam] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  const handleSelectTeam = (ID) => {
    setCurrentTeam(ID);
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

  const GetTeams = () => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetAllTeams?TenantID=${CurrentUser.TenantID}`,
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

  useEffect(() => {
    GetTeams();
    GetCoaches(CurrentUser.TenantID);
  }, [CurrentUser.TenantID]);

  const handleAddTeam = () => {
    axios
      .post(
        `http://localhost:8081/api/management/mannager/AddTeams?TenantID=${CurrentUser.TenantID}`,
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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold my-4 text-center">Team Management</h1>
        {console.log("Coaches", Coaches.length)}
        {/* New Team Form */}
        {teams.length === 0 ? (
          <>
            {Coaches.length === 0 ? (
              <h6 className="text-xl font-bold mb-4">
                You Can't Add Teams (Add Coach Before)
              </h6>
            ) : (
              <div className="my-4">
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Add New Team
                  </button>
                )}
                {isAdding && (
                  <div className="my-8">
                    <h2 className="text-xl font-bold mb-4">Add New Team</h2>
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-gray-700 text-white">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2">
                            Team Name
                          </th>
                          <th className="border border-gray-300 px-4 py-2">Coach</th>
                          <th className="border border-gray-300 px-4 py-2">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="text"
                              value={newTeam.Name}
                              onChange={(e) =>
                                setNewTeam({ ...newTeam, Name: e.target.value })
                              }
                              placeholder="Team Name"
                              className="border border-gray-300 rounded-md px-3 py-1"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <select
                              id="dataSelect"
                              value={newTeam.CoachID}
                              onChange={(e) =>
                                setNewTeam({ ...newTeam, CoachID: e.target.value })
                              }
                            >
                              <option value="">--Select--</option>
                              {Coaches.map((coach) => (
                                <option
                                  key={coach.CoachID}
                                  value={coach.CoachID}
                                >
                                  {coach.Name}
                                </option>
                              ))}
                            </select>
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
                <button
                  onClick={() => setIsAdding(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add New Team
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold mb-4">Teams List</h2>
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Team Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Coach</th>
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
                        onChange={(e) =>
                          setNewTeam({ ...newTeam, Name: e.target.value })
                        }
                        placeholder="Team Name"
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        id="dataSelect"
                        value={newTeam.CoachID}
                        onChange={(e) =>
                          setNewTeam({ ...newTeam, CoachID: e.target.value })
                        }
                      >
                        <option value="">--Select--</option>
                        {Coaches.map((coach) => (
                          <option key={coach.CoachID} value={coach.CoachID}>
                            {coach.Name}
                          </option>
                        ))}
                      </select>
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
                      {editingTeam === team.TeamID ? (
                        <input
                          type="text"
                          value={editedTeam.Name}
                          onChange={(e) =>
                            setEditedTeam({
                              ...editedTeam,
                              Name: e.target.value,
                            })
                          }
                          placeholder="Team Name"
                          className="border border-gray-300 rounded-md px-3 py-1"
                        />
                      ) : (
                        team.Name
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingTeam === team.TeamID ? (
                        <select
                          id="dataSelect"
                          value={editedTeam.CoachID}
                          onChange={(e) =>
                            setEditedTeam({
                              ...editedTeam,
                              CoachID: e.target.value,
                            })
                          }
                        >
                          <option value="">--Select--</option>
                          {Coaches.map((coach) => (
                            <option
                              key={coach.CoachID}
                              value={coach.CoachID}
                            >
                              {coach.Name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        team.CoachName
                      )}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {editingTeam === team.TeamID ? (
                        <div>
                          <button
                            onClick={handleSubmitEdit}
                            className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingTeam(null)}
                            className="bg-gray-500 text-white py-1 px-3 rounded mr-2 hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={() => handleSelectTeam(team.TeamID)}
                            className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600"
                          >
                            Select
                          </button>
                          <button
                            onClick={() => handleEditTeam(team)}
                            className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTeamAndPlayers(team.TeamID)}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                          >
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
      </div>



      <div>
        <Player CurrentTeam={CurrentTeam} />
      </div>
    </div >
  );
}
