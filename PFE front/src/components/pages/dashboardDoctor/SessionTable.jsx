import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

export default function SessionTable() {
  const { CurrentUser } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);

  const GetEmployees = (TenantID) => {
    TenantID = 1;
    axios
      .get(
        `http://localhost:8081/api/management/doctor/Forms?TenantID=${CurrentUser.TenantID}`,
        {
          withCredentials: true,
        }
      )
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
            <h2 className="text-3xl font-semibold leading-tight text-center">Forms</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            {/* Add max-h-[YOUR_HEIGHT] and overflow-y-auto to make the table scrollable */}
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Number
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{session.FormID}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{session.FormName}</td>
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
