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
<<<<<<< HEAD
    window.location.href = `/management/sessions?teamName=${teamName}&sessionId=${SessionId}`;
=======
    window.location.href = `/management/activity?teamName=${teamName}&sessionId=${SessionId}`;
>>>>>>> origin/master
  };

  useEffect(() => {
    GetSessions();
  }, []);

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-center">
<<<<<<< HEAD
            <h2 className="text-3xl font-semibold leading-tight text-center">Sessions</h2>
=======
            <h2 className="text-3xl font-semibold leading-tight text-center">
              Sessions
            </h2>
>>>>>>> origin/master
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
<<<<<<< HEAD
                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Team</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Date</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Time</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
=======
                <table className="min-w-full leading-normal rounded-lg overflow-hidden">
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
>>>>>>> origin/master
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
<<<<<<< HEAD
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{session.NAME}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{session.Date}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{session.Time}</td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => handleSelectTenants(session.NAME, session.SessionID)}
                            className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
=======
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
                            onClick={() =>
                              handleSelectTenants(session.NAME, session.SessionID)
                            }
                            className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
>>>>>>> origin/master
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
<<<<<<< HEAD

=======
>>>>>>> origin/master
  );
}
