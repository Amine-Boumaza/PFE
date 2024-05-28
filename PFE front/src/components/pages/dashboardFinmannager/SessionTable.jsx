import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SessionTable() {
  const [sessions, setSessions] = useState([]);

  const GetEmployees = (TenantID) => {
    TenantID = 1;
    axios
      .get("http://localhost:8081/api/management/admin/GetUsers", TenantID, {
        withCredentials: true,
      })
      .then((response) => {
        setSessions(response.data);
        console.log("Employee Fetch:", sessions);
      })
      .catch((error) => {
        console.error("Error fetching Employees:", error);
      });
  };

  useEffect(() => {
    // Fetch session data from the backend
    GetEmployees();
  }, []);

  console.log("sessions:", sessions);

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Imports</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            {/* Add max-h-[YOUR_HEIGHT] and overflow-y-auto to make the table scrollable */}
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {session.UserID}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {session.Email}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {session.Role}
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
