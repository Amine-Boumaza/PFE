import React, { useState, useEffect, useContext } from "react";
<<<<<<< HEAD

=======
>>>>>>> origin/master
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";

export default function UserTable() {
  const [Teams, setTeams] = useState([]);
  const { CurrentUser } = useContext(AuthContext);

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
<<<<<<< HEAD
        console.log("Teams Fetch:", response.data); // Changed Teams to response.data
=======
        console.log("Teams Fetch:", response.data);
>>>>>>> origin/master
      })
      .catch((error) => {
        console.error("Error fetching Teams:", error);
      });
  };

  const handleSelectTenants = (teamName) => {
<<<<<<< HEAD
    window.location.href = `/management/team?teamName=${teamName}`; // Navigate to the players table page with the selected team ID
=======
    window.location.href = `/management/team?teamName=${teamName}`;
>>>>>>> origin/master
  };

  useEffect(() => {
    GetTeams();
  }, []);

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
<<<<<<< HEAD
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-center">Teams</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Coach</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Players List</th>
                  </tr>
                </thead>
                <tbody>
                  {Teams.map((Team, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{Team.Name}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{Team.CoachName}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleSelectTenants(Team.TeamID)}
                          className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
=======
          <div className="flex justify-center">
            <h2 className="text-3xl font-semibold leading-tight text-center">
              Teams
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Coach
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Players List
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Teams.map((Team, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {Team.Name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {Team.CoachName}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => handleSelectTenants(Team.Name)}
                            className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
>>>>>>> origin/master
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
