import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

export default function UserTable() {
  const { CurrentUser } = useContext(AuthContext);
  const [Teams, setTeams] = useState([]);

  const GetTeams = () => {
    axios
      .get(
        `http://localhost:8081/api/management/coach/Teams?TenantID=${CurrentUser.TenantID}&UserID=${CurrentUser.UserID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTeams(response.data);
        console.log("GetTeams Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching GetTeams:", error);
      });
  };

  const handleSelectTenants = (teamName) => {
    window.location.href = `/management/team?teamName=${teamName}`;
  };

  useEffect(() => {
    GetTeams();
  }, []);

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-center">
            <h2 className="text-3xl font-semibold leading-tight text-center">Teams</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Number</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Teams.map((team, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{team.Number}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{team.Name}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => handleSelectTenants(team.Name)}
                            className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                          >
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
        </div>
      </div>
    </div>

  );
}
