import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Player from "./players";
import { AuthContext } from "../../../../Context/AuthContext";

export default function Team() {
  const { CurrentUser } = useContext(AuthContext);
  const [CurrentTenant, setCurrentTenant] = useState(null);
  const [users, setUsers] = useState([]);
  const [Coaches, setCoaches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [CurrentTeam, setCurrentTeam] = useState(null);
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
    GetTeams();
    GetCoaches;
  }, []);

  useEffect(() => {
    if (CurrentTeam) {
    }
  }, [CurrentTeam]);

  const GetTeams = (ID) => {
    axios
      .get(
        `http://localhost:8081/api/management/coach/Teams?TenantID=${CurrentUser.TenantID}&UserID=${CurrentUser.UserID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTeams(response.data);
        console.log("Teams Fetch:", response.data); // Changed Teams to response.data
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
        console.log("Coaches Fetch:", response.data); // Changed Teams to response.data
      })
      .catch((error) => {
        console.error("Error fetching Coaches:", error);
      });
  };

  const handleSelectTeam = (ID) => {
    setCurrentTeam(ID);
    console.log(ID);
  };

  const handleAddTeam = () => {
    console.log("Current Team", CurrentTenant, "new Teams:", newTeam);
    axios
      .post(
        `http://localhost:8081/api/management/mannager/AddTeams?TenantID=${CurrentTenant}`,
        newTeam,
        {
          ...newTeam,
          TenantID: CurrentTenant,
        }
      )
      .then((response) => {
        setTeams([...teams, response.data]);
        console.log("new team", response.data);
        setNewTeam({
          TenantID: "",
          Name: "",
          CoachID: "",
        });
      })
      .catch((error) => {
        console.error("Error adding Team:", error);
      });
  };

  const handleDeleteTeam = (teamId) => {
    // Send a DELETE request to delete a team
    axios
      .delete(`http://localhost:8081/management/teams/${teamId}`)
      .then(() => {
        setTeams(teams.filter((team) => team.TeamID !== teamId));
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
      });
  };

  const handleEditTeam = (team) => {
    // Set the team to be edited
    setEditedTeam(team);
  };

  const handleSubmitEdit = () => {
    axios
      .put(
        `http://localhost:8081/api/management/mannager/EditTeam?TeamID=${editedTeam.TeamID}`,
        editedTeam
      )
      .then((response) => {
        // Update the teams state with the edited team
        setTeams(
          teams.map((team) => {
            if (team.TeamID === editedTeam.TeamID) {
              return response.data; // Update with the response from the server
            }
            return team;
          })
        );
        // Clear the edited team state
        setEditedTeam({ TeamID: "", Name: "", CoachID: "" });
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold my-4 text-center">Team Management</h1>

        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Teams List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Team Name</th>
                  <th className="border border-gray-300 px-4 py-2">Coach</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.TeamID} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{team.Name}</td>
                    <td className="border border-gray-300 px-4 py-2">{team.Name}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleSelectTeam(team.Number)}
                        className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600">
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

      <div>
        <Player CurrentTeam={CurrentTeam} CurrentTenant={CurrentTenant} />
      </div>
    </div>
  );
}
