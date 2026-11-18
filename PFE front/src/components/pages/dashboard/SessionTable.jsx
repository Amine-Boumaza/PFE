import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SessionTable() {
  const [sessions, setSessions] = useState([]);

  const GetEmployees = async (TenantID) => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/management/admin/GetUsers",
        {
          params: { TenantID }, // Correctly passing the TenantID as a query parameter
          withCredentials: true,
        }
      );
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching Employees:", error);
    }
  };

  useEffect(() => {
    // Fetch session data from the backend
    GetEmployees(1);
  }, []);

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
<<<<<<< HEAD
            <h2 className="text-3xl font-semibold leading-tight text-center">Employees</h2>
=======
            <h2 className="text-2xl font-semibold leading-tight">Employees</h2>
>>>>>>> origin/master
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-700 text-white">
                    <tr>
<<<<<<< HEAD
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
=======
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
>>>>>>> origin/master
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
<<<<<<< HEAD
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{session.UserID}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{session.Email}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{session.Role}</td>
=======
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
>>>>>>> origin/master
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
