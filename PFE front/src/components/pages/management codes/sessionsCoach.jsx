import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AttendanceList from "../attendanceCoach/attancdance.jsx";
import ShowAttendanceList from "../attendanceCoach/showattendance.jsx";


import Sessions2 from "../sessionCoach/sessionsreport.jsx";
import { AuthContext } from "../../../../Context/AuthContext.jsx";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  const { CurrentUser } = useContext(AuthContext);
  const [CurrentSes, SetCurrentSes] = useState(null);
  const [Teams, setTeams] = useState([]);
  const [newSession, setNewSession] = useState({
    Date: "",
    Time: "",
    TeamID: "",
  });
  const [editedSession, setEditedSession] = useState({
    SessionID: "",
    Date: "",
    Time: "",
    TeamID: "",
  });

  useEffect(() => {
    GetSessions(CurrentUser.UserID);
  }, []);

  const GetSessions = (ID) => {
    axios
      .get(
        `http://localhost:8081/api/management/coach/GetCoachSessions?CoachID=${ID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setSessions(response.data);
        console.log("Session Fetch:", response.data); // Changed Teams to response.data
      })
      .catch((error) => {
        console.error("Error fetching Session:", error);
      });
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold my-4 text-center">Sessions</h1>
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-center">My Sessions List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Time</th>
                  <th className="border border-gray-300 px-4 py-2">Team Name</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.SessionID} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {session.Date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.Time}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.Name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => SetCurrentSes(session.SessionID)}
                        className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600"
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
      <div>
        <Sessions2 CurrentSes={CurrentSes} />
        <ShowAttendanceList CurrentSes={CurrentSes} />
        <AttendanceList CurrentSes={CurrentSes} />

      </div>
    </div>
  );
}
