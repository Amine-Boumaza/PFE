import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

export default function SessionTable() {
  const { CurrentUser } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);

  const GetSessions = () => {
    axios
      .get(
        `http://localhost:8081/api/management/coach/Sessions?TenantID=${CurrentUser.TenantID}&UserID=${CurrentUser.UserID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setSessions(response.data);
        console.log("GetSessions Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching GetSessions:", error);
      });
  };

  const handleSelectTenants = (teamName, SessionId) => {
    window.location.href = `/management/activity?teamName=${teamName}&sessionId=${SessionId}`; // Navigate to the players table page with the selected team ID
  };


  useEffect(() => {
    // Fetch session data from the backend
    GetSessions();
  }, []);

  console.log("sessions:", sessions);

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Sessions</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            {/* Add max-h-[YOUR_HEIGHT] and overflow-y-auto to make the table scrollable */}
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Team
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {session.NAME}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {session.Date}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {session.Time}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => handleSelectTenants(session.NAME, session.SessionID)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
