import React, { useState, useEffect } from "react";
import axios from "axios";


import Sessions2 from "../sessions/sessions2.jsx";
import CoachFillForm from "../sessions/session3.jsx"


export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    Date: "",
    Time: "",
    TeamID: ""
  });
  const [editedSession, setEditedSession] = useState({
    SessionID: "",
    TenantID: "",
    Date: "",
    Time: "",
    TeamID: ""
  });

  useEffect(() => {
    // Fetch sessions from the backend when component mounts
    axios.get("http://localhost:8081/management/sessions")
      .then(response => {
        setSessions(response.data.sessions);
        console.log("Fetched sessions:", response.data.sessions);
      })
      .catch(error => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  const handleAddSession = () => {
    // Send a POST request to add a new session
    axios.post("http://localhost:8081/management/sessions", newSession)
      .then(response => {
        setSessions([...sessions, response.data.session]);
        setNewSession({ Date: "", Time: "", TeamID: "" });
      })
      .catch(error => {
        console.error("Error adding session:", error);
      });
  };

  const handleDeleteSession = (sessionId) => {
    // Send a DELETE request to delete a session
    axios.delete(`http://localhost:8081/management/sessions/${sessionId}`)
      .then(() => {
        setSessions(sessions.filter(session => session.SessionID !== sessionId));
      })
      .catch(error => {
        console.error("Error deleting session:", error);
      });
  };

  const handleEditSession = (session) => {
    // Set the session to be edited
    setEditedSession(session);
  };

  const handleSubmitEdit = () => {
    // Log the data being sent to the backend
    console.log("Edited session data:", editedSession);

    // Send a PUT request to update the edited session
    axios.put(`http://localhost:8081/management/sessions/${editedSession.SessionID}`, editedSession)
      .then(response => {
        // Update the sessions state with the edited session
        setSessions(sessions.map(session => {
          if (session.SessionID === editedSession.SessionID) {
            return response.data.session; // Update with the response from the server
          }
          return session;
        }));
        // Clear the edited session state
        setEditedSession({ SessionID: "", TenantID: "", Date: "", Time: "", TeamID: "" });
      })
      .catch(error => {
        console.error("Error updating session:", error);
      });
  };



  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-4">Sessions</h1>

        {/* New Session Form */}
        <div className="my-4">
          <h2 className="text-xl font-semibold mb-2">Add New Session</h2>
          <div className="flex">
            <input
              type="date"
              value={newSession.Date}
              onChange={(e) => setNewSession({ ...newSession, Date: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            />
            <input
              type="time"
              value={newSession.Time}
              onChange={(e) => setNewSession({ ...newSession, Time: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            />
            <input
              type="text"
              value={newSession.TeamID}
              onChange={(e) => setNewSession({ ...newSession, TeamID: e.target.value })}
              placeholder="Team ID"
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            />
            <button
              onClick={handleAddSession}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </div>

        {/* Sessions Table */}
        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Sessions of the Week</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Team ID</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>

              {sessions.map(session => (
                <tr key={session.SessionID}>
                  <td className="border border-gray-300 px-4 py-2">{session.Date}</td>
                  <td className="border border-gray-300 px-4 py-2">{session.Time}</td>
                  <td className="border border-gray-300 px-4 py-2">{session.TeamID}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEditSession(session)}
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSession(session.SessionID)} // Ensure session.SessionID is passed
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Session Form */}
        {editedSession.SessionID !== "" && (
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Edit Session</h2>
            <div className="flex">
              <input
                type="date"
                value={editedSession.Date}
                onChange={(e) => setEditedSession({ ...editedSession, Date: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-1 mr-2"
              />
              <input
                type="time"
                value={editedSession.Time}
                onChange={(e) => setEditedSession({ ...editedSession, Time: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-1 mr-2"
              />
              <input
                type="text"
                value={editedSession.TeamID}
                onChange={(e) => setEditedSession({ ...editedSession, TeamID: e.target.value })}
                placeholder="Team ID"
                className="border border-gray-300 rounded-md px-3 py-1 mr-2"
              />
              <button
                onClick={handleSubmitEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <Sessions2 />
      </div>

      <div>
        <CoachFillForm />
      </div>

    </div>

  );
}
