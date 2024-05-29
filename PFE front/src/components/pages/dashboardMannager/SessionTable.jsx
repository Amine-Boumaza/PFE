import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";

export default function SessionTable() {
  const { CurrentUser } = useContext(AuthContext);

  const [Rapports, setRapport] = useState([]);

  const GetTeams = () => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetAllRapports?TenantID=${CurrentUser.TenantID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setRapport(response.data);
        console.log("Rapports Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching Teams:", error);
      });
  };

  const handleSelectTenants = (ReportID) => {
    window.location.href = `/management/sessions?Repport=${ReportID}`;
  };

  useEffect(() => {
    GetTeams();
  }, []);

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-center">
            <h2 className="text-3xl font-semibold leading-tight text-center">
              Session Rapports
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Team
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Coach
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        CreatedAt
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Session Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Summary
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Rapports.map((rapport, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {rapport.Name}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {rapport.CoachName}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {rapport.CreatedAt}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {rapport.Date}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {rapport.Summary}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => handleSelectTenants(rapport.ReportID)}
                            className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-700 transition duration-300"
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
